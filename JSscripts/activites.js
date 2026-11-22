const activites = [
    {
        id: 'A01',
        titre: 'Découverte de la médina',
        lieu: 'Nabeul',
        categorie: 'Culture',
        duree: '2 h',
        prix: 20,
        image: 'images/a01.png',
        accroche: 'Flânez dans les ruelles historiques de Nabeul.',
        description: "Partez à la découverte de la médina de Nabeul et de ses ruelles chargées d'histoire. Vous visiterez les souks, les ateliers d'artisans et les monuments emblématiques du centre ancien. Un guide local vous racontera les traditions et les anecdotes de la ville. Une expérience idéale pour comprendre le patrimoine du Cap Bon."
    },
    {
        id: 'A02',
        titre: "Atelier d'initiation à la poterie",
        lieu: 'Nabeul',
        categorie: 'Artisanat',
        duree: '1 h 30',
        prix: 35,
        image: 'images/a02.png',
        accroche: 'Modelez votre première pièce en terre cuite.',
        description: "Installez-vous au tour et laissez vos mains donner forme à la terre. Un potier expérimenté vous initie aux gestes essentiels du tournage et du modelage. Vous repartez avec votre propre création. L'atelier se déroule dans une véritable poterie de Nabeul."
    },
    {
        id: 'A03',
        titre: 'Parcours découverte de Kerkouane',
        lieu: 'Kerkouane',
        categorie: 'Culture',
        duree: '2 h 30',
        prix: 30,
        image: 'images/a03.png',
        accroche: 'Sur les traces de la cité punique de Kerkouane.',
        description: "Explorez les ruines de Kerkouane, ancienne cité punique classée au patrimoine mondial. Le parcours révèle les maisons, les thermes et les ateliers d'une civilisation disparue. Votre guide replace chaque vestige dans son contexte historique. Un voyage dans le temps sur la côte du Cap Bon."
    },
    {
        id: 'A04',
        titre: 'Randonnée découverte',
        lieu: 'Djebel Abderrahmane',
        categorie: 'Nature',
        duree: '3 h',
        prix: 25,
        image: 'images/a04.png',
        accroche: 'Marchez au sommet du Cap Bon.',
        description: "Empruntez les sentiers du Djebel Abderrahmane pour une randonnée au cœur d'une nature préservée. Le parcours alterne forêts, crêtes et points de vue sur la mer. Un accompagnateur vous fait découvrir la faune et la flore locales. Prévoyez de bonnes chaussures et de l'eau."
    },
    {
        id: 'A05',
        titre: 'Circuit du littoral',
        lieu: 'Kélibia',
        categorie: 'Nature',
        duree: '3 h',
        prix: 40,
        image: 'images/a05.png',
        accroche: 'Longez les plages et falaises de Kélibia.',
        description: "Suivez le littoral de Kélibia entre plages de sable fin, criques et falaises. Le circuit vous mène jusqu'au fort byzantin qui domine la baie. Vous découvrirez les ports de pêche et les paysages méditerranéens. Une balade commentée pour petits et grands."
    },
    {
        id: 'A06',
        titre: 'Peinture sur céramique',
        lieu: 'Nabeul',
        categorie: 'Artisanat',
        duree: '2 h',
        prix: 25,
        image: 'images/a06.png',
        accroche: 'Décorez votre propre pièce en céramique.',
        description: "Choisissez une pièce de céramique et décorez-la avec les couleurs traditionnelles de Nabeul. Une artisane vous montre les motifs et les techniques de peinture. Votre création est cuite sur place et prête à emporter. Une activité créative et conviviale."
    },
    {
        id: 'A07',
        titre: "Découverte d'un marché local",
        lieu: 'Nabeul',
        categorie: 'Découverte',
        duree: '1 h 30',
        prix: 15,
        image: 'images/a07.png',
        accroche: "Parcourez les étals colorés du marché de Nabeul.",
        description: "Plongez dans l'ambiance du marché hebdomadaire de Nabeul. Vous découvrirez les fruits, les épices, l'huile d'olive et l'artisanat local. Votre guide vous présente les produits et les vendeurs du terroir. Une immersion sensorielle dans la vie locale."
    },
    {
        id: 'A08',
        titre: 'Promenade photographique',
        lieu: 'Hammamet',
        categorie: 'Découverte',
        duree: '2 h',
        prix: 30,
        image: 'images/a08.png',
        accroche: 'Capturez les plus belles lumières de Hammamet.',
        description: "Parcourez les ruelles blanches et le bord de mer de Hammamet avec un photographe. Vous apprendrez à composer une image et à jouer avec la lumière. Chaque étape offre un point de vue remarquable. Apportez votre appareil ou votre téléphone."
    }
];

