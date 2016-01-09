$( document ).ready(function () {
    var addons = thaumcraft.aspects.addons, addon, count = 0, name, element, addonlist = $('#addonlist'), aspect, selectEle = $('#aspectSelect'), aspectList = thaumcraft.aspects.compiledList;
    for (addon in addons) {
        if (addons.hasOwnProperty(addon)) {
            count += 1;
            name = addon.toLowerCase().replace(/\s/g, "");
            ele = $('<input>').attr({
                "type": "checkbox",
                "id": name,
                "name": name,
                "value": addon
            }).on("click", function () {
                var self = $(this);
                if (this.checked) {
                    thaumcraft.aspects.addonEnable(self.attr("value"), true);
                } else {
                    thaumcraft.aspects.addonDisable(self.attr("value"), true);
                }
            });
            addonlist.append(ele);
            addonlist.append($("<label>").attr({
                "for": name
            }).text(addon));
            addonlist.append($("<br>"));
        }
    }
    if (count) {
        $('#addons').show();
    }
    $('#calc').prop("disabled", true);
    function format(text) {
        return String(text)[0].toUpperCase() + String(text).slice(1)
    }
    for (aspect in aspectList) {
        if (aspectList.hasOwnProperty(aspect)) {
            selectEle.append($("<option>").attr({
                "value": aspect
            }).text(format(aspect)));
        }
    }
    $("#aspectAdd").on("click", function () {
        var aspect = $('#aspectSelect option:selected'), vis = $('#aspectVis').val(), tbody = $('#aspectListDisplay'), row;
        if (!aspect.val() || !/^\d+$/.test(vis) || vis < 1) {
            console.log("invalid inputs");
            return;
        }
        if (tbody.children('tr[aspect=' + aspect.val() + ']').length) {
            console.log("aspect already exists");
            return
        }
        row = $('<tr>').attr({
            "aspect": aspect.val(),
            "aspectVis": vis
        }).append(
            $('<td>').text(aspect.text())
        ).append(
            $('<td>').text(vis)
        ).append(
            $('<button>').text("Rem").on("click", function () {
                row.remove();
            })
        );
        $('#aspectListDisplay > tr:first-child').after(row);
        $('#calc').prop("disabled", false);
    });
    $("#resetList").on("click", function () {
        $('#aspectListDisplay > *:not(:first-child)').remove();
        $('#calc').prop("disabled", true);
        $('input[name=nodetype]').prop("checked", false);
        $('#nodetype_normal').prop("checked", true);
        if ($('#result:visible')) {
            $('#result').hide();
            $('#resultList').html("");
        }
    });
    $('#calc').on("click", function () {
        var aspects = {}, centivis, aspect, output = "";
        $('#aspectListDisplay > tr:not(:first-child)').each(function () {
            aspects[$(this).attr("aspect")] = $(this).attr("aspectVis");
        });
        centivis = thaumcraft.nodeToCentivis(aspects, $('input[name=nodetype]:checked')[0].value);
        for (aspect in centivis) {
            if (centivis.hasOwnProperty(aspect)) {
                output += centivis[aspect] + "x " + format(aspect) + "<br>"
            }
        }
        $('#resultList').html(output);
        $('#result').show();
    });
});