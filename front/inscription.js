let currentStep = 1;
let selectedNiveau = null;
let selectedBranche = null;
let selectedSpecialite = null;

// Navigation entre les étapes
function goToStep(step) {
    if (step < currentStep) {
        // Retour sans validation
        showStep(step);
        return;
    }

    // Validation avant d'avancer
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep === 4 && !validateStep4()) return;

    showStep(step);
}

function showStep(step) {
    // Masquer l'étape actuelle
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Afficher la nouvelle étape
    document.getElementById(`step${step}`).classList.add('active');
    
    // Mettre à jour l'indicateur
    updateStepIndicator(step);
    
    currentStep = step;
    
    // Scroll vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateStepIndicator(step) {
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        if (index + 1 <= step) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Validations
function validateStep1() {
    let isValid = true;

    // Validation Nom
    const nom = document.getElementById('nom').value.trim();
    const nomError = document.getElementById('nomError');
    if (!nom) {
        nomError.textContent = 'Veuillez entrer un nom';
        isValid = false;
    } else if (nom.length < 2) {
        nomError.textContent = 'Le nom doit contenir au moins 2 caractères';
        isValid = false;
    } else {
        nomError.textContent = '';
    }

    // Validation Prénom
    const prenom = document.getElementById('prenom').value.trim();
    const prenomError = document.getElementById('prenomError');
    if (!prenom) {
        prenomError.textContent = 'Veuillez entrer un prénom';
        isValid = false;
    } else if (prenom.length < 2) {
        prenomError.textContent = 'Le prénom doit contenir au moins 2 caractères';
        isValid = false;
    } else {
        prenomError.textContent = '';
    }

    // Validation Email
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        emailError.textContent = 'Veuillez entrer un email';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Veuillez entrer un email valide';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validation Téléphone (optionnel mais vérifié si fourni)
    const telephone = document.getElementById('telephone').value.trim();
    const telephoneError = document.getElementById('telephoneError');
    if (telephone && !/^[\d\s\+\-\(\)]+$/.test(telephone)) {
        telephoneError.textContent = 'Veuillez entrer un numéro valide';
        isValid = false;
    } else {
        telephoneError.textContent = '';
    }

    // Validation Date de naissance
    const dateNaissance = document.getElementById('dateNaissance').value;
    const dateError = document.getElementById('dateError');
    if (!dateNaissance) {
        dateError.textContent = 'Veuillez sélectionner une date';
        isValid = false;
    } else {
        const age = new Date().getFullYear() - new Date(dateNaissance).getFullYear();
        if (age < 17) {
            dateError.textContent = 'Vous devez avoir au moins 17 ans';
            isValid = false;
        } else {
            dateError.textContent = '';
        }
    }

    return isValid;
}

function validateStep2() {
    let isValid = true;

    // Validation Nom d'utilisateur
    const username = document.getElementById('username').value.trim();
    const usernameError = document.getElementById('usernameError');
    if (!username) {
        usernameError.textContent = 'Veuillez entrer un nom d\'utilisateur';
        isValid = false;
    } else if (username.length < 3 || username.length > 20) {
        usernameError.textContent = 'Le nom d\'utilisateur doit contenir entre 3 et 20 caractères';
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        usernameError.textContent = 'Lettres, chiffres et tirets bas uniquement';
        isValid = false;
    } else {
        usernameError.textContent = '';
    }

    // Validation Mot de passe
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    if (!password) {
        passwordError.textContent = 'Veuillez entrer un mot de passe';
        isValid = false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Le mot de passe doit contenir au moins 8 caractères';
        isValid = false;
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        passwordError.textContent = 'Le mot de passe doit contenir majuscules, minuscules et chiffres';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    // Validation Confirmation mot de passe
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (!confirmPassword) {
        confirmPasswordError.textContent = 'Veuillez confirmer votre mot de passe';
        isValid = false;
    } else if (confirmPassword !== password) {
        confirmPasswordError.textContent = 'Les mots de passe ne correspondent pas';
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
    }

    return isValid;
}

function validateStep3() {
    const niveauError = document.getElementById('niveauError');
    if (!selectedNiveau) {
        niveauError.textContent = 'Veuillez sélectionner un niveau';
        return false;
    }
    niveauError.textContent = '';
    return true;
}

function validateStep4() {
    let isValid = true;

    const brancheError = document.getElementById('brancheError');
    if (!selectedBranche) {
        brancheError.textContent = 'Veuillez sélectionner une branche';
        isValid = false;
    } else {
        brancheError.textContent = '';
    }

    const specialiteError = document.getElementById('specialiteError');
    if (!selectedSpecialite) {
        specialiteError.textContent = 'Veuillez sélectionner une spécialité';
        isValid = false;
    } else {
        specialiteError.textContent = '';
    }

    return isValid;
}

// Sélection du niveau
function selectNiveau(niveau) {
    selectedNiveau = niveau;
    
    document.querySelectorAll('.niveau-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    event.currentTarget.querySelector('input[type="radio"]').checked = true;
    
    document.getElementById('niveauError').textContent = '';
}

// Sélection de la branche
function selectBranche(branche) {
    selectedBranche = branche;
    selectedSpecialite = null; // Réinitialiser la spécialité
    
    document.querySelectorAll('.branche-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    event.currentTarget.querySelector('input[type="radio"]').checked = true;
    
    // Afficher/masquer les spécialités
    document.getElementById('specialites-science').style.display = branche === 'science' ? 'block' : 'none';
    document.getElementById('specialites-litteraire').style.display = branche === 'litteraire' ? 'block' : 'none';
    
    // Réinitialiser la sélection des spécialités
    document.querySelectorAll('.specialite-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    document.getElementById('brancheError').textContent = '';
}

// Sélection de la spécialité
function selectSpecialite(specialite, branche) {
    selectedSpecialite = specialite;
    
    const container = document.getElementById(`specialites-${branche}`);
    container.querySelectorAll('.specialite-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    
    document.getElementById('specialiteError').textContent = '';
}

// Indicateur de force du mot de passe
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strengthBar');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let strength = 0;
            
            // Vérifier les critères
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[!@#$%^&*]/.test(password)) strength++;
            
            // Mettre à jour la barre
            strengthBar.className = 'strength-bar';
            if (strength <= 2) {
                strengthBar.classList.add('weak');
            } else if (strength <= 3) {
                strengthBar.classList.add('medium');
            } else {
                strengthBar.classList.add('strong');
            }
        });
    }

    // Toggle affichage du mot de passe
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', (e) => {
            e.preventDefault();
            const input = document.getElementById('password');
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', (e) => {
            e.preventDefault();
            const input = document.getElementById('confirmPassword');
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            toggleConfirmPassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }

    // Gestion de la soumission du formulaire
    const inscriptionForm = document.getElementById('inscriptionForm');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validation finale des conditions
            const terms = document.getElementById('terms').checked;
            const termsError = document.getElementById('termsError');
            
            if (!terms) {
                termsError.textContent = 'Vous devez accepter les conditions';
                return;
            }
            termsError.textContent = '';
            
            // Récupération des données
            const formData = {
                nom: document.getElementById('nom').value,
                prenom: document.getElementById('prenom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('telephone').value,
                dateNaissance: document.getElementById('dateNaissance').value,
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                niveau: selectedNiveau,
                branche: selectedBranche,
                specialite: selectedSpecialite,
                newsletter: document.getElementById('newsletter').checked
            };

            console.log('Données d\'inscription:', formData);
            
            // Afficher un message de succès
            alert(`Inscription réussie !\n\nBienvenue ${formData.prenom} ${formData.nom} !\nVous êtes inscrit au niveau ${formData.niveau} - ${formData.branche.toUpperCase()} (${formData.specialite})`);
            
            // Rediriger vers la page de connexion
            setTimeout(() => {
                window.location.href = 'connexion.html';
            }, 1500);
        });
    }

    // Actualiser le récapitulatif lors du changement d'étape
    document.addEventListener('click', (e) => {
        if (e.target.textContent.includes('Suivant') || e.target.textContent.includes('Retour')) {
            setTimeout(updateResume, 100);
        }
    });
});

