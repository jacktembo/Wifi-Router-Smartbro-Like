
/*
 *Login Variables
 */
var AuthQop,username="",passwd="",GnCount=1,Authrealm,Gnonce,nonce;
var _resetTimeOut=600000;
var authHeaderIntervalID = 0;
/*
 * Check the login responce as the 200 OK or not.
 */
function login_done(urlData) {
    if(urlData.indexOf("200 OK") != -1 ) {
        return true;
    } else {
        return false;
    }
}
function getValue(authstr) {
    var arr=authstr.split("=");
    return arr[1].substring(1,arr[1].indexOf('\"',2) );
}
/*
 * as name suggest it is function which does the authentication
 * and put the AuthHeader in the Cookies. Uses Digest Auth method
 */
function doLogin(username1,passwd1) {
    var url = window.location.protocol + "//" + window.location.host + "/login.cgi";
    var loginParam =  getAuthType(url);
    //alert(loginParam);
    if(loginParam!=null) {
        var loginParamArray = loginParam.split(" ");
        if(loginParamArray[0] =="Digest") {
//nonce="718337c309eacc5dc1d2558936225417", qop="auth"
            Authrealm   = getValue(loginParamArray[1]);
            nonce = getValue(loginParamArray[2]);
            AuthQop = getValue(loginParamArray[3]);

//    alert("nonce :" + nonce);
//    alert("AuthQop :" + AuthQop);
//    alert("Authrealm :" + Authrealm);

            username = username1;
            passwd = passwd1;
            var rand, date, salt, strResponse;

            Gnonce = nonce;
            var tmp, DigestRes;
            var HA1, HA2;





            HA1 = hex_md5(username+ ":" + Authrealm + ":" + passwd);
            HA2 = hex_md5("GET" + ":" + "/cgi/protected.cgi");

            rand = Math.floor(Math.random()*100001)
                   date = new Date().getTime();

            salt = rand+""+date;
            tmp = hex_md5(salt);
            AuthCnonce = tmp.substring(0,16);


            DigestRes = hex_md5(HA1 + ":" + nonce + ":" + "00000001" + ":" + AuthCnonce + ":" + AuthQop + ":" + HA2);

            url = window.location.protocol + "//" + window.location.host + "/login.cgi?Action=Digest&username="+username+"&realm="+Authrealm+"&nonce="+nonce+"&response="+DigestRes+"&qop="+AuthQop+"&cnonce="+AuthCnonce + "&temp=marvell";
            if(login_done(authentication(url))) {
                strResponse = "Digest username=\"" + username + "\", realm=\"" + Authrealm + "\", nonce=\"" + nonce + "\", uri=\"" + "/cgi/protected.cgi" + "\", response=\"" + DigestRes + "\", qop=" + AuthQop + ", nc=00000001" + ", cnonce=\"" + AuthCnonce + "\"" ;

                return 1;
            } else {
                // show error message...
                return 0;
            }

            return strResponse;
        }
    }
    return -1;
}
/*
 * return the cookie parameter is Coockie name
 */
