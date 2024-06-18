document.addEventListener('DOMContentLoaded', () => {
    const loginToggle = document.getElementById('loginToggle');
    const registerToggle = document.getElementById('registerToggle');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginToggle.addEventListener('click', () => {
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerToggle.addEventListener('click', () => {
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // user registeration
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
             // Retrieve form data
             const userId = document.getElementById('user').value;
             const deviceId = document.getElementById('deviceId').value;
             const name = document.getElementById('name').value;
             const phone = document.getElementById('phone').value;
             const password = document.getElementById('registerPassword').value;
             const availableCoins = document.getElementById('availableCoins').value;
             const isPrime = document.getElementById('isPrime').checked;
     
             // Create user data object
             const userData = {
                 userId: userId,
                 deviceId: deviceId,
                 name: name,
                 phone: phone,
                 password: password,
                 availableCoins: availableCoins,
                 isPrime: isPrime
             };
     
        try {
            const response = await fetch('https://abhiman-backend-s7db.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
           console.log(response)
            if (response.ok) {
                const data = await response.json();
                // Handle successful registration
                console.log(data)
                alert(data.message)
            } else {
                // Handle registration error
                const errorMessage = await response.text();
                console.error('Registration failed:', errorMessage);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });

    // user login
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userData = {
            userId: document.getElementById('userId').value,
            password: document.getElementById('loginPassword').value
        };
        try {
            const response = await fetch('https://abhiman-backend-s7db.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (response.ok) {
               
                const data = await response.json();
                localStorage.setItem("token",data.token)
                alert(data.message)
                window.location.href = 'chatroom.html';
            } else {
                const errorMessage = await response.text();
                console.error('Login failed:', errorMessage);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });

   
});
