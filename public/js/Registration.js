
function CheckValidation() {

    if(isValidate==true){
    var firstname=document.getElementById('jobseekerfirstname');
    var lastname=document.getElementById('jobseekerlastname');
    var fathername=document.getElementById('fathersname');
    var Phone=document.getElementById('Phone');
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       
    if ($.trim(jQuery('#jobseekerfirstname').val())== '') {
        $(window).scrollTop(0);
        getvalidated('jobseekerfirstname','text','Frist Name');
        return false;

        
    }
    if(firstname.value.length < 2 && firstname.value.length > 0 ){
        checkLength('jobseekerfirstname','First Name','2');
        return false;




    }
    if ($.trim(jQuery('#jobseekerlastname').val()) == '') {
        $(window).scrollTop(0);
        getvalidated('jobseekerlastname','text','Last Name'); 
        return false;
    }
    if(lastname.value.length < 3 && lastname.value.length > 0 ){
        checkLength('jobseekerlastname','Last Name','3');
        return false;
    }
   
    if (jQuery('#fathersname').val() == '') {
        $(window).scrollTop(0);
        getvalidated('fathersname','text','Guardian/Father Name','3'); 
        return false;
    }
    if(fathername.value.length < 3 && fathername.value.length > 0 ){
        checkLength('fathersname','Guardian/Father Name','3');
        return false;
    }
    if (jQuery('#gender').val() == '0') {
        $(window).scrollTop(0);
        getvalidated('gender','select','Gender'); 
        return false;
    }
     
   
    if (jQuery('#district').val() == '99999') {
        $(window).scrollTop(0);
        getvalidated('district','select','District'); 
        return false;
    }
   
    if (jQuery('#city').val() == '99999') {
        $(window).scrollTop(0);
        getvalidated('city','select','City'); 
        return false;
    }
    if (jQuery('#Village').val() == '99999') {
        $(window).scrollTop(0);
        getvalidated('Village','select','City/Village'); 
        return false;
    }
    if (jQuery('#Phone').val() == '') {
        $(window).scrollTop(0);
        getvalidated('Phone','number','Mobile Number'); 
        return false;
    }
    if (jQuery('#Phone').val() != '' && Phone.value.length!=10) {
        getvalidated('Phone','number','Mobile Number');
        return false; }
    if (jQuery('#Email').val() == '') {
        $(window).scrollTop(0);
        getvalidated('Email','email','Email'); 
        return false;
    }
  if (jQuery('#idtype').val() == '0') {
        getvalidated('idtype','select','Identification');
        return false; 
    }
    
     if (jQuery('#idinput').val() == '') {
        if (jQuery('#idtype').val() == '0'){
            getvalidated('idinput','text','Identification Number'); 
            return false;
        }
        if (jQuery('#idtype').val() == 'Aadhaar Card'){
        getvalidated('idinput','text','Aadhaar Number'); 
        return false;
    }
    if (jQuery('#idtype').val() == '2'){
        getvalidated('idinput','text','Pan Card Number'); 
        return false;
    }
    if (jQuery('#idtype').val() == '3'){
        getvalidated('idinput','text','Passport Number');
        return false; 
    }
    if (jQuery('#idtype').val() == '4'){
        getvalidated('idinput','text','Driving License Number'); 
        return false;
    }
}
    
     if (jQuery('#username').val() == '0') {
        getvalidated('username','select','User Name'); 
        return false;
    }
    
     if (jQuery('#passwordfield').val() == '') {
        getvalidated('passwordfield','text','Password'); 
        return false;
 }

    if (jQuery('#Repassword').val() == '') {
        getvalidated('Repassword','text','Confirm Password'); 
       
        return false;
    }
    if ($("#Declaration").is(":checked"))
    
    { 
        $("#validDeclaration").html("");
    }

    else{
         $("#validDeclaration").html("Please accept declaration");
         return false;
    }
    if (jQuery('#passwordfield').val() != jQuery('#Repassword').val()) {
    
        $("#validRepassword").html("Password not matched");
        $("#Repassword").css('border-color', 'red');
         
        
    }
    if(jQuery('#passwordfield').val() != ''){
        passvldt();
    }   
}
else{
    InsUpdRegistration();
}   
               
};

