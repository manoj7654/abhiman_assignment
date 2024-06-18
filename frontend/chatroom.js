
let createRoomForm = document.getElementById("createRoomForm");
let joinRoomForm = document.getElementById("joinRoomForm");

function toggleChatroomForm(formType) {
 
    if (formType === 'create') {
        createRoomForm.style.display = "block";
        joinRoomForm.style.display = "none";
    } else if (formType === 'join') {
        createRoomForm.style.display = "none";
        joinRoomForm.style.display = "block";
    }
}
let token=localStorage.getItem("token")
createRoomForm.addEventListener('submit', async (event) => {
    event.preventDefault();


    const roomData = {
        roomId: document.getElementById('createroom').value,
        password: document.getElementById('createpassword').value
    };
    console.log(roomData)
    try {
        const response = await fetch('https://abhiman-backend-s7db.onrender.com/api/chatrooms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(roomData)
        });
            console.log(response)
        if (response.ok) {
            const responseData = await response.json();
            alert(responseData.message); // Show success message
            // Redirect to the chatroom page
            // window.location.href = 'chatroom.html';
        } else {
            const errorMessage = await response.text();
            console.error('Error creating chatroom:', errorMessage);
            // Display error message to the user
            alert('Failed to create chatroom: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error creating chatroom:', error);
        // Display error message to the user
        alert('Failed to create chatroom: ' + error.message);
    }
});

joinRoomForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get the values of roomId and roomPassword after the form submission
    // let roomId = document.getElementById('roomId').value;
    // let password = document.getElementById('password').value;
    // console.log("password",password)
    // Create the roomData object with the obtained values
    const roomData = {
        roomId: document.getElementById('roomId').value,
        password: document.getElementById('password').value
    };
// console.log(token)
    try {
        const response = await fetch('https://abhiman-backend-s7db.onrender.com/api/joinroom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(roomData)
        });
            console.log(response)
        if (response.ok) {
            const responseData = await response.json();
            alert(responseData.message); // Show success message
            // Redirect to the chatroom page
            // window.location.href = 'chatroom.html';
        } else {
            const errorMessage = await response.text();
            console.error('Error join chatroom:', errorMessage);
            // Display error message to the user
            alert('Failed to join chatroom: ' + errorMessage);
        }
    } catch (error) {
        console.error('Error join chatroom:', error);
        // Display error message to the user
        alert('Failed to join chatroom: ' + error.message);
    }
});