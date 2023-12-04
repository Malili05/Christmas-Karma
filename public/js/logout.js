// logout.js

const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const logoutButton = document.querySelector('#logout');

        if (logoutButton) {
            logoutButton.addEventListener('click', async function () {
                // Call the logout function when the button is clicked
                await logout();
            });

            // Check if the user is logged in and update the link text accordingly
            const loggedIn = await checkLoggedInStatus();
            updateLoginLogoutLink(loggedIn);
        } else {
            console.error("#logout element not found. Check your HTML.");
        }
    } catch (error) {
        console.error("Error during initialization:", error);
    }
});

async function checkLoggedInStatus() {
    const response = await fetch('/api/user'); // Assume an endpoint that checks the user's login status
    return response.ok;
}

function updateLoginLogoutLink(loggedIn) {
    const loginLogoutLink = document.getElementById('logout');
    if (loginLogoutLink) {
        loginLogoutLink.textContent = loggedIn ? 'Logout' : 'Login';
    }
}