function getCookie(c_name) {
    if (document.cookie.length>0) {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
/*
 * set cookie of browser it has expiry days after which it expires
 */
function setCookie(c_name,value,expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
                    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
/*
 * clear the Authheader from the coockies
 */
function clearAuthheader() {
    //clearing coockies
    Authheader = "";
    AuthQop = "";
    username = "";
    passwd = "";
    GnCount = "";
    Authrealm = "";
    //window.location.reload();
   window.location="index-2.html";
}
/*
* Reset the authHeader
*/
function resetInterval() {
    if(authHeaderIntervalID > 0)
        clearInterval(authHeaderIntervalID);
    authHeaderIntervalID = setInterval( "clearAuthheader()", _resetTimeOut);

}
function getAuthHeader(requestType,file) {
    // return getCookie("Authheader");
    var rand, date, salt, strAuthHeader;
    var  tmp, DigestRes,AuthCnonce_f;
    var HA1, HA2;



    HA1 = hex_md5(username+ ":" + Authrealm + ":" + passwd);
    HA2 = hex_md5( requestType + ":" + "/cgi/xml_action.cgi");

    rand = Math.floor(Math.random()*100001)
           date = new Date().getTime();

    salt = rand+""+date;
    tmp = hex_md5(salt);
    AuthCnonce_f = tmp.substring(0,16);
    //AuthCnonce_f = tmp;

    var strhex = hex(GnCount);
    var temp = "0000000000" + strhex;
    var  Authcount = temp.substring(temp.length-8);
    DigestRes =hex_md5(HA1 + ":" + nonce + ":" + Authcount + ":" + AuthCnonce_f  + ":" + AuthQop + ":"+ HA2);


    GnCount++;
    strAuthHeader = "Digest " + "username=\"" + username + "\", realm=\"" + Authrealm + "\", nonce=\"" + nonce + "\", uri=\"" + "/cgi/xml_action.cgi" + "\", response=\"" + DigestRes + "\", qop=" + AuthQop + ", nc=" + Authcount + ", cnonce=\"" + AuthCnonce_f  + "\"" ;
    DigestHeader = strAuthHeader ;
    return strAuthHeader;
}


function getAuthHeaderEx(requestType,file) {
    // return getCookie("Authheader");
    var rand, date, salt, strAuthHeader;
    var  tmp, DigestRes,AuthCnonce_f;
    var HA1, HA2;



    HA1 = hex_md5(username+ ":" + Authrealm + ":" + passwd);
    HA2 = hex_md5( requestType + ":" + "/cgi/xml_action.cgi");

    rand = Math.floor(Math.random()*100001)
           date = new Date().getTime();

    salt = rand+""+date;
    tmp = hex_md5(salt);
    AuthCnonce_f = tmp.substring(0,16);
    //AuthCnonce_f = tmp;

    var strhex = hex(GnCount);
    var temp = "0000000000" + strhex;
    var  Authcount = temp.substring(temp.length-8);
    DigestRes =hex_md5(HA1 + ":" + nonce + ":" + Authcount + ":" + AuthCnonce_f  + ":" + AuthQop + ":"+ HA2);


    GnCount++;
    strAuthHeader = "username=" + username + "&realm=" + Authrealm + "&nonce=" + nonce + "&uri=/cgi/xml_action.cgi" + "&response=" + DigestRes + "&qop=" + AuthQop + "&nc=" + Authcount + "&cnonce=" + AuthCnonce_f ;
    DigestHeader = strAuthHeader ;
    return strAuthHeader;
}


function logOut() {
    postLogout();
}
function displayBlock(id) {
    document.getElementById(id).style.display="block";
}

function getRouterDate(date) {

//    var dateTimeXML = callProductXML("device_date");
//
//    $(dateTimeXML).find("device_date").each(function(){
//        date = decodeURIComponent($(this).find("date").text());
//    });
    var dateArray =  date.split(" ");
    var dateString = dateArray[1]+" "+dateArray[2]+ "," +dateArray[5]+" " + dateArray[3];
    var d = new Date(dateString);
    return d;
//    document.getElementById("divDateTime").innerHTML='';
//    document.getElementById("divDateTime").innerHTML=d.toLocaleString();

}
function lableLocaliztion(labelArray) {

    for(var i=0; i<labelArray.length; i++) {
        if(jQuery.i18n.prop(labelArray[i].id)!=null) {
            var elementId = "#"+labelArray[i].id;
            $(elementId).text(jQuery.i18n.prop(labelArray[i].id));
        }

    }


}
function pElementLocaliztion(pElementArray) {


    for(var i=0; i<pElementArray.length; i++) {
        //   str = str + labelArray[i].id + " = " + document.getElementById(labelArray[i].id).textContent +"\n";
        if(jQuery.i18n.prop(pElementArray[i].id)!=null)
            document.getElementById(pElementArray[i].id).innerHTML = jQuery.i18n.prop(pElementArray[i].id);
    }
}
function buttonLocaliztion(buttonID) {
    document.getElementById(buttonID).value = jQuery.i18n.prop(buttonID);
}


function getData(XML_Path) {
    return callProductXML(XML_Path);
}
function setData() {
    if(g_objContent!=null)
        g_objContent.onPost(true);
}
function hex(d) {
    // alert("d" + d );
    var hD="0123456789ABCDEF";
    var h = hD.substr(d&15,1);
    while(d>15) {
        d>>=4;
        h=hD.substr(d&15,1)+h;
    }
    return h;
//alert("h" + h);
//    return parseInt(str.toString(), 16);
}

function clearTabaleRows(tableId) {

    var i=document.getElementById(tableId).rows.length;
    while(i!=1) {
        document.getElementById(tableId).deleteRow(i-1);
        i--;
    }

}


function clearTabaleRowsFilter(tableId) {

    var i=document.getElementById(tableId).rows.length;
    while(i!=2) {
        document.getElementById(tableId).deleteRow(i-1);
        i--;
    }

}

/* Converts timezone offset expressed in minutes to string */
function GetMachineTimezoneGmtOffsetStr(tzGmtOffset ) {
    var gmtOffsetStr =""+ getAbsValue(tzGmtOffset/60);
    var tempInt = tzGmtOffset;

    if(tempInt < 0) {
        tempInt = 0 - tempInt;
    }

    if(( tempInt % 60 ) != 0 ) {
        gmtOffsetStr += ":" + ( tempInt % 60 );
    }

    //new XDialog("Error","gmt offset" + gmtOffsetStr ).alert();

    return gmtOffsetStr;
}
/* Find out timezone offset settings from connected device. If dst is observed we should see
    *  difference in Jan and July timezone offset.Pick the max one */
function GetMachineTimezoneGmtOffset() {
    var rightNow = new Date();

    var JanuaryFirst= new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0,0);
    var JulyFirst= new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0,0);

    var JanOffset,JulyOffset;
    var tzGmtOffset;

    JanOffset = JanuaryFirst.getTimezoneOffset();
    JulyOffset = JulyFirst.getTimezoneOffset();

    if(JulyOffset > JanOffset) {
        tzGmtOffset= JulyOffset;
    } else {
        tzGmtOffset = JanOffset;
    }

    return tzGmtOffset;
}

/* Get the connected device's day light saving settings in string format e.g. M3.5.0 or J81  */
function GetMachineTimezoneDstStartStr(StandardGMToffset) {
    var rightNow = new Date();

    var JanuaryFirst = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0,0);
    var JulyFirst= new Date(rightNow.getFullYear(), 6, 1, 0, 0, 0,0);
    var HoursInSixMonths =((JulyFirst.getTime() - JanuaryFirst.getTime()) / (1000 * 60 * 60));
    var dstStartStr = "";
    var  i ;
    var JanOffset, JulyOffset;
    var hourStart, hourEnd;

    /* If there are dst settings to be considered we should get them by checking in 6 months time interval */
    JanOffset = JanuaryFirst.getTimezoneOffset();
    JulyOffset = JulyFirst.getTimezoneOffset();

    if(JanOffset > JulyOffset) {
        hourStart = 0;
        hourEnd = HoursInSixMonths;
    } else {
        hourStart = HoursInSixMonths;
        hourEnd = HoursInSixMonths * 2;
    }


    var tempDate = getDstStartTime(hourStart,hourEnd, rightNow.getYear(),StandardGMToffset);

    if(tempDate != null) {
        /* Dst setting string : M3.5.0  (Month of the year).(Week Of Month).(Day of Week)
             * So We need to iterate over six months period for few years  and find which week of month it is */

        var changeWeek = getChangeWeek(hourStart,hourEnd, tempDate.getYear(),StandardGMToffset);

        switch(changeWeek) {
            case -1:
                break;
            case -2: // Some regions have fixed day for start of dst setting which is expressed with J
                dstStartStr ="J" + (((tempDate.getTime()-JanuaryFirst.getTime())/(24 * 60 * 60* 1000) ) + 1);
                break;
            default:
                dstStartStr = "M" + (tempDate.getMonth() + 1) + "." + changeWeek + "." + tempDate.getDay();
                break;
        }
    }

    return dstStartStr;
}

