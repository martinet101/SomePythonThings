function checkHTTPS(){
  var url = window.location.href;
  if (!(url.includes('https'))) {
    window.location.replace(url.replace("http://", "https://"));
    
  }
}











// NOMÉS contactUs.html 
function sendEmail2(){// NOMÉS contactUs.html 
  if ((checkSubject()==0) && (checkEmail()==0) && (checkBody()==0) && (checkAgree()==0)) {
    finalSend();
  } else{
    checkSubject();
    checkEmail();
    checkBody();
    checkAgree();
    alert("Check the fields and try again.")
  }
}
function finalSend(){// NOMÉS contactUs.html 
  if (document.getElementById('agree').checked == true){
    Email.send({
        SecureToken : "70d2f234-fa89-4e5a-891a-2051994cb8dd",
        To : 'somepythonthingschannel@gmail.com',
        From : "somepythonthingschannel@gmail.com",
        Subject : "Mail from www.somepythonthings.tk - "+document.getElementById('subject').value,
        Body : "Recieved Mail from: "+document.getElementById('email').value+"        Body: "+document.getElementById('body').value
    }).then(
      message => alert("You've recieved a copy of the mail. Check the \"junk emails\" folder!")
    );
    Email.send({
        SecureToken : "70d2f234-fa89-4e5a-891a-2051994cb8dd",
        To : document.getElementById('email').value,
        From : "somepythonthingschannel@gmail.com",
        Subject : "You sent an email to somepythonthingschannel@gmail.com.",
        Body : "We will try to answer you in a few days. The email body was: "+document.getElementById('body').value
    }).then(
      message => alert("Processing... "+message)
    );
  } else {alert("You have to accept the conditions and terms");} 
}
function checkSubject(){// NOMÉS contactUs.html 
  subject = document.getElementById('subject').value
  if (subject.length<5) {
      document.getElementById('subjectCheck').value = "❌ Too short!"
  } else {
    document.getElementById('subjectCheck').value = ""
    return(0)
  }
}
function checkEmail(){// NOMÉS contactUs.html 
  email = document.getElementById('email').value
  if (!(email.includes("@")) || !(email.includes('.'))) {
      document.getElementById('emailCheck').value = "❌ Invalid!"
  } else {
    document.getElementById('emailCheck').value = ""
    return(0)
  }
}
function checkBody(){// NOMÉS contactUs.html 
  subject = document.getElementById('body').value
  if (subject.length<25) {
      document.getElementById('bodyCheck').value = "❌ Too short!"
  } else {
    document.getElementById('bodyCheck').value = ""
    return(0)
  }
}
function checkAgree(){// NOMÉS contactUs.html 
  checked = document.getElementById('agree').checked
  if (!(checked)) {
      document.getElementById('agreeCheck').value = "❌ You have to agree that!"
  } else {
    document.getElementById('agreeCheck').value = ""
    return(0)
  }
}


/*6B4F79F73D3D5DB3C78CB87821FD9C852DAF*/ /*Passwd for SPTChannel*/
/*70d2f234-fa89-4e5a-891a-2051994cb8dd*/ /*Security Token*/








//només licenseTerms.html

