// Toggle affichage/masquage du mot de passe
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

// Validation du formulaire
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Validation email en temps réel
emailInput.addEventListener('blur', () => {
    validateEmail();
});

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        emailError.textContent = 'Veuillez entrer un email';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Veuillez entrer un email valide';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

// Validation mot de passe
passwordInput.addEventListener('blur', () => {
    validatePassword();
});

function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        passwordError.textContent = 'Veuillez entrer un mot de passe';
        return false;
    } else if (password.length < 6) {
        passwordError.textContent = 'Le mot de passe doit contenir au moins 6 caractères';
        return false;
    } else {
        passwordError.textContent = '';
        return true;
    }
}

// Soumission du formulaire
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateEmail() | !validatePassword()) {
        return;
    }

    // Afficher un message de chargement
    const loginButton = loginForm.querySelector('.login-button');
    const originalText = loginButton.textContent;
    loginButton.disabled = true;
    loginButton.textContent = 'Connexion...';

    // Simuler l'envoi au serveur
    setTimeout(() => {
        const email = emailInput.value;
        const password = passwordInput.value;
        const remember = document.getElementById('remember').checked;

        console.log('Données de connexion:', {
            email,
            password,
            remember
        });

        // Réinitialiser le bouton
        loginButton.disabled = false;
        loginButton.textContent = originalText;

        // Message de succès (à remplacer par une vraie requête API)
        alert(`Connexion réussie pour ${email}`);
        loginForm.reset();
    }, 1500);
});

// Valider au moment de l'écriture
emailInput.addEventListener('input', () => {
    if (emailError.textContent) validateEmail();
});

passwordInput.addEventListener('input', () => {
    if (passwordError.textContent) validatePassword();
});