function getDstStartTime(hourStart,hourEnd, year,StandardGMToffset) {
    /* Check at which hour timezone offset is different from standard timezone
         * offset for that region. Thats the start of dst */

    var i;
    for(i = hourStart; i < hourEnd; i++) {
        var dSampleDate = new Date(year,0, 1, 0, 0, 0,0);
        dSampleDate.setHours(i);

        var CurrentGMToffset  = dSampleDate.getTimezoneOffset();

        if(CurrentGMToffset < StandardGMToffset) {
            return dSampleDate;
        }
    }
    return null;

}
function setConnectedDeviceTimezoneStr(gmtOffset,dstStart,timezoneStringArray) {
    var i,j;
    var startIndex = -1;
    var count = 0;
    var index = -1;

    var tempGmtString;
    var tempDstString;

    for(j = 0; j < timezoneStringArray[1].length ; j++) {
        var  charArr = toCharArray(timezoneStringArray[1][j]);
        count = 0;
        tempGmtString = "";
        tempDstString = "";
        startIndex = -1;

        for(i = 0; i < timezoneStringArray[1][j].split(",",3)[0].length; i++) {
            if(((charArr[i] >= '0') && (charArr[i] <= '9')) ||(charArr[i] == '-') || (charArr[i] == ':')) {
                count++;
                if(startIndex == -1) {
                    startIndex = i;
                }
                tempGmtString = tempGmtString + charArr[i];
            }

        }

        if(tempGmtString == gmtOffset) {

            if(timezoneStringArray[1][j].split(",",3).length > 1) {
                tempDstString = timezoneStringArray[1][j].split(",",3)[1];
            } else {
                tempDstString = "";
            }

            if((dstStart.length == 0) && (tempDstString.length != 0)) {
                //new XDialog("Error","gmt offset matched but dst settings did not match!" + dstStart + "__" + tempDstString).alert();
                continue;
            }

            if(tempDstString.substring(0,dstStart.length) == dstStart) {
                //new XDialog("Error","Found perfect timezone match with gmt and dst" + timezoneStringArray[1][j]).alert();
                index = j;
                break;
            } else {
                //new XDialog("Error","gmt offset matched but dst settings did not match!" + dstStart + "__" + tempDstString).alert();
                continue;
            }

        } else {
            //new XDialog("Error","gmt offset did not match!" + tempGmtString  + "__" + gmtOffset).alert();
            continue;
        }

    }

    if(index == -1) {
        //new XDialog("Error","Failed to get timezone settings from connected device").alert();
        //new XDialog("Error","Failed_ " + gmtOffset +"_" + dstStart).alert();
        //GetPCTimeZoneString.setText("");
        return -1;
    } else {
        //GetPCTimeZoneString.setText(timezoneStringComboBox.getItemText(index));
        //timezoneString.setText(timezoneStringArray[1][index]);
        return index;
    }
}
function toCharArray(str) {
    var charArray = new Array(0);
    for(var i=0; i<str.length; i++)
        charArray[i]=str.charAt(i);
    return charArray;
}

