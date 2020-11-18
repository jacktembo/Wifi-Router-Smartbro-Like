
(function($) {
    $.fn.objWebDav = function(InIt) {

	
        this.onLoad = function() {
            this.loadHTML();

			buttonLocaliztion("webdavDownload");
			buttonLocaliztion("webdavDelete");
			buttonLocaliztion("webdavShare");
			buttonLocaliztion("webdavUpload");
			buttonLocaliztion("webdavMkdir");
			buttonLocaliztion("lt_Mkdir_btnSave");

			document.getElementById("lloginfailed").innerHTML = jQuery.i18n.prop("lloginfailed");
			document.getElementById('WebdavLoginDlgTitle').innerHTML=jQuery.i18n.prop("WebdavLoginDlgTitle");
			document.getElementById('WebDavUsername').innerHTML=jQuery.i18n.prop("webdav_lUsername");
			document.getElementById('WebDavPassword').innerHTML=jQuery.i18n.prop("webdav_lPassword");

			//document.getElementById('lt_webdavLogin_btnSave').innerHTML=jQuery.i18n.prop("lt_webdavLogin_btnSave");

			buttonLocaliztion("lt_webdavLogin_btnSave");
//			document.getElementById('webdavLogin_stcCancelView').innerHTML=jQuery.i18n.prop("webdavLogin_stcCancelView");
			
			
			document.getElementById('mkdir_stcCancelView').innerHTML=jQuery.i18n.prop("mkdir_stcCancelView");
			document.getElementById('mkdir_stcName').innerHTML=jQuery.i18n.prop("mkdir_stcName");
			document.getElementById('mkdirInfoDlgTitle').innerHTML=jQuery.i18n.prop("mkdirInfoDlgTitle");

			document.getElementById('webdavsharesettingDlgTitle').innerHTML=jQuery.i18n.prop("webdavsharesettingDlgTitle");
			document.getElementById('ShareFile_method').innerHTML=jQuery.i18n.prop("ShareFile_method");
			document.getElementById('lreadmode').innerHTML=jQuery.i18n.prop("lreadmode");
			document.getElementById('lreadwitemode').innerHTML=jQuery.i18n.prop("lreadwitemode");			
			document.getElementById('share_stcCancelView').innerHTML=jQuery.i18n.prop("mkdir_stcCancelView");
			document.getElementById('webdavsharesetting_ok').value = jQuery.i18n.prop("lt_Mkdir_btnSave");
			document.getElementById('ShareSelect1').innerHTML=jQuery.i18n.prop("ShareSelect1");
			document.getElementById('ShareSelect2').innerHTML=jQuery.i18n.prop("ShareSelect2");
			document.getElementById('ShareSelect3').innerHTML=jQuery.i18n.prop("ShareSelect3");
			document.getElementById('ShareSelect4').innerHTML=jQuery.i18n.prop("ShareSelect4");

					
			document.getElementById('webdavuploadschedule_pause').value = jQuery.i18n.prop("webdavuploadschedule_pause");
			document.getElementById('webdavuploadscheduleDlgTitle').innerHTML=jQuery.i18n.prop("webdavuploadscheduleDlgTitle");	
			document.getElementById('upload_stcCancelView').innerHTML=jQuery.i18n.prop("mkdir_stcCancelView");
			
			document.getElementById('webdav_name').innerHTML=jQuery.i18n.prop("webdav_name")+"<img id=\"NameOrder\" src=../images/ico_webdav_up.png style=\"display: none\">";
			document.getElementById('webdav_size').innerHTML=jQuery.i18n.prop("webdav_size")+"<img id=\"SizeOrder\" src=../images/ico_webdav_up.png style=\"display: none\">";
			document.getElementById('webdav_date').innerHTML=jQuery.i18n.prop("webdav_date")+"<img id=\"FiledateOrder\" src=../images/ico_webdav_up.png style=\"display: none\">";


			
			$("#webdavDownload").click(function() {
		    	
				var fileName=GetSelWebdavFileId();
				WebDav_Get_Download(fileName);
			});

			$("#webdavDelete").click(function() {
		    	
				var fileName=GetSelWebdavFileId();
				WebDav_Delete(fileName);
			});

			$("#webdavShare").click(function() {
				var fileName=GetSelWebdavFileId();
				WebDav_Share(fileName);
			});
			if(isBrowser()=="IE8")
			{
				$("#WebdavFileToUpload").bind("change",function() {
					showAlert(jQuery.i18n.prop("lupdateBrowser"));
				});
			}
			else
			{
				$("#WebdavFileToUpload").live("change",function() {
			 	WebDav_Upload_Change();
				});
			}
			
				


			

			
			function GetSelWebdavFileId() {
			    var smsIdSet = "";
			    $(".delCheckBox:checked").each(function() {
			        smsIdSet = smsIdSet+$(this).parents("tr:first").attr("id")+"/";
			    });
				
			    return smsIdSet;
			}

			$("#webdavMkdir").click(function() {
        			sm("mkdirInfoDlg", 450, 150);
        			$("#selSaveLoc").attr("disabled", false);
        			$("#mkdir_stcInputCheckout").hide();
        			
					$("#lt_Mkdir_btnSave").click(function() {

		                var FolderName = $("#mkdirtxtName").val();
						if ($("#mkdirtxtName").val().length == 0) {
						    $("#mkdir_stcInputCheckout").show().text(jQuery.i18n.prop("mkdir_stcInputCheckout1"));
							//document.getElementById('mkdirInfoDlgTitle').innerHTML=
						    return;
						}
						if((FolderName.indexOf("%")==-1)&&(FolderName.indexOf("^")==-1)&&(FolderName.indexOf("&")==-1)
						&&(FolderName.indexOf("*")==-1)&&(FolderName.indexOf("#")==-1)&&(FolderName.indexOf("|")==-1)
						&&(FolderName.indexOf(":")==-1)&&(FolderName.indexOf("\\")==-1)&&(FolderName.indexOf("index.html")==-1)
						&&(FolderName.indexOf("?")==-1)&&(FolderName.indexOf("\"")==-1)&&(FolderName.indexOf("<")==-1)
						&&(FolderName.indexOf(">")==-1))
						{
							FolderName=encodeURIComponent(FolderName);
							WebDav_Mkdir(FolderName);
							hm();
						}
						else
						{
							$("#mkdir_stcInputCheckout").show().text(jQuery.i18n.prop("mkdir_stcInputCheckout2"));
							//$("#mkdir_stcInputCheckout").show().text("A file name can't contain any of following characters:% ^ & * # | : \\ / ? \" < >");
							return;
						}

					});                      
            });

        

			webdavFileInit();
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
            document.getElementById('Content').innerHTML = callProductHTML("WebDav/WebDav.html");
        }
    
		
        this.setXMLName = function(_xmlname) {
            xmlName = _xmlname;
        }




        return this;
    }


})(jQuery);


		function webdavFileInit()
		{


			var xml = getData('webdav_management');
			//var xml= callProductXML_webdavshare("get_sd_card_status");
            $(xml).find("webdav_user_management").each(function() {

				var sd_flag=$(this).find("sd_state").text();
				var usb_flag=$(this).find("webdav_enable").text();
				if(sd_flag=='0')
				{
					$("#webdav_Share_Button").hide();					
					$("#webdav_Delete_Button").hide();
					$("#webdav_Upload_Button").hide();
					$("#webdav_Mkdir_Button").hide();
						    
					showAlert(jQuery.i18n.prop("lsdcardstatus"));
					return;
				}
				if(usb_flag=="0")
				{
					$("#webdav_Share_Button").hide();					
					$("#webdav_Delete_Button").hide();
					$("#webdav_Upload_Button").hide();
					$("#webdav_Mkdir_Button").hide();
					
					showAlert(jQuery.i18n.prop("lwebdavusbflag"));
					return;
					
				}

				WebDav_Get_OPTIONS();
							
		 });
		}



		
