document.addEventListener('DOMContentLoaded', () => {
    const loginToggle = document.getElementById('loginToggle');
    const registerToggle = document.getElementById('registerToggle');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toastContainer = document.getElementById('toastContainer');

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

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.classList.add('toast', type, 'show');
        toast.innerText = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    let url="http://localhost:4500"
    // user registeration
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
             // Retrieve form data
             const userId = document.getElementById('user').value;
             const deviceId = document.getElementById('deviceId').value;
             const name = document.getElementById('name').value;
             const phone = document.getElementById('phone').value;
             const password = document.getElementById('registerPassword').value;
             const availCoins = document.getElementById('availableCoins').value;
             const isPrime = document.getElementById('isPrime').checked;
     
             // Create user data object
             const userData = {
                 userId: userId,
                 deviceId: deviceId,
                 name: name,
                 phone: phone,
                 password: password,
                 availCoins: availCoins,
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
                showToast(data.message, 'success');
                
            } else {
                // Handle registration error
                const errorMessage = await response.text();
                console.error('Registration failed:', errorMessage);
                showToast('Registration failed: ' + errorMessage, 'error');
            }
        } catch (error) {
            showToast('Error during registration: ' + error.message, 'error');
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
                showToast(data.message, 'success');
                setTimeout(() => {
                    window.location.href = 'chatroom.html';
                }, 3000);
            } else {
                const errorMessage = await response.text();
                showToast('Login failed: ' + errorMessage, 'error');
            }
        } catch (error) {
            showToast('Error during login: ' + error.message, 'error');
        }
    });

   
});
