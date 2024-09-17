document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            document.getElementById('message').innerText = 'Login bem-sucedido!';
        } else {
            document.getElementById('message').innerText = 'Falha no login!';
        }
    })
    .catch(error => console.error('Erro:', error));
});

// Exemplo de requisição autenticada
fetch('http://localhost:3000/protected', {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Erro:', error));