var Path_Name='index.html';


function isBrowser(){
	var Sys={};
	var ua=navigator.userAgent.toLowerCase();
	var s;
	(s=ua.match(/msie ([\d.]+)/))?Sys.ie=s[1]:
	(s=ua.match(/firefox\/([\d.]+)/))?Sys.firefox=s[1]:
	(s=ua.match(/chrome\/([\d.]+)/))?Sys.chrome=s[1]:
	(s=ua.match(/opera.([\d.]+)/))?Sys.opera=s[1]:
	(s=ua.match(/version\/([\d.]+).*safari/))?Sys.safari=s[1]:0;
	if(Sys.ie){
		if(Sys.ie=='9.0'){
			return 'IE9';
		}else if(Sys.ie=='8.0'){
			return 'IE8';
		}else if(Sys.ie=='7.0'){
			return 'IE8';
		}
		else{
			return 'IE';
		}
	}
	if(Sys.firefox){
		return 'Firefox';
	}
	if(Sys.chrome){
		return 'Chrome';
	}
	if(Sys.opera){
		return 'Opera';
	}
	if(Sys.safari){
		return 'Safari';
	}
	return 'IE';
};


function   WebDav_Utf8_To_Chinese_Char(strUtf8) 
{ 
      var   iCode,   iCode1,   iCode2; 
      iCode   =   parseInt("0x"   +   strUtf8.substr(1,   2)); 
      iCode1   =   parseInt("0x"   +   strUtf8.substr(4,   2)); 
      iCode2   =   parseInt("0x"   +   strUtf8.substr(7,   2)); 
       
      return   String.fromCharCode(((iCode   &   0x0F)   <<   12)   |    
			((iCode1   &   0x3F)   <<     6)   | 
			(iCode2   &   0x3F)); 
}  

function   WebDav_Utf8_To_Specific_Char(strUtf8) 
{
	  var   iCode; 
      iCode   =   parseInt("0x"   +   strUtf8.substr(1,   2));        
      return   String.fromCharCode(iCode); 
}

function   WebDav_Utf8_To_symbol_Char(strUtf8) 
{ 
	var   bstr   =   ""; 
	var   nOffset   =   0;
	nOffset   =   strUtf8.indexOf("%");
	if(   nOffset   ==   -1   ) 
		return   strUtf8; 
	
	while(   nOffset   !=   -1   ) 
	{ 
	  bstr   +=   strUtf8.substr(0,   nOffset); 
	  strUtf8   =   strUtf8.substr(nOffset,   strUtf8.length   -   nOffset); 
	  if(   strUtf8   ==   ""   ||   strUtf8.length   <   3   )       //   bad   string 
	      return   bstr; 
	   
	  bstr   +=   WebDav_Utf8_To_Specific_Char(strUtf8.substr(0,   3)); 
	  strUtf8   =   strUtf8.substr(3,   strUtf8.length   -   3); 
	  nOffset   =   strUtf8.indexOf("%"); 
	} 
	return   bstr   +   strUtf8; 
} 

function   WebDav_Utf8_To_Char(strUtf8)    
{ 
	var   bstr   =   ""; 
	var   nOffset   =   0; //   processing   point   on   strUtf8 

	if(   strUtf8   ==   ""   ) 
	  return   ""; 

	//strUtf8   =   strUtf8.toLowerCase(); 
	nOffset   =   strUtf8.indexOf("%e"); 
	if(   nOffset   ==   -1   ) 
	{
		nOffset   =   strUtf8.indexOf("%E");
		if(   nOffset   ==   -1   ) 
		{
			return   WebDav_Utf8_To_symbol_Char(strUtf8); 
		}
	}
	  
	   
	while(   nOffset   !=   -1   ) 
	{ 
	  bstr   +=   strUtf8.substr(0,   nOffset); 
	  strUtf8   =   strUtf8.substr(nOffset,   strUtf8.length   -   nOffset); 
	  if(   strUtf8   ==   ""   ||   strUtf8.length   <   9   )       //   bad   string 
	      return   bstr; 
	   
	  bstr   +=   WebDav_Utf8_To_Chinese_Char(strUtf8.substr(0,   9)); 
	  strUtf8   =   strUtf8.substr(9,   strUtf8.length   -   9); 
	  nOffset   =   strUtf8.indexOf("%e"); 
		if(   nOffset   ==   -1   )
		{
			nOffset   =   strUtf8.indexOf("%E"); 
		} 
	}

	return   WebDav_Utf8_To_symbol_Char(bstr   +   strUtf8); 
} 

function WebDav_GetDate_By_DateStr(TimeDate)
{
	var week=TimeDate.substr(0,   3);
	var day=TimeDate.substr(5,   2);
	var mon=TimeDate.substr(8,   3);
	if(mon=="Jan") mon="01";
	else if(mon=="Feb") mon="02";
	else if(mon=="Mar")	mon="03";
	else if(mon=="Apr")	mon="04";
	else if(mon=="May")	mon="05";
	else if(mon=="Jun")	mon="06";
	else if(mon=="Jul")	mon="07";
	else if(mon=="Aug")	mon="08";
	else if(mon=="Sep")	mon="09";
	else if(mon=="Oct")	mon="10";
	else if(mon=="Nov")	mon="11";
	else if(mon=="Dec")	mon="12";
	var year=TimeDate.substr(12,   4);
	var HMS=TimeDate.substr(17,   8);
	return year+"-"+mon+"-"+day+" "+HMS;
	
}

function WebDav_GetImage_By_FileType(FileType)
{
	var FileTypeImage;
	if(FileType=="application/pdf")
	{
		FileTypeImage="ico_webdav_pdf.png";
	}
	else if((FileType=="video/mpeg")||(FileType=="video/quicktime")
		||(FileType=="video/x-msvideo")||(FileType=="video/x-ms-asf")
		||(FileType=="video/x-ms-wmv")||(FileType=="video/webm")
		||(FileType=="video/mp4")||(FileType=="video/x-m4v"))
	{
		FileTypeImage="ico_webdav_video.png";
	}
	else if((FileType=="application/x-tar-gz")||(FileType=="application/x-tgz")||(FileType=="application/x-tar")
		||(FileType=="application/zip")||(FileType=="application/x-gzip")||(FileType=="application/x-gunzip")
		||(FileType=="application/bzip2")||(FileType=="application/x-7z-compressed")||(FileType=="application/x-zip-compressed")
		||(FileType=="application/x-tar")||(FileType=="application/x-rar")||(FileType=="application/x-arj-compressed"))
	{
		FileTypeImage="ico_webdav_tgz.png";		
	}
	else if((FileType=="image/gif")||(FileType=="image/jpeg")||(FileType=="image/x-icon")
		||(FileType=="image/png")||(FileType=="image/x-xbitmap")||(FileType=="image/svg+xml")
		||(FileType=="image/x-xpixmap")||(FileType=="image/x-xwindowdump"))
	{
		FileTypeImage="ico_webdav_image.png";		
	}
	else if((FileType=="audio/mpeg")||(FileType=="audio/x-mpegurl")||(FileType=="audio/mid")
		||(FileType=="audio/x-ms-wma")||(FileType=="audio/x-ms-wax")||(FileType=="audio/x-pn-realaudio")
		||(FileType=="audio/x-wav")||(FileType=="audio/x-mp3"))
	{
		FileTypeImage="ico_webdav_audio.png";		
	}
	else
	{
		FileTypeImage="ico_webdav_txt.png";
	}
	return FileTypeImage;
}

