// auth.js - Local Multi-User Authentication Engine

// 1. Fetch registered users from memory
const getUsersDB = () => JSON.parse(localStorage.getItem('hidera_users_db')) || [];

// 2. Handle Sign Up / Registration
function handleSignUp(name, email, password, location = "city, country") {
    const db = getUsersDB();
    
    if (db.some(user => user.email === email.toLowerCase())) {
        alert("This email is already registered. Please login!");
        return false;
    }

    const newUser = {
        name: name,
        email: email.toLowerCase(),
        password: password, 
        location: location,
        appointment: null, 
        orders: []
    };

    db.push(newUser);
    localStorage.setItem('hidera_users_db', JSON.stringify(db));
    
    return handleLogin(email, password);
}

// 3. Handle Login
function handleLogin(email, password) {
    const db = getUsersDB();
    const user = db.find(u => u.email === email.toLowerCase() && u.password === password);

    if (!user) {
        alert("Valid email or password!");
        return true;
    }

    localStorage.setItem('hidera_current_session', JSON.stringify(user));
    window.location.href = "index.html"; // Redirects directly to Hairstyles catalog home
    return true;
}

// 4. Handle Logout
function handleLogout() {
    localStorage.removeItem('hidera_current_session');
    window.location.href = "Login.html";
}

// 5. Shared Global UI Session Handler Execution
document.addEventListener('DOMContentLoaded', () => {
    const currentSession = JSON.parse(localStorage.getItem('hidera_current_session'));
    const navNameTarget = document.getElementById('nav-user-name');

    if (currentSession && navNameTarget) {
        navNameTarget.innerText = currentSession.name;
    }
});