/* We know the day of month but not the week. We can find day of the month for few years
     * and guess which week of the month it would be */
function getChangeWeek( hourStart, hourEnd, year, StandardGMToffset) {
    var i;
    var min = 32 , max = 0, dom = 0;

    for(i = year; i < year + 20 ; i++) {
        dom =(getDstStartTime(hourStart,hourEnd,i,StandardGMToffset)).getDate();
        if(dom > max) {
            max = dom;
        }
        if(dom < min) {
            min = dom;
        }
    }

    if(max == min) {
        return -1;
    }

    /* Some regions have fixed day for start of dst settings. e.g 1 April
         * We handle it as special case */
    if(max - min != 6) {
        return -2;
    }

    //new XDialog("Error","max " + max + "min " + min + " dom " + dom).alert();
    return getAbsValue((((max + 6)/7)));

}

function getAbsValue(i) {

    return i.toString().split(".")[0];
}
function stopInterval() {
    clearInterval(authHeaderIntervalID);
}

function startInterval() {

    authHeaderIntervalID = setInterval( "clearAuthheader()", _resetTimeOut);

}


function  getHeader (AuthMethod , file) {
    var rand, date, salt, setResponse;
    var  tmp, DigestRes,AuthCnonce_f;
    var HA1, HA2;

    HA1 = hex_md5(username + ":" + Authrealm + ":" + passwd);
    HA2 = hex_md5(AuthMethod + ":" + "/cgi/xml_action.cgi");

    /*Generate random sequence for Cnonce*/
    //                        Integer random = new Integer(Random.nextInt(2097152));
    //                        Integer date = new Integer((int)(System.currentTimeMillis() + 24));
    rand = Math.floor();
    date = new Date().getTime();


    salt = rand+""+date;
    tmp = hex_md5(salt);
    AuthCnonce = tmp.substring(0,16);
    AuthCnonce_f = tmp;

    var strhex = hex(GnCount);
    var temp = "0000000000" + strhex;
    var  Authcount = temp.substring(temp.length-8);

    DigestRes =hex_md5(HA1 + ":" + Gnonce + ":" + Authcount + ":" + AuthCnonce_f  + ":" + AuthQop + ":"+ HA2);


    ++GnCount;

    if("GET" == AuthMethod) {
        if("upgrade" == file) {
            //setResponse = "/login.cgi?Action=Upload&file=" + file + "&username=" +  username + "&realm=" + Authrealm + "&nonce=" + Gnonce + "&response=" +  DigestRes + "&cnonce=" + AuthCnonce_f + "&nc=" + Authcount + "&qop=" + AuthQop + "&temp=marvell";
            setResponse= "xml_action97c7.cgi?Action=Upload&amp;file=upgrade&amp;command="
        } else if("config_backup" == file) {
            setResponse= "xml_action06d1.cgi?Action=Upload&amp;file=backfile&amp;config_backup="
        } else {
            setResponse = "login3685.cgi?Action=Download&amp;file=" + file + "&username=" +  username + "&realm=" + Authrealm + "&nonce=" + Gnonce + "&response=" +  DigestRes + "&cnonce=" + AuthCnonce_f + "&nc=" + Authcount + "&qop=" + AuthQop + "&temp=marvell";
        }
    }

    if("POST"==AuthMethod) {
        setResponse = "loginba0f.html?Action=Upload&amp;file=" + file + "&username=" +  username + "&realm=" + Authrealm + "&nonce=" + Gnonce + "&response=" +  DigestRes + "&cnonce=" + AuthCnonce_f + "&nc=" + Authcount + "&qop=" + AuthQop + "&temp=marvell";
    }

    return setResponse;
}
function localizeQuickSetupMB() {
    document.getElementById("QsText").innerHTML  = jQuery.i18n.prop("QsText");
    document.getElementById("QsText3").innerHTML = jQuery.i18n.prop("QsText3");
    document.getElementById("QsText4").innerHTML = jQuery.i18n.prop("QsText4");
    document.getElementById("QsText1").innerHTML = jQuery.i18n.prop("QsText1");
    document.getElementById("QsText2").innerHTML = jQuery.i18n.prop("QsText2");
    buttonLocaliztion(document.getElementById("btnQuickSetup").id);
    //document.getElementById("btnQuickSetup").innerHTML = jQuery.i18n.prop("btnQuickSetup");
    document.getElementById("btnSkip").value = jQuery.i18n.prop("btnSkip");

}
function getHelp(helpPage) {
    var _temp = versionString.split(" ");
    helpPage =  "?name="+_temp[0]+"&version="+_temp[1]+"#"+helpPage;

    var htmlFilename = "";
    var helppageName = "Help";
    var helpWindow;
    if(jQuery.i18n.prop("helpPageName")!=null)
        helppageName = jQuery.i18n.prop("helpPageName");


    if(getCookie('locale')=='')
        htmlFilename = "help_en.html";
    else
        htmlFilename = "help_" + getCookie('locale')+".html";
    var host = window.location.protocol + "//" + window.location.host + "/";
    var url = host+htmlFilename+helpPage;


    if(devEnv==1)
        helpWindow = window.open(htmlFilename+helpPage, helppageName);
    else
        helpWindow = window.open(url, helppageName);

    helpWindow.focus();
//  if (window.focus)
//   { }
//  return false;
}
function getMainHelp() {
    var htmlFilename = "";
    var helppageName = "Help";
    if (jQuery.i18n.prop("helpPageName") != null)
        helppageName = jQuery.i18n.prop("helpPageName");

    var _temp = versionString.split(" ");
    if (getCookie('locale') == '')
        htmlFilename = "help_en49de.html?name=" + _temp[0] + "&version=" + _temp[1];
    else
        htmlFilename = "help_" + getCookie('locale') + ".html?name=" + _temp[0] + "&version=" + _temp[1];
    var host = window.location.protocol + "//" + window.location.host + "/";
    var url = host + htmlFilename;


    if (devEnv == 1)
        helpWindow = window.open(htmlFilename, helppageName);
    else
        helpWindow = window.open(url, helppageName);


    helpWindow.focus();

}
function showAlert(message) {
    sm("alertMB",350,150);
    document.getElementById("lAlertMessage").innerHTML = message;
    document.getElementById("lAlert").innerHTML = jQuery.i18n.prop("lAlert");
    //document.getElementById("btnModalOk").innerHTML = jQuery.i18n.prop("btnModalOk");
    buttonLocaliztion("btnModalOk");
}