function WebDav_GetFileOnClick(FileType,FileName)
{
	FileName=encodeURIComponent(FileName);
	var str_path=Path_Name;
	var temp=new Array();
	temp=str_path.split("index.html");
	var path='index.html';
	for(var i=0;i<temp.length;i++)
	{
		if(temp[i]!='')
		{
			path=path+encodeURIComponent(temp[i])+"/";
		}
	}
	if(FileType=="httpd/directory")
	{
		WebDav_PROPFIND(path+FileName+"/");
		//alert("Dir:"+FileName);
	}
	else
	{
		WebDav_Get_Open(path+FileName);
		//alert("File:"+FileName);
	}
}
var Order_Mode=1;
var NameOrder_flag=1;
var SizeOrder_flag=1;
var FileDateOrder_flag=1;
var WebdavFileListArray = new Array(); 

function clear_order_image_function(img)
{
	if(img=="Nameimg")
	{
		$("#NameOrder").hide();
	}
	if(img=="Sizeimg")
	{
		$("#SizeOrder").hide();
	}
	if(img=="Filedateimg")
	{
		$("#FiledateOrder").hide();
	}
}

function clear_upload_barview_function()
{
	hm();
}

function WebDav_NameOrderOnClick()
{
    //$("#webdav_Download_Button").hide();
    Order_Mode=1;
    var Nameimg = document.getElementById("NameOrder");
    if(NameOrder_flag)
    {
    	Nameimg.src="images/ico_webdav_down.png";
		NameOrder_flag=0;
    }
	else
	{
		NameOrder_flag=1;
		Nameimg.src="images/ico_webdav_up.png";
	}
	
	if(WebdavFileListArray.length>0)
	{
		$("#WebdavFileListInfo").empty();
		var WebdavNameListArray = new Array(); 
		WebdavNameListArray.length=WebdavFileListArray.length;
		for(var i=0;i<WebdavFileListArray.length;i++)
		{
			var temp=new Array();
			temp=WebdavFileListArray[i].split("?");
			WebdavNameListArray[i]=temp[0].toLowerCase(); 
		}
		if(NameOrder_flag)
		{
			WebdavNameListArray.sort(function(a,b){return a<b?1:-1});
		}
		else
		{
			WebdavNameListArray.sort(function(a,b){return a>b?1:-1});
		}
		for(var i=0;i<WebdavFileListArray.length;i++)
		{
			for(var j=0;j<WebdavFileListArray.length;j++)
			{
				var temp=new Array();
				temp=WebdavFileListArray[j].split("?");
				if(WebdavNameListArray[i]==temp[0].toLowerCase())
				{
					var htmlText ;
					htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + temp[0] + "\">"
						   + "<td><div>"
						   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
						   +"<img src=\"images/"+temp[4]+"\" align=\"right\"/>"
						   +"</div></td>"
						   + "<td onclick=\"WebDav_GetFileOnClick('"+temp[3]+"',\'"+temp[0]+"\')\"><span>"+temp[0]+"</span></td>"
						   + "<td><div><span>"+temp[1]+"</span></div></td>"
						   + "<td><span>"+temp[2]+"</span></td></tr>"
					  
					$("#WebdavFileListInfo").append(htmlText);

					$(".delCheckBox:last").click(function() {
					if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
					    $("#deleteAllWebdavFile").attr("checked", true);
					} 
					else {
					    $("#deleteAllWebdavFile").attr("checked", false);
					}
					
					if($(".delCheckBox:checked").length==1)
					{
						$("#webdav_Share_Button").show();
					}
					else
					{
						$("#webdav_Share_Button").hide();
					}
					
					if ($(".delCheckBox:checked").length >= 1) {
						
						$("#webdav_Delete_Button").show();
						$("#webdav_Upload_Button").hide();
						$("#webdav_Mkdir_Button").hide();
					    
					} 
					else {
						$("#webdav_Delete_Button").hide();
						$("#webdav_Upload_Button").show();
						$("#webdav_Mkdir_Button").show();
					}
						
					});
					
				}
			}

			
		}
	}


	$("#NameOrder").show();
	setTimeout("clear_order_image_function(\"Nameimg\");",500);
}

