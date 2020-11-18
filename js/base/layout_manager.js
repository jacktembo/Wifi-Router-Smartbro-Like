
var g_menues = new Array(0);
var g_objContent = null;
var g_objXML =  $().XML_Operations();
var g_clickedItem ='User Management';
var  _dashboardInterval        = 30000;
var  _connectedDeviceInterval  = 60000;
var _trafficstatisticsInterval = 60000;
var _networkActivityInterval   = 60000;
var _storageSettingsInterval = 30000;
var  _WiFiInterval  = 25000;

var  _dashboardIntervalID;
var  _connectedDeviceIntervalID;
var _trafficstatisticsIntervalID;
var _networkActivityIntervalID;
var _storageSettingsIntervalID;
var _WiFiIntervalID;
/* This function get the XML from the server via ajax.
 *  Get is Method and success fucntion is callback funciton when the request success
 */
document.onkeydown = function (e) {
    if(null == g_objContent)
        return true;
    var ev = window.event || e;
    var code = ev.keyCode || ev.which;
    if (code == 116) {
        ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
        cancelBubble = true;
        g_objContent.onLoad(true);
        return false;
    }
}



function callXML(xml,sFucntion) {

    $.ajax({
    type: "GET",
    url: xml,
    dataType: "xml",
    async: false,
    success: sFucntion

    });
}

/* This is important function which parses the UIxml file
 * Creates the Menu and submenu depending upon XML items
 *
 */
function parseXml(xml) {
    var menuIndex = 0;

    $(xml).find("Tab").each(function() {

        var tabName=jQuery.i18n.prop($(this).attr("Name").toString());
        var menu = new Array(0);
        var i=0;
        if($(this).attr("type").toString()=='submenuabsent') {
            menu[i] = new Array(2);
            menu[i][0]=$(this).attr("implFunction").toString();
            menu[i][1]=$(this).attr("xmlName").toString();
            i++;
        } else {
            $(this).find("Menu").each(function() {
                menu[i] = new Array(3);
                menu[i][0]=$(this).attr("id").toString();
                menu[i][1]=$(this).attr("implFunction").toString();
                menu[i][2]=$(this).attr("xmlName").toString();
                i++;
            });
        }
        g_menues[menuIndex++] = menu;
        document.getElementById('menu').innerHTML +="<li><a href='#' id="+menuIndex+" onClick='createMenu("+menuIndex+")'>"+tabName+"</a></li>";

    });
}
/*
 * Create the submeny from XML items
 */
function createMenu(index) {
    var temp = index;
    removeMenuClass();
    document.getElementById(temp.toString()).className = "on";
    var menu = g_menues[index-1];
    if(menu[0].length==2) {
        clearRefreshTimers();
        var obj = eval('$("#mainColumn").'+ menu[0][0] + '({})');
        obj.setXMLName(menu[0][1]);
        // helpPage =  "quick_setup";
        obj.onLoad(true);
        g_objContent = obj;
    } else {
        document.getElementById('mainColumn').innerHTML ="";
        document.getElementById('mainColumn').innerHTML ="<div class='leftBar'><ul class='leftMenu' id='submenu'></ul></div><div id='Content' class='content'></div><br class='clear /><br class='clear />";

        for(var i=0; i<menu.length; i++) {
            var menustr = "\"" + menu[i][0] + "\"" ;
            document.getElementById('submenu').innerHTML += "<li id="+menustr+"><a href=\"#\" onClick='displayForm("+menustr+")'>"+ jQuery.i18n.prop(menu[i][0])+"</a></li>";
        }
        displayForm(menu[0][0]);
    }
}
//var helpPage = "help_en.html";
function removeMenuClass() {
    if(g_menues.length>0)
        for(var j=1; j<=g_menues.length; j++)
            document.getElementById(j.toString()).className = "";
}
/*
* Function for passing the JavaScript
*/
function createMenuFromXML() {
    callXML("xml/ui_" + g_platformName + ".xml",parseXml);
    /*adjust main menu layout according the menu number
    add by llzhou 9/1/2013*/

    $(".navigation ul li").width(($(".header").width()-8*2)/g_menues.length-1);

}
/*
 * Check which item is selected and take appropriate action to execute the
 * panel class, and call his onLoad function as well as set the XML Name
 */
function displayForm(clickedItem) {
//document.getElementById("divDateTime").innerHTML ="";

    clearRefreshTimers();


    if(document.getElementById(g_clickedItem)!=null)
        document.getElementById(g_clickedItem).className = "";
    g_clickedItem = clickedItem;
    g_objContent = null;
    for(var i=0; i<g_menues.length; i++) {
        var _menu = g_menues[i];
        for(var j=0; j<_menu.length; j++) {

            if(_menu[j][2]!='temp') {
                if(_menu[j][0]==clickedItem) {
                    document.getElementById(clickedItem).className = "on";

                    var obj = eval('$("#Content").'+ _menu[j][1] + '("'+ _menu[j][0]+'")');
                    // helpPage =  jQuery.i18n.prop(_menu[j][0].toString()).replace(/\s+/g,'');
                    obj.setXMLName(_menu[j][2]);
                    obj.onLoad(true);
                    g_objContent = obj;
                    break;
                }
            }
        }
    }

    if(g_objContent == null)
        document.getElementById("Content").innerHTML = "";
}

function clearRefreshTimers() {
    clearInterval(_dashboardIntervalID);
    clearInterval(_connectedDeviceIntervalID);
    clearInterval(_trafficstatisticsIntervalID);
    clearInterval(_networkActivityIntervalID);
    clearInterval(_storageSettingsIntervalID);
    clearInterval(_WiFiIntervalID);
}
function dashboardOnClick(menuIndex,subMenuID) {

    //document.getElementById('mainColumn').innerHTML ="<div class='leftBar'><ul class='leftMenu' id='submenu'></ul></div><div id='Content' class='content'></div><br class='clear /><br class='clear />";
    //createMenu(menuIndex);
    var selMenuIdx;
    for (var menuIdx = 0; menuIdx < g_menues.length; ++menuIdx) {
        var menu = g_menues[menuIdx];
        for (var subMenuIdx = 0; subMenuIdx < menu.length; ++subMenuIdx) {
            if (subMenuID == menu[subMenuIdx][0]) {
                selMenuIdx = menuIdx + 1;
                break;
            }
        }
    }
    createMenu(selMenuIdx);
    displayForm(subMenuID);
}