function UniEncode(string) {
    if (undefined == string) {
        return "";
    }
    var code = "";
    for (var i = 0; i < string.length; ++i) {
        var charCode = string.charCodeAt(i).toString(16);
        var paddingLen = 4 - charCode.length;
        for (var j = 0; j < paddingLen; ++j) {
            charCode = "0" + charCode;
        }

        code += charCode;
    }
    return code;
}

function GetSmsTime() {
    var date = new Date();
    var fullYear = new String(date.getFullYear());
    var year = fullYear.substr(2, fullYear.length - 1);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var mimute = date.getMinutes();
    var second = date.getSeconds();
    var timeZone = 0 - date.getTimezoneOffset() / 60;
    var timeZoneStr = "";
    if (timeZone > 0) {
        timeZoneStr = "%2B" + timeZone;
    } else {
        timeZoneStr = "-" + timeZone;
    }
    var smsTime = year + "," + month + "," + day + "," + hour + "," + mimute + "," + second + "," + timeZoneStr;
    return smsTime;
}


function UniDecode(encodeString) {
    if (undefined == encodeString) {
        return "";
    }
    var deCodeStr = "";

    var strLen = encodeString.length / 4;
    for (var idx = 0; idx < strLen; ++idx) {
        deCodeStr += String.fromCharCode(parseInt(encodeString.substr(idx * 4, 4), 16));
    }
    return deCodeStr;
}