function WebDav_SizeOrderOnClick()
{
	Order_Mode=2;
    var Sizeimg = document.getElementById("SizeOrder");
    if(SizeOrder_flag)
    {
    	Sizeimg.src="images/ico_webdav_down.png";
		SizeOrder_flag=0;
    }
	else
	{
		SizeOrder_flag=1;
		Sizeimg.src="images/ico_webdav_up.png";
	}

	if(WebdavFileListArray.length>0)
	{
		$("#WebdavFileListInfo").empty();
		var WebdavFolderListArray = new Array(); 
		var WebdavSizeListArray = new Array(); 

		for(var i=0;i<WebdavFileListArray.length;i++)
		{
			var temp=new Array();
			temp=WebdavFileListArray[i].split("?");
			if(temp[1]=="-")
			{
				WebdavFolderListArray.length=WebdavFolderListArray.length+1;
				var len=WebdavFolderListArray.length;
				WebdavFolderListArray[len-1]=WebdavFileListArray[i];
			}
			else
			{
				WebdavSizeListArray.length=WebdavSizeListArray.length+1;
				var len=WebdavSizeListArray.length;
				WebdavSizeListArray[len-1]=WebdavFileListArray[i];
			}
		}
		if(SizeOrder_flag)
		{
			for(var j=0;j<WebdavFolderListArray.length;j++)
			{
				var temp=new Array();
				temp=WebdavFolderListArray[j].split("?");
				var htmlText ;
				htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + temp[0] + "\">"
					   + "<td><div>"
					   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
					   +"<img src=\"images/"+temp[4]+"\" align=\"right\"/>"
					   +"</div></td>"
					   + "<td onclick=\"WebDav_GetFileOnClick('"+temp[3]+"',\'"+temp[0]+"\')\"><span>"+temp[0]+"</span></td>"
					   + "<td><div><span>"+temp[1]+"</span></div></td>"
					   + "<td><span>"+temp[2]+"</span></td></tr>"
				  
				$("#WebdavFileListInfo").append(htmlText);
				
					$(".delCheckBox:last").click(function() {
					if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
					    $("#deleteAllWebdavFile").attr("checked", true);
					} 
					else {
					    $("#deleteAllWebdavFile").attr("checked", false);
					}

					if($(".delCheckBox:checked").length==1)
					{
						$("#webdav_Share_Button").show();
					}
					else
					{
						$("#webdav_Share_Button").hide();
					}
					
					if ($(".delCheckBox:checked").length >= 1) {
						
						$("#webdav_Delete_Button").show();
						$("#webdav_Upload_Button").hide();
						$("#webdav_Mkdir_Button").hide();
					    
					} 
					else {
						$("#webdav_Delete_Button").hide();
						$("#webdav_Upload_Button").show();
						$("#webdav_Mkdir_Button").show();
					}
						
					});
			}

			var int_File_Size=new Array();
			for(var k=0;k<WebdavSizeListArray.length;k++)
			{
				var temp=new Array();
				temp=WebdavSizeListArray[k].split("?");
				int_File_Size.length=int_File_Size.length+1;
				var len=int_File_Size.length;
				int_File_Size[len-1]=parseInt(temp[5]);
							
			}		
			int_File_Size.sort(function(a,b){return a<=b?1:-1});
			for(var k=0;k<WebdavSizeListArray.length;k++)
			{
				for(var m=0;m<WebdavSizeListArray.length;m++)
				{
					var temp=new Array();
					temp=WebdavSizeListArray[m].split("?");
					if(int_File_Size[k]==parseInt(temp[5]))
					{
						WebdavSizeListArray[m]="";
						var htmlText ;
						htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + temp[0] + "\">"
							   + "<td><div>"
							   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
							   +"<img src=\"images/"+temp[4]+"\" align=\"right\"/>"
							   +"</div></td>"
							   + "<td onclick=\"WebDav_GetFileOnClick('"+temp[3]+"',\'"+temp[0]+"\')\"><span>"+temp[0]+"</span></td>"
							   + "<td><div><span>"+temp[1]+"</span></div></td>"
							   + "<td><span>"+temp[2]+"</span></td></tr>"
						  
						$("#WebdavFileListInfo").append(htmlText);

						$(".delCheckBox:last").click(function() {
						if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
						    $("#deleteAllWebdavFile").attr("checked", true);
						} 
						else {
						    $("#deleteAllWebdavFile").attr("checked", false);
						}


						if($(".delCheckBox:checked").length==1)
						{
							$("#webdav_Share_Button").show();
						}
						else
						{
							$("#webdav_Share_Button").hide();
						}
						
						if ($(".delCheckBox:checked").length >= 1) {
							
							$("#webdav_Delete_Button").show();
							$("#webdav_Upload_Button").hide();
							$("#webdav_Mkdir_Button").hide();
						    
						} 
						else {
							$("#webdav_Delete_Button").hide();
							$("#webdav_Upload_Button").show();
							$("#webdav_Mkdir_Button").show();
						}
							
						});
					}
				}
			}
		}
		else
		{
			var int_File_Size=new Array();
			for(var k=0;k<WebdavSizeListArray.length;k++)
			{
				var temp=new Array();
				temp=WebdavSizeListArray[k].split("?");
				int_File_Size.length=int_File_Size.length+1;
				var len=int_File_Size.length;
				int_File_Size[len-1]=parseInt(temp[5]);
							
			}		
			int_File_Size.sort(function(a,b){return a>=b?1:-1});
			for(var k=0;k<WebdavSizeListArray.length;k++)
			{
				for(var m=0;m<WebdavSizeListArray.length;m++)
				{
					var temp=new Array();
					temp=WebdavSizeListArray[m].split("?");
					if(int_File_Size[k]==parseInt(temp[5]))
					{	
						WebdavSizeListArray[m]="";
						var htmlText ;
						htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + temp[0] + "\">"
							   + "<td><div>"
							   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
							   +"<img src=\"images/"+temp[4]+"\" align=\"right\"/>"
							   +"</div></td>"
							   + "<td onclick=\"WebDav_GetFileOnClick('"+temp[3]+"',\'"+temp[0]+"\')\"><span>"+temp[0]+"</span></td>"
							   + "<td><div><span>"+temp[1]+"</span></div></td>"
							   + "<td><span>"+temp[2]+"</span></td></tr>"
						  
						$("#WebdavFileListInfo").append(htmlText);

						$(".delCheckBox:last").click(function() {
						if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
						    $("#deleteAllWebdavFile").attr("checked", true);
						} 
						else {
						    $("#deleteAllWebdavFile").attr("checked", false);
						}


						if($(".delCheckBox:checked").length==1)
						{
							$("#webdav_Share_Button").show();
						}
						else
						{
							$("#webdav_Share_Button").hide();
						}
						
						if ($(".delCheckBox:checked").length >= 1) {
							
							$("#webdav_Delete_Button").show();
							$("#webdav_Upload_Button").hide();
							$("#webdav_Mkdir_Button").hide();
						    
						} 
						else {
							$("#webdav_Delete_Button").hide();
							$("#webdav_Upload_Button").show();
							$("#webdav_Mkdir_Button").show();
						}
							
						});
					}
				}
			}
			for(var j=0;j<WebdavFolderListArray.length;j++)
			{
				var temp=new Array();
				temp=WebdavFolderListArray[j].split("?");
				var htmlText ;
				htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + temp[0] + "\">"
					   + "<td><div>"
					   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
					   +"<img src=\"images/"+temp[4]+"\" align=\"right\"/>"
					   +"</div></td>"
					   + "<td onclick=\"WebDav_GetFileOnClick('"+temp[3]+"',\'"+temp[0]+"\')\"><span>"+temp[0]+"</span></td>"
					   + "<td><div><span>"+temp[1]+"</span></div></td>"
					   + "<td><span>"+temp[2]+"</span></td></tr>"
				  
				$("#WebdavFileListInfo").append(htmlText);
				$(".delCheckBox:last").click(function() {
				if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
				    $("#deleteAllWebdavFile").attr("checked", true);
				} 
				else {
				    $("#deleteAllWebdavFile").attr("checked", false);
				}

				if($(".delCheckBox:checked").length==1)
				{
					$("#webdav_Share_Button").show();
				}
				else
				{
					$("#webdav_Share_Button").hide();
				}
				
				if ($(".delCheckBox:checked").length >= 1) {
					
					$("#webdav_Delete_Button").show();
					$("#webdav_Upload_Button").hide();
					$("#webdav_Mkdir_Button").hide();
				    
				} 
				else {
					$("#webdav_Delete_Button").hide();
					$("#webdav_Upload_Button").show();
					$("#webdav_Mkdir_Button").show();
				}
					
				});
			}

		}
		
	}
	
	$("#SizeOrder").show();
	setTimeout("clear_order_image_function(\"Sizeimg\");",500);
}

