(function ($) {
    $.fn.objReboot = function (InIt) {

        var xmlName = '';
        this.onLoad = function () {
            this.loadHTML();
            document.getElementById("title").innerHTML = jQuery.i18n.prop(InIt);
            var arrayLabels = document.getElementsByTagName("label");
            lableLocaliztion(arrayLabels);
            var buttonID = document.getElementById("btRebootRouter").id;
            buttonLocaliztion(buttonID);

        }

        this._Reboot=function() {
            var xml = getData(xmlName);
            sm('rebootRouterModalBox',319,170);
            document.getElementById("h1RebootRouter").innerHTML = jQuery.i18n.prop("h1RebootRouter");
            document.getElementById("lRebootedRouter").innerHTML = jQuery.i18n.prop("lRebootedRouter");


            afterRebootID =  setInterval("afterReboot()", 45000);
        }

        this.onPost  =  function  () {
            if (confirm("Are you sure you want to Reboot the Router?")) {
                var xml = getData(xmlName);
                sm('rebootRouterModalBox',319,170);
                document.getElementById("h1RebootRouter").innerHTML = jQuery.i18n.prop("h1RebootRouter");
                document.getElementById("lRebootedRouter").innerHTML = jQuery.i18n.prop("lRebootedRouter");


                afterRebootID =  setInterval("afterReboot()", 45000);

            }

        }

        this.afterReboot = function () {
            hm();
            clearInterval(afterRebootID);
            clearAuthheader();
        }

        this.setXMLName = function (_xmlname) {
            xmlName = _xmlname;
        }

        this.loadHTML = function() {
            document.getElementById('Content').innerHTML = "";
            document.getElementById('Content').innerHTML = callProductHTML("html/router/reboot_router.html");
        }

        return this.each(function () {
        });

    }
})(jQuery);
function rebootRouter() {
    sm('rebootRouterBox',360,170);
    document.getElementById("btnRebootOK").innerHTML = jQuery.i18n.prop("btnRebootOK");
    document.getElementById("btnModalCancle").innerHTML = jQuery.i18n.prop("btnModalCancle");
    document.getElementById("h1RebootRouter").innerHTML = jQuery.i18n.prop("h1RebootRouter");
    document.getElementById("lQueryRebootedRouter").innerHTML = jQuery.i18n.prop("lQueryRebootedRouter");

}
function OnRebootOK() {
    hm();
    g_objContent._Reboot();
}
function onRebootCancle() {
    hm();
}
