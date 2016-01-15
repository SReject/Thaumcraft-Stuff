/*jslint node: true*/
(function () {
    'use strict';
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
                enable: options.enable ? true : false,
                aspects: aspectList
            };
            if (options.compile) {
                this.compile();
            }
            return this;
        },
        addonEnable: function (addonName, compile) {
            if (!this.addons.hasOwnProperty(addonName)) {
                throw new Error("Unknown Addon: " + addonName);
            }
            if (!this.addons[addonName].enable) {
                this.addons[addonName].enable = true;
                if (compile) {
                    this.compile();
                }
            }
            return this;
        },
        addonDisable: function (addonName, compile) {
            if (!this.addons.hasOwnProperty(addonName)) {
                throw new Error("Unknown Addon: " + addonName);
            }
            if (this.addons[addonName].enable) {
                this.addons[addonName].enable = false;
                if (compile) {
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
            } else if (typeof aspect !== "string") {
                throw new Error("Aspect not a string");
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
        }()),
        nodeToCentivis: (function () {
            function compare(centivis, breakdown, amount) {
                var aspect;
                for (aspect in breakdown) {
                    if (breakdown.hasOwnProperty(aspect) && (!centivis.hasOwnProperty(aspect) || centivis[aspect] < amount)) {
                        centivis[aspect] = amount;
                    }
                }
                return centivis;
            }
            return function (node, modifier) {
                var modAsString = String(modifier).toLowerCase(), aspect, centivis = {};
                if (!this.compiled) {
                    throw new Error("AspectList not compiled");
                }
                if (modifier === "undefined") {
                    modifier = 0;
                }
                if (modifier === -1 || modAsString === "pale" || modAsString === "fading") {
                    modifier = 0.8;
                } else if (modifier === 0 || modAsString === "normal") {
                    modifier = 1;
                } else if (modifier === 1 || modAsString === "bright") {
                    modifier = 1.2;
                } else {
                    throw new Error("Invalid node modifier");
                }
                for (aspect in node) {
                    if (node.hasOwnProperty(aspect)) {
                        if (typeof node[aspect] === "number") {
                            node[aspect] = String(node[aspect]);
                        }
                        if (typeof node[aspect] === "string") {
                            if (!/^\d+$/i.test(node[aspect])) {
                                throw new Error("Invalid aspect value");
                            }
                            node[aspect] = parseInt(node[aspect], 10);
                        } else {
                            throw new Error("Invalid aspect value");
                        }
                        centivis = compare(centivis, this.breakdown(aspect), node[aspect]);
                    }
                }
                for (aspect in centivis) {
                    if (centivis.hasOwnProperty(aspect)) {
                        centivis[aspect] = Math.floor(Math.sqrt(centivis[aspect]) * modifier);
                    }
                }
                return centivis;
            };
        }())
    };
    try {
        if (module !== 'undefined' && this.module !== module && Object.prototype.toString.call(global.process) === '[object process]') {
            module.exports = AspectList;
            return;
        }
    } catch (e) {}
    (this.thaumcraft = this.thaumcraft || {}).AspectList = AspectList;
}());