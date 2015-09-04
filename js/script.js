var flag = 0;
var oEmail = {};
var oMsg = {};
function storeobj(object, key, value) {
  object[key] = value;
}
function getobj(object, key) {
  return object[key];
}
function store(json) {
  for(var i=0; i<Object.keys(json[0]).length; ++i) {
    storeobj(oEmail, json[0][i]["c"], json[0][i]["e"]);
  }
  for(var i=0; i<Object.keys(json[1]).length; ++i) {
    storeobj(oMsg, i, json[1][i]);
  }
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
function getConfiguration() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState==4 && xmlhttp.status==200) {
      var json = JSON.parse(xmlhttp.responseText);
      store(json);
      loadHandle(json[0]);
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

function loadHandle(json) {
  for(var i=0; i<Object.keys(json).length; ++i) {
    if(json[i]["e"] != "null" ) {
      cElement("human", json[i]["c"], json[i]["d"], "user", "radio");
    }
  }
}
function clickHandle() {
  if(flag) return;
  for (var i=0; i < Object.keys(oMsg).length; ++i) {
    cElement("sign", "radio0"+i, oMsg[i], "status", "radio");
  }

  flag=1;
}
function changeHandle(evt) {
  var sign = document.getElementById("sign");
  var submit = document.getElementById("submit");
  var check;

  for(var i=0;i<sign.elements.length;i++) {
    if(!sign.elements[i].checked) {
      check = true;
    }
    else {
      check = false
    }
  }

  if(!check) {
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

  sendmail(id, name, data, getobj(oEmail, id));
}

window.onload=getConfiguration();
document.getElementById("human").addEventListener("click", clickHandle, false);
document.getElementById("sign").addEventListener("change", changeHandle, false);