function showMsgBox(title, message) {
    sm("alertMB", 350, 150);
    document.getElementById("lAlertMessage").innerHTML = message;
    document.getElementById("lAlert").innerHTML = title;
    buttonLocaliztion("btnModalOk");
}

function GetBrowserType() {
    var usrAgent = navigator.userAgent;
    if (navigator.userAgent.indexOf("MSIE") > 0) {
        var b_version = navigator.appVersion
                        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (trim_Version == "MSIE6.0") {
            return "IE6";
        } else if(trim_Version == "MSIE7.0") {
            return "IE7";
        } else if (trim_Version == "MSIE8.0") {
            return "IE8";
        } else if (trim_Version == "MSIE9.0") {
            return "IE9";
        }
    }
    if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
        return "Safari"; //google
    }
    if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
        return "Camino";
    }
    if (isMozilla = navigator.userAgent.indexOf("Gecko/index.html") > 0) {
        return "Gecko";
    }
}

function IsGSM7Code(str) {
    var len = 0;
    for( var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        if(((chr>=0x20&&chr<=0x7f)||0x20AC==chr||0x20AC==chr||0x0c==chr||0x0a==chr||0x0d==chr||0xa1==chr||0xa3==chr||0xa5==chr||0xa7==chr
           ||0xbf==chr||0xc4==chr||0xc5==chr||0xc6==chr||0xc7==chr||0xc9==chr||0xd1==chr||0xd6==chr||0xd8==chr||0xdc==chr||0xdf==chr
           ||0xe0==chr||0xe4==chr||0xe5==chr||0xe6==chr||0xe8==chr||0xe9==chr||0xec==chr||0xf11==chr||0xf2==chr||0xf6==chr||0xf8==chr||0xf9==chr||0xfc==chr
           ||0x3c6==chr||0x3a9==chr||0x3a8==chr||0x3a3==chr||0x3a0==chr||0x39e==chr||0x39b==chr||0x398==chr||0x394==chr||0x393==chr)
           && 0x60 != chr) {
            ++len;
        }
    }
    return len == str.length;
}