function WebDav_FileDateOrderOnClick()
{
	Order_Mode=3;
    var Filedateimg = document.getElementById("FiledateOrder");
    if(FileDateOrder_flag)
    {
    	Filedateimg.src="images/ico_webdav_down.png";
		FileDateOrder_flag=0;
    }
	else
	{
		FileDateOrder_flag=1;
		Filedateimg.src="images/ico_webdav_up.png";
	}
	var WebdavFileDateListArray = new Array();  
	if(WebdavFileListArray.length>0)
	{
		$("#WebdavFileListInfo").empty();
		var WebdavFileListArray_temp=new Array();
		WebdavFileListArray_temp.length=WebdavFileListArray.length;

		for(var i=0;i<WebdavFileListArray.length;i++)
		{
			var temp=new Array();

			WebdavFileListArray_temp[i]=WebdavFileListArray[i];
			temp=WebdavFileListArray[i].split("?");
			temp[2]=temp[2].replace("-","");
			temp[2]=temp[2].replace("-","");
			temp[2]=temp[2].replace(" ","");
			temp[2]=temp[2].replace(":","");
			temp[2]=temp[2].replace(":","");


			WebdavFileDateListArray.length=WebdavFileDateListArray.length+1;
			var len=WebdavFileDateListArray.length;
			WebdavFileDateListArray[len-1]=parseInt(temp[2]);
		}
		
		
		
		
		if(FileDateOrder_flag)
		{		
			WebdavFileDateListArray.sort(function(a,b){return a<=b?1:-1});
			for(var k=0;k<WebdavFileListArray.length;k++)
			{
				for(var m=0;m<WebdavFileListArray.length;m++)
				{
					if(WebdavFileListArray_temp[m]=="")
					{
						continue;
					}
					else
					{
						var temp1=new Array();
						temp1=WebdavFileListArray_temp[m].split("?");
						var temp2=temp1[2];
						
						temp2=temp2.replace("-","");
						temp2=temp2.replace("-","");
						temp2=temp2.replace(" ","");
						temp2=temp2.replace(":","");
						temp2=temp2.replace(":","");
						if(WebdavFileDateListArray[k]==parseInt(temp2))
						{
							WebdavFileListArray_temp[m]="";
							var htmlText ;
							htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + temp1[0] + "\">"
								   + "<td><div>"
								   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
								   +"<img src=\"images/"+temp1[4]+"\" align=\"right\"/>"
								   +"</div></td>"
								   + "<td onclick=\"WebDav_GetFileOnClick('"+temp1[3]+"',\'"+temp1[0]+"\')\"><span>"+temp1[0]+"</span></td>"
								   + "<td><div><span>"+temp1[1]+"</span></div></td>"
								   + "<td><span>"+temp1[2]+"</span></td></tr>"
							  
							$("#WebdavFileListInfo").append(htmlText);
							$(".delCheckBox:last").click(function() {
							if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
							    $("#deleteAllWebdavFile").attr("checked", true);
							} 
							else {
							    $("#deleteAllWebdavFile").attr("checked", false);
							}
							
							if($(".delCheckBox:checked").length==1)
							{
								$("#webdav_Share_Button").show();
							}
							else
							{
								$("#webdav_Share_Button").hide();
							}
							
							if ($(".delCheckBox:checked").length >= 1) {
								
								$("#webdav_Delete_Button").show();
								$("#webdav_Upload_Button").hide();
								$("#webdav_Mkdir_Button").hide();
							    
							} 
							else {
								$("#webdav_Delete_Button").hide();
								$("#webdav_Upload_Button").show();
								$("#webdav_Mkdir_Button").show();
							}
								
							});

							break;
						}
					}

				}
			}
		}
		else
		{
			WebdavFileDateListArray.sort(function(a,b){return a>=b?1:-1});
			for(var k=0;k<WebdavFileListArray.length;k++)
			{
				for(var m=0;m<WebdavFileListArray.length;m++)
				{
					if(WebdavFileListArray_temp[m]=="")
					{
						continue;
					}
					else
					{
						var temp1=new Array();
						temp1=WebdavFileListArray_temp[m].split("?");
						var temp2=temp1[2];
						
						temp2=temp2.replace("-","");
						temp2=temp2.replace("-","");
						temp2=temp2.replace(" ","");
						temp2=temp2.replace(":","");
						temp2=temp2.replace(":","");
						if(WebdavFileDateListArray[k]==parseInt(temp2))
						{
							WebdavFileListArray_temp[m]="";
							var htmlText ;
							htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + temp1[0] + "\">"
								   + "<td><div>"
								   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
								   +"<img src=\"images/"+temp1[4]+"\" align=\"right\"/>"
								   +"</div></td>"
								   + "<td onclick=\"WebDav_GetFileOnClick('"+temp1[3]+"',\'"+temp1[0]+"\')\"><span>"+temp1[0]+"</span></td>"
								   + "<td><div><span>"+temp1[1]+"</span></div></td>"
								   + "<td><span>"+temp1[2]+"</span></td></tr>"
							  
							$("#WebdavFileListInfo").append(htmlText);
							$(".delCheckBox:last").click(function() {
							if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
							    $("#deleteAllWebdavFile").attr("checked", true);
							} 
							else {
							    $("#deleteAllWebdavFile").attr("checked", false);
							}
							if($(".delCheckBox:checked").length==1)
							{
								$("#webdav_Share_Button").show();
							}
							else
							{
								$("#webdav_Share_Button").hide();
							}
							
							if ($(".delCheckBox:checked").length >= 1) {
								
								$("#webdav_Delete_Button").show();
								$("#webdav_Upload_Button").hide();
								$("#webdav_Mkdir_Button").hide();
							    
							} 
							else {
								$("#webdav_Delete_Button").hide();
								$("#webdav_Upload_Button").show();
								$("#webdav_Mkdir_Button").show();
							}
								
							});

							break;
						}
					}

				}
			}
		}
		
	}
	$("#FiledateOrder").show();
	setTimeout("clear_order_image_function(\"Filedateimg\");",500);
}

function WebDav_BackOnClick()
{
	var path='';
	var name=new Array();
	name =Path_Name.split("index.html");
	var i=0;
	if(name.length>2)
	{
		for(i=0;i<name.length-2;i++)
		{
			path=path+encodeURIComponent(name[i])+'/';
		}
	}
	else
	{
		var path='index.html';
	}

	WebDav_PROPFIND(path);
}


function WebDav_Get_Open(path) 
{
	var contentType="";
	var xml_content=WebDav_GetSyncXML(path,contentType);
	window.open(path, '_blank');

}


function WebDav_Get_Download(FileName) 
{
	

	var contentType="application/octet-stream";
	
	var FileNameArray = new Array();
	FileNameArray =FileName.split("index.html");
	var i=0;
	var j=0;
	var currnwin;
	for(i=0;i<FileNameArray.length;i++)
	{
		if(FileNameArray[i]!="")
		{
			var path=Path_Name;
			path=path+FileNameArray[i];
			var xml_content=WebDav_GetSyncXML(path,contentType);
			currnwin=window.open("dav"+path, '_blank','scrollbars=yes,z-look=yes,resizable=no,width=550,height=350');
		}
		while(j<1000000000)
			{
				j++;
			}
		
	}
	var pro_path=WebDav_chines_utf8(Path_Name)
	WebDav_PROPFIND(pro_path);
}


function WebDav_Delete(FileName) 
{
		
	var FileNameArray = new Array();
	FileNameArray =FileName.split("index.html");
	var i=0;
	var currnwin;
	sm("PleaseWait", 150, 100);
	$("#lPleaseWait").text(jQuery.i18n.prop("h1PleaseWait"));
	for(i=0;i<FileNameArray.length;i++)
	{
		if(FileNameArray[i]!="")
		{
			FileNameArray[i]=encodeURIComponent(FileNameArray[i]);
			var path=WebDav_chines_utf8(Path_Name);
			path=path+FileNameArray[i];
			var xml_content=WebDav_DeleteSyncXML(path);
		}		
	}
	hm();
	var pro_path=WebDav_chines_utf8(Path_Name)
	WebDav_PROPFIND(pro_path);

}
var share_file_name="";
	
function WebDav_Share(share_name) 
{
	if ($("#deleteAllWebdavFile").attr("checked")) {

	} else
	{}
	
	sm("webdavsharsettingDlg", 450, 150);
	$("#ReadModeSta").attr("checked", true);
	$("#ReadWriteModeSta").attr("checked", false);
	
	var ShareFileNameArray = new Array();
	ShareFileNameArray =share_name.split("index.html");
	share_file_name=ShareFileNameArray[0];
	share_read_select=1;
	
	document.getElementById('ShareFile_Path').innerHTML=ShareFileNameArray[0];

}

