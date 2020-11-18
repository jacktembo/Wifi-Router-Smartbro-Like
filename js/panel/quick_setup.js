
var timezoneStringArrayQS =  new Array(2);
var indexString;
var g_router_username="";
var g_router_password="";
var g_multi_account="";
var selectedInternetConn = "disabled";
var g_QuickSetup;
var flagIpBoxAdded = false;
var g_InternetConnectionObj = null;
var g_PrimaryNetworkObj = null;
var username1,passwd1;
(function($) {
    // changed
    $.fn.quick_setup = function(oInit) {
        this.loadHtml = function() {
            document.getElementById("navigation").innerHTML = "<ul id ='menu' ><li ><a id='menuQuickSetup' class='on'>Quick Setup </a> </li> </ul>";

            document.getElementById("menuQuickSetup").innerHTML = jQuery.i18n.prop('quickSetupName');
            document.getElementById("mainColumn").innerHTML="";
            document.getElementById("mainColumn").innerHTML=callProductHTML("html/quick_setup.html");
            if ("dongle" == g_platformName) {
                document.getElementById("h1WirelessSeetings").style.display = "none";
            }
            document.getElementById("h1UserSettings").innerHTML = jQuery.i18n.prop('h1UserSettings');
            document.getElementById("h1InternetConnection").innerHTML = jQuery.i18n.prop('h1InternetConnection');
            document.getElementById("h1WirelessSeetings").innerHTML = jQuery.i18n.prop('h1WirelessSeetings');
            document.getElementById("h1DevicePlaceGuid").innerHTML = jQuery.i18n.prop('h1DevicePlaceGuid');
            $('#uploadISPFileForm').ajaxForm( {
            success: function() {
                    hm();
                },
            error: function() {
                    hm();
                },
            beforeSend: function() {
                    if (document.getElementById("fileName").value.toString().lastIndexOf(".xml") == -1) {
                        showAlert(jQuery.i18n.prop("XMLExtError"));
                        return false;
                    } else { }
                    return true;
                }

            });
            var h1Elements = document.getElementsByTagName("h1");
            lableLocaliztion(h1Elements);
            var arrayLabels = document.getElementsByTagName("label");
            lableLocaliztion(arrayLabels);
            showDiv("MBQuickSetupMainPage", 400, 220);
            addClassQSon("h1UserSettings");
            MBQuickSetupMainPageLoadData();
        }
        this.onPostSuccess = function() {
            username = username1;
            passwd = passwd1; 
            hideDiv();
        }
        return this.each(function() {
        });
    }
})(jQuery);

function quickSetup() {
    //helpPage = "QuickSetup";
    // document.getElementById("quickSetup").innerHTML=jQuery.i18n.prop('quickSetupText');
    //document.getElementById("quickSetupSpan").innerHTML = document.getElementById("quickSetup").innerHTML + '|  <a href="#.">Help</a>  |  Log Out';
    document.getElementById("lableWelcome").innerHTML = jQuery.i18n.prop("lableWelcome");
    document.getElementById("quickSetupSpan").innerHTML = "<a href='#.' id='quickSetupspanlink' onclick=getHelp('QuickSetup')>Help</a>";
    document.getElementById("quickSetupspanlink").innerHTML = jQuery.i18n.prop("helpName");
    g_QuickSetup = $("#mainColumn").quick_setup();
    clearRefreshTimers();
    g_QuickSetup.loadHtml();
    if ("dongle" == g_platformName) {
        document.getElementById("btnNext1").onclick = btnQSNextClicked1;
        document.getElementById("btnBack4").onclick = btnBackClicked2;
    }
    document.getElementById("btnExit").innerHTML = jQuery.i18n.prop("btnExit");
    buttonLocaliztion(document.getElementById("btnNext").id);
}

