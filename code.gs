var SS_ID = "0Ah-cFZZzWnZMdEN1aHhHM3VhOTZYWS1pNzFDd2tNVEE";
var TXT_SVC_KEY = "9eab988c-03dd-4ea0-abbd-03fb0e9941de";
var TXT_PUB_KEY = "96b42876-5c72-43b6-be8f-415b3d3fb5ba";


function doGet(e) {
if(e.parameter.sms=="1")
return replySMS(e.parameter.service, e.parameter['txtweb-message']);
else
return HtmlService.createTemplateFromFile('uimgr').evaluate();
  
}


function sendReply(message){
var html="<html><head><title> Response </title><meta name=\"txtweb-appkey\" content=\""+TXT_SVC_KEY+"\" /></head><body>"+message+"<br />Advertisement: </body></html>";
return ContentService.createTextOutput(html)
      .setMimeType(ContentService.MimeType.TEXT);
      }



function sendEmailToAdmin(){

  var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Administrators");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var eList="";
  for (var i = 0; i <= numRows - 1; i++) {
    eList+=values[i][0]+",";
  }
  
  MailApp.sendEmail(eList,"e-Odyssey Registration Successful","",{ htmlBody:'<h3 style="background:#254A86; color: #FFFFFF; padding: 15px; font-size: 25px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Registration Successful</h3><p style="color:#254A86; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Hi, <br /> You have been successfully registered. Thank you for being a part of e-Odyssey!</p><p style="color:#4B8DF9; font-size:10px;">This e-Mail was automatically generated. Please do not reply to it. If you have anything to share, please <a href="http://e-odyssey.appspot.com">"Contact Us"</a></p> ' });


}

function getAdmins(){
var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Administrators");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var eList="";
  for (var i = 0; i <= numRows - 1; i++) {
    eList+=values[i][0]+",";
  }
  return eList;
  }


function doProcess(b){
initSheet();
var namepatt = /^[a-zA-Z .]{3,25}$/;
var usnpatt = /^1[bB][iI][0-9][0-9][cC][sS][0-9][0-9][0-9]$/;
var secpatt = /^[a-zA-Z]$/
var numpatt = /^[987][0-9]{9}$/
Logger.log(b.contact);
if(b.contact=="1"){
var namepatt = /^[a-zA-Z .]{3,25}$/;
if(b.namecontact=="" || !namepatt.test(b.namecontact) ){return "#namecontact";}
else if(b.emailcontact=="" || b.emailcontact.indexOf("@")==-1 || b.emailcontact.indexOf(".")==-1 ){return "#emailcontact";}
else if(b.textcontact=="") {return "#textcontact";}
MailApp.sendEmail(getAdmins(),"e-Odyssey : Contact Us Notification","",{ htmlBody:'<h3 style="background:#254A86; color: #FFFFFF; padding: 15px; font-size: 25px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">e-Odyssey: Contact Us - Response</h3><p style="color:#254A86; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Hi, <br /> A user tried to contact the e-Odyssey team from the "Contact Us" form of the website. The name of the user is '+b.namecontact+' ('+b.emailcontact+').<br /> Below is the message they have sent: <br /><p style="font-size: 18px;">'+b.textcontact+'</p></p><p style="color:#4B8DF9; font-size:10px;">You have received this email because you are one of the administrators of the e-Odyssey website. A Copy of this email has been sent to all administrators. Any one of them can reply to the user.</p> ' });
return 1;

}
b.usn=b.usn.toUpperCase();
b.sec=b.sec.toUpperCase();
b.email=b.email.toLowerCase();

if(b.name=="" || !namepatt.test(b.name) ){return "#name";}
else if(checkUSN(b.usn)){return "#chkusn";}
else if(b.usn=="" || !usnpatt.test(b.usn)){return "#usn";}
else if(b.sem=="" || b.sem<1 || b.sem>8 || isNaN(b.sem)){return "#sem";}
else if(b.sec=="" || !secpatt.test(b.sec)){return "#sec";}
else if(b.email=="" || b.email.indexOf("@")==-1 || b.email.indexOf(".")==-1 || checkEMail(b.email)){return "#email";}
else if(b.num=="" || !numpatt.test(b.phone)){return "#phone";}
else if(b.agreement!="1"){return "#agreement";}

insertData(b);
return 0;

}