function WebDav_Share_Setting_Select() 
{

	var select_value=document.getElementById("ShareSelect").value;
	if(select_value=="1")
	{
		share_read_select=1;
		$("#share_mode_setting").show();
		$("#ReadModeSta").attr("checked", true);
		$("#ReadWriteModeSta").attr("checked", false);
		
		$("#ReadModeSta").attr("disabled", false);
		$("#ReadWriteModeSta").attr("disabled", false);
		document.getElementById('ShareFile_Path').innerHTML=share_file_name;
	}
	else if(select_value=="2")
	{
		share_read_select=1;
		$("#share_mode_setting").show();
		$("#ReadModeSta").attr("checked", true);
		$("#ReadWriteModeSta").attr("checked", false);
		
		$("#ReadModeSta").attr("disabled", false);
		$("#ReadWriteModeSta").attr("disabled", false);
		
		document.getElementById('ShareFile_Path').innerHTML=jQuery.i18n.prop("webdav_Path_Root");
	}
	else if(select_value=="3")
	{

		var xml = getData('webdav_management');
         $(xml).find("webdav_shared_management").each(function() {

				var shared_enable=$(this).find("webdav_shared_enable").text();
				if(shared_enable=="1")
				{
					var shared_path=$(this).find("webdav_shared_file_name").text();
					if(shared_path=="index.html")
					{
						document.getElementById('ShareFile_Path').innerHTML=jQuery.i18n.prop("webdav_Path_Root");
					}
					else
					{
						document.getElementById('ShareFile_Path').innerHTML=WebDav_Utf8_To_Char(shared_path);
					}
					
					$("#share_mode_setting").show();
					var shared_mode=$(this).find("webdav_shared_only_read").text();
					if(shared_mode=="1")
					{
						$("#ReadModeSta").attr("checked", true);
						$("#ReadWriteModeSta").attr("checked", false);
					}
					else
					{
						$("#ReadModeSta").attr("checked", false);
						$("#ReadWriteModeSta").attr("checked", true);
					}

					$("#ReadModeSta").attr("disabled", true);
					$("#ReadWriteModeSta").attr("disabled", true);
				}
				else
				{
					$("#share_mode_setting").hide();
					document.getElementById('ShareFile_Path').innerHTML=jQuery.i18n.prop("lsdcardsharestatus");
				}


			
		 });

		
	}
	else if(select_value=="4")
	{
		$("#share_mode_setting").hide();
		document.getElementById('ShareFile_Path').innerHTML="";
	}
	else
	{
		alert(select_value);
	}


}


var share_read_select;
function ShareReadMode()
{
	$("#ReadModeSta").attr("checked", true);
	$("#ReadWriteModeSta").attr("checked", false);
	share_read_select=1;
}



function ShareReadWriteMode()
{
	$("#ReadModeSta").attr("checked", false);
	$("#ReadWriteModeSta").attr("checked", true);
	share_read_select=0;
}

function WebDav_Share_Setting_OK() 
{
	var share_enable;
	var share_path;
	var share_read;
	var select_value=document.getElementById("ShareSelect").value;

	if(select_value=="1")
	{		
		share_enable=1;
		share_read=share_read_select;
		share_path=Path_Name+share_file_name;
	}
	else if(select_value=="2")
	{
		share_enable=1;
		share_read=share_read_select;
		share_path=Path_Name;
	}
	else if(select_value=="3")
	{
		hm();
		return;
	}
	else if(select_value=="4")
	{
		share_enable=0;
		share_read=0;
		share_path="";
	}
		
	

	
	var itemIndex = 0;
	mapData = null;
	mapData = new Array();
	
	mapData=putMapElement(mapData,"RGW/webdav_shared_management/webdav_shared_enable", share_enable, itemIndex++);
	mapData=putMapElement(mapData,"RGW/webdav_shared_management/webdav_shared_only_read", share_read, itemIndex++);
	mapData=putMapElement(mapData,"RGW/webdav_shared_management/webdav_shared_file_name", share_path, itemIndex++);
	if (mapData.length > 0) {
        webdav_postXML('webdav_management', g_objXML.getXMLDocToString(g_objXML.createXML(mapData)));
    }
	
}

function WebDav_Mkdir(FolderName) 
{
	var path=Path_Name;
	var name=new Array();
	name =path.split("index.html");
	var str_path='index.html';
	var i=0;
	for(i=0;i<name.length;i++)
	{
		if(name[i]!='')
		{
			str_path=str_path+encodeURIComponent(name[i])+'/';
		}

	}
	var prop_path=str_path;
	str_path=str_path+FolderName;
	var xml_content=WebDav_MkdirSyncXML(str_path);

	WebDav_PROPFIND(prop_path);

}


    function stringToXml(xmlString)   
    {   
       var xmlDoc;   
       if(typeof xmlString == "string")   
       {   
        //FF   
        if (document.implementation.createDocument) {   
             var parser = new DOMParser();
             xmlDoc = parser.parseFromString(xmlString, "application/xml");
        //IE   
        } else if (window.ActiveXObject) {   
             xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
             xmlDoc.async="false";
             xmlDoc.loadXML(xmlString);
        }      
      }   
      else  
      {    
            xmlDoc = xmlString;   
      }   
      return xmlDoc;   
    }  

var webdav_username="",webdav_passwd="";


function webdav_getAuthHeader(requestType,file) {
    // return getCookie("Authheader");
    var rand, date, salt, strAuthHeader;
    var  tmp, DigestRes,AuthCnonce_f;
    var HA1, HA2;



    HA1 = hex_md5(webdav_username+ ":" + Authrealm + ":" + webdav_passwd);
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
    strAuthHeader = "Digest " + "username=\"" + webdav_username + "\", realm=\"" + Authrealm + "\", nonce=\"" + nonce + "\", uri=\"" + "/cgi/xml_action.cgi" + "\", response=\"" + DigestRes + "\", qop=" + AuthQop + ", nc=" + Authcount + ", cnonce=\"" + AuthCnonce_f  + "\"" ;
    DigestHeader = strAuthHeader ;
    return strAuthHeader;
}

function WebDav_Login_OK() 
{

	webdav_username = $("#tbaWebDav_username").val();
	webdav_passwd = $("#WebDav_password").val();
	var res=WebDav_Get_OPTIONS();
	if(res==-1)
	{
		$("#webdav_Upload_Button").hide();
		$("#webdav_Mkdir_Button").hide();
   		$("#webdav_Share_Button").hide();
		$("#webdav_Delete_Button").hide();
		$("#lloginfailed").show();
	}
	else
	{
		hm();
	}
}

function WebDav_Get_OPTIONS ()
{
	var xml_content=WebDav_Options();
	if(xml_content.search('Internal Server Error')!=-1)
	{
		$("#webdav_Upload_Button").hide();
		$("#webdav_Mkdir_Button").hide();
   		$("#webdav_Share_Button").hide();
		$("#webdav_Delete_Button").hide();
		sm("WebdavLoginInfoDlg", 450, 150);
		return -1;
	}
	else
	{
		WebDav_PROPFIND("index.html");
	}
}