function updateResume() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    
    if (document.getElementById('resumeNom')) {
        document.getElementById('resumeNom').textContent = `${prenom} ${nom}` || 'Non renseigné';
        document.getElementById('resumeEmail').textContent = email || 'Non renseigné';
        document.getElementById('resumeNiveau').textContent = selectedNiveau || 'Non sélectionné';
        document.getElementById('resumeBranche').textContent = selectedBranche ? selectedBranche.charAt(0).toUpperCase() + selectedBranche.slice(1) : 'Non sélectionné';
        document.getElementById('resumeSpecialite').textContent = selectedSpecialite || 'Non sélectionné';
    }
}

// Validation en temps réel pour les champs principaux
document.addEventListener('DOMContentLoaded', () => {
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');

    if (nom) {
        nom.addEventListener('blur', () => {
            if (!nom.value.trim()) {
                document.getElementById('nomError').textContent = 'Veuillez entrer un nom';
            } else {
                document.getElementById('nomError').textContent = '';
            }
        });
    }

    if (prenom) {
        prenom.addEventListener('blur', () => {
            if (!prenom.value.trim()) {
                document.getElementById('prenomError').textContent = 'Veuillez entrer un prénom';
            } else {
                document.getElementById('prenomError').textContent = '';
            }
        });
    }

    if (email) {
        email.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                document.getElementById('emailError').textContent = 'Veuillez entrer un email valide';
            } else {
                document.getElementById('emailError').textContent = '';
            }
        });
    }
});
