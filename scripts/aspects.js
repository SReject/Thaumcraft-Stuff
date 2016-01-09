(function () {
    if (!window.thaumcraft || !window.thaumcraft.hasOwnProperty("AspectList")) {
        throw new Error("Aspect List constructor not found");
    }

    var aspects = window.thaumcraft.aspects = new window.thaumcraft.AspectList({
        "aer":          false,
        "aqua":         false,
        "ignis":        false,
        "perditio":     false,
        "ordo":         false,
        "terra":        false,
        "gelum":        ["ignis",        "perditio"],
        "lux":          ["aer",          "ignis"],
        "motus":        ["aer",          "ordo"],
        "permutatio":   ["ordo",         "perditio"],
        "potentia":     ["ignis",        "ordo"],
        "tempestas":    ["aer",          "aqua"],
        "vacuos":       ["aer",          "perditio"],
        "venenum":      ["aqua",         "perditio"],
        "victus":       ["aqua",         "terra"],
        "vitreus":      ["ordo",         "terra"],
        "bestia":       ["motus",        "victus"],
        "fames":        ["vacuos",       "victus"],
        "herba":        ["terra",        "victus"],
        "iter":         ["motus",        "terra"],
        "limus":        ["aqua",         "victus"],
        "metallum":     ["terra",        "vitreus"],
        "mortuus":      ["perditio",     "victus"],
        "praecantatio": ["potentia",     "vacuos"],
        "sano":         ["ordo",         "victus"],
        "tenebrae":     ["lux",          "vacuos"],
        "vinculum":     ["motus",        "vacuos"],
        "volatus":      ["aer",          "motus"],
        "alienis":      ["tenebrae",     "vacuos"],
        "arbor":        ["aer",          "herba"],
        "auram":        ["aer",          "praecantatio"],
        "corpus":       ["bestia",       "mortuus"],
        "exanimis":     ["mortuus",      "motus"],
        "spiritus":     ["mortuus",      "victus"],
        "vitium":       ["perditio",     "praecantatio"],
        "cognitio":     ["spiritus",     "ignis"],
        "sensus":       ["aer",          "spiritus"],
        "humanus":      ["bestia",       "cognitio"],
        "instrumentum": ["humanus",      "ordo"],
        "lucrum":       ["fames",        "humanus"],
        "messis":       ["herba",        "humanus"],
        "perfodio":     ["humanus",      "terra"],
        "fabrico":      ["humanus",      "instrumentum"],
        "machina":      ["instrumentum", "motus"],
        "meto":         ["instrumentum", "messis"],
        "pannus":       ["bestia",       "instrumentum"],
        "telum":        ["instrumentum", "ignis"],
        "tutamen":      ["instrumentum", "terra"]
    });

    aspects.addonAdd("Forbidden Magic", {
        "gula":         ["fames",        "vacuos"],
        "infernus":     ["ignis",        "praecantatio"],
        "superbia":     ["vacuos",       "volatus"],
        "desidia":      ["spiritus",     "vinculum"],
        "luxuria":      ["corpus",       "fames"],
        "invidia":      ["fames",        "sensus"],
        "ira":          ["ignis",        "telum"]
    }, {enable: false, compile: false});

    aspects.addonAdd("Magic Bees", {
        "tempus":       ["vacuos",       "ordo"]
    }, {enable: false, compile: false});

    aspects.addonAdd("Greg Tech", {
        "radio":        ["potentia",     "lux"],
        "magneto":      ["metallum",     "iter"],
        "nebrisum":     ["lucrum",       "perfodio"],
        "electrum":     ["potentia",     "machina"]
    }, {enable: false, compile: false});

    aspects.addonAdd("Elysium", {
        "sanctus":      ["spiritus",     "auram"]
    }, {enable: false, compile: false});

    aspects.addonAdd("Thaumic Warden", {
        "exubitor":     ["alienis",      "mortuus"]
    }, {enable: false, compile: false});
}());