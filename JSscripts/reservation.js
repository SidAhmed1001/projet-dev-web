const params = new URLSearchParams(window.location.search); //tjib data min lien
const idActivite = params.get('activite');
if (idActivite) {
  const select = document.getElementById('activite');
  select.value = idActivite;
}

r1=document.getElementById("type-individuel");
r2=document.getElementById("type-famille");
r3=document.getElementById("type-groupe");
r1.addEventListener('click', selectindivisuel);
r2.addEventListener('click', selectplusieur);
r3.addEventListener('click', selectplusieur);

function selectindivisuel() {
  document.getElementById("participants").disabled=true;
  document.getElementById("participants").value=1;
}

function selectplusieur() {
  document.getElementById("participants").disabled=false;
}
function validateForm() {
  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const email = document.getElementById("email").value;
  const activite = document.getElementById("activite").value;
  const date = document.getElementById("date").value;
  const participants = document.getElementById("participants").value;
  
}