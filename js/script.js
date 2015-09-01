var flag = 0;

function sendmail(id, name, data) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState==4&&xmlhttp.status==200){
      // TODO: show success message
      console.log("readyState==4 && status==200");
    }
  }
  xmlhttp.open("POST", "sendmail.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("id="+id+"&name="+name+"&data="+data);

  return;
}
function clickHandle() {
  if(flag) return;
  // create input elements
  var input1 = document.createElement("input"),
      input2 = document.createElement("input"),
      input3 = document.createElement("input"),
      input4 = document.createElement("input"),
      input5 = document.createElement("input");

  input1.type = "radio";
  input2.type = "radio";
  input3.type = "radio";
  input4.type = "radio";
  input5.type = "radio";

  input1.name = "status";
  input2.name = "status";
  input3.name = "status";
  input4.name = "status";
  input5.name = "status";

  input1.value = "キュート";
  input2.value = "クール";
  input3.value = "パッション";
  input4.value = "レッスン";
  input5.value = "特訓";

  input1.setAttribute("id", "radio01");
  input2.setAttribute("id", "radio02");
  input3.setAttribute("id", "radio03");
  input4.setAttribute("id", "radio04");
  input5.setAttribute("id", "radio05");

  // create label elements
  var label1 = document.createElement("label"),
      label2 = document.createElement("label"),
      label3 = document.createElement("label"),
      label4 = document.createElement("label"),
      label5 = document.createElement("label");

  label1.innerHTML = "キュート";
  label2.innerHTML = "クール";
  label3.innerHTML = "パッション";
  label4.innerHTML = "レッスン";
  label5.innerHTML = "特訓";

  label1.className = "radio";
  label2.className = "radio";
  label3.className = "radio";
  label4.className = "radio";
  label5.className = "radio";

  label1.setAttribute("for", "radio01");
  label2.setAttribute("for", "radio02");
  label3.setAttribute("for", "radio03");
  label4.setAttribute("for", "radio04");
  label5.setAttribute("for", "radio05");

  document.getElementById("sign").appendChild(input1);
  document.getElementById("sign").appendChild(label1);

  document.getElementById("sign").appendChild(input2);
  document.getElementById("sign").appendChild(label2);

  document.getElementById("sign").appendChild(input3);
  document.getElementById("sign").appendChild(label3);

  document.getElementById("sign").appendChild(input4);
  document.getElementById("sign").appendChild(label4);

  document.getElementById("sign").appendChild(input5);
  document.getElementById("sign").appendChild(label5);

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

  sendmail(id, name, data);
}

document.getElementById("human").addEventListener("click", clickHandle, false);
document.getElementById("sign").addEventListener("change", changeHandle, false);