function EditHrefs(s_html){
    var s_str = new String(s_html);
    s_str = s_str.replace(/\bhttp\:\/\/www(\.[\w+\.\:\/\_]+)/gi, 
        "http\:\/\/&not;ก่&cedil;$1");
    s_str = s_str.replace(/\b(http\:\/\/\w+\.[\w+\.\:\/\_]+)/gi,
        "<a^target=\"_blank\"^href=\"$1\">$1<\/a>");  
    s_str = s_str.replace(/\b(www\.[\w+\.\:\/\_]+)/gi, 
        "<a^target=\"_blank\"^href=\"http://$1/\">$1</a>");
    s_str = s_str.replace(/\bhttp\:\/\/&not;ก่&cedil;(\.[\w+\.\:\/\_]+)/gi,
        "<a^target=\"_blank\"^href=\"http\:\/\/www$1\">http\:\/\/www$1</a>");
    s_str = s_str.replace(/\b(\w+@[\w+\.?]*)/gi, 
        "<a^href=\"mailto\:$1\">$1</a>");

	s_str=s_str.replace(/[ ]/g,"&nbsp;");
	s_str=s_str.replace(/\^/ig,' ');
    return s_str;
}

function RemoveHrefs(str)
{
    str = str.replace(/<a.*?>/ig,"");
    str = str.replace(/<\/a>/ig,"");
    return str;
}



function DateValidate(year,month,day){

           
					if(year=="")
				        return jQuery.i18n.prop('lEmptyYear');
				    if(month=="")
				        return jQuery.i18n.prop('lEmptyMonth');
				    if(day=="")
				        return jQuery.i18n.prop('lEmptyDay');
				    

				    if(!isNumber(year))
				        return jQuery.i18n.prop('lYearNumErr');
				    if(!StringMaxLength(year,4))
				        return jQuery.i18n.prop('lYearLenErr');
				    if(!isNumber(month))
				        return jQuery.i18n.prop('lMonthNumErr');
				    if(!StringMaxLength(month,2))
				    		return jQuery.i18n.prop('lMonthLenErr');
				    if(month>12 || month<0)
				    		return jQuery.i18n.prop('lMonthLenErr');
				    if(!isNumber(day))
				        return jQuery.i18n.prop('lDayNumErr');
				    if(!StringMaxLength(day,2))
				    		return jQuery.i18n.prop('lMonthLenErr');
				   if(month == 2)
				   {
						if(is_leapyear(year))
						{
						   if(day>29)
							return jQuery.i18n.prop('lDayRangeLeap');
						}
						else
						{
						    if(day>28)
							return jQuery.i18n.prop('lDayRangeNonLeap');
						}

				   }
				   else if(month <=7 )
				  {
						if(month%2==1)
						{
							if(day>31)
								return jQuery.i18n.prop('lDayRangeErr');
						}
						else
						{
							if(day>30)
								return jQuery.i18n.prop('lDayRangeErr1');
						}
				  }
				   else if(month > 7)
				   {
						if(month%2==0)
						{
							if(day>31)
								return jQuery.i18n.prop('lDayRangeErr');
						}
						else
						{
							if(day>30)
							     return jQuery.i18n.prop('lDayRangeErr1');
						}
				   }

				    if(day>31 || day<1)
				    		return jQuery.i18n.prop('lDayRangeErr');
				   
				    return "OK";
}


function putMapElement(controlMap,path,value,index) {
    controlMap[index] = new Array(2);
    controlMap[index][0] = path;
    controlMap[index][1] = value;
    return controlMap;
}