function btnQSNextClicked() {
    username1 =  encodeURIComponent(document.getElementById("tbrouter_username").value);
    passwd1 =   encodeURIComponent(document.getElementById("tbrouter_password").value);
    //Post MBQuickSetupMainPage data [Admin, locale]

    if(validatePasswordQS()) {
        if(isValidAdminPage()) {

            SetUserNameAndPasswd();

            document.getElementById("MBQuickSetupMainPage").style.display = "none";
            document.getElementById("btnExit1").innerHTML = jQuery.i18n.prop("btnExit1");
            buttonLocaliztion(document.getElementById("btnBack1").id);
            buttonLocaliztion(document.getElementById("btnNext1").id);
            $("#h1UserSettings").removeClass("on");
            SetInternetConnection();

        }
    }
}


function SetUserNameAndPasswd() {
    var mapData = new Array();
    var index = 0;
    if(g_multi_account == "1") {
        if (passwd1 != g_router_password) {
            mapData = putMapElement(mapData,"RGW/management/account_management/account_action", 1, index++);//edit or add
            mapData = putMapElement(mapData,"RGW/management/account_management/account_username", username1, index++);
            mapData = putMapElement(mapData,"RGW/management/account_management/account_password", passwd1, index++);
            mapData = putMapElement(mapData,"RGW/management/router_user_list/Item#index", index, index++);
            mapData = putMapElement(mapData,"RGW/management/router_user_list/Item/username", username1, index++);
            mapData = putMapElement(mapData,"RGW/management/router_user_list/Item/password", passwd1, index++);
            mapData = putMapElement(mapData,"RGW/management/router_user_list/Item/authority", 1, index++);
        }
    } else {
        if (username1 != g_router_username)
            mapData = putMapElement(mapData, "RGW/management/router_username", username1, index++);
        if (passwd1 != g_router_password)
            mapData = putMapElement(mapData, "RGW/management/router_password", passwd1, index++);
    }

    if(mapData.length > 0) {
        PostSyncXMLEx("admin", g_objXML.getXMLDocToString(g_objXML.createXML(mapData)),function(){username = username1; passwd = passwd1; });
    }

}
function btnExitClicked(id) {

    hideDiv();

}

function btnFinishClicked() {
    hideDiv();
}
function btnQSNextClicked1() {   

     if (document.getElementById("micdropdown").value == 'cellular' && !g_InternetConnectionObj.MtuValid()) {
     	$("#lMtuInvalidTip").show();
        return;
     }
				
    if ("dongle" == g_platformName) {
        document.getElementById("MBQuickSetupPage1").style.display = "none";
        showDiv("MBQuickSetupPage3", 400, 220);
        buttonLocaliztion(document.getElementById("btnBack4").id);
        buttonLocaliztion(document.getElementById("btnFinish").id);
        MBQuickSetupPage3Localization();
        addClassQSon("h1DevicePlaceGuid");
    } else {
        document.getElementById("MBQuickSetupPage1").style.display = "none";
        $("#h1InternetConnection").removeClass("on");
        SetPrimaryNetwork();
    }

	g_InternetConnectionObj.onPost(false);

}
function SetPrimaryNetwork() {

    document.getElementById("MBQuickSetupPage2").style.display = "block";
    document.getElementById("divPrimaryNetworkSet").innerHTML = callProductHTML("html/wireless/primary_network.html");

    g_objContent = $("#MBQuickSetupPage2").objWire_Sec();

    g_objContent.setXMLName("uapxb_wlan_security_settings");
    g_objContent.onLoad(false);
    g_PrimaryNetworkObj = g_objContent;


    addClassQSon("h1WirelessSeetings");
    $("#primaryNetworkHelp").hide();
    $("#divSavePrimaryNetworkData").hide();
    $("#lPassErrorMesPN").hide();

    document.getElementById("btnExit3").innerHTML = jQuery.i18n.prop("btnExit3");
    buttonLocaliztion(document.getElementById("btnBack3").id);
    buttonLocaliztion(document.getElementById("btnNext3").id);
}