function initSheet(){
var sheetinit = SpreadsheetApp.openById(SS_ID);

if(!sheetinit.getSheetByName("Members"))
    sheetinit.getSheets()[0].setName("Members");
    
if(!sheetinit.getSheetByName("Administrators")){
    sheetinit.insertSheet("Administrators",1);
    }
    
    if(!sheetinit.getSheetByName("HPage")){
    sheetinit.insertSheet("HPage",2);
    }
    
     if(!sheetinit.getSheetByName("Events")){
    sheetinit.insertSheet("Events",3);
    }
    
    if(!sheetinit.getSheetByName("Blog")){
    sheetinit.insertSheet("Blog",4);
    }
    
  sheetinit.setActiveSheet(sheetinit.getSheetByName("Members"));  
 }


function insertData(b){

var sheetinit = SpreadsheetApp.openById(SS_ID);
var sheet = sheetinit.getSheetByName("Members");
var row   = sheet.getLastRow() + 1;
/*
  sheet.getRange(row,1).setValue(b.name);
  sheet.getRange(row,2).setValue(b.usn);
  sheet.getRange(row,3).setValue(b.sem);
  sheet.getRange(row,4).setValue(b.sec);
  sheet.getRange(row,5).setValue(b.email);
  sheet.getRange(row,6).setValue(b.phone);
  
  */
  
  sheet.appendRow([b.name,b.usn,b.sem,b.sec,b.email,b.phone]);
  MailApp.sendEmail(b.email,"e-Odyssey Registration Successful","",{ htmlBody:'<h3 style="background:#254A86; color: #FFFFFF; padding: 15px; font-size: 25px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">e-Odyssey: Registration Successful</h3><p style="color:#254A86; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Hi '+b.name+', <br /> You have been successfully registered. Thank you for being a part of e-Odyssey!<br />Regards, <br />e-Odyssey team</p><p style="color:#4B8DF9; font-size:10px;">This e-Mail was automatically generated. Please do not reply to it. If you have anything to share, please <a href="http://e-odyssey.appspot.com">"Contact Us"</a></p> ' });
  
  }
  
  
  
  
  
  function checkUSN(usn) {
  var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Members");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    if(values[i][1] == usn) return true;
  }
  
  return false;
};
  
  
   function checkEMail(email) {
  var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Members");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();

  for (var i = 0; i <= numRows - 1; i++) {
    if(values[i][4] == email ) return true;
  }
  
  return false;
};
  
  
  function getHPData(){
  
   var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("HPage");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  return values;
  }
  
  
  function getHPNumRows(){
   var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("HPage");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  return numRows;
  }
  
  
   
  function getEventData(){
  
   var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Events");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  return values;
  }
  
    function getEventNumRows(){
   var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Events");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  return numRows;
  }
  
  
  
  
 



function parseRss(){
var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Blog");
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  return values;
  }
  
  
  
  
 function replySMS(service,message){
 
 
 if(service=="events"){
 
 var sheet = SpreadsheetApp.openById(SS_ID).getSheetByName("Events");
 var rows = sheet.getDataRange();
 var numRows = rows.getNumRows();
 var values = rows.getValues();
  var rtxt="";
  if(numRows==1) return sendReply("No Events found!");
  for (var i = 1; i <= numRows - 1; i++) {
    rtxt += i+" ."+values[i][0]+" by "+values[i][1]+" on "+values[i][2]+" at "+values[i][3]+"<br />";
  }
   return sendReply(rtxt);
 }
 
 else if(service=="about"){
 
 return sendReply("Started in 2004, e-Odyssey is a premier association of BIT's Computer Science Department. It aims at assisting members in aquisition of knowledge, organizing activities and motivating them to work collaboratively in implementing ideas and organizing seminars, workshops and other activities.Your support is invaluable to us. Get Started, register and join the epic journey!  ");
 
 }
 else if(service=="contact"){
 if(typeof message == 'undefined' || message=="") return sendReply("Please reply @eodyssey.contact followed by your email and message.");
 else {
 MailApp.sendEmail(getAdmins(),"e-Odyssey : SMS Contact Us Notification","",{ htmlBody:'<h3 style="background:#254A86; color: #FFFFFF; padding: 15px; font-size: 25px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">e-Odyssey: Contact Us - SMS Response</h3><p style="color:#254A86; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Hi, <br /> A user tried to contact the e-Odyssey team from the SMS service. <br /> Below is the message they have sent: <br /><p style="font-size: 18px;">'+message+'</p></p><p style="color:#4B8DF9; font-size:10px;">You have received this email because you are one of the administrators of the e-Odyssey website. A Copy of this email has been sent to all administrators. Any one of them can reply to the user.</p> ' });
 return sendReply("Your message was submitted successfully. We will get back to you shortly. ");
 }
 }
 
 else if(service=="submit"){
 
 if(typeof message == 'undefined' || message=="") return sendReply("Please reply @eodyssey.submit followed by your email, so that we can get back to you with instructions.");
 else {
 MailApp.sendEmail(getAdmins(),"e-Odyssey : SMS Submit Post Notification","",{ htmlBody:'<h3 style="background:#254A86; color: #FFFFFF; padding: 15px; font-size: 25px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">e-Odyssey: Submit a Post - SMS Response</h3><p style="color:#254A86; font-size: 20px; font-family: \'Trebuchet MS\', Helvetica, sans-serif;">Hi, <br /> A user tried to contact the e-Odyssey team from the SMS service to make a new post. <br /> Their email is as follows:  <br /><p style="font-size: 18px;">'+message+'</p></p><p style="color:#4B8DF9; font-size:10px;">You have received this email because you are one of the administrators of the e-Odyssey website. A Copy of this email has been sent to all administrators. Any one of them can reply to the user.</p> ' });
 return sendReply("Your request was submitted successfully. We will get back to you shortly. ");
 }
 
 }
 
 
 
 
 }
  
  
  
  
  
  function refreshBlog(){
  
  
  initSheet();
   var ec = [["&#8211;","–"],["&#8212;","—"],["&#8216;","'"],["&#8217;","'"],["&#8218;","‚"],["&#8220;",'"'],["&#8221;",'"'],["&#8222;","„"],["&#8226;","•"],["&#8364;","€"],["&#8482;","™"], ["&amp;","&"], ["&#8230", "..." ], ["\\[\\.\\.\\.\\]",""]];
   var sheetinit = SpreadsheetApp.openById(SS_ID);
   var sheet = sheetinit.getSheetByName("Blog");
   var row   = sheet.getLastRow() + 1;    
    for(var k=2;k<row;k++){
       if( sheet.getRange(k,2).getValues()[0][0]!="1"){
       
       var response = UrlFetchApp.fetch(sheet.getRange(k,1).getValues()[0][0]+"?feed=rss2&withoutcomments=1");
   var iso = response.getContentText();
    for(var i=0; i<ec.length; i++){
      var re = new RegExp(ec[i][0],"g");
      iso=iso.replace(re,ec[i][1]);
      }
    var xml = Xml.parse(iso, false);
    var itemArray = xml.getElement().getElement("channel").getElements("item"); // feed element
    for(i=0; i<itemArray.length; i++)
    {
        
        var e = itemArray[i];
        var blogTitle=e.getElement("title").getText();
        var blogLink=e.getElement("link").getText();
        var blogCommentsLink=e.getElement("comments").getText();
        var blogDesc=e.getElement("description").getText().replace(/<(?:.|\n)*?>/gm, '');;
        var blogContent=e.getElement("http://purl.org/rss/1.0/modules/content/","encoded").getText().replace(/<(?:.|\n)*?>/gm, '');
        var blogNumComments=e.getElement("http://purl.org/rss/1.0/modules/slash/","comments").getText().replace(/<(?:.|\n)*?>/gm, '');
        var blogCreator=e.getElement("http://purl.org/dc/elements/1.1/","creator").getText();
        var blogDate=new Date(e.getElement("pubDate").getText());
        sheet.getRange(k,3).setValue(blogTitle);
        sheet.getRange(k,4).setValue(blogLink);
        sheet.getRange(k,5).setValue(blogCommentsLink);
        sheet.getRange(k,6).setValue(blogDesc);
        sheet.getRange(k,7).setValue(blogContent);
        sheet.getRange(k,8).setValue(blogNumComments);
        sheet.getRange(k,9).setValue(blogCreator);
        sheet.getRange(k,10).setValue(blogDate);
        //sheet.appendRow([blogTitle,blogLink,blogCommentsLink,blogDesc,blogContent,blogNumComments,blogCreator,blogDate]);
        
     }
   
  
       
       sheet.getRange(k,2).setValue("1");
       }
  }
  
   
 
  
  
  }