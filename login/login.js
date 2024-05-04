const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

/* ------------------- Sign Up Process Start ------------------------- */

async function createValidataName(name) {
    if (name.length >= 3 && name.length <= 12) {
        let userData;
        await fetch(`https://databackend-i5t0.onrender.com/api/user/${name}`)
            .then(respnse => {
                if (!respnse.ok) {
                    throw new Error('Network response was not ok');
                }
                return respnse.json()
            }).then(data => {
                userData = data
            })
            .catch(err => {
                console.error(err);
            })
        if (userData.length == 0) {
            return true
        }
        else {
            return {
                access: false,
                data: userData[0]
            }
        }
    }
    else {
        alert("user name must be 3 to 12 letters")
    }
}


async function createEmailValidate(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
        let userData = await fetch(`https://databackend-i5t0.onrender.com/api/email/${email}`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.error(err))
        console.log(userData);
        if (userData.length == 0) {
            return true
        }
        else {
            return {
                access: false,
                data: userData[0]
            }
        }
    } else {
        alert('Please Enter correct email')
    }
}

function checkPassword(password) {
    var minLength = 8;
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumber = /\d/.test(password);
    var hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    // Check if password meets all criteria
    if (password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        return true
    } else {
        return false
    }
}

async function createUser(data) {
    const response = await fetch('https://databackend-i5t0.onrender.com/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Important for sending JSON data
        },
        body: JSON.stringify(data) // Convert object to JSON string
    });

    if (response.ok) {
        console.log('Record created successfully! Email:');
        return true
        // Clear the form or update UI as needed
    } else {
        console.error('Error creating record:', await response.text());
        return false
        // Handle errors appropriately (e.g., display an error message to the user)
    }
}


let sign = document.querySelector('.sign-up-form')

sign.addEventListener('submit', async (e) => {
    e.preventDefault()

    let userName = document.querySelector('.signUser').value;
    let email = document.querySelector('.signEmail').value;
    let pwd = document.querySelector('.signPass').value;
    let now = new Date()
    let create = now.toLocaleString()
    let idObj = 'abcdefghigklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 4; i++) {
        id += idObj[Math.floor(Math.random() * idObj.length)];
    }

    let checkName = await createValidataName(userName)
    let checkMail = await createEmailValidate(email)
    let checkPass = checkPassword(pwd)
    if (checkName == true) {
        if (checkMail == true) {
            if (checkPass == true) {
                let data = {
                    "UserId": id,
                    "UserName": userName,
                    "UserEmail": email,
                    "UserPassword": pwd,
                    "Create": create,
                    "Update": create
                };

                let value = await createUser(data);
                if (value) {
                    alert('User created successfully!')
                    window.location.reload()
                }
            } else {
                alert('Password not strong. Password mut be 8 character. At least 1 uppercase character, 1 number and 1 special character')
            }
        } else {
            alert('Email already used in another Account')
        }
    } else {
        alert('Username already taken')
    }

})

/* ------------------- Sign Up Process End ------------------------- */

/* ------------------- Login Process Start ------------------------- */

async function findAccount(name) {
    let userData;
    await fetch(`https://databackend-i5t0.onrender.com/api/user/${name}`)
        .then(respnse => {
            if (!respnse.ok) {
                throw new Error('Network response was not ok');
            }
            return respnse.json()
        }).then(data => {
            userData = data
        })
        .catch(err => {
            console.error(err);
        })
    if (userData.length != 0) {
        return {
            access: true,
            data: userData[0]
        }
    }
    else {
        return {
            access: false,
            data: userData[0]
        }
    }
}


let login = document.querySelector('.sign-in-form')

login.addEventListener('submit', async (e) => {
    e.preventDefault()
    let loginName = document.querySelector('.username').value
    let loginPass = document.querySelector('.password').value
    let checkAccount = await findAccount(loginName)
    if (checkAccount.access == true) {
        if (checkAccount.data.UserPassword === loginPass) {
            let login = true
            localStorage.setItem('login', login)
            alert('login SuccessFull')
            window.location.href = '../index.html'
        } else {
            alert('Wrong Password')
        }
    } else {
        alert('Username not found')
    }
})

