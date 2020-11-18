
(function($) {
    $.fn.objPhoneBook = function(bLoadHtml) {

        var xmlName = "";
        var PHONE_NUM_PER_PAGE = 10;
        var menuId;
        var pbGroup = "";
        var currentActivePageIdx = 1;

        $("#Content").html(callProductHTML("html/phoneBook/phoneBook.html"));
        function SetLocation() {
            lableLocaliztion(document.getElementsByTagName("label"));
            lableLocaliztion(document.getElementsByTagName("th"));
            $("#lt_Phonebook_btnDelete").val(jQuery.i18n.prop("lt_Phonebook_btnDelete"));
            $("#lt_Phonebook_btnNew").val(jQuery.i18n.prop("lt_Phonebook_btnNew"));
            var title = jQuery.i18n.prop("lt_Phonebook_stcFormTitle") + " (" + jQuery.i18n.prop(menuId) + ")";
            $("#lt_Phonebook_stcFormTitle").text(title);
        }

        function UpdatePhoneBookList(pageNumber, bInitFlag) {
            $("#PhoneBookList").empty();
            $("#deleteAllPhone").attr("checked", false);
            RefreshDeleteBtn(true);
            switch (menuId) {
                case "mAllPhone":
                    pbGroup = "all";
                    break;
                case "mCommonPhone":
                    pbGroup = "common";
                    break;
                case "mFamilyPhone":
                    pbGroup = "family";
                    break;
                case "mFriendPhone":
                    pbGroup = "friend";
                    break;
                case "mColleaguePhone":
                    pbGroup = "colleague";
                    break;
                default:
            }

            var mapData = new Array();
            var itemIndex = 0;
            if ("mAllPhone" == menuId) {
                putMapElement(mapData, "RGW/phonebook/pb_action", "pb_get_all", itemIndex++);
            } else {
                putMapElement(mapData, "RGW/phonebook/pb_action", "pb_get_by_gr", itemIndex++);
                putMapElement(mapData, "RGW/phonebook/pb_gr", pbGroup, itemIndex++);
            }
            putMapElement(mapData, "RGW/phonebook/location", "2", itemIndex++);
            putMapElement(mapData, "RGW/phonebook/page_num", pageNumber, itemIndex++);
            putMapElement(mapData, "RGW/phonebook/data_per_page", PHONE_NUM_PER_PAGE, itemIndex++);

            PostSyncXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));

            var xml = GetSyncXML(xmlName);


            //show capacity utilization of SIM card and device.  
            var pbSimMaxRecordNum = $(xml).find("pb_sim_max_record_num").text();
            var pbSimUsedRecordNum = $(xml).find("pb_sim_used_record_num").text();
            var pbDevMaxRecordNum = $(xml).find("pb_dev_max_record_num").text();
            var pbDevUsedRecordNum = $(xml).find("pb_dev_used_record_num").text();

            var title = jQuery.i18n.prop("lt_Phonebook_stcFormTitle") + " (" + jQuery.i18n.prop(menuId) + ")";
            if("" != pbSimUsedRecordNum && "" != pbSimMaxRecordNum) {
                title = title + "    " + jQuery.i18n.prop("lt_Phonebook_stcSimCard") + ":" + pbSimUsedRecordNum + "/" + pbSimMaxRecordNum;
            }

            if("" != pbDevUsedRecordNum && "" != pbDevMaxRecordNum) {
                title = title + "    " + jQuery.i18n.prop("lt_Phonebook_stcDevice") + ":" + pbDevUsedRecordNum + "/" + pbDevMaxRecordNum;
            }
            $("#lt_Phonebook_stcFormTitle").text(title);
            

            if (bInitFlag) {
                var phoneCount = parseInt($(xml).find("gr_num").text());

                var phoneBookPageNum = Math.floor(phoneCount / PHONE_NUM_PER_PAGE);
                if (phoneCount % PHONE_NUM_PER_PAGE) {
                    phoneBookPageNum = phoneBookPageNum + 1;
                }
                InitPhoneBookPageNum(phoneBookPageNum);
                var SelPage = pageNumber - 1;
                var $Selector = "#divPhoneBookPageNum a:eq(" + SelPage + ")";
                //                $("#divSmsPageNum a:first").css("color", "blue");
                //                $("#divSmsPageNum a:first").addClass("pageSelIdx");
                $($Selector).css("color", "blue");
                $($Selector).siblings().css("color", "red");
                $($Selector).addClass("pageSelIdx");
                $($Selector).siblings().removeClass("pageSelIdx");
//                $("#divSmsPageNum a:first").css("color", "blue");
//                $("#divSmsPageNum a:first").addClass("pageSelIdx");

            }
//            else {
//                var phoneCount = parseInt($(xml).find("gr_num").text());

//                var phoneBookPageNum = Math.floor(phoneCount / PHONE_NUM_PER_PAGE);
//                if (phoneCount % PHONE_NUM_PER_PAGE) {
//                    phoneBookPageNum = phoneBookPageNum + 1;
//                }
//                if (phoneBookPageNum != pageNumber) {
//                    InitPhoneBookPageNum(phoneBookPageNum);
//                }
//                $("#divSmsPageNum a:first").css("color", "blue");
//                $("#divSmsPageNum a:first").addClass("pageSelIdx");
//                if (pageNumber > phoneBookPageNum) {
//                    UpdatePhoneBookList(phoneBookPageNum); //Delete
//                    return;
//                }

//            }

            $(xml).find("get_pb_entries").each(function() {
                $(this).find("Item").each(function() {
                    var pbmId = $(this).find("pbm_id").text();
                    var pbmLocation = $(this).find("pbm_location").text();
                    var pbmName = UniDecode($(this).find("pbm_name").text());
                    var pbmNumber = $(this).find("pbm_number").text();
                    var pbmHomeNum = $(this).find("pbm_anr").text();
                    var pbmOfficeNum = $(this).find("pbm_anr1").text();
                    var pbmEmail = $(this).find("pbm_email").text();
                    var pbmNickName = $(this).find("pbm_sne").text();
                    var pbmGroup = $(this).find("pbm_group").text();

                    if ("NONE" == pbmHomeNum) {
                        pbmHomeNum = "";
                    }
                    if ("NONE" == pbmOfficeNum) {
                        pbmOfficeNum = "";
                    }

                    if ("NONE" == pbmEmail)
                        pbmEmail = "";
                    else
                        pbmEmail = UniDecode($(this).find("pbm_email").text());

                    if ("NONE" == pbmNickName)
                        pbmNickName = "";
                    else
                        pbmNickName = UniDecode($(this).find("pbm_sne").text());

                    AddPhoneToList(pbmId, pbmLocation, pbmName, pbmNumber, pbmHomeNum, pbmOfficeNum, pbmEmail, pbmNickName, pbmGroup);

                });
            });
        }

        function RefreshDeleteBtn(bDisabledBtn) {
            if(bDisabledBtn) {
                $("#lt_Phonebook_btnDelete").attr("disabled", true);
                $("#lt_Phonebook_btnDelete").parent(".btnWrp:first").addClass("disabledBtn");

            } else {
                $("#lt_Phonebook_btnDelete").attr("disabled", false);
                $("#lt_Phonebook_btnDelete").parent(".btnWrp:first").removeClass("disabledBtn");

            }
        }
        function AddPhoneToList(pbmId, pbmLocation, pbmName, pbmMobileNumber, pbmHomeNum, pbmOfficeNum, pbmEmail, pbmNickName, pbmGroup) {
            var logInfo = pbmId + "$" + pbmLocation + "$" + pbmName + "$" + pbmMobileNumber
                          + "$" + pbmHomeNum + "$" + pbmOfficeNum + "$" + pbmEmail + "$" + pbmNickName + "$" + pbmGroup;

            if (1 == pbmLocation) {
                locImage = "images/device.png";
            } else {
                locImage = "images/sim.png";
            }

            var strGroup;
            if("friend" == pbmGroup)
                strGroup = jQuery.i18n.prop("mFriendPhone");
            else if("family" == pbmGroup)
                strGroup = jQuery.i18n.prop("mFamilyPhone");
            else if("common" == pbmGroup)
                strGroup = jQuery.i18n.prop("mCommonPhone");
            else if("colleague" == pbmGroup)
                strGroup = jQuery.i18n.prop("mColleaguePhone");

            var htmlTxtNode = "<tr name=\"" + logInfo + "\"><td class=\"pointer\" style=\"text-align:center;cursor: pointer;\"><span>" + pbmName + "</span><img align=\"right\" class=\"sendMessage\" src=\"images/icon-file.png\" /></td>"
                              + "<td style=\"text-align:center\">" + pbmMobileNumber + " </td>"
                              + "<td style=\"text-align:center\">" + strGroup + " </td>"
                              + "<td style=\"text-align:center\"><img class=\"saveLocImg\" style=\"cursor: pointer;\" align=\"center\" src=\"" + locImage + "\"/></td>"
                              + " <td style=\"text-align:center;\"><input class=\"delCheckBox\" type=\"checkbox\" id=\"" + pbmId + "\"></td></tr>";

            $("#PhoneBookList").append(htmlTxtNode);
            $("#PhoneBookList .sendMessage:last").attr("title", jQuery.i18n.prop("lt_Phonebook_stcNewMessage"));
            $("#PhoneBookList .saveLocImg:last").attr("title", jQuery.i18n.prop("lt_Phonebook_stcCopyMoveTitle"));


            $(".delCheckBox:last").click(function() {
                if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
                    $("#deleteAllPhone").attr("checked", true);
                } else {
                    $("#deleteAllPhone").attr("checked", false);
                }
                if ($(".delCheckBox:checked").length >= 1) {
                    RefreshDeleteBtn(false);
                } else {
                    RefreshDeleteBtn(true);
                }
            });

            $("#deleteAllPhone").click(function() {
                if ($("#deleteAllPhone").attr("checked")) {
                    $(".delCheckBox").each(function() {
                        $(this).attr("checked", true);
                    });
                    RefreshDeleteBtn(false);
                } else {
                    $(".delCheckBox").each(function() {
                        $(this).attr("checked", false);
                    });
                    RefreshDeleteBtn(true);
                }
            });

            $(".sendMessage:last").click(function() {
                var mobilePhone = $(this).parents("tr:first").attr("name").split("$")[3];
                SendMessage(mobilePhone);
            });

            $(".pointer:last").click(function(event) {
                if ($(event.target).is("img")) {
                    return;
                }
                ShowPhoneInfoDlg($(this).parent().attr("name"));
            });

            $(".saveLocImg:last").click(function() {
                var phoneInfo = $(this).parent().parent().attr("name").split("$");
                CopyMovePhone(phoneInfo[1], phoneInfo[0]);
            });

        }

        function CopyMovePhone(actionFlag/*0:from sim to device;1:from device to sim*/, id) {
            sm("DivCopyMoveContact", 450, 170);
            $("#moveContact").attr("checked", true);
            if ("0" == actionFlag) {
                $("#lt_Phonebook_stcMove").text(jQuery.i18n.prop("lt_Phonebook_moveToDevice"));
                $("#lt_Phonebook_stcCopy").text(jQuery.i18n.prop("lt_Phonebook_copyToDevice"));
                $("#lt_Phonebook_stcCopy").text(jQuery.i18n.prop("lt_Phonebook_copyToDevice"));
            } else {
                $("#lt_Phonebook_stcMove").text(jQuery.i18n.prop("lt_Phonebook_moveToSim"));
                $("#lt_Phonebook_stcCopy").text(jQuery.i18n.prop("lt_Phonebook_copyToSim"));
                if(!g_bSimCardExist) {
                    showAlert(jQuery.i18n.prop("lsmsSimCardAbsent"));
                    return;
                }
            }
            $("#lt_Phonebook_btnCopyMove").val(jQuery.i18n.prop("lt_Phonebook_btnOK"));
            $("#lt_Phonebook_stcCancel").text(jQuery.i18n.prop("lt_Phonebook_stcCancelView"));
            $("#lt_Phonebook_btnCopyMove").click(function() {
                hm();
                var pbAction;
                if ($("#moveContact").attr("checked")) {
                    if ("0" == actionFlag) {
                        pbAction = "PB_MV_SIM_TO_LOCAL";
                    } else {
                        pbAction = "PB_MV_LOCAL_TO_SIM";
                    }
                } else {
                    if ("0" == actionFlag) {
                        pbAction = "PB_CP_SIM_TO_LOCAL";
                    } else {
                        pbAction = "PB_CP_LOCAL_TO_SIM";
                    }
                }

                var itemIndex = 0;
                var mapData = new Array();
                var mvCpId = id + ",";
                putMapElement(mapData, "RGW/phonebook/pb_action", pbAction, itemIndex++);
                putMapElement(mapData, "RGW/phonebook/mv_cp_id", mvCpId, itemIndex++);


                function QueryMoveReslut(nullArg) {
                    var xml = GetSyncXML(xmlName);

                    if (0 == $(xml).find("pb_result").text()) {
                        var phoneCount = parseInt($(xml).find("gr_num").text());
                        UpdatePhoneBookList(currentActivePageIdx,true);
                    } else {
                        showMsgBox(jQuery.i18n.prop("lWarning"),jQuery.i18n.prop("lCopyFailed"));
                    }
                }
                
                PostXMLWithResponse(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)),QueryMoveReslut);

            });
        }

        function ShowPhoneInfoDlg(phoneInfo) {
            var arrPhoneInfo = phoneInfo.split("$");
            var pbmNumber = arrPhoneInfo[3];
            var pbmHomeNum = arrPhoneInfo[4];
            var pbmOfficeNum = arrPhoneInfo[5];
            var pbmEmail = arrPhoneInfo[6];
            if ("NONE" == pbmHomeNum) {
                pbmHomeNum = "";
            }
            if ("NONE" == pbmOfficeNum) {
                pbmOfficeNum = "";
            }

            if ("NONE" == pbmEmail)
                pbmEmail = "";

            if ("NONE" == pbmNumber)
                pbmNumber = "";

            sm("phoneInfoDlg", 450, 150);
            arrayLabels = document.getElementsByTagName("option");
            lableLocaliztion(arrayLabels);
            $("#txtName").val(arrPhoneInfo[2]);
            $("#txtMobilePhone").val(pbmNumber);
            $("#selSaveLoc").val(arrPhoneInfo[1]);
            $("#selSaveLoc").attr("disabled", true); //不允许修改存储位置

            var strGroup =  arrPhoneInfo[8];

            $("#selGroup").val(strGroup);
            $("#txtEmail").val(pbmEmail);
            $("#txtHomePhone").val(pbmHomeNum);
            $("#txtOfficePhone").val(pbmOfficeNum);

            var phoneIdx = arrPhoneInfo[0];


            $("#lt_Phonebook_stcInputCheckout").hide();
            $("#txtName,#txtMobilePhone,#txtEmail,#txtHomePhone,#txtOfficePhone").focus(function() {
                $("#lt_Phonebook_stcInputCheckout").hide();
            });

            $("#selSaveLoc").click(function() {
                if (0 == $("#selSaveLoc").val()) {
                    $("#divDeviceSupport").hide();
                } else {
                    $("#divDeviceSupport").show();
                }
            });

            $("#selSaveLoc").trigger("click");
            var arrayLabels = document.getElementsByTagName("h1");
            lableLocaliztion(arrayLabels);
            arrayLabels = document.getElementsByTagName("label");
            lableLocaliztion(arrayLabels);
            $("#lt_Phonebook_btnSave").val(jQuery.i18n.prop("lt_Phonebook_btnSave"));
            $("#lt_Phonebook_stcCancelView").text(jQuery.i18n.prop("lt_Phonebook_stcCancelView"));


            //save contact
            $("#lt_Phonebook_btnSave").click(function() {
                var name = UniEncode($("#txtName").val());
                var mobilePhone = $("#txtMobilePhone").val();
                var saveLoc = $("#selSaveLoc").val();
                var group = $("#selGroup").val();
                var email = UniEncode($("#txtEmail").val());
                var homePhone = $("#txtHomePhone").val();
                var officePhone = $("#txtOfficePhone").val();
                //var nickName = UniEncode($("#txtNickName").val());

                if ($("#txtName").val().length == 0) {
                    $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lNameEmpty"));
                    return;
                }

                if ("" == mobilePhone) {
                    $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lMobilePhoneEmpty"));
                    return;
                }
                if (!IsPhoneNumber(mobilePhone)) {
                    $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lMobilePhoneError"));
                    return;
                }

                if ("1" == saveLoc) {
                    if ("" != $("#txtEmail").val() && !IsEmail($("#txtEmail").val())) {
                        $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lEmailAddrError"));
                        return;
                    }

                    if ("" != homePhone && !IsPhoneNumber(homePhone)) {
                        $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lHomePhoneError"));
                        return;
                    }

                    if ("" != officePhone && !IsPhoneNumber(officePhone)) {
                        $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lOfficePhoneError"));
                        return;
                    }
                }


                var itemIndex = 0;
                var mapData = new Array();
                putMapElement(mapData, "RGW/phonebook/pb_action", "pbm_contact_edit", itemIndex++);
                putMapElement(mapData, "RGW/phonebook/pb_edit_id", phoneIdx, itemIndex++);
                putMapElement(mapData, "RGW/phonebook/location", saveLoc, itemIndex++);
                putMapElement(mapData, "RGW/phonebook/pb_add/name", name, itemIndex++);
                putMapElement(mapData, "RGW/phonebook/pb_add/mobile", mobilePhone, itemIndex++);
                if ("1" == saveLoc) { //save in device
                    putMapElement(mapData, "RGW/phonebook/pb_add/homenum", homePhone, itemIndex++);
                    putMapElement(mapData, "RGW/phonebook/pb_add/officephone", officePhone, itemIndex++);
                    putMapElement(mapData, "RGW/phonebook/pb_add/email", email, itemIndex++);
                    putMapElement(mapData, "RGW/phonebook/pb_add/group", group, itemIndex++);
                    // putMapElement(mapData, "RGW/phonebook/pb_add/pbm_sne", nickName, itemIndex++);
                }

                function QuerySaveResult(nullArg)
                {
                     var xml = GetSyncXML(xmlName);

                     if (0 == $(xml).find("pb_result").text()) {
                        UpdatePhoneBookList("1", true);
                    } else {
                        showAlert(jQuery.i18n.prop("laddContactError"));
                    }
                }

                PostXMLWithResponse(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)),QuerySaveResult);
               
            });
        }


        $("#lt_Phonebook_btnDelete").click(function() {
            var delId = "";
            $(".delCheckBox:checked").each(function() {
                delId = delId + $(this).attr("id") + ",";
            });

            var itemIndex = 0;
            var mapData = new Array();
            putMapElement(mapData, "RGW/phonebook/pb_action", "pbm_contact_delete", itemIndex++);
            putMapElement(mapData, "RGW/phonebook/location", "2", itemIndex++);
            putMapElement(mapData, "RGW/phonebook/pb_gr", menuId, itemIndex++);
            putMapElement(mapData, "RGW/phonebook/pb_delete/delete_option", "delete_num", itemIndex++);
            putMapElement(mapData, "RGW/phonebook/pb_delete/delete_pb_id", delId, itemIndex++);

            function QueryDelResult(nullArg)
            {
                 var xml = GetSyncXML(xmlName);

                 if (0 == $(xml).find("pb_result").text()) {
                    if (currentActivePageIdx != 1 && $("#deleteAllPhone").attr("checked")) {
                        currentActivePageIdx--;
                    }
                    $("#deleteAllPhone").attr("checked", false);
                    UpdatePhoneBookList(currentActivePageIdx,true);
                    } else {
                    alert("delete contact failed.");
                }
            }

            PostXMLWithResponse(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)),QueryDelResult);
           
        });


        function SendMessage(mobilePhone) {
            sm("divSendMessageInPhoneBook", 450, 250);
            $("#txtContact").val(mobilePhone);
            $("#lt_Phonebook_btnSendMsg").val(jQuery.i18n.prop("lt_Phonebook_btnSendMsg"));
            lableLocaliztion(document.getElementsByTagName("label"));

            $("#txtSmsContentInPhoneBook").keyup(function() {
                checkLength();
            });

            $("#lt_Phonebook_btnSendMsg").click(function() {
                var itemIndex = 0;
                var mapData = new Array();
                var contacts = $("#txtContact").val();
                var smsContent = $("#txtSmsContentInPhoneBook").val();

                var encodeType = "UNICODE";
                if(IsGSM7Code(smsContent)) {
                    encodeType = "GSM7_default";
                }


                putMapElement(mapData, "RGW/message/flag/message_flag", "SEND_SMS", itemIndex++);
                putMapElement(mapData, "RGW/message/flag/sms_cmd", "4", itemIndex++);
                putMapElement(mapData, "RGW/message/send_save_message/contacts", contacts, itemIndex++);
                putMapElement(mapData, "RGW/message/send_save_message/content", UniEncode(smsContent), itemIndex++);
                putMapElement(mapData, "RGW/message/send_save_message/encode_type", encodeType, itemIndex++);
                putMapElement(mapData, "RGW/message/send_save_message/sms_time", GetSmsTime(), itemIndex++);


                PostXMLWithResponse("message", g_objXML.getXMLDocToString(g_objXML.createXML(mapData)),null);
            });
        }



        function checkLength() {
            $("#lt_phonebook_stcSmsErrorInfo").hide();
            var messageBody = $("#txtSmsContentInPhoneBook").val();
            var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;

            var msgLen = messageBody.length;
            var charCount, itemCount;
            if (!IsGSM7Code(messageBody)) {
                if (msgLen > 335) {
                    $("#lt_phonebook_stcSmsErrorInfo").text(jQuery.i18n.prop("lt_sms_stcSmsLenghtError"));
                    document.getElementById("lt_phonebook_stcSmsErrorInfo").style.display = "inline";
                    $("#txtSmsContentInPhoneBook").val(messageBody.substr(0, 335));
                    msgLen = 335;
                }
                charCount = "(" + msgLen + "/335)";
                if (msgLen <= 70) {
                    itemCount = 1;
                } else {
                    itemCount = Math.floor(msgLen / 67 + (msgLen % 67 > 0 ? 1 : 0)); //长短信每条短信只有67个字符
                }

            } else { //english
                if (msgLen > 765) {
                    document.getElementById("lt_phonebook_stcSmsErrorInfo").style.display = "inline";
                    $("#lt_phonebook_stcSmsErrorInfo").text(jQuery.i18n.prop("lt_sms_stcSmsLenghtError"));
                    $("#txtSmsContentInPhoneBook").val(messageBody.substr(0, 765));
                    msgLen = 765;
                }
                var specString = "^{}\\[]~|";
                for (var idx = 0; idx < messageBody.length; ++idx) {
                    if (-1 != specString.indexOf(messageBody[idx])) {
                        ++msgLen;
                    }
                }
                if (msgLen <= 160) {
                    itemCount = 1;
                } else {

                    if (-1 != specString.indexOf(messageBody[152])) {
                        ++msgLen;
                    }
                    itemCount = Math.floor(msgLen / 153 + (msgLen % 153 > 0 ? 1 : 0));//长短信每条短信只有153 个字符
                }

                charCount = "(" + msgLen + "/765)";
            }

            $("#inputcountInPhoneBook").text(charCount);
            $("#inputItemCountInPhoneBook").text("(" + itemCount + "/5)");
        }


        function InitPhoneBookPageNum(totalPageNum) {
            var htmlTxt = "";
            for (var idx = 1; idx <= totalPageNum; ++idx) {
                var html = "<a style=\"color: red; font-weight: 700; text-decoration: underline;margin-left:3px;cursor:pointer;\" href=\"##\">" + idx + "</a>";
                //$("#divPhoneBookPageNum").append(htmlTxt);
                htmlTxt += html;

            }
            document.getElementById("divPhoneBookPageNum").innerHTML = htmlTxt;

            $("#divPhoneBookPageNum").click(function(event) {
                if ($(event.target).is("a")) {
                    $(event.target).css("color", "blue");
                    $(event.target).addClass("pageSelIdx");
                    $(event.target).siblings().css("color", "red");
                    $(event.target).siblings().removeClass("pageSelIdx");
                    var smsPageIdx = $(event.target).text();
                    currentActivePageIdx = smsPageIdx;
                    $("#deleteAllPhone").attr("checked",false);
                    RefreshDeleteBtn(true);
                    UpdatePhoneBookList(smsPageIdx,false);
                }
            });
        }



        $("#lt_Phonebook_btnNew").click(function() {
            sm("phoneInfoDlg", 450, 150);
            $("#selSaveLoc").attr("disabled", false);
            $("#lt_Phonebook_stcInputCheckout").hide();
            $("#txtName,#txtMobilePhone,#txtEmail,#txtHomePhone,#txtOfficePhone").focus(function() {
                $("#lt_Phonebook_stcInputCheckout").hide();
            });

            $("#selSaveLoc").click(function() {
                if (0 == $("#selSaveLoc").val()) {
                    $("#divDeviceSupport").hide();
                } else {
                    $("#divDeviceSupport").show();
                }
            });
            var pbGroup;
            switch (menuId) {
                case "mAllPhone":
                    pbGroup = "all";
                    break;
                case "mCommonPhone":
                    pbGroup = "common";
                    break;
                case "mFamilyPhone":
                    pbGroup = "family";
                    break;
                case "mFriendPhone":
                    pbGroup = "friend";
                    break;
                case "mColleaguePhone":
                    pbGroup = "colleague";
                    break;
            }
            if ("mCommonPhone" == menuId || "mAllPhone" == menuId) {
                $("#selSaveLoc").trigger("click");
            } else {
                $("#selSaveLoc").val(1);
                $("#selSaveLoc").attr("disabled", true);
                if (0 == $("#selSaveLoc").val()) {
                    $("#divDeviceSupport").hide();
                } else {
                    $("#divDeviceSupport").show();
                }

            }
            $("#selGroup").val(pbGroup);

            var arrayLabels = document.getElementsByTagName("h1");
            lableLocaliztion(arrayLabels);
            arrayLabels = document.getElementsByTagName("label");
            lableLocaliztion(arrayLabels);
            arrayLabels = document.getElementsByTagName("option");
            lableLocaliztion(arrayLabels);
            $("#lt_Phonebook_stcCancelView").text(jQuery.i18n.prop("lt_Phonebook_stcCancelView"));
            $("#lt_Phonebook_btnSave").val(jQuery.i18n.prop("lt_Phonebook_btnSave"));
            $("#lt_Phonebook_stcFormTitle").text(jQuery.i18n.prop("lt_Phonebook_stcFormTitle") + " (" + jQuery.i18n.prop(menuId) + ")");

            //save contact
            $("#lt_Phonebook_btnSave").click(function() {
                var name = UniEncode($("#txtName").val());
                var mobilePhone = $("#txtMobilePhone").val();
                var saveLoc = $("#selSaveLoc").val();
                var group = $("#selGroup").val();
                var email = UniEncode($("#txtEmail").val());
                var homePhone = $("#txtHomePhone").val();
                var officePhone = $("#txtOfficePhone").val();
                // var nickName = UniEncode($("#txtNickName").val());

                if ($("#txtName").val().length == 0) {
                    $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lNameEmpty"));
                    return;
                }

                if ("" == mobilePhone) {
                    $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lMobilePhoneEmpty"));
                    return;
                }


                if (!IsPhoneNumber(mobilePhone)) {
                    $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lMobilePhoneError"));
                    return;
                }

                if ("1" == saveLoc) {
                    if ("" != $("#txtEmail").val() && !IsEmail($("#txtEmail").val())) {
                        $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lEmailAddrError"));
                        return;
                    }

                    if ("" != homePhone && !IsPhoneNumber(homePhone)) {
                        $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lHomePhoneError"));
                        return;
                    }

                    if ("" != officePhone && !IsPhoneNumber(officePhone)) {
                        $("#lt_Phonebook_stcInputCheckout").show().text(jQuery.i18n.prop("lOfficePhoneError"));
                        return;
                    }
                }

                var itemIndex = 0;
                var mapData = new Array();
                putMapElement(mapData, "RGW/phonebook/pb_action", "pbm_contact_add", itemIndex++);
                putMapElement(mapData, "RGW/phonebook/location", saveLoc, itemIndex++);
                putMapElement(mapData, "RGW/phonebook/pb_add/name", name, itemIndex++);
                putMapElement(mapData, "RGW/phonebook/pb_add/mobile", mobilePhone, itemIndex++);
                if ("1" == saveLoc) { //save in device
                    putMapElement(mapData, "RGW/phonebook/pb_add/homenum", homePhone, itemIndex++);
                    putMapElement(mapData, "RGW/phonebook/pb_add/officephone", officePhone, itemIndex++);
                    putMapElement(mapData, "RGW/phonebook/pb_add/email", email, itemIndex++);
                    putMapElement(mapData, "RGW/phonebook/pb_add/group", group, itemIndex++);
                    //putMapElement(mapData, "RGW/phonebook/pb_add/pbm_sne", nickName, itemIndex++);
                }

                function QuerySaveResult(nullArg)
                {
                    var xml = GetSyncXML(xmlName);

                    if (0 == $(xml).find("pb_result").text()) {
                        UpdatePhoneBookList("1", true);
                    } else {
                        showAlert(jQuery.i18n.prop("laddContactError"));
                    }
                }
                
                PostXMLWithResponse(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)),QuerySaveResult);
                
            });
        });



        this.onLoad = function() {
            menuId = $("#submenu").children(".on:first").attr("id");
            SetLocation();
            UpdatePhoneBookList("1", true);
        }


        this.onPost = function() {
        }

        this.onPostSuccess = function() {
        }


        this.setXMLName = function(_xmlname) {
            xmlName = _xmlname;
        }

        return this;
    }
})(jQuery);



