let cardElement = document.querySelector(".container");
let intervalId;

class RandomUser {
    constructor() { }

    static fetchFromAPI() {
        let URL = 'https://randomuser.me/api/';
        fetch(URL)
            .then(response => response.json())
            .then(data => RandomUser.renderUserData(data))
            .catch(error => alert(error));
    }

    static renderUserData(data) {
        let user = data.results[0];

        cardElement.innerHTML += `
            <div class="card">
                <div class="content-img">
                    <div class="img"><img src="${user.picture.large}" alt="foto user"></div>
                </div>
                <div class="dataUser">
                        
                    <span> <label for="#">Street</label> ${user.location.street.number}</span>
                    <span> <label for="#">postcode</label> ${user.location.postcode}</span>
                    <span>${user.location.street.name}</span>
                </div>
                <div class="NomeC">
                    <span>${user.name.title}</span>
                    <label for="#">${user.name.first} ${user.name.last}</label>
                    <span>${user.dob.age} Anos</span>
                    <span>${user.location.city}, ${user.location.state}, ${user.location.country}</span>
                </div>
                <h4>credenciais:</h4>

                <div class="credenciais">
                    <div class="email">
                        <label for="#">email:</label>
                        <span>${user.email}</span>
                    </div>
                    <div class="pass">
                        <label for="#">Password:</label>
                        <span>${user.login.password}</span>
                    </div>
                </div>
                <div class="rodape">
                    <label for="#">Telefone:${user.phone}</label>
                    <label for="#">Cell: ${user.cell}</label>
                </div>
            </div>
        `;

        let list = document.querySelectorAll(".card");
        list.forEach(item => item.addEventListener("click", activeLink));



    }

}


document.getElementById('pegarValorBtn').addEventListener('click', () => {
    const emailUser = document.getElementById('meuInputEmail').value;
    const passwordUser = document.getElementById('meuInputPass').value;

    if (emailUser !== "" && passwordUser !== "") {

        let emails = document.querySelectorAll(".card .email span");
        let passwords = document.querySelectorAll(".card .pass span");
        let names = document.querySelectorAll(".card .NomeC label");
        let photos = document.querySelectorAll(".card .img img");
        let emailFound = false;
        let passwordFound = false;

        emails.forEach((emailElement, index) => {
            if (emailUser === emailElement.textContent) {
                emailFound = true;
                if (passwordUser === passwords[index].textContent) {
                    passwordFound = true;
                    modal.classList.remove('active')

                    console.log("Email, senha, nome, sobrenome e foto encontrados:");
                    console.log("Email:", emailElement.textContent);
                    console.log("Senha:", passwords[index].textContent);
                    console.log("Nome:", names[index].textContent);
                    console.log("Foto:", photos[index].src);


                    let perfil = document.querySelector('#imgUserLogado');
                    let BtnLogin = document.querySelector('#BtnLogin');

                    perfil.style.display = "flex";
                    BtnLogin.style.display = "none";


                    let foto = document.querySelector('#imgUserLogado img');
                    let foto2 = document.querySelector('#imgUserLogado2 img');
                    let nomePerfil = document.querySelector('#nome');

                    nomePerfil.innerText = names[index].textContent;
                    foto.src = photos[index].src;
                    foto2.src = photos[index].src;
                }
            }
        });

        if (!emailFound) {
            console.log("Email não encontrado");
        } else if (!passwordFound) {
            console.log("Senha não encontrada");
        }
    } else {
        console.log("Por favor, preencha todos os campos");
    }
});

function activeLink() {
    let list = document.querySelectorAll(".card");
    list.forEach((item) => {
        item.classList.remove("hovered");

    });

    this.classList.add("hovered");
    clearInterval(intervalId);
    intervalId = null;
}

function RemoveLink() {
    let list = document.querySelectorAll(".card");
    list.forEach((item) => {
        item.classList.remove("hovered");
    });

}

document.addEventListener("click", (e) => {
    if (!e.target.closest(".card")) {
        if (!intervalId) {
            RemoveLink()

            intervalId = setInterval(function () {
                RandomUser.fetchFromAPI();
            }, 2000);
        }
    }
});

intervalId = setInterval(function () {
    RandomUser.fetchFromAPI();

}, 4000);



const modal = document.querySelector(".modal-container")

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') != -1) {
            modal.classList.remove('active')
        }
    }

}

let perfil = document.querySelector('#imgUserLogado');
let aparece = document.querySelector("#ABR")


perfil.addEventListener("click", function (a) {
    aparece.classList.toggle("perfilAparece")
})
