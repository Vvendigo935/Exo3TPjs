// --- DOM Elements ---
const descriptions = [
    "Une interface si intuitive que même mon oncle qui confond Java et JavaScript a réussi à créer son profil. 20/20, avec une mention spéciale pour le bouton ‘Suivant’ qui m’a plus ému que la fin de Red Dead Redemption 2. - Jeux-Video.com",
    "C’est beau, c’est rapide, et surtout : ça n’a pas besoin de React pour fonctionner. Un miracle technique de notre époque, comme un SSD de 4 To à moins de 50€. À quand le mode multi ? CANARD PC",
    "Bonjour a tous... j'ai lancé les signatures.... n'hésitez pas a vous en débarrasser. Christophe Magasine"
  ];
  let currentDescription = -1;
  
  const descEl = document.getElementById("description");
  const changeDescBtn = document.getElementById("change-desc");
  const pseudoInput = document.getElementById("pseudo");
  const pseudoError = document.getElementById("pseudo-error");
  const avatars = document.querySelectorAll(".avatar");
  const suivantBtn = document.getElementById("suivant");
  
  const formSection = document.getElementById("formulaire");
  const profilSection = document.getElementById("profil");
  const profilPseudo = document.getElementById("profil-pseudo");
  const profilDesc = document.getElementById("profil-description");
  const profilAvatar = document.getElementById("profil-avatar");
  const resetBtn = document.getElementById("reset");
  
  const themeToggleBtn = document.getElementById("toggle-theme");
   
  //  État 
  
  let pseudoValide = false;
  let avatarSelectionne = null;
  
  // Fonctions
  function changerDescription() {
    let nouvelleIndex;
    do {
      nouvelleIndex = Math.floor(Math.random() * descriptions.length);
    } while (nouvelleIndex === currentDescription);
    currentDescription = nouvelleIndex;
    descEl.textContent = descriptions[currentDescription];
  }
  
  function validerPseudo() {
    const valeur = pseudoInput.value.trim();
    const regex = /^[a-zA-Z]{3,}$/;  // merci chatGPT
  
    if (!regex.test(valeur)) {
      pseudoError.textContent = "Le pseudo doit contenir au moins 3 lettres uniquement.";
      pseudoValide = false;
    } else {
      pseudoError.textContent = "";
      pseudoValide = true;
    }
    mettreAJourEtatBouton();
  }
  
  function choisirAvatar(e) {
    avatars.forEach(avatar => avatar.classList.remove("selected"));
    e.target.classList.add("selected");
    avatarSelectionne = e.target.getAttribute("src");
    mettreAJourEtatBouton();
  }
  
  function mettreAJourEtatBouton() {
    if (pseudoValide && currentDescription !== -1 && avatarSelectionne) {
      suivantBtn.disabled = false;
    } else {
      suivantBtn.disabled = true;
    }
  }
  
  function afficherProfil() {
    formSection.classList.add("hidden");
    profilSection.classList.remove("hidden");
    profilPseudo.textContent = pseudoInput.value.trim();
    profilDesc.textContent = descriptions[currentDescription];
    profilAvatar.setAttribute("src", avatarSelectionne);
  }
  
  function reinitialiser() {
    // Réinitialiser les champs
    pseudoInput.value = "";
    pseudoValide = false;
    pseudoError.textContent = "";
    avatarSelectionne = null;
    avatars.forEach(avatar => avatar.classList.remove("selected"));
    currentDescription = -1;
    changerDescription();
    mettreAJourEtatBouton();
  
    formSection.classList.remove("hidden");
    profilSection.classList.add("hidden");
  }
  
  function basculerTheme() {
    document.body.classList.toggle("dark-theme");
  }
  
  //  Événements
  document.addEventListener("DOMContentLoaded", () => {
    changerDescription();
  });
  
  changeDescBtn.addEventListener("click", changerDescription);
  pseudoInput.addEventListener("input", validerPseudo);
  avatars.forEach(avatar => {
    avatar.addEventListener("click", choisirAvatar);
  });
  suivantBtn.addEventListener("click", afficherProfil);
  resetBtn.addEventListener("click", reinitialiser);
  themeToggleBtn.addEventListener("click", basculerTheme);
  