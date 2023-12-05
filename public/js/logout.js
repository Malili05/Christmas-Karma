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
            // Check if the user is logged in
            const loggedIn = await checkLoggedInStatus();

            // Add event listener only if the user is logged in
            if (loggedIn) {
                logoutButton.style.display = 'inline'; // Show the logout button
                logoutButton.addEventListener('click', async function (event) {
                    event.preventDefault();
                    // Call the logout function when the button is clicked
                    await logout();
                });
            }
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
