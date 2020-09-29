mode();
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function acceptAndCloseBanner(){
  document.getElementById('popup').style.visibility = "hidden";
  document.getElementById('popup_background').style.visibility = "hidden";
  d = new Date;
  setCookies('license', "accepted; expires=Thu, 31 Dec " + (d.getFullYear() + 1) + " 12:00:00 UTC")
}

function newpage(s){
  open(s);
}

function logout(){
  setCookies('username', '');
  setCookies('password', '');
  window.location.href='/#logout'
}

function checkLicense(){
  if(accessData('license') != 'accepted'){
    document.getElementById('popup').style.visibility = "visible";
    document.getElementById('popup_background').style.visibility = "visible";
    }
  }



function login(){
  if ((window.location.href).includes('https')){
    document.getElementById('logging').style.visibility='visible';
    document.getElementById('logging').style.height='auto';
    document.getElementById('br1').style.visibility='visible';
    document.getElementById('br2').style.visibility='visible';
    username = document.getElementById('loginusername').value;
    password = sha256(document.getElementById('loginpassword').value);
    setCookies('username', username)
    setCookies('password', password)
    window.location.replace("/admin/");
  } else {
    alert('You need to establish a secure (https) connection to be able to login')
  }
}

function checkHTTPS(){
  var url = window.location.href;
  if (!(url.includes('https'))) {
    if(!(url.includes("NOHTTPS"))){
    window.location.replace(url.replace("http://", "https://"));
    }
  }
}

function readCookies(){     
  return document.cookie;
}

function accessData(key){
  var data = readCookies();
  data = data.split("; ");
  for(var i=0;i<data.length;++i){
    data[i] = data[i];
  }
  for(i = 0; i<data.length; ++i){
    if(data[i].includes(key)){
      var result = data[i].split("=");

      return result[1].replace('%', '');
    }
  }
  console.warn('Key "'+key+'" was not found on cookies database!');
  return 0;
}

function pageCounter(){
  document.write("<p class=text>Total visits: "+accessData('counter')+"</p>");
}

function setCookies(key, value){
  document.cookie = key+'='+value+'; path=/';
  document.cookie = key+'='+value+'; path=/*';
}

function nextMode(){
  webmode = accessData('preferredMode')
  if (webmode == 'dark'){
    setCookies('preferredMode', 'light');
    document.getElementById("modeButtonText").innerHTML= "Light";
  } else if (webmode == 'light'){
    setCookies('preferredMode', 'auto');
    document.getElementById("modeButtonText").innerHTML= "Auto";
  } else if (webmode == 'auto'){
    setCookies('preferredMode', 'dark');;
    document.getElementById("modeButtonText").innerHTML= "Dark";
  }
  mode();
}

function returnMode() {
  webmode = accessData('preferredMode')
  if(webmode==0){
    document.cookie = 'preferredMode=auto';
    mode();
  } else if(webmode == 'auto'){
    return 'Auto'
  } else if (webmode == 'dark'){
    return 'Dark'
  } else if (webmode == 'light'){
    return 'Light'
  } else {
    document.cookie = 'preferredMode%=%auto';
  }
}

function mode() {
  webmode = accessData('preferredMode')
  if(webmode==0){
    document.cookie = 'preferredMode=auto';
    mode();
  } else if(webmode == 'auto'){
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.getElementById('style').href = "/DarkStyle.css";
    } else {
      document.getElementById('style').href = "/style.css";
    }
  } else if (webmode == 'dark'){
    document.getElementById('style').href = "/DarkStyle.css";
  } else if (webmode == 'light'){
    document.getElementById('style').href = "/style.css";
  } else {
    document.cookie = 'preferredMode%=%auto';
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    mode();
})



// NOMÉS /about/ 
function sendEmail2(){ // NOMÉS /about/ 
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


function checkAll(){
  if ((checkSubject()==0) && (checkEmail()==0) && (checkBody()==0) && (checkAgree()==0)){
    document.getElementById("sendButton").disabled = false;
    console.log('btn enabled')
  } else {
    checkSubject();
    checkEmail();
    checkBody();
    checkAgree();
    //document.getElementById("sendButton").disabled = true;
    console.log('btn disabled')

  }
}

function finalSend(){// NOMÉS /about/
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
function checkSubject(){// NOMÉS /about/
  subject = document.getElementById('subject').value
  if (subject.length<5) {
    document.getElementById('subjectCheck').style = 'color:red;'
      document.getElementById('subjectCheck').value = "❌ Too short!";
  } else {
    document.getElementById('subjectCheck').style = 'color:rgb(0, 250, 0);'
    document.getElementById('subjectCheck').value = "✔  OK";
    return(0)
  }
}
function checkEmail(){// NOMÉS /about/
  email = document.getElementById('email').value
  if (!(email.includes("@")) || !(email.includes('.'))) {
    document.getElementById('emailCheck').style = 'color:red;'
      document.getElementById('emailCheck').value = "❌ Invalid!";
  } else {
    document.getElementById('emailCheck').style = 'color:rgb(0, 250, 0);'
    document.getElementById('emailCheck').value = "✔  OK";
    return(0);
  }
}
function checkBody(){// NOMÉS /about/
  subject = document.getElementById('body').value
  if (subject.length<25) {
    document.getElementById('bodyCheck').style = 'color:red;'
      document.getElementById('bodyCheck').value = "❌ Too short!";
  } else {
    document.getElementById('bodyCheck').style = 'color:rgb(0, 250, 0);'
    document.getElementById('bodyCheck').value = "✔  OK";
    return(0);
  }
}
function checkAgree(){// NOMÉS /about/
  checked = document.getElementById('agree').checked
  if (!(checked)) {
    document.getElementById('agreeCheck').style = 'color:red;'
      document.getElementById('agreeCheck').value = "❌ You have to agree that!"
  } else {
    document.getElementById('agreeCheck').style = 'color:rgb(0, 250, 0);'
    document.getElementById('agreeCheck').value = "✔  OK"
    return(0)
  }
}

//només /about/