function btnQSNextClicked2() {   
	g_PrimaryNetworkObj.onPost(true);
    if (g_objContent.isValid(false)) {
        if ("dongle" == g_platformName) {
            document.getElementById("MBQuickSetupPage1").style.display = "none";
        } else {
            document.getElementById("MBQuickSetupPage2").style.display = "none";
        }
        showDiv("MBQuickSetupPage3",400,220);

        buttonLocaliztion(document.getElementById("btnBack4").id);
        buttonLocaliztion(document.getElementById("btnFinish").id);

        MBQuickSetupPage3Localization();
        addClassQSon("h1DevicePlaceGuid");
    }

	 

}
function MBQuickSetupPage3Localization() {
    getID("Microwave").innerHTML = jQuery.i18n.prop('Microwave');
    getID("Bluetooth_Devices").innerHTML = jQuery.i18n.prop('Bluetooth_Devices');
    getID("Cordless_Phone").innerHTML = jQuery.i18n.prop('Cordless_Phone');
    getID("ownDevices").innerHTML = jQuery.i18n.prop('ownDevices');
    getID("Baby_Monitor").innerHTML = jQuery.i18n.prop('Baby_Monitor');

}
function btnBackClicked1() {
    document.getElementById("MBQuickSetupPage1").style.display = "none";
    showDiv("MBQuickSetupMainPage",400,220);
    document.getElementById("btnExit").innerHTML = jQuery.i18n.prop("btnExit");
    buttonLocaliztion(document.getElementById("btnNext").id);
    g_objContent = g_InternetConnectionObj;
    addClassQSon("h1UserSettings");
    MBQuickSetupMainPageLoadData();
}
function btnBackClicked2() {
    if ("dongle" == g_platformName) {
        document.getElementById("MBQuickSetupPage3").style.display = "none";
    } else {
        document.getElementById("MBQuickSetupPage2").style.display = "none";
    }
    SetInternetConnection();
}

function SetInternetConnection() {
    document.getElementById("MBQuickSetupPage1").style.display = "block";
    document.getElementById("divInternetConnectSet").innerHTML = callProductHTML("html/internet/internet_connection.html");
    $("#inter_help").hide();
    $("#divFormBox").hide();
    $("#divSaveButton").hide();
	$("#title").hide();
	
    $("#h1WirelessSeetings").removeClass("on");
    document.getElementById("btnExit1").innerHTML = jQuery.i18n.prop("btnExit1");
    buttonLocaliztion(document.getElementById("btnBack1").id);
    buttonLocaliztion(document.getElementById("btnNext1").id);
    g_objContent = null;
    g_objContent =  $("#MBQuickSetupPage1").objInternetConn();
    g_objContent.setXMLName("wan");
    g_objContent.onLoad(false);
    g_InternetConnectionObj = g_objContent;
    addClassQSon("h1InternetConnection");

}
function btnBackClicked3() {
    document.getElementById("MBQuickSetupPage3").style.display = "none";
    $("#h1DevicePlaceGuid").removeClass("on");

    if("mifi" == g_platformName) {
        SetPrimaryNetwork();
    } else {
        SetInternetConnection();
    }
}

