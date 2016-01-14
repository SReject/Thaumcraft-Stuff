(function () {
    'use strict';

    var thaumcraft = typeof window.thaumcraft !== "undefined" ? window.thaumcraft : {};

    function AspectList(base, compile) {
        this.baseList = base;
        this.addons = {};
        this.compiled = false;
        if (compile !== false) {
            this.compile();
        }
    }

    AspectList.prototype = {
        addonAdd: function (addonName, aspectList, options) {
            options = options || {};
            this.addons[addonName] = {
                enable: options.enable || false,
                aspects: aspectList
            };
            if (options.compile !== false) {
                this.compile();
            }
            return this;
        },
        addonEnable: function (addonName, rebuild) {
            if (!this.addons.hasOwnProperty(addonName)) {
                throw new Error("Unknown Addon: " + addonName);
            }
            if (!this.addons[addonName].enable) {
                this.addons[addonName].enable = true;
                if (rebuild) {
                    this.compile();
                }
            }
            return this;
        },
        addonDisable: function (addonName, rebuild) {
            if (!this.addons.hasOwnProperty(addonName)) {
                throw new Error("Unknown Addon: " + addonName);
            }
            if (this.addons[addonName].enable) {
                this.addons[addonName].enable = false;
                if (rebuild) {
                    this.compile();
                }
            }
            return this;
        },
        compile: (function () {
            function addAspects(buildList, aspectList) {
                var aspect, aspectComponents;
                for (aspect in aspectList) {
                    if (aspectList.hasOwnProperty(aspect)) {
                        aspectComponents = aspectList[aspect];
                        if (!aspectComponents) {
                            buildList[aspect] = false;
                        } else {
                            buildList[aspect] = [aspectComponents[0], aspectComponents[1]];
                        }
                    }
                }
                return buildList;
            }
            return function () {
                var aspectList, addonName, addon;
                aspectList = addAspects({}, this.baseList);
                for (addonName in this.addons) {
                    if (this.addons.hasOwnProperty(addonName)) {
                        addon = this.addons[addonName];
                        if (addon.enable) {
                            aspectList = addAspects(aspectList, addon.aspects);
                        }
                    }
                }
                this.compiledList = aspectList;
                this.compiled = true;
                return this;
            };
        }()),
        has: function (aspect) {
            if (!this.compiled) {
                throw new Error("Aspect list not compiled");
            }
            return this.compiledList.hasOwnProperty(aspect);
        },
        components: function (aspect) {
            if (!this.compiled) {
                throw new Error("Aspect list not compiled");
            }
            if (!this.has(aspect)) {
                throw new Error("Unknown Aspect: " + aspect);
            }
            return this.compiledList[aspect];
        },
        breakdown: (function () {
            var primals, self;
            function walk(aspect) {
                var parts = self.components(aspect);

                if (parts !== false) {
                    walk(parts[0]);
                    walk(parts[1]);
                } else {
                    primals[aspect] = primals.hasOwnProperty(aspect) ? primals[aspect] + 1 : 1;
                }
            }
            return function (aspect) {
                if (!this.compiled) {
                    throw new Error("Aspect list not compiled");
                }
                self = this;
                primals = {};
                walk(aspect);
                return primals;
            };
        }())
    };

    thaumcraft.AspectList = AspectList;
    thaumcraft.nodeToCentivis = (function () {
        function compare(centivis, breakdown, amount) {
            var aspect;
            for (aspect in breakdown) {
                if (breakdown.hasOwnProperty(aspect) && (!centivis.hasOwnProperty(aspect) || centivis[aspect] < amount)) {
                    centivis[aspect] = Math.floor(amount);
                }
            }
            return centivis;
        }

        return function () {
            var args = Array.prototype.slice.call(arguments),
                aspectList = args.length == 3 ? args.shift() : this.aspects,
                node = args[0],
                modifier = args[1],
                modAsString = String(modifier).toLowerCase(),
                aspect,
                centivis = {};

            if (!aspectList) {
                throw new Error("No aspect list found");
            }
            if (!aspectList.compiled) {
                throw new Error("Aspect list not compiled");
            }

            if (modifier === -1 || modAsString === "pale" || modAsString === "fading") {
                modifier = .8;
            } else if (modifier === 1 || modAsString === "bright") {
                modifier = 1.2;
            } else {
                modifier = 1;
            }

            for (aspect in node) {
                if (node.hasOwnProperty(aspect)) {
                    centivis = compare(centivis, aspectList.breakdown(aspect), node[aspect]);
                }
            }

            for (aspect in centivis) {
                if (centivis.hasOwnProperty(aspect)) {
                    centivis[aspect] = Math.floor(Math.sqrt(centivis[aspect]) * modifier);
                }
            }
            return centivis;
        };
    }());

    window.thaumcraft = thaumcraft;
}());
