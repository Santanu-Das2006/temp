async function createUser(data) {
    const response = await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Important for sending JSON data
        },
        body: JSON.stringify(data) // Convert object to JSON string
    });

    if (response.ok) {
        const createdEmail = await response.text();
        console.log('Record created successfully! Email:', createdEmail);
        window.location.reload();
        // Clear the form or update UI as needed
    } else {
        console.error('Error creating record:', await response.text());
        // Handle errors appropriately (e.g., display an error message to the user)
    }
}

async function validateUserName(name) {
    const response = await fetch(`http://localhost:3000/api/user/${name}`);
    const data = await response.json();
    return data.length === 0 && name.length >= 3;
}

let form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let userName = document.querySelector('.username').value;
    let email = document.querySelector('.email').value;
    let pwd = document.querySelector('.password').value;
    let isUserNameValid = await validateUserName(userName);

    if (email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/) && isUserNameValid) {
        let idObj = 'abcdefghigklmnopqrstuvwxyz0123456789';
        let id = '';
        let temp = new Date();
        let now = temp.toLocaleString();

        for (let i = 0; i < 4; i++) {
            id += idObj[Math.floor(Math.random() * idObj.length)];
        }

        let data = {
            "UserId": id,
            "UserEmail": email,
            "UserName": userName,
            "UserPassword": pwd,
            "Create": temp,
            "Update": temp
        };

        await createUser(data);
    }
});