function WebDav_PROPFIND (path) 
{ 		
	var xml = '<?xml version=\"1.0\" encoding=\"utf-8\"?>\n';
	xml += '<d:propfind xmlns:d=\"DAV:\">\n';
	xml += '<d:prop>\n';
	xml += '<d:displayname/>\n';
	xml += '<d:getcontentlength/>\n';
	xml += '<d:getcontenttype/>\n';
	xml += '<d:resourcetype/>\n';
	xml += '<d:getlastmodified/>\n';
	xml += '<d:lockdiscovery/>\n';
	xml += '</d:prop>\n';
	xml += '</d:propfind>\n';

	var xml_content=WebDav_PropfindSyncXML(path,xml);
	if(xml_content.search('Internal Server Error')!=-1)
	{
		$("#webdav_Upload_Button").hide();
		$("#webdav_Mkdir_Button").hide();
   		$("#webdav_Share_Button").hide();
		$("#webdav_Delete_Button").hide();
		sm("WebdavLoginInfoDlg", 450, 150);
		return -1;
	}
	
	$("#WebdavFileListInfo").empty();
	WebdavFileListArray.length = 0;
	$("#webdav_Upload_Button").show();
	$("#webdav_Mkdir_Button").show();
   	$("#webdav_Share_Button").hide();
	$("#webdav_Delete_Button").hide();
	$("#deleteAllWebdavFile").attr("checked", false);

	var FileSize_flag;

	while(1)
	{
		if(xml_content.indexOf("d:")!=-1)
		{
			xml_content=xml_content.replace("d:","");
		}
		else
		{
			break;
		}
	}
	var xmldoc=stringToXml(xml_content);
	$(xmldoc).find("response").each(function() {
		if(path=="index.html")
		{
			$("#webdav_Path_NoRoot").hide();
			$("#webdav_Path_Root").show();
			document.getElementById('webdav_Path_Root').innerHTML=jQuery.i18n.prop("webdav_Path_Root");
			var zoom=document.getElementById('webdav_Path_Root');
			zoom.style.fontWeight="bold";
			
		}
		else
		{
			$("#webdav_Path_Root").hide();
			$("#webdav_Path_NoRoot").show();
			document.getElementById('webdav_Back_label').innerHTML=jQuery.i18n.prop("webdav_Back_label");
			
		}
			
		var FileName=$(this).find("href").text();
		if(WebDav_Utf8_To_Char(FileName)==WebDav_Utf8_To_Char(path))
		{
			//FileName=FileName.replace(window.location.protocol + "//" + window.location.host + "/"+"dav","");
			Path_Name=WebDav_Utf8_To_Char(FileName);
			var FileNameArray = new Array();
			FileNameArray =FileName.split("index.html");
			document.getElementById('webdav_Path_record').innerHTML=jQuery.i18n.prop("webdav_Path_record");
			for(var i=0;i<FileNameArray.length;i++)
			{
				if(FileNameArray[i]!="")
				{
					document.getElementById('webdav_Path_record').innerHTML+=">"+WebDav_Utf8_To_Char(FileNameArray[i]);

				}
			}
			var zoom=document.getElementById('webdav_Path_record');
			zoom.style.fontWeight="bold";
		}
		else
		{
			
			FileName=WebDav_Utf8_To_Char(FileName);
			FileName=FileName.replace(WebDav_Utf8_To_Char(path),"");
			
			var FileSize;
			var FileType=$(this).find("getcontenttype").text();
			
			var FileTypeImage;
			if(FileType=="httpd/directory")
			{
				FileSize="-";
				FileTypeImage="ico_webdav_directory.png"
			}
			else
			{					
				FileSize=$(this).find("getcontentlength").text();
				FileSize_flag=FileSize;
				if(parseInt(FileSize)<1024)
				{
					FileSize=FileSize+'B';
				}else if(parseInt(FileSize)<1048576)
				{
					var size=parseInt((parseInt(FileSize)/1024)*100);
					FileSize=size/100+'K';
				}
				else
				{
					var size=parseInt((parseInt(FileSize)/1048576)*100);
					FileSize=size/100+'M';
				}
				FileTypeImage=WebDav_GetImage_By_FileType(FileType);
				
			}

			var FileDate=$(this).find("getlastmodified").text();
			//FileDate=WebDav_GetDate_By_DateStr(FileDate);
			
			var htmlText ;
			htmlText = "<tr style=\"cursor: pointer; background-color: rgb(255, 255, 255);\" id=\"" + FileName + "\">"
				   + "<td><div>"
				   +"<input align=\"right\" type=\"checkbox\" class=\"chk11 delCheckBox\"/>"
				   +"<img src=\"images/"+FileTypeImage+"\" align=\"right\"/>"
				   +"</div></td>"
				   + "<td onclick=\"WebDav_GetFileOnClick('"+FileType+"',\'"+FileName+"\')\"><span>"+FileName+"</span></td>"
				   + "<td><div><span>"+FileSize+"</span></div></td>"
				   + "<td><span>"+FileDate+"</span></td></tr>"

			WebdavFileListArray.length=WebdavFileListArray.length+1;
			var len;
			len=WebdavFileListArray.length;
			WebdavFileListArray[len-1]=FileName+"?"+FileSize+"?"+FileDate+"?"+FileType+"?"+FileTypeImage+"?"+FileSize_flag;
			  
			$("#WebdavFileListInfo").append(htmlText);


            $(".delCheckBox:last").click(function() {
                if ($(".delCheckBox:checked").length == $(".delCheckBox").length) {
                    $("#deleteAllWebdavFile").attr("checked", true);
                } 
				else {
                    $("#deleteAllWebdavFile").attr("checked", false);
                }
				
				if($(".delCheckBox:checked").length==1)
				{
					$("#webdav_Share_Button").show();
				}
				else
				{
					$("#webdav_Share_Button").hide();
				}
				
                if ($(".delCheckBox:checked").length >= 1) {
					
					
					$("#webdav_Delete_Button").show();
					$("#webdav_Upload_Button").hide();
					$("#webdav_Mkdir_Button").hide();
                    
                } 
				else {
                	
                	$("#webdav_Delete_Button").hide();
					$("#webdav_Upload_Button").show();
					$("#webdav_Mkdir_Button").show();
                }
					
            });

			$("#deleteAllWebdavFile").click(function() {
	            if ($("#deleteAllWebdavFile").attr("checked")) {
	                $(".delCheckBox").attr("checked", true);
	            } else
	                $(".delCheckBox").attr("checked", false);

				if($(".delCheckBox:checked").length==1)
				{
					$("#webdav_Share_Button").show();
				}
				else
				{
					$("#webdav_Share_Button").hide();
				}
				
	            if ($(".delCheckBox:checked").length >= 1)
	            {
					$("#webdav_Delete_Button").show();
					$("#webdav_Upload_Button").hide();
					$("#webdav_Mkdir_Button").hide();
	            }
	            else
	            {
                	$("#webdav_Delete_Button").hide();
					$("#webdav_Upload_Button").show();
					$("#webdav_Mkdir_Button").show();					
	            }
	        });

		}
				

	});	
	if(Order_Mode==1)
	{
		if(NameOrder_flag)
	    {
			NameOrder_flag=0;
	    }
		else
		{
			NameOrder_flag=1;
		}
		WebDav_NameOrderOnClick();
	}
	else if(Order_Mode==2)
	{
		
		if(SizeOrder_flag)
	    {
			SizeOrder_flag=0;
	    }
		else
		{
			SizeOrder_flag=1;
		}
		WebDav_SizeOrderOnClick();
	}
	else if(Order_Mode==3)
	{
		if(FileDateOrder_flag)
	    {
			FileDateOrder_flag=0;
	    }
		else
		{
			FileDateOrder_flag=1;
		}
		WebDav_FileDateOrderOnClick();
	}
	return 0;
}

