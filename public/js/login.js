const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Add console.log statements for debugging
        console.log('Login form submitted with values:', { email, password });
        console.log('Request URL:', '/api/user/login');
        console.log('Response:', response);

        if (response.ok) {
            const responseData = await response.json();

            // Check if the server included a redirect URL
            const redirectTo = responseData.redirectTo;

            if (redirectTo) {
                // If there's a redirect URL, use it to navigate
                document.location.replace(redirectTo);
            } else {
                // If no redirect URL is provided, you can keep your existing client-side redirection
                document.location.replace('/profile');
            }
        } else {
            // Log or alert the error message
            console.error(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Signup form submitted with values:', { name, email, password });
            console.log('Request URL:', '/api/user');
            console.log('Response:', response);

            if (response.ok) {
                document.location.replace('/profile');
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup fetch:', error);
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
