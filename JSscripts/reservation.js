const params = new URLSearchParams(window.location.search); //tjib data min lien
const idActivite = params.get('activite');
if (idActivite) {
  const select = document.getElementById('activite');
  select.value = idActivite;
}

r1 = document.getElementById("type-individuel");
r2 = document.getElementById("type-famille");
r3 = document.getElementById("type-groupe");
r1.addEventListener('click', selectindivisuel);
r2.addEventListener('click', selectplusieur);
r3.addEventListener('click', selectplusieur);

var nom = document.getElementById("nom");
var prenom = document.getElementById("prenom");
var email = document.getElementById("email");
var activite = document.getElementById("activite");
var date = document.getElementById("date");
var participants = document.getElementById("participants");
var telephone = document.getElementById("telephone");


var prixuni = document.getElementById("prix-unitaire")
var nbpart = document.getElementById("nb-participants")
var stotal = document.getElementById("sous-total")
var remise = document.getElementById("remise")
var total = document.getElementById("total")
var details = document.getElementById("recap-details")
function selectindivisuel() {
  document.getElementById("participants").disabled = true;
  document.getElementById("participants").value = 1;
}


function alpha(ch) {  //fonction alpha avancée
  var letters = /^[A-Za-z]+$/;
  if (ch.match(letters)) {
    return true;
  } else {
    return false;
  }
}

function selectplusieur() {
  document.getElementById("participants").disabled = false;
}

function validNom() {
  const nom = document.getElementById("nom");
  if (nom.value == "" || !alpha(nom.value)) {
    nom.style.borderColor = "red";
    nom.style.backgroundColor = "#d8858c";
    return "<li>nom soit étre alphabetique</li>"
  } else {
    nom.style.borderColor = "green";
    nom.style.backgroundColor = "#ffffff";
    return ""
  }
}

function validPrenom() {
  const prenom = document.getElementById("prenom");
  if (prenom.value == "" || !alpha(prenom.value)) {
    prenom.style.borderColor = "red";
    prenom.style.backgroundColor = "#d8858c";
    return "<li>prenom soit étre alphabetique</li>"
  } else {
    prenom.style.borderColor = "green";
    prenom.style.backgroundColor = "#ffffff";
    return ""
  }
}

function validEmail() {
  const email = document.getElementById("email");
  if (email.value == "" || !email.value.includes("@") || !email.value.includes(".")) {
    email.style.borderColor = "red";
    email.style.backgroundColor = "#d8858c";
    return "<li>email soit etre non vide est contenir '@' et '.'</li>"
  } else {
    email.style.borderColor = "green";
    email.style.backgroundColor = "#ffffff";
    return ""
  }
}

function validDate() {
  const date = document.getElementById("date");

  d1 = new Date();
  d2 = new Date(date.value);
  if (d2 == "Invalid Date" || d1.getTime() >= d2.getTime() - 345600000) { // 345,600,000 represente 4 jour
    date.style.borderColor = "red";
    date.style.backgroundColor = "#d8858c";
    return "<li>date soit étre reilisée aprés 4 jour minimum a date courant</li>"
  } else {
    date.style.borderColor = "green";
    date.style.backgroundColor = "#ffffff";
    return ""
  }
}

function validParticipants() {
  const participants = document.getElementById("participants");
  const nbpart = document.getElementById("nb-participants");

  if (participants.value < 1) {
    participants.value = 1;

  } else {
    nbpart.innerHTML = String(participants.value);
  }
  return ""
}

function validActivite() {
  const activite = document.getElementById("activite");
  const participants = document.getElementById("participants");
  const prixuni = document.getElementById("prix-unitaire");
  const stotal = document.getElementById("sous-total");

  if (activite.value == "") {
    activite.style.borderColor = "red";
    activite.style.backgroundColor = "#d8858c";
    stotal.innerHTML = '<b class="w-100">0</b>';
    return "<li>selectionée une activité</li>"
  } else {
    v = document.querySelector('option[value="' + String(activite.value) + '"]');
    prixuni.innerHTML = v.dataset.prix;
    somme = Number(v.dataset.prix) * Number(participants.value);
    stotal.innerHTML = somme;
    activite.style.borderColor = "green";
    activite.style.backgroundColor = "#ffffff";
    return ""
  }
}

function validTelephone() {
  const telephone = document.getElementById("telephone");
  const countrySel = document.getElementById("telephone-country");

  const opt = countrySel.selectedOptions[0];
  const pattern = new RegExp(opt.dataset.regex);  // build regex from data attr

  const cleaned = telephone.value.replace(/[\s-]/g, "");
  const ok = pattern.test(cleaned);

  if (cleaned === "" || !ok) {
    telephone.style.borderColor = "red";
    telephone.style.backgroundColor = "#d8858c";
    return "<li>format de telephone est invalid</li>"
  } else {
    telephone.style.borderColor = "green";
    telephone.style.backgroundColor = "";
    return ""
  }
}

function validForm() {
  var message = document.getElementById("message-erreur");
  mes = ""
  mes = mes + validNom();
  mes = mes + validPrenom();
  mes = mes + validEmail();
  mes = mes + validDate();
  mes = mes + validTelephone()
  mes = mes + validParticipants();
  mes = mes + validActivite();
  if (message != "") {
    message.innerHTML = '<h3>données sont invalid</h3><ul>' + mes + '</ul>'
    message.hidden = false
    return false
  } else {
    message.hidden = true
    return true
  }
}
function calculepayer() {
  stotal = document.getElementById("sous-total")
  total = document.getElementById("total")
  details = document.getElementById("recap-details")
  remise = document.getElementById("remise")
  activite = document.getElementById("activite");
  participants = document.getElementById("participants");
  if (activite.value == "" || participants.value < 0) {
    total.innerHTML = "<b>0 DT</b>"
  } else {
    if (participants.value >= 4) {
      r = Number(stotal.innerHTML) * (1 / 10)
      remise.innerHTML = r
      total.innerHTML = (Number(stotal.innerHTML) - r).toFixed(2)
    } else {
      remise.innerHTML = "0.00"
      total.innerHTML = Number(stotal.innerHTML).toFixed(2)
    }
  }

}
function reset() {
  var prixuni = document.getElementById("prix-unitaire").innerHTML="0.00"
var nbpart = document.getElementById("nb-participants").innerHTML="1"
var stotal = document.getElementById("sous-total").innerHTML="0.00"
var remise = document.getElementById("remise").innerHTML="-0.00"
var total = document.getElementById("total").innerHTML="0.00"
}

nom.addEventListener('change', validNom)
prenom.addEventListener('change', validPrenom)
email.addEventListener('change', validEmail)
date.addEventListener('change', validDate)
activite.addEventListener('change', validActivite)
participants.addEventListener('change', validParticipants)
participants.addEventListener('change', validActivite)
telephone.addEventListener('change', validTelephone)
form.addEventListener('change', calculepayer)