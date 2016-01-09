if (!thaumcraft) {
    thaumcraft = {};
}
thaumcraft.nodeToCentiVis = (function () {
    function compare(centivis, breakdown, amount) {
        var aspect;
        for (aspect in breakdown) {
            if (breakdown.hasOwnProperty(aspect) && (!centivis.hasOwnProperty(aspect) || centivis[aspect] < amount)) {
                centivis[aspect] = amount;
            }
        }
        return centivis;
    }

    return function (aspectList, node, modifier) {
        var centivis = {}, aspect, modAsString = String(modifier).toLowerCase();
        for (aspect in node) {
            if (node.hasOwnProperty(aspect)) {
                centivis = compare(centivis, aspectList.breakdown(aspect), node[aspect]);
            }
        }
        if (modifier === -1 || modAsString === "pale" || modAsString === "fading") {
            modifier = .8;
        } else if (modifier === 1 || modAsString === "bright") {
            modifier = 1.2;
        } else {
            modifier = 1;
        }
        
        for (aspect in centivis) {
            if (centivis.hasOwnProperty(aspect)) {
                centivis[aspect] = Math.floor(Math.sqrt(centivis[aspect]) * modifier);
            }
        }
        return centivis;
    };
}());