$("#Repassword").focusout(function () {
    $("#validRepassword").html("");
    $("#Repassword").css('border-color', '');
    if (jQuery('#Repassword').val() == ''){
        getvalidated('Repassword','text','Confirm Password');
    }
     if (jQuery('#passwordfield').val() != jQuery('#Repassword').val()) {
    
        $("#validRepassword").html("Password not matched");
        $("#Repassword").css('border-color', 'red');
         
        
    }
});

$("#city").focusout(function(){
    if(jQuery("#district").val()=='99999'){
        getvalidated('district','select','District First');
    }
    else {getvalidated('city','select','Tehsil');
}
});
$("#Village").focusout(function(){
    if(jQuery("#city").val()=='99999'){
        getvalidated('city','select','Tehsil First');
    }
    else {getvalidated('Village','select','City/Village');
}
})

function InsUpdRegistration() {

    var MasterData = {
        "p_Candidateid": '0',
        "p_RegistrationId":$.trim(jQuery("RegistrationId").val()),
        "p_FirstName":$.trim(jQuery("#FirstName").val()),
        "p_LastName": jQuery("#LastName").val(),
        "p_GuardianFatherName": jQuery("#GuardianFatherName").val(),
        "p_Gender": jQuery("#Gender").val(),
        "p_VillageId": jQuery("#VillageId").val(),
        "p_DistrictId": jQuery("#DistrictId").val(),
        "p_CityId":jQuery("#p_CityId").val(),
        "p_UniqueIdentification": jQuery("#UniqueIdentification").val(),
        "p_MobileNumber": jQuery("#MobileNumber").val(),
        "p_EmailId": jQuery("#EmailId").val(),
        "p_UserName": jQuery("#UserName").val(),
        "p_Password": md5(jQuery("#Password").val()),
    }
    MasterData = JSON.stringify(MasterData)
    var path = serverpath + "registration";
    ajaxpost(path, 'parsrdataregistration', 'comment', MasterData, 'control')
}
function parsrdataregistration(data) {
    data = JSON.parse(data);
    if(!Array.isArray(data) || !Array.isArray(data[0])) {
        return;
    }
    if(data.errno || data.status==504) {
        toastr.warning("Something went wrong Please try again later", "", "info")
        return false;
    }
 else   if (data[0][0].ReturnValue == "1") {
        toastr.warning("You Are Already Registered", "", "info")
        return false;
    }
    else if (data[0][0].ReturnValue == "2") {

        sessionStorage.setItem("CandidateName", data[0][0].CandidateName);
        sessionStorage.setItem("RegistrationId", data[0][0].RegistrationId);
        sessionStorage.setItem("Username", data[0][0].Username);
        sessionStorage.setItem("Password", data[0][0].Password);
        sessionStorage.setItem("EmailId", data[0][0].EmailId);
        sessionStorage.setItem("CandidateId", data[0][0].CandidateId);
       // Counter();
        ValidateLogin() ;
       // InsUpdotp('Verify',data[0][0].CandidateId,'email') ;
    }
}
$("#passwordfield").focusout(function () {
    getvalidated('passwordfield','text','Password')
    $("#passwordvalidate").html("")
});
function passvldt(){
    var password = $("#passwordfield").val();
    if (password != '') {
        var regularExpression = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
      
        if (!regularExpression.test(password)) {
            $("#passwordvalidate").html("Password must contain atleast one letter, atleast one number, and be longer than 8 charaters");
   return false;
        }
        else {
            $("#passwordvalidate").html('')
      if(isCaptchaValidated){
        validateCaptcha();
      }
      else{
        InsUpdRegistration();
      }
                
           
        }
    }
}

