
const nom = document.getElementById("contact-nom");
const email = document.getElementById("contact-email");
const sujet = document.getElementById("contact-sujet");
const messag = document.getElementById("contact-message");

function alpha(ch) {  //fonction alpha avancée
    var letters = /^[A-Za-z ]+$/;
    if (ch.match(letters)) {
        return true;
    } else {
        return false;
    }
}
const btValid = document.getElementById("btValid")
function validNom() {
    const nom = document.getElementById("contact-nom");
    if (nom.value == "" || !alpha(nom.value)) {
        nom.classList.remove("is-valid");
        nom.classList.add("is-invalid");
        nom.style.borderColor = "red";
        nom.style.backgroundColor = "#d8858c";
    } else {
        nom.style.borderColor = "green";
        nom.style.backgroundColor = "";
        nom.classList.add("is-valid");
        nom.classList.remove("is-invalid");
    }
    return !(nom.value == "" || !alpha(nom.value))
}

function validEmail() {
    const email = document.getElementById("contact-email");
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //format de email valid (seule @ seul . et nom et domain valid)
    if (email.value == "" || !re.test(email.value)) {
        email.style.borderColor = "red";
        email.style.backgroundColor = "#d8858c";
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
    } else {
        email.style.borderColor = "green";
        email.style.backgroundColor = "";
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }
    return !(email.value == "" || !re.test(email.value))
}

function validSujet() {
    const sujet = document.getElementById("contact-sujet");
    if (sujet.value == "") {
        sujet.style.borderColor = "red";
        sujet.style.backgroundColor = "#d8858c";
        sujet.classList.add("is-invalid");
        sujet.classList.remove("is-valid");
    } else {
        sujet.style.borderColor = "green";
        sujet.style.backgroundColor = "";
        sujet.classList.remove("is-invalid");
        sujet.classList.add("is-valid");
    }
    return !(sujet.value == "")
}

function validMessage() {
    const messag = document.getElementById("contact-message");
    const cont = document.getElementById("conteur");
    cont.innerHTML = String(messag.value.length) + "/ 150"
    if (messag.value == "" || messag.value.length > 150) {
        cont.style.color = "red";
        messag.style.borderColor = "red";
        messag.style.backgroundColor = "#d8858c";
        messag.classList.add("is-invalid");
        messag.classList.remove("is-valid");
    } else {
        messag.style.borderColor = "green";
        cont.style.color = "";
        messag.style.backgroundColor = "";
        messag.classList.remove("is-invalid");
        messag.classList.add("is-valid");
    }
    return !(messag.value == "" || messag.value.length > 150)
}

function validerform() {
    const validationmess = document.getElementById("contact-confirmation");
    test1 = validNom();
    test2 = validEmail();
    test3 = validSujet();
    test4 = validMessage();
    if (test1 && test2 && test3 && test4) {
        validationmess.hidden = false
    } else {
        validationmess.hidden = true
    }
    
}

function resetForm() {
    const form = document.getElementById("form-contact");
    form.reset();  // clears all native values (inputs, selects, textareas)

    // still need to clear your custom styling + classes:
    form.querySelectorAll(".is-valid, .is-invalid").forEach((el) => {
        el.classList.remove("is-valid", "is-invalid");
        el.style.borderColor = "";
        el.style.backgroundColor = "";
    });


    document.getElementById("contact-confirmation").hidden = true;
}

nom.addEventListener('change', validNom)
email.addEventListener('change', validEmail)
sujet.addEventListener('change', validSujet)
messag.addEventListener('input', validMessage)
messag.addEventListener('change', validMessage)

btValid.addEventListener('click', (evenement) => {
    evenement.preventDefault();
    evenement.stopPropagation();
    validerform()

})