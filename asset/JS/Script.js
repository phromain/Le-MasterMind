// Déclaration des variables globales
const colors = ['red', 'yellow', 'blue', 'green', 'white', 'purple'];
let tabColorRdm = [];
let tabPlayer = [];
let number = 1;
let inclus = [];

// Initialisation de la page
function initPage() {
    // Crée un tableau de 5 cases avec des couleurs aléatoires
    for (let i = 0; i < 5; i++) {
        tabColorRdm.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    document.getElementById('tabRdm').innerHTML = tabColorRdm.map((_, i) => `<div id="${i}" class="rond"></div>`).join('');

    // Crée la ligne de boutons
    const ligneButtons = document.getElementById("listeboutons");
    for (let i = 0; i < 5; i++) {
        const button = document.createElement("button");
        button.className = "rond";
        button.value = null;
        button.id = 'button' + i;
        ligneButtons.appendChild(button);
    }

    // Ajoute les écouteurs aux boutons après leur création
    addEventListeners();
}

// Ajoute les écouteurs aux boutons
function addEventListeners() {
    const buttons = Array.from({ length: 5 }, (_, i) => document.getElementById(`button${i}`));
    const validation = document.getElementById('validation');

    // Compteurs pour chaque bouton
    let counts = [0, 0, 0, 0, 0];

    // Ajoute les écouteurs aux boutons
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            changColor(button, index);
        });
    });

    // Validation du clic
    validation.addEventListener('click', verifierCombinaison, false);

    // Permet de changer la couleur au clic
    function changColor(button, index) {
        counts[index] = (counts[index] + 1) % colors.length;
        button.style.backgroundColor = colors[counts[index]];
        button.value = colors[counts[index]];
    }
}

// Vérification de la combinaison
function verifierCombinaison() {
    let pionsWhite = 0;
    let pionsBlack = 0;
    let pionsVide = 5;

    // Récupération des valeurs dans tabPlayer
    tabPlayer = Array.from({ length: 5 }, (_, i) => document.getElementById('button' + i).value);

    // Vérifie si toutes les valeurs de tabPlayer appartiennent à colors
    inclus = tabPlayer.map(color => colors.includes(color));

    if (number < 12) {
        if (inclus.includes(false)) {
            document.getElementById("message").innerHTML = '<p>Merci de remplir les couleurs</p>';
        } else {
            // Calcul des pions noirs et blancs
            let tempTabColorRdm = [...tabColorRdm];
            let tempTabPlayer = [...tabPlayer];
            tempTabColorRdm.forEach((color, i) => {
                if (color === tabPlayer[i]) {
                    pionsBlack++;
                    tempTabColorRdm[i] = tempTabPlayer[i] = null;
                }
            });
            tempTabColorRdm.forEach((color, i) => {
                if (color && tempTabPlayer.includes(color)) {
                    pionsWhite++;
                    tempTabPlayer[tempTabPlayer.indexOf(color)] = null;
                }
            });

            pionsVide -= (pionsWhite + pionsBlack);

            // Affichage des pions de vérification
            afficherPions('retour' + number, pionsBlack, pionsWhite, pionsVide);
            afficherCouleurs('tabTentative' + number, tabPlayer);
            document.getElementById("message").innerHTML = '';
        }

        if (pionsBlack === 5) {
            document.getElementById("message").innerHTML = '<p>Vous avez gagné - You WIN</p>';
            document.getElementById('validation').disabled = true;
            Swal.fire({
                title: '<strong>Félicitation vous avez gagné</strong>',
                imageUrl: 'asset/img/Win.jpg',
                imageWidth: 400,
                imageHeight: 400,
                imageAlt: 'red fox happy',
                showConfirmButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Recommencer',
                cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
            tabColorRdm.forEach((color, i) => {
                document.getElementById(i).style.backgroundColor = color;
            });
        }

    } else {
        document.getElementById("message").innerHTML = '<p>YOU LOSE !</p>';
        document.getElementById('validation').disabled = true;
        Swal.fire({
            title: '<strong>Perdu</strong>',
            imageUrl: 'asset/img/Lose.png',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'red fox sad',
            showConfirmButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Recommencer',
            cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
        tabColorRdm.forEach((color, i) => {
            document.getElementById(i).style.backgroundColor = color;
        });
    }
    number++;
}

// Afficher les pions de vérification
function afficherPions(elementId, noirs, blancs, vides) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    for (let i = 0; i < noirs; i++) {
        const rondNoir = document.createElement("div");
        rondNoir.className = "rondnoir";
        element.appendChild(rondNoir);
    }
    for (let i = 0; i < blancs; i++) {
        const rondBlanc = document.createElement("div");
        rondBlanc.className = "rondblanc";
        element.appendChild(rondBlanc);
    }
    for (let i = 0; i < vides; i++) {
        const rondVide = document.createElement("div");
        rondVide.className = "rondvide";
        element.appendChild(rondVide);
    }
}

// Afficher les couleurs
function afficherCouleurs(elementId, couleurs) {
    const element = document.getElementById(elementId);
    element.innerHTML = couleurs.map((couleur, i) => `<div id="tab${number}pion${i}" class="rond" style="background-color: ${couleur};"></div>`).join('');
}

// Initialisation de la page au chargement
document.addEventListener('DOMContentLoaded', initPage);