$("#passwordfield").keyup(function (e) {
    var keyCode = e.which;
    var shiftPressed = (window.Event) ? e.modifiers & Event.SHIFT_MASK : e.shiftKey;

    if ( !( (!shiftPressed && keyCode >= 48 && keyCode <= 57) 
    ||(keyCode >= 65 && keyCode <= 90) 
    || (keyCode >= 97 && keyCode <= 122) ) 
    && keyCode != 8 && keyCode != 32) {
        //console.log(keyCode)
 
    $("#passwordvalidate").html("Please do not enter special character")
    }else{
    var password = $("#passwordfield").val();
    var regularExpression = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;
    
    if (!regularExpression.test(password)) {
    $("#passwordvalidate").html("Password must contain atleast one letter, atleast one number, and be longer than 8 charaters");
    }
    else {
    $("#passwordvalidate").html("");
    }
    }
    });

function FillDistrict(stateid) {
    jQuery.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: serverpath + "district/'"+stateid+"'/0/1/0",
        cache: false,
        dataType: "json",
        success: function (data) {
            jQuery("#district").empty();
            jQuery("#district").append(jQuery("<option ></option>").val("99999").html("Select District"));
            for (var i = 0; i < data[0].length; i++) {
                jQuery("#district").append(jQuery("<option></option>").val(data[0][i].DistrictId).html(data[0][i].DistrictName));
            }
            if(stateid=='0'){
                jQuery('#district').val('209')
            }
        },
        error: function (xhr) {
            toastr.success(xhr.d, "", "error")
            return true;
        }
    });
}
jQuery('#district').on('change', function () {
    FillCity(jQuery('#district').val());
    
    FillVillage('99999');
    if(jQuery('#district').val()=='213'){
        $('#myModalcontact').modal('toggle');
    }
});

function FillCity(district) {
    jQuery.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: serverpath + "city/" + district + "/0/0/0",
        cache: false,
        dataType: "json",
        success: function (data) {
            var data1 = data[0];
            jQuery("#city").empty();
            jQuery("#city").append(jQuery("<option ></option>").val("99999").html("Select Tehsil"));
            for (var i = 0; i < data1.length; i++) {
                jQuery("#city").append(jQuery("<option></option>").val(data1[i].CityId).html(data1[i].CityName));
            }
        },
        error: function (xhr) {
            //swal(xhr.d, "", "error")
        }
    });
}
jQuery('#city').on('change', function () {
    FillVillage(jQuery('#city').val());
});

function FillVillage(city) {
    jQuery.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: serverpath + "village/" + city + "/0/0/0",
        cache: false,
        dataType: "json",
        success: function (data) {
            var data1 = data[0];
            jQuery("#Village").empty();
           
           
            jQuery("#Village").append(jQuery("<option ></option>").val("99999").html("Select City/Village"));
            jQuery("#Village").append(jQuery("<option ></option>").val("89898").html("Other"));
            for (var i = 0; i < data1.length; i++) {
                jQuery("#Village").append(jQuery("<option></option>").val(data1[i].VillageId).html(data1[i].VillageName));
            }
        },
        error: function (xhr) {
            //swal(xhr.d, "", "error")
        }
    });
}

function resetMode() {
    jQuery("#jobseekerfirstname").val(""),
        jQuery("#jobseekermiddlename").val(""),
        jQuery("#jobseekerlastname").val(""),
        jQuery("#fathersname").val(""),
        jQuery("#gender option:selected").val('0'),
        jQuery("#district option:selected").val('0'),
        jQuery("#city option:selected").val('99999'),
        jQuery("#idtype option:selected").val('0'),
        jQuery("#idinput").val(""),
        jQuery("#Phone").val(""),
        jQuery("#Email").val(""),
        jQuery("#username option:selected").val('0'),
        jQuery("#passwordfield").val(""),
        jQuery("#Repassword").val(""),
        jQuery("#cpatchaTextBox").val("")
}
var code;
function createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
        "0123456789";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 100;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
    event.preventDefault();

    if (document.getElementById("cpatchaTextBox").value == code) {
        InsUpdRegistration();

    } else {
        createCaptcha();
        jQuery("#cpatchaTextBox").val("");
        getvalidated('cpatchaTextBox','text','Valid Captcha')
       
    }
}



$(".toggle-password").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});