function showDiv(divid,width,height) {
    removeClassQS();
    document.getElementById(divid).style.display = "block";
    g_InternetConnectionObj = null;
    g_PrimaryNetworkObj = null;

}
function hideDiv() {
    document.getElementById("lableWelcome").innerHTML = jQuery.i18n.prop("lableWelcome");
    document.getElementById("quickSetupSpan").innerHTML = '<a href="#."  onclick="quickSetup()" id="quickSetup" >Quick Setup</a>  |  <a href="#." id="HelpName" onclick="getMainHelp()">Help</a>  |  <a href="#."  id="LogOutName"  onclick="logOut()">Log Out</a>';
    document.getElementById("quickSetup").innerHTML = jQuery.i18n.prop("quickSetupName");
    document.getElementById("HelpName").innerHTML = jQuery.i18n.prop("helpName");
    document.getElementById("LogOutName").innerHTML = jQuery.i18n.prop("LogOutName");

    document.getElementById("navigation").innerHTML=" <ul id ='menu'></ul>";
	g_InternetConnectionObj = null;
    g_PrimaryNetworkObj = null;
    createMenuFromXML();
    createMenu(1);

}
function MBQuickSetupMainPageLoadData() {
    var xmlAdmin = getData("admin");
    var xmlLocale = getData("locale");
    // var xmlTimeZone = getTimeZoneData("tzdatabase.xml");
    var index=0;
    var router_username_;
    var router_password_;
    var authority;
    var _arrayTableDataAccount = new Array(0);
    var indexAccount = 0;
    var login_account_index;

    timezoneStringArrayQS[0] = new Array();
    timezoneStringArrayQS[1] = new Array();
    $(xmlAdmin).find("management").each(function() {
        g_multi_account = $(this).find("multi_account").text();
    });
    if(g_multi_account == "1") {
        $(xmlAdmin).find("router_user_list").each(function() {
            $(this).find("Item").each(function() {
                router_username_ = decodeURIComponent($(this).find("username").text());
                router_password_ = decodeURIComponent($(this).find("password").text());
                authority = $(this).find("authority").text();
                if(router_username_ == username) {
                    login_account_index = indexAccount;
                }
                _arrayTableDataAccount[indexAccount] = new Array(3);
                _arrayTableDataAccount[indexAccount][0] = router_username_;
                _arrayTableDataAccount[indexAccount][1] = router_password_;
                _arrayTableDataAccount[indexAccount][2] = authority;
                indexAccount++;

            });
        });
        g_router_username =  _arrayTableDataAccount[login_account_index][0];
        g_router_password =  _arrayTableDataAccount[login_account_index][1];
        document.getElementById("tbrouter_username").value = g_router_username;
        document.getElementById("tbrouter_password").value = g_router_password;
        document.getElementById("tbreenter_password").value =g_router_password;
        document.getElementById("tbrouter_username").readOnly = true;
    } else {
        $(xmlAdmin).find("management").each(function() {
            g_router_username = decodeURIComponent($(this).find("router_username").text());
            g_router_password = decodeURIComponent($(this).find("router_password").text());
            document.getElementById("tbrouter_username").value = g_router_username;
            document.getElementById("tbrouter_password").value = g_router_password;
            document.getElementById("tbreenter_password").value =g_router_password;
            document.getElementById("tbrouter_username").readOnly = false;
        });
    }
}
function rbTimeZoneCickedQS() {
    if(document.getElementById("getConnDevTimeZone").checked==true)
        setMachineTimezoneQS();
}

function setMachineTimezoneQS() {
    var i = GetMachineTimezoneGmtOffset();
    var gmtOffset = GetMachineTimezoneGmtOffsetStr(i);
    var dstStr = GetMachineTimezoneDstStartStr(i);
    indexString =  setConnectedDeviceTimezoneStr(gmtOffset,dstStr,timezoneStringArrayQS);
    if(indexString!=-1)
        document.getElementById("lConnectedDeviceTimeZone").innerHTML=timezoneStringArrayQS[0][indexString];
    else
        document.getElementById("lConnectedDeviceTimeZone").innerHTML=jQuery.i18n.prop("ErrTimeZoneNotFound");
}
function validatePasswordQS() {
    if(document.getElementById('tbrouter_password').value!=document.getElementById('tbreenter_password').value) {
        document.getElementById('lPassErrorMes').style.display = 'block';
        document.getElementById('lPassErrorMes').innerHTML=jQuery.i18n.prop('lPassErrorMes');
        document.getElementById("tbreenter_password").value = '';
        return false;
    } else {
        document.getElementById('lPassErrorMes').style.display = 'none';
        return true;
    }
}

function removeClassQS() {
    document.getElementById("h1UserSettings").className="";
    document.getElementById("h1InternetConnection").className="";
    document.getElementById("h1WirelessSeetings").className="";
    document.getElementById("h1DevicePlaceGuid").className="";

}
function addClassQSon(id) {
    document.getElementById(id).className="on";
}
