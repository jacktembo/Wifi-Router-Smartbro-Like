

var webdav_arrayTableDataAccount = new Array(0);
(function($) {
    	$.fn.objWebDavmanagement = function(InIt) {

		
        this.onLoad = function() {
            this.loadHTML();
			
					document.getElementById("webdavSettingtitle").innerHTML = jQuery.i18n.prop("webdavSettingtitle");
					document.getElementById("webdavmangementtitle").innerHTML = jQuery.i18n.prop("webdavmangementtitle");
	
					document.getElementById("webdavSetting").value = jQuery.i18n.prop("webdavSetting");
					document.getElementById("SDcardShareSettingInfoDlgTitle").innerHTML = jQuery.i18n.prop("SDcardShareSettingInfoDlgTitle");
					document.getElementById("setting_method").innerHTML = jQuery.i18n.prop("setting_method");
					document.getElementById("WebDavmode").innerHTML = jQuery.i18n.prop("WebDavmode");
					document.getElementById("Usbmode").innerHTML = jQuery.i18n.prop("Usbmode");

					document.getElementById("webdav_lUsername").innerHTML = jQuery.i18n.prop("webdav_lUsername");
					document.getElementById("webdav_lPassword").innerHTML = jQuery.i18n.prop("webdav_lPassword");
					document.getElementById("webdav_lRePassword").innerHTML = jQuery.i18n.prop("webdav_lRePassword");

					document.getElementById("lt_webdav_setting_btnSave").value = jQuery.i18n.prop("btnSave");
					document.getElementById("setting_stcCancelView").innerHTML = jQuery.i18n.prop("btnModalCancle");

					
		            webdav_arrayTableDataAccount = new Array(0);
            		var indexAccount = 0;
		            var _router_username='';
					var _router_password='';
					var webdav_username_;
            		var webdav_password_;
            		var authority;
					
					
					var webdav_xml = getData('webdav_management');
					$(webdav_xml).find("webdav_user_management").each(function() {
		                _router_username = decodeURIComponent($(this).find("webdav_username").text());
		                _router_password = decodeURIComponent($(this).find("webdav_password").text());

							$(this).find("webdav_account_management").each(function() {

		                        webdav_username_ = decodeURIComponent($(this).find("webdav_account_username").text());
		                        webdav_password_ = decodeURIComponent($(this).find("webdav_account_password").text());
		                        authority = '1';
		                        webdav_arrayTableDataAccount[indexAccount] = new Array(3);
		                        webdav_arrayTableDataAccount[indexAccount][0] = webdav_username_;
		                        webdav_arrayTableDataAccount[indexAccount][1] = webdav_password_;
		                        webdav_arrayTableDataAccount[indexAccount][2] = authority;
		                        indexAccount++;
		                });
						
		            });
					this.loadAccountTable(webdav_arrayTableDataAccount);
					
					

				$("#webdavSetting").click(function() {
        			sm("webdavSettingDlg", 450, 150);
        			var xml = getData('webdav_management');
					
			         $(xml).find("webdav_user_management").each(function() {
						var usb_flag=$(this).find("webdav_enable").text();
						if(usb_flag=="1")
						{
							WebdavUsbMode=1;
							$("#UsbSta").attr("checked", false);
							$("#WebDavSta").attr("checked", true);
						}
						else
						{
							WebdavUsbMode=0;
							$("#UsbSta").attr("checked", true);
							$("#WebDavSta").attr("checked", false);
						}			
					 });
					 
					 $("#lt_webdav_setting_btnSave").click(function() {
						var itemIndex = 0;
						mapData = null;
						mapData = new Array();
						mapData = putMapElement(mapData, "RGW/webdav_user_management/webdav_enable", WebdavUsbMode, itemIndex++);
						if (mapData.length > 0) {
							webdav_postXML('webdav_management', g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
						}


					});
					 

        			     
            	});	

        }
		
		this.loadAccountTable = function (arrayTableData){
            var tableUserAccount = document.getElementById('tableUserAccount');
            var tBodytable = tableUserAccount.getElementsByTagName('tbody')[0];
            clearTabaleRows('tableUserAccount');
            if (arrayTableData.length == 0) {
                var row1 = tBodytable.insertRow(0);
                var rowCol1 = row1.insertCell(0);
                rowCol1.colSpan = 3;
                rowCol1.innerHTML = jQuery.i18n.prop("tableNoData");
            } else {
                for (var i = 0; i < arrayTableData.length; i++) {
                    var arrayTableDataRow = arrayTableData[i];
                    var row = tBodytable.insertRow(-1);

                    var AccountNameCol = row.insertCell(0);
                    var AuthorityCol = row.insertCell(1);
                    var removeCol = row.insertCell(2);

                    var _name = decodeURIComponent(arrayTableDataRow[0]);
                    AccountNameCol.innerHTML = "<a href='#' id ='table_username_link"+i+"' onclick='webdav_AccountClicked(" + i + ")'>" + _name + "</a>";

                    if(arrayTableDataRow[2] == "1") {
                        AuthorityCol.innerHTML = jQuery.i18n.prop("lStandard");
                    } else
                        AuthorityCol.innerHTML = jQuery.i18n.prop("lRestricted");

                    removeCol.innerHTML = "<a href='#' id='table_remove_link"+i+"' onclick='webdav_deleteAccountItem(" + i + ")'>" +jQuery.i18n.prop("webdav_lEdit") + "</a>";

                }
            }
            Table.stripe(tableUserAccount, "alternate", "table-stripeclass");
        }

		this.getTableAccountDataRow = function(index) {
            return webdav_arrayTableDataAccount[index];
        }

		this.postAccountItem = function(index, isDeleted, name, password, authority) {
            var itemIndex = 0;
            mapData = null;
            mapData = new Array();

            var login_username = encodeURIComponent(document.getElementById("tbrouter_username").value);
            var login_password = encodeURIComponent(document.getElementById("tbrouter_password").value);


 			//edit or add
            var item_name = encodeURIComponent(name);
            var item_password = encodeURIComponent(password);

            this.putMapElement("RGW/webdav_user_management/webdav_account_management/webdav_account_username", item_name, itemIndex++);
            this.putMapElement("RGW/webdav_user_management/webdav_account_management/webdav_account_password", item_password, itemIndex++);



            if (mapData.length > 0) {
                postXML('webdav_management', g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            }
        }

		this.putMapElement = function(xpath, value, index) {
            mapData[index] = new Array(2);
            mapData[index][0] = xpath;
            mapData[index][1] = value;
        }
        this.onPostSuccess = function() {
            this.onLoad(true);
        }

        this.loadHTML = function() {
            document.getElementById('Content').innerHTML = "";
            document.getElementById('Content').innerHTML = callProductHTML("WebDav/SD_Card_management.html");
        }
    
		
        this.setXMLName = function(_xmlname) {
            xmlName = _xmlname;
        }




        return this;
    }
})(jQuery);




function webdavsetSdcardShareModeOK()
{
	sm("PleaseWait",150,100);
	$("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));
	setTimeout('logOut()',6000); //指定5秒刷新一次
}

var WebdavUsbMode=0;

function WebDavSetting()
{
	$("#WebDavSta").attr("checked", true);
	$("#UsbSta").attr("checked", false);
	WebdavUsbMode=1;
}

function UsbSetting()
{
	$("#UsbSta").attr("checked", true);
	$("#WebDavSta").attr("checked", false);
	WebdavUsbMode=0;
}


function webdav_localizeMBAccount() {
    document.getElementById("webdav_h1AccountEdit").innerHTML = jQuery.i18n.prop("h1AccountEdit");
    document.getElementById("webdav_lAccountName").innerHTML = jQuery.i18n.prop("webdav_lUsername");
    document.getElementById("webdav_lAccountPassword").innerHTML = jQuery.i18n.prop("webdav_lPassword");
    document.getElementById("lReAccountPassword").innerHTML = jQuery.i18n.prop("lReAccountPassword");
    document.getElementById("lAccountAuthority").innerHTML = jQuery.i18n.prop("lAccountAuthority");
    document.getElementById("btnCancel").innerHTML = jQuery.i18n.prop("btnCancel");
    buttonLocaliztion(document.getElementById("btnOk").id);
}
  

function webdav_AccountClicked(index) {
    sm("MBAccount_Popup", 450, 200);
    webdav_localizeMBAccount();

    var data = g_objContent.getTableAccountDataRow(index);

    document.getElementById("webdav_txtAccountName").value = data[0];
    document.getElementById("webdav_txtAccountPassword").value = data[1];
    document.getElementById("webdav_txtReAccountPassword").value = decodeURIComponent(data[1]);
    document.getElementById("AccountGroupSelect").value = data[2];
    //$("#AccountGroupSelect").attr("disabled",true);
    bEditAccount = true; //edit
}


function webdav_btnOKClickedEditAccount() {
    var AccountName, AccountPassword, AccountRePassword, AccountAuthority;

    AccountName = document.getElementById("webdav_txtAccountName").value;
    AccountPassword = document.getElementById("webdav_txtAccountPassword").value;
    AccountRePassword = document.getElementById("webdav_txtReAccountPassword").value;
    AccountAuthority = document.getElementById("AccountGroupSelect").value;

    if(!bEditAccount) { //add new account
        for (var idx = 0; idx < _arrayTableDataAccount.length; ++idx) {
            if (AccountName == _arrayTableDataAccount[idx][0]) {
                document.getElementById('lTablePassErrorMes').style.display = 'block';
                document.getElementById('lTablePassErrorMes').innerHTML = jQuery.i18n.prop('lAccountExist');
                return;
            }
        }
    }

    if(document.getElementById('webdav_txtAccountPassword').value != document.getElementById('webdav_txtReAccountPassword').value) {
        document.getElementById('lTablePassErrorMes').style.display = 'block';
        document.getElementById('lTablePassErrorMes').innerHTML=jQuery.i18n.prop('lPassErrorMes');
        document.getElementById("webdav_txtReAccountPassword").value = '';
    } else {
        document.getElementById('lTablePassErrorMes').style.display = 'none';
        if(webdav_isValidAccountPage()) {
            document.getElementById('lTablePassErrorMes').style.display = 'none';
            g_objContent.postAccountItem(0,false, AccountName,AccountPassword,AccountAuthority);

        }
    }
}

function webdav_deleteAccountItem(index) {

    webdav_AccountClicked(index);
}

function webdav_tablepasswordChanged() {
    document.getElementById("webdav_txtReAccountPassword").value = '';
    document.getElementById('lReAccountPassword').style.display = 'block';
    document.getElementById('webdav_txtReAccountPassword').style.display = 'block';

}

function webdav_isValidAccountPage() {
    if(!(textBoxMinLength("webdav_txtAccountName",4) && textBoxMinLength("webdav_txtAccountPassword",4))) {
        document.getElementById('lTablePassErrorMes').style.display = 'block';
        document.getElementById('lTablePassErrorMes').innerHTML = jQuery.i18n.prop('lminLengthError');
        return false;
    }
    if(!(textBoxMaxLength("webdav_txtAccountName",20) && textBoxMaxLength("webdav_txtAccountPassword",20))) {
        document.getElementById('lTablePassErrorMes').style.display = 'block';
        document.getElementById('lTablePassErrorMes').innerHTML = jQuery.i18n.prop('lmaxLengthError');
        return false;
    }
    if(!deviceNameValidation(document.getElementById('webdav_txtAccountName').value)) {
        document.getElementById('lTablePassErrorMes').style.display = 'block';
        document.getElementById('lTablePassErrorMes').innerHTML = jQuery.i18n.prop('ErrInvalidUserPass');
        return false;
    }
    if(!deviceNameValidation(document.getElementById('webdav_txtAccountPassword').value)) {
        document.getElementById('lTablePassErrorMes').style.display = 'block';
        document.getElementById('lTablePassErrorMes').innerHTML = jQuery.i18n.prop('ErrInvalidUserPass');
        return false;
    }
    return true;
}