function placeholder() {
    getvalidated('idtype','select','Identification');
    var sel = document.getElementById("idtype");
    var textbx = document.getElementById("idinput");
    var indexe = sel.selectedIndex;
    $("#valididinput").html("");
    $("#idinput").css('border-color', '');
    $("#idinput").val("")
    if (indexe == 0) {
        $("#idinput").attr("placeholder", "Identification Number");
        
    }
    if (indexe == 1) {
        $("#idinput").attr("placeholder", "Aadhaar Card Number");

    }
    if (indexe == 2) {
        $("#idinput").attr("placeholder", "PAN Card Number");
    }
    if (indexe == 3) {
        $("#idinput").attr("placeholder", "Passport Number");
    }
    if (indexe == 4) {
        $("#idinput").attr("placeholder", "Driving License Number");
    }
}





$("#idinput").keypress(function () {
   
    var sel = document.getElementById("idtype");
    var textbx = document.getElementById("idinput");
    var indexe = sel.selectedIndex;
    if (indexe == 0) {
        if (this.value.length >= 12) { return false; }
        return event.charCode >= 48 && event.charCode <= 57;
   
    }
    if (indexe == 1) {
        if (this.value.length >= 12) { return false; }
        return event.charCode >= 48 && event.charCode <= 57;
    }
    if (indexe == 2) {
        if (this.value.length >= 10) { return false; }

    }
    if (indexe == 3) {
        if (this.value.length >= 9) { return false; }

    }
    
});

$("#idinput").focusout(function () {
   
    var sel = document.getElementById("idtype");
    var textbx = document.getElementById("idinput");
    var indexe = sel.selectedIndex;
    var Idnumb = $("#idinput").val();
    if (Idnumb != '') {
       
            getvalidated('idinput','text','Adhar Number');
            
            if (Idnumb >= 100000000000 && Idnumb <= 999999999999) {
        if(isValidate){
                if(validate(Idnumb) == false) {
                    $("#idinput").focus();
                    $("#idinput").val("");
                    $("#valididinput").html("Invalid Aadhaar Number");
                    return false;
                }
                else {
                    return true;
                }
            }
            }
            else {
                $("#idinput").focus();
                $("#idinput").val("");
                $("#valididinput").html("Aadhaar Number Should Be 12 Digits");
                return false;
            }
        

        if (indexe == 2) {
            getvalidated('idinput','text','Pan Card Number')
            var regpan = /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/;
            if (Idnumb.match(regpan)) {
                
                return true;
            }
            else {
                $("#idinput").focus();
                $("#idinput").val("");
                $("#valididinput").html("Please Enter Valid Pan Card Number");
                return false;
            }
        }

        if (indexe == 3) {
            getvalidated('idinput','text','Passport Number')
            var regsaid = /^[A-Z]{1}-[0-9]{7}?$/;
            if (Idnumb.match(regsaid)) {
               
                return true;
            }
            else {
                $("#idinput").focus();
                $("#idinput").val("");
                $("#valididinput").html("Please Enter Valid Passport Number");
                return false;
            }
        }

        
    }
    if (Idnumb == '') {
        if (indexe == 1) {

            getvalidated('idinput','text','Adhar Number')
        }

        if (indexe == 2) {
            getvalidated('idinput','text','Pan Card Number')
        }

        if (indexe == 3) {
            getvalidated('idinput','text','Passport Number')
        }

        if (indexe == 4) {
            getvalidated('idinput','text','Driving License Number')
        }
    }
});


$("#jobseekerfirstname").focusout(function(){
if(this.value==''){
    getvalidated('jobseekerfirstname','text','First Name')
}
else{
    checkLength('jobseekerfirstname','First Name','2');
}
});
$("#jobseekerlastname").focusout(function(){
    if(this.value==''){
        getvalidated('jobseekerlastname','text','Last Name')
    }
    else{
        checkLength('jobseekerlastname','Last Name','3');
    }
    });
    $("#fathersname").focusout(function(){
        if(this.value==''){
            getvalidated('fathersname','text','Guardian/Father Name')
        }
        else{
            checkLength('fathersname','Guardian/Father Name','3')
        }
        });

