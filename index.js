document.getElementById('save-btn').addEventListener('click', () => {
    let name = document.getElementById('name-input').value;
    let age = document.getElementById('age-input').value;
    let email = document.getElementById('email-input').value;
    let desc = document.getElementById('desc-input').value;

    if (name != "" && age != "" && email != "") {
        // post data
        fetch('http://localhost:3000/index.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                age: age,
                email: email,
                description: desc
            })

        })
            // get data
            .then(() => {
                return fetch("http://localhost:3000/index.php");
            })
            .then(res => res.json())
            .then(data => {
                document.getElementById('users').innerHTML = '';
                data.map((user, number) => {
                    let userContainer = document.createElement('div');
                    userContainer.classList.add('users');
                    userContainer.innerHTML = `  
                <p>user ${number}</p>  
                <p>User token : ${user.id}</p>  
                <p>User name : ${user.name}</p>  
                <p>User age : ${user.age}</p>  
                <p>User email : ${user.email}</p>  
                `;
                    if (user.description) {
                        userContainer.innerHTML += `<p>User description : ${user.description}</p>`;
                    }
                    document.getElementById('users').appendChild(userContainer);
                });
                name.value = '';
                age.value = '';
                email.value = '';
                desc.value = '';
            })
    } else {
        alert('fill the * fields');
    }

})