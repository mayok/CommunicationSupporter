var flag = 0;
var obj = {};
function storeobj(id, email) {
  obj[id] = email;
  console.log(obj);
}
function getobj(id) {
  return obj[id];
}

function cElement(target_id, c, d, name, type) {
  var input = document.createElement("input");
  input.name  = name;
  input.type  = type;
  input.id    = c;
  input.value = d;

  var label = document.createElement("label");
  label.className = type;
  label.setAttribute("for", c);
  label.innerHTML = d;

  var target = document.getElementById(target_id);
  target.appendChild(input);
  target.appendChild(label);
}

function displayUser(json) {
  var target = Object.keys(json);
  for (var i=1; i <= target.length; ++i) {
    if(json[i]["e"] != "null" ) cElement("human", json[i]["c"], json[i]["d"], "user", "radio");
    storeobj(json[i]["c"], json[i]["e"]);
  }
}
function getUserList() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var json = JSON.parse(xmlhttp.responseText);
      displayUser(json);
    }
  }
  xmlhttp.open("GET", "getUserList.php", true);
  xmlhttp.send(null);
}

function sendmail(id, name, data, email) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState==4&&xmlhttp.status==200){
      // TODO: show success message
      console.log("readyState==4 && status==200");
    }
  }
  xmlhttp.open("POST", "sendmail.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("id="+id+"&name="+name+"&data="+data+"&email="+email);

  return;
}
function clickHandle() {
  if(flag) return;
  cElement("sign", "radio01", "キュート",   "status", "radio");
  cElement("sign", "radio02", "クール",     "status", "radio");
  cElement("sign", "radio03", "パッション", "status", "radio");
  cElement("sign", "radio04", "レッスン",   "status", "radio");
  cElement("sign", "radio05", "特訓",       "status", "radio");

  flag=1;
}
function changeHandle(evt) {
  var submit = document.getElementById("submit");

  if(!radio01.checked && !radio02.checked && !radio03.checked && !radio04.checked && !radio05.checked ) {
    if(submit.hasChildNodes()){
      document.getElementById("btn").removeEventListener("click", btnHandler, false);
      while (submit.firstChild) {
        submit.removeChild(submit.firstChild);
      }
    }
  }
  else {
    if(!submit.hasChildNodes()){
      var btn = document.createElement("button");
      btn.innerHTML = "送信";
      btn.setAttribute("id", "btn");
      document.getElementById("submit").appendChild(btn);

      btn.addEventListener("click", btnHandler, false);
    }
  }
}

function btnHandler(evt) {
  // search checked input
  var pi= document.getElementById("human").children;
  for (var i=0; i < pi.length; ++i) {
    if(pi[i].tagName == "INPUT" && pi[i].checked){
      var id = pi[i].id;
      var name = pi[i].value;
    }
  }
  var ci = document.getElementById("sign").children;
  for (var i=0; i < ci.length; ++i) {
    if(ci[i].tagName == "INPUT" && ci[i].checked)
      var data = ci[i].value;
  }

  sendmail(id, name, data, getobj(id));
}

window.onload=getUserList();
document.getElementById("human").addEventListener("click", clickHandle, false);
document.getElementById("sign").addEventListener("change", changeHandle, false);