function InsUpdotp(Type,Id,verificationtype) {

 sessionStorage.verifytype=verificationtype;
 
var  generateOTPmaster =generateOTP();
sessionStorage.emailOTP=generateOTPmaster;
sessionStorage.emailval=$("#Email").val();
    var MasterData = {
            "p_CandidateId" : Id,
            "p_Flag" : verificationtype,
            "p_FlagValue" :generateOTPmaster,
            "p_Type":Type
          
    }
    MasterData = JSON.stringify(MasterData)
    var path = serverpath + "jobseeker_verification";
    ajaxpost(path, 'parsrdataemailverification', 'comment', MasterData, 'control')
}
function parsrdataemailverification(data) {
    data = JSON.parse(data)

    if (data[0][0].ReturnValue == "3") {
        InsUpdotp1('Verify',sessionStorage.getItem("CandidateId"),'mobile') ;
        return true;
       
    }
    else if (data[0][0].ReturnValue == "4") {
      if(sessionStorage.verifytype=='email'){
       InsUpdotp('Verify',sessionStorage.CandidateId,'mobile') ;
       
      }
      else{
       window.location = '/SuccessRegistration'

      }
  
    }
    else if (data[0][0].ReturnValue == "5") {
        
        toastr.warning("Please Enter Correct OTP", "", "info")
        return true;
    }
}


function updotp() {


    var MasterData = {
            "p_CandidateId" : sessionStorage.getItem("CandidateId"),
            "p_Flag" : "email",
            "p_FlagValue" : jQuery('#checkotp').val(),
            "p_IsVerified" : "n",
           
    }
    MasterData = JSON.stringify(MasterData)
    var path = serverpath + "jobseeker_verification";
    ajaxpost(path, 'parsrdataverify', 'comment', MasterData, 'control')
}
function parsrdataverify(data) {
    data = JSON.parse(data)

    if (data[0][0].ReturnValue == "3") {
   
     }
    else if (data[0][0].ReturnValue == "4") {
       // $("#verify").html("Verified");
        toastr.warning("Verified Succcessfully", "", "info")

        return true;
      
    }
}

generateOTP
function sendmsg(Msg,Mobile){
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://control.msg91.com/api/postsms.php",
    "method": "POST",
    "headers": {
    "content-type": "application",
    "Access-Control-Allow-Origin": "http://localhost:3200/"
    },
    "data": "<MESSAGE> <AUTHKEY>264840AT4bfsGwDs5c74e909</AUTHKEY> <SENDER>Rojgar</SENDER><CAMPAIGN>MPRojgar</CAMPAIGN> <COUNTRY>+91</COUNTRY> <SMS TEXT=\""+Msg+"\" > <ADDRESS TO=\""+Mobile+"\"></ADDRESS></SMS> </MESSAGE>"
    }
    $.ajax(settings).done(function (response) {
    
    });
    }
       
    function InsUpdotp1(Type,Id,verificationtype) {

        sessionStorage.verifytype=verificationtype;
        if (Type=="Verify"){
        var generateOTPmaster =generateOTP();
        sessionStorage.mobileOTP=generateOTPmaster;
        sessionStorage.mobileval=$("#Phone").val();
        //sendmsg(generateOTPmaster,jQuery("#Phone").val())
        }
        
        if (Type=="Match" && verificationtype=='email') {
        var generateOTPmaster =$("#checkemailotp").val(); 
        
        }
        if (Type=="Match" && verificationtype=='mobile'){ 
        var generateOTPmaster =$("#checkotp").val();
        }
        
        var MasterData = {
        "p_CandidateId" : Id,
        "p_Flag" : verificationtype,
        "p_FlagValue" :generateOTPmaster,
        "p_Type":Type
        
        }
        MasterData = JSON.stringify(MasterData)
        var path = serverpath + "jobseeker_verification";
        ajaxpost(path, 'parsrdataemailverification1', 'comment', MasterData, 'control')
        }
        
        function parsrdataemailverification1(data) {
        data = JSON.parse(data)
        
        if (data[0][0].ReturnValue == "3") {
        window.location = '/SuccessRegistration'
        return true;
        }
        else if (data[0][0].ReturnValue == "4") {
        
        if(sessionStorage.verifytype=='email'){
        InsUpdotp('Verify',sessionStorage.CandidateId,'mobile') ;
        
        }
        
        }
        else if (data[0][0].ReturnValue == "5") {
        
        toastr.warning("Please Enter Correct OTP", "", "info")
        return true;
        }
        }

