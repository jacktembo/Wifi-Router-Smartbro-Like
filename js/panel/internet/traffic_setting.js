(function($) {

    $.fn.objTrafficSetting = function(InIt) {
        var xmlName = '';
        document.getElementById('Content').innerHTML = callProductHTML("html/internet/traffic_setting.html");

        $("[id^='lt_trafficSet_stc']").each(function() {
            $(this).text(jQuery.i18n.prop($(this).attr("id")));
        });
        $("[id^='lt_trafficSet_btn']").each(function() {
            $(this).val(jQuery.i18n.prop($(this).attr("id")));
        });
		
		

        var strControlMode = "";
		var g_monthAvailbleTraffic;
		var g_periodAvailbleTraffic;
		var g_unlimitPeriodAvailbleTraffic;

        this.onLoad = function() {
            var xml = getData(xmlName);

            $(xml).find("WanStatistics").each(function() {
                strControlMode = $(this).find("stat_mang_method").text();
                $("#trafficSetingSel").val(strControlMode);

                $("#DisconnectActionSel").val($(this).find("dis_value_at_upper").text());


                if (0 == strControlMode) {
                    $("#DivMonthTrafficInfo").hide();
                    $("#DivPeriodTrafficInfo").hide();
                    $("#DivUnlimitPeriodTrafficInfo").hide();
                    $("#divDisconnectNetwork").hide();
                } else if (1 == strControlMode) {
                    $("#DivMonthTrafficInfo").show();
                    $("#DivPeriodTrafficInfo").hide();
                    $("#DivUnlimitPeriodTrafficInfo").hide();
                    $("#divDisconnectNetwork").show();

                    //月总流量
                    var dataTraffic = parseInt($(this).find("upper_value_month").text());
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtMonthTotalTaffic").val(dataInGB.toFixed(2));
                        $("#MonthTotaldDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtMonthTotalTaffic").val(dataInMB.toFixed(2));
                        $("#MonthTotaldDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtMonthTotalTaffic").val(dataInKB.toFixed(2));
                        $("#MonthTotaldDataUnitSel").val("1");
                    }



                    //月可用流量
                    dataTraffic = parseInt($(this).find("total_available_month").text());
					g_monthAvailbleTraffic = dataTraffic;
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtMonthAvailableTraffic").val(dataInGB.toFixed(2));
                        $("#MonthAvalibleDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtMonthAvailableTraffic").val(dataInMB.toFixed(2));
                        $("#MonthAvalibleDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtMonthAvailableTraffic").val(dataInKB.toFixed(2));
                        $("#MonthAvalibleDataUnitSel").val("1");
                    }

                    //月已经使用流量
                    dataTraffic = parseInt($(this).find("total_used_month").text());
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtMonthUsedTaffic").val(dataInGB.toFixed(2));
                        $("#MonthUsedDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtMonthUsedTaffic").val(dataInMB.toFixed(2));
                        $("#MonthUsedDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtMonthUsedTaffic").val(dataInKB.toFixed(2));
                        $("#MonthUsedDataUnitSel").val("1");
                    }
                } else if (2 == strControlMode) {
                    $("#DivMonthTrafficInfo").hide();
                    $("#DivPeriodTrafficInfo").show();
                    $("#DivUnlimitPeriodTrafficInfo").hide();
                    $("#divDisconnectNetwork").show();

                    //周期总流量
                    var dataTraffic = parseInt($(this).find("upper_value_period ").text());
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtPeriodTotalTaffic").val(dataInGB.toFixed(2));
                        $("#PeroidTotaldDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtPeriodTotalTaffic").val(dataInMB.toFixed(2));
                        $("#PeroidTotaldDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtPeriodTotalTaffic").val(dataInKB.toFixed(2));
                        $("#PeroidTotaldDataUnitSel").val("1");
                    }


                    //周期可用流量
                    dataTraffic = parseInt($(this).find("total_available_period").text());
					g_periodAvailbleTraffic = dataTraffic;
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtPeriodAvalibleTraffic").val(dataInGB.toFixed(2));
                        $("#PeroidAvalibleDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtPeriodAvalibleTraffic").val(dataInMB.toFixed(2));
                        $("#PeroidAvalibleDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtPeriodAvalibleTraffic").val(dataInKB.toFixed(2));
                        $("#PeroidAvalibleDataUnitSel").val("1");
                    }

                    //周期已经使用流量
                    dataTraffic = parseInt($(this).find("total_used_period").text());
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtPeriodUsedTaffic").val(dataInGB.toFixed(2));
                        $("#PeroidUsedDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtPeriodUsedTaffic").val(dataInMB.toFixed(2));
                        $("#PeroidUsedDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtPeriodUsedTaffic").val(dataInKB.toFixed(2));
                        $("#PeroidUsedDataUnitSel").val("1");
                    }


                    var periodStartData = $(this).find("period_start_date").text().split(",");
                    var periodEndData = $(this).find("period_end_date").text().split(",");
                    $("#txtPeriodStartYear").val("20" + periodStartData[0]);
                    $("#txtPeriodStartMonth").val(parseInt(periodStartData[1]));
                    $("#txtPeriodStartDay").val(parseInt(periodStartData[2]));
                    $("#txtPeriodEndYear").val("20" + periodEndData[0]);
                    $("#txtPeriodEndMonth").val(parseInt(periodEndData[1]));
                    $("#txtPeriodEndDay").val(parseInt(periodEndData[2]));
                } else {
                    $("#DivMonthTrafficInfo").hide();
                    $("#DivPeriodTrafficInfo").hide();
                    $("#DivUnlimitPeriodTrafficInfo").show();
                    $("#divDisconnectNetwork").show();

                    //无限制周期总流量
                    var dataTraffic = parseInt($(this).find("upper_value_unlimit").text());
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtUnlimitPeriodTotalTaffic").val(dataInGB.toFixed(2));
                        $("#UnlimitPeriodTotaldDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtUnlimitPeriodTotalTaffic").val(dataInMB.toFixed(2));
                        $("#UnlimitPeriodTotaldDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtUnlimitPeriodTotalTaffic").val(dataInKB.toFixed(2));
                        $("#UnlimitPeriodTotaldDataUnitSel").val("1");
                    }


                    //无限制周期可用流量
                    dataTraffic = parseInt($(this).find("total_avaliable_unlimit").text());
					g_unlimitPeriodAvailbleTraffic = dataTraffic;
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtUnlimitPeriodAvailableTraffic").val(dataInGB.toFixed(2));
                        $("#UnlimitPeriodAvalibleDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtUnlimitPeriodAvailableTraffic").val(dataInMB.toFixed(2));
                        $("#UnlimitPeriodAvalibleDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtUnlimitPeriodAvailableTraffic").val(dataInKB.toFixed(2));
                        $("#UnlimitPeriodAvalibleDataUnitSel").val("1");
                    }

                    //无限制周期已经使用流量
                    dataTraffic = parseInt($(this).find("total_used_unlimit").text());
                    if (dataTraffic > 1073741824) {
                        var dataInGB = dataTraffic / (1024 * 1024 * 1024);
                        $("#txtUnlimitPeriodUsedTaffic").val(dataInGB.toFixed(2));
                        $("#UnlimitPeriodUsedDataUnitSel").val("3");
                    } else if (dataTraffic > 1024 * 1024) {
                        var dataInMB = dataTraffic / (1024 * 1024);
                        $("#txtUnlimitPeriodUsedTaffic").val(dataInMB.toFixed(2));
                        $("#UnlimitPeriodUsedDataUnitSel").val("2");
                    } else {
                        var dataInKB = dataTraffic / 1024;
                        $("#txtUnlimitPeriodUsedTaffic").val(dataInKB.toFixed(2));
                        $("#UnlimitPeriodUsedDataUnitSel").val("1");
                    }
                }

            });
        }

        $("#DisconnectActionSel").change(function() {
            var mapData = new Array();
            putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_dis_at_upper", 0);
            putMapElement(mapData, "RGW/statistics/WanStatistics/dis_value_at_upper", $(this).children('option:selected').val(), 1);
            postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
        });

        $("#trafficSetingSel").change(function() {
            var selValue = $(this).children('option:selected').val();
            if (0 == selValue) {
                $("#DivMonthTrafficInfo").hide();
                $("#DivPeriodTrafficInfo").hide();
                $("#DivUnlimitPeriodTrafficInfo").hide();
                $("#divDisconnectNetwork").hide();
            } else if (1 == selValue) {
                $("#DivMonthTrafficInfo").show();
                $("#DivPeriodTrafficInfo").hide();
                $("#DivUnlimitPeriodTrafficInfo").hide();
                $("#divDisconnectNetwork").show();
            } else if (2 == selValue) {
                $("#DivMonthTrafficInfo").hide();
                $("#DivPeriodTrafficInfo").show();
                $("#DivUnlimitPeriodTrafficInfo").hide();
                $("#divDisconnectNetwork").show();
            } else {
                $("#DivMonthTrafficInfo").hide();
                $("#DivPeriodTrafficInfo").hide();
                $("#DivUnlimitPeriodTrafficInfo").show();
                $("#divDisconnectNetwork").show();
            }

            var mapData = new Array();
            putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_mang_method", 0);
            putMapElement(mapData, "RGW/statistics/WanStatistics/stat_mang_method", selValue, 1);
            postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
        });


        $("#lt_trafficSet_btnCalMonthTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("TrafficCalTile"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("TrafficCalLable"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_stat_value_month", 0);
                putMapElement(mapData, "RGW/statistics/WanStatistics/corrected_value_month", Math.floor(retValue), 1);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });


        $("#lt_trafficSet_btnCalUnlimitPeriodTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("TrafficCalTile"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("TrafficCalLable"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_stat_value_unlimit", 0);
                putMapElement(mapData, "RGW/statistics/WanStatistics/corrected_value_unlimit", Math.floor(retValue), 1);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });



        $("#lt_trafficSet_btnCalPeroidTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("TrafficCalTile"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("TrafficCalLable"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_stat_value_period", 0);
                putMapElement(mapData, "RGW/statistics/WanStatistics/corrected_value_period", Math.floor(retValue), 1);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });


        $("#lt_trafficSet_btnChangeMonthAvalibleTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("MonthAvalibleTrafficSetting"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("MonthAvalibleTraffic"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/total_available_month", Math.floor(retValue), 0);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });


        $("#lt_trafficSet_btnChangeUnlimitPeriodAvalibleTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("MonthAvalibleTrafficSetting"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("MonthAvalibleTraffic"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }
                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/total_avaliable_unlimit", Math.floor(retValue), 0);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });


        $("#lt_trafficSet_btnChangePeroidAvalibleTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("PeriodAvalibleTrafficSetting"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("PeriodAvalibleTraffic"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/total_available_period", Math.floor(retValue), 0);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });

        $("#lt_trafficSet_btnChangeMonthTotalTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("MonthLimitTrafficSetting"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("MonthLimitTraffic"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }
				if(retValue > g_monthAvailbleTraffic){
					alert("Limit traffic must be smaller than the available traffic!");
					return;
				}

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_upper_range_value", 0);
                putMapElement(mapData, "RGW/statistics/WanStatistics/upper_value_month", Math.floor(retValue), 1);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });

        $("#lt_trafficSet_btnChangePeroidTotalTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("PeriodLimitTrafficSetting"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("PeriodLimitTraffic"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }

				if(retValue > g_periodAvailbleTraffic){
					alert("Limit traffic must be smaller than the available traffic!");
					return;
				}

			
                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_upper_range_value", 0);
                putMapElement(mapData, "RGW/statistics/WanStatistics/upper_value_period", Math.floor(retValue), 1);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });


        $("#lt_trafficSet_btnChangeUnlimitPeriodTotalTraffic").click(function() {
            sm("divTrafficSetting", 450, 100);
            $("#lt_trafficSet_stcTrafficSettingTitle").text(jQuery.i18n.prop("PeriodLimitTrafficSetting"));
            $("#lt_trafficSet_stcTrafficSettingLabel").text(jQuery.i18n.prop("PeriodLimitTraffic"));

            $("#lt_trafficSet_btnNewTraffic").click(function() {
                var retValue = parseFloat($("#txtNewTrafficData").val());
                if(1 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024;
                } else if (2 == $("#newTrafficSel").val()) {
                    retValue = retValue * 1024 * 1024;
                } else {
                    retValue = retValue * 1024 * 1024 * 1024;
                }

				if(retValue > g_unlimitPeriodAvailbleTraffic){
					alert("Limit traffic must be smaller than the available traffic!");
					return;
				}

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_upper_range_value", 0);
                putMapElement(mapData, "RGW/statistics/WanStatistics/upper_value_unlimit", Math.floor(retValue), 1);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });



        $("#lt_trafficSet_btnChangePeroidTime").click(function() {
            sm("divPeriodTimeSetting", 450, 100);
            $("#lt_trafficSet_stcPeriodTimeSetting").text(jQuery.i18n.prop("lt_trafficSet_stcPeriodTimeSetting"));
            $("#lt_trafficSet_stcNewPeriodTime").text(jQuery.i18n.prop("lt_trafficSet_stcNewPeriodTime"));
			document.getElementById("lt_trafficSet_stcCancel").innerHTML = jQuery.i18n.prop("lt_trafficSet_stcCancel");
		 
            $("#txtNewPeriodStartYear").val($("#txtPeriodStartYear").val());
            $("#txtNewPeriodStartMonth").val($("#txtPeriodStartMonth").val());
            $("#txtNewPeriodStartDay").val($("#txtPeriodStartDay").val());

            $("#txtNewPeriodEndYear").val($("#txtPeriodEndYear").val());
            $("#txtNewPeriodEndMonth").val($("#txtPeriodEndMonth").val());
            $("#txtNewPeriodEndDay").val($("#txtPeriodEndDay").val());

            $("#txtNewPeriodStartYear,#txtNewPeriodStartMonth,#txtNewPeriodStartDay,#txtNewPeriodEndYear,#txtNewPeriodEndMonth,#txtNewPeriodEndDay").click(function() {
                $("#lErrorLogs").hide();
            });

            $("#lt_trafficSet_btnNewPeroidTime").click(function() {
                var startYear = $("#txtNewPeriodStartYear").val();
                var startMonth = $("#txtNewPeriodStartMonth").val();
                var startDay = $("#txtNewPeriodStartDay").val();

                var endYear = $("#txtNewPeriodEndYear").val();
                var endMonth = $("#txtNewPeriodEndMonth").val();
                var endDay = $("#txtNewPeriodEndDay").val();


                if (startYear.length != 4 || endYear.length != 4
                || parseInt(startYear) * 365 + parseInt(startMonth) * 30 + parseInt(startDay) >= parseInt(endYear) * 365 + parseInt(endMonth) * 30 + parseInt(endDay)) {
                    $("#lErrorLogs").text(jQuery.i18n.prop("lTimeFormatError"));
                    $("#lErrorLogs").show();
                    return;
                }

                var errorString = DateValidate(startYear,startMonth,startDay);
                if(errorString !="OK") {
                    $("#lErrorLogs").text( jQuery.i18n.prop("lt_trafficSet_stcPeriodStartTime") + ":" + errorString);
                    $("#lErrorLogs").show();
                    return;
                }

                errorString = DateValidate(endYear,endMonth,endDay);
                if(errorString !="OK") {
                    $("#lErrorLogs").text(jQuery.i18n.prop("lt_trafficSet_stcPeriodEndTime") + ":" + errorString);
                    $("#lErrorLogs").show();
                    return;
                }


                var dateObj = new Date();
				var y =  dateObj.getFullYear();
                var todayTimeValue = dateObj.getFullYear()*365 + (dateObj.getMonth() + 1)*30 + dateObj.getDate();
                var startTimeValue = parseInt(startYear)*365 + parseInt(startMonth)*30 + parseInt(startDay);
                var endTimeValue = parseInt(endYear)*365 + parseInt(endMonth)*30 + parseInt(endDay);

                if(todayTimeValue < startTimeValue || todayTimeValue > endTimeValue ) {
                    $("#lErrorLogs").text(jQuery.i18n.prop("PeriodTimeRangeSetError"));
                    $("#lErrorLogs").show();
                    return;
                }



                var strStart = startYear.substr(2, 2) + "," + startMonth + "," + startDay;
                var strEnd = endYear.substr(2, 2) + "," + endMonth + "," + endDay;

                var mapData = new Array();
                putMapElement(mapData, "RGW/statistics/WanStatistics/set_action", "set_stat_period", 0);
                putMapElement(mapData, "RGW/statistics/WanStatistics/period_start_date", strStart, 1);
                putMapElement(mapData, "RGW/statistics/WanStatistics/period_end_date", strEnd, 2);
                postXML(xmlName, g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
            });
        });




        this.onPost = function() {
        }

        this.onPostSuccess = function() {
            this.onLoad();
        }

        this.setXMLName = function(_xmlname) {
            xmlName = _xmlname;
        }

        return this;

    }
})(jQuery);