const params = new URLSearchParams(window.location.search); //tjib data min lien
const nomActivite = params.get('nomactive');
if (nomActivite) {
  const search = document.getElementById('recherche');
  search.value =nomActivite;
}

const champRecherche = document.getElementById('recherche');
const filtreCategorie = document.getElementById('filtre-categorie');
const conteneurListe = document.getElementById('liste-activites');
const compteur = document.getElementById('compteur');
const modalElement = document.getElementById('modalActivite');
let modalActivite = null;
let modalTitre = null;
let modalCorps = null;
let modalBoutonResa = null;

if (modalElement) {
  modalActivite    = new bootstrap.Modal(modalElement);
  modalTitre       = document.getElementById('modalActiviteLabel');
  modalCorps       = modalElement.querySelector('.modal-body');
  modalBoutonResa  = document.getElementById('btn-reserver-modal');
}
if (modalElement) {
    modalActivite = new bootstrap.Modal(modalElement);
}
//Programme principal
function filtrerActivites() {
    const mot = champRecherche.value.trim().toLowerCase();
    const categorie = filtreCategorie.value;
    resultats = activites.filter(function (a) {
        matchCategorie = (categorie === 'Toutes') || (a.categorie === categorie);
        matchMot = a.titre.toLowerCase().includes(mot)
            || a.lieu.toLowerCase().includes(mot)
            || a.lieu.toLowerCase().includes(mot);
        return matchCategorie && matchMot;
    });
    afficherActivites(resultats);
}
function afficherActivites(liste) {
    conteneurListe.innerHTML = '';
    if (liste.length === 0) {
        conteneurListe.innerHTML = '<p class="alert alert-warning">Aucune activité trouvée</p>'
    } else {
        for (let i = 0; i < liste.length; i++) {
            if (!liste[i]) continue;
            conteneurListe.appendChild(creerCarte(liste[i])) //ta3mil fiche bil wa7da bil wa7da

        }
    }
    if (liste.length === 0) {
        compteur.textContent = "aucune activité trouvée"
    } else {
        compteur.textContent = liste.length + " activité trouvée"
    }
}
function creerCarte(a) {
    const col = document.createElement('article');
    col.className = 'col-12 col-md-6 col-lg-3';

    col.innerHTML =
        '<div class="card h-100">' +
        '<img src="' + a.image + '" class="card-img-top" alt="' + a.titre + ' — ' + a.lieu + '" id="imgFade" style="height: 200px; width: 100%;">' +
        '<div class="card-body d-flex flex-column">' +
        '<span class="badge bg-secondary mb-2">' + a.categorie + '</span>' +
        '<h3 class="card-title h5">' + a.titre + '</h3>' +
        '<p class="card-text small text-muted">' + a.lieu + ' — ' + a.duree + '</p>' +
        '<p class="card-text">' + a.accroche + '</p>' +
        '<p class="prix fw-bold mt-auto">' + a.prix + ' TND / personne</p>' +
        '<div class="d-flex gap-2">' +
        '<button type="button" onclick=\'activer(String("desc"+"'+a.id+'"));\' class="btn btn-outline-primary btn-sm btn-details">Voir les détails</button>' +
        '<a class="btn btn-primary btn-sm btn-reserver" href="reservation.html?activite=' + a.id + '">Réserver</a>' +
        '</div>' +
        '<div><dialog id="'+String("desc"+a.id)+'"> <img src="images/cross.png" id="btnExit" onclick=\'deactiver(String("desc"+"'+a.id+'"));\'> <iframe src="activSousPage/'+a.id+'.html" scrolling="no"></dialog></div>'+
        '</div>' +
        '</div>';

    return col;
}
function activer(id) {
    document.getElementById(id).showModal();
}
function deactiver(id) {
    document.getElementById(id).close();
}
champRecherche.addEventListener('input', filtrerActivites);
filtreCategorie.addEventListener('change', filtrerActivites);
afficherActivites(activites);
filtrerActivites();