function alphabets(){
  $('#jobseekerfirstname').keypress(function (e) {
    var k = e.which;
    var ok = k >= 65 && k <= 90 || // A-Z
       k >= 97 && k <= 122  // a-z
      

    if (!ok){
      e.preventDefault();
    }
});
}

// function alphabet(){
//     $('#fathersname').keypress(function (e) {
//       var k = e.which;
//       var ok = k >= 65 && k <= 90 || // A-Z
//          k >= 97 && k <= 122||  // a-z
//         k == 46;
  
//       if (!ok){
//         e.preventDefault();
//       }
//   });
//   }
function ValidateLogin() {
    var MasterData = {
          
      "p_UserId":sessionStorage.getItem("Username"),
      "p_Password": sessionStorage.getItem("Password")
  };
  MasterData = JSON.stringify(MasterData)
  var path = serverpath + "validatelogin";
  ajaxpost(path, 'parsedatalogin', 'comment', MasterData, 'control');
  
  }   
  function parsedatalogin(data){   
    data = JSON.parse(data)
    if (data.result.userDetails){
      if (data.result.userDetails.ReturnValue == "1" ||data.result.userDetails.ReturnValue == "2") {
      Cookies.set('RegistrationId', data.result.userDetails.RegistrationId, { expires: 1, path: '/' });
        sessionStorage.setItem("token", data.result.token);
        sessionStorage.setItem("refreshToken", data.result.refreshToken)
        sessionStorage.setItem("RegistrationId", data.result.userDetails.RegistrationId);
        sessionStorage.setItem("CandidateId", data.result.userDetails.CandidateId);
        sessionStorage.setItem("CandidateName", data.result.userDetails.CandidateName);
        sessionStorage.setItem("MobileNumber", data.result.userDetails.MobileNumber);
        sessionStorage.setItem("EmailId", data.result.userDetails.EmailId);
        Cookies.set('modaltype', "", { expires: 1, path: '/' });
        Cookies.set('RegistrationId', data.result.userDetails.RegistrationId, { expires: 1, path: '/' });
        Cookies.set('CandidateName', data.result.userDetails.CandidateName, { expires: 1, path: '/' });
        Cookies.set('MobileNumber', data.result.userDetails.MobileNumber, { expires: 1, path: '/' });
        Cookies.set('EmailId', data.result.userDetails.EmailId, { expires: 1, path: '/' });
        Cookies.set('CandidateId', data.result.userDetails.CandidateId, { expires: 1, path: '/' });
        Cookies.set('FirstName', data.result.userDetails.FirstName, { expires: 1, path: '/' });
        sessionStorage.setItem("CandidateDistrictName", data.result.userDetails.DistrictName);
        // window.location = '/Profilereg'
        window.location = '/RegistrationSuccess'
  
    }
    }
    
    else{
      toastr.warning(data, "", "info")
    }
  }
  function FillResident(funct,control) {
    var path =  serverpath + "Resident/0/0"
    securedajaxget(path,funct,'comment',control);
   }
   
   function parsedatasecuredFillResident(data,control){  
    data = JSON.parse(data)
    if (data.message == "New token generated"){
        sessionStorage.setItem("token", data.data.token);
        FillResident('parsedatasecuredFillResident','resident');
    }
    else if (data.status == 401){
        toastr.warning("Unauthorized", "", "info")
        return true;
    }
      else if(data.errno) {
           toastr.warning("Something went wrong Please try again later", "", "info")
           return false;
       }
   
        else{
            jQuery("#"+control).empty();
            var data1 = data[0];
            for (var i = 0; i < data1.length; i++) {
                jQuery("#"+control).append(jQuery("<option></option>").val(data1[i].Resident_id).html(data1[i].Resident_name));
             }
        }
              
   }
  