var Pause_flag=0;
var Cancel_flag=0;


												//function WebDav_Upload_Pause() 
function WebDav_Upload_Pause()
{		
	if(Pause_flag==0)
	{
		Pause_flag=1;
		//document.getElementById('webdavuploadschedule_pause').value="Continue";
		document.getElementById('webdavuploadschedule_pause').value = jQuery.i18n.prop("webdavuploadschedule_continue");
	}
	else
	{
		Pause_flag=0;
		document.getElementById('webdavuploadschedule_pause').value = jQuery.i18n.prop("webdavuploadschedule_pause");
		//document.getElementById('webdavuploadschedule_pause').value="Pause";
		WebDav_Upload();
	}	
}

function WebDav_Upload_Cancel() 
{
	Cancel_flag=1;
	if(Pause_flag==1)
	{
		WebDav_Upload();
	}
}

function WebDav_Upload_Change() 
{
	Pause_flag=0;
	Cancel_flag=0;
	var file = document.getElementById('WebdavFileToUpload').files[0];

	sm("webdavuploadscheduleDlg", 450, 150);
	document.getElementById('webdavuploadschedule_FileName').innerHTML = file.name;	


	WebDav_Upload();

}
var fromSize=0;
var ToSize=0;
var total_file_size=0;
function WebDav_Upload_Ondoing() 
{
	
	if(Cancel_flag==1)
	{
		var cancelfilename=document.getElementById('webdavuploadschedule_FileName').innerHTML;

		WebDav_Delete(cancelfilename);
		fromSize=0;
		ToSize=0;
		setTimeout("clear_upload_barview_function();",100);
		if(isBrowser()=='Firefox')
		{
			$("#webdav_Upload_Button").replaceWith("<span class='btnWrp' id='webdav_Upload_Button' style='width:86px;'> <input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1260; filter:alpha(opacity:0);opacity: 0;'/> <input type='button' id='webdavUpload' value='Upload' style='width:86px;'/> </span>");
			buttonLocaliztion("webdavUpload");
			//$("#WebdavFileToUpload").replaceWith("<input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1080px; filter:alpha(opacity:0);opacity: 0;' />");
		}else if(isBrowser()=='Chrome')
		{
			$("#webdav_Upload_Button").replaceWith("<span class='btnWrp' id='webdav_Upload_Button' style='width:86px;'> <input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1260; filter:alpha(opacity:0);opacity: 0;'/> <input type='button' id='webdavUpload' value='Upload' style='width:86px;'/> </span>");
			buttonLocaliztion("webdavUpload");
			//$("#WebdavFileToUpload").replaceWith("<input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1180px; filter:alpha(opacity:0);opacity: 0;' />");
		}
		else
		{
			$("#webdav_Upload_Button").replaceWith("<span class='btnWrp' id='webdav_Upload_Button' style='width:86px;'> <input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1260; filter:alpha(opacity:0);opacity: 0;'/> <input type='button' id='webdavUpload' value='Upload' style='width:86px;'/> </span>");
			buttonLocaliztion("webdavUpload");
			//$("#WebdavFileToUpload").replaceWith("<input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1180px; filter:alpha(opacity:0);opacity: 0;' />");
		}
		
		return;
	}
	if(Pause_flag==1)
	{
		return;
	}
	else
	{
		if(ToSize==total_file_size)
		{	
			fromSize=0;
			ToSize=0;
			document.getElementById("bar").style.width = 100 + "%"; 
			document.getElementById("bar").innerHTML = document.getElementById("bar").style.width;
			setTimeout("clear_upload_barview_function();",800);
			
			WebDav_PROPFIND(Path_Name);
			if(isBrowser()=='Firefox')
			{
				
				$("#webdav_Upload_Button").replaceWith("<span class='btnWrp' id='webdav_Upload_Button' style='width:86px;'> <input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1260; filter:alpha(opacity:0);opacity: 0;'/> <input type='button' id='webdavUpload' value='Upload' style='width:86px;'/> </span>");
				buttonLocaliztion("webdavUpload");
				//$("#WebdavFileToUpload").replaceWith("<input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1080px; filter:alpha(opacity:0);opacity: 0;' />");
			}else if(isBrowser()=='Chrome')
			{
				//$("#WebdavFileToUpload").replaceWith("<input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1180px; filter:alpha(opacity:0);opacity: 0;' />");
				$("#webdav_Upload_Button").replaceWith("<span class='btnWrp' id='webdav_Upload_Button' style='width:86px;'> <input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1260; filter:alpha(opacity:0);opacity: 0;'/> <input type='button' id='webdavUpload' value='Upload' style='width:86px;'/> </span>");
				buttonLocaliztion("webdavUpload");
			}
			else
			{
				$("#webdav_Upload_Button").replaceWith("<span class='btnWrp' id='webdav_Upload_Button' style='width:86px;'> <input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1260; filter:alpha(opacity:0);opacity: 0;'/> <input type='button' id='webdavUpload' value='Upload' style='width:86px;'/> </span>");
				buttonLocaliztion("webdavUpload");
				//$("#WebdavFileToUpload").replaceWith("<input type='file' name='WebdavFileToUpload' id='WebdavFileToUpload' style='position:absolute; width:80px;height:30px;left:1180px; filter:alpha(opacity:0);opacity: 0;' />");
			}
		}
		else
		{
			var bar_length;
			bar_length=Math.floor((ToSize/total_file_size)*100);
			document.getElementById("bar").style.width = bar_length + "%"; 
			document.getElementById("bar").innerHTML = document.getElementById("bar").style.width;
			WebDav_Upload();
		}
	}

}


function WebDav_Upload() 
{		
	var file = document.getElementById('WebdavFileToUpload').files[0];
		if (window.FileReader )
		{
	  		if(file) 
	 		{ 	
	 			total_file_size=file.size;
	 			fromSize=ToSize;
	 			ToSize=ToSize+64 * 1024;
				if(ToSize>file.size)
				{
					ToSize=file.size;
				}
	 				
				var reader = new FileReader(); 	
				var blob;
				if(file.webkitSlice) 
				{
		     	 	blob = file.webkitSlice(fromSize, ToSize);
		   		}
		    	else if (file.mozSlice) 
		    	{
		      		blob = file.mozSlice(fromSize, ToSize );
		    	}
		    	else
		    	{
		    		blob=file.slice(fromSize,ToSize);
		    	}
				reader.onprogress=function(p)
				{												
					if (p.loaded)
					{
					}
					else {
					}
				}
				reader.onloadend = function() 
		 		{ 
					WebDav_PutSyncXML(Path_Name+file.name,file.type,fromSize,ToSize,file.size,reader.result);	
		 			if (reader.error) 
		 			{ 
					} 
					else 
					{
					}
		 		} 
			    if(isBrowser()=='IE')
	 			{ 			
	 				reader.readAsArrayBuffer(blob);
	 			}
	 			else
	 			{
	 				reader.readAsBinaryString(blob); 
	 			}						
	 		}
		}
		else
		{
			showAlert(jQuery.i18n.prop("lupdateBrowser"));
			return;
		}

		
}




		

