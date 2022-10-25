let total = 0;
const gamesArray = [];

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

const formRegister = document.querySelector(".formRegister");
const formLogin = document.querySelector(".formLogin");
eFieldR = formRegister.querySelector(".email"),
eInputR = eFieldR.querySelector("input"),
pFieldR = formRegister.querySelector(".password"),
pInputR = pFieldR.querySelector("input");

eFieldL = formLogin.querySelector(".email"),
eInputL = eFieldL.querySelector("input"),
pFieldL = formLogin.querySelector(".password"),
pInputL = pFieldL.querySelector("input");

function login() {
    const emailCheck = eInputL.value;
    const passCheck = pInputL.value;
    const emailLocal = JSON.parse(localStorage.getItem("userEmail"));
    const passLocal = JSON.parse(localStorage.getItem("userPass"));

    formLogin.onsubmit = (e) => {
        if (emailCheck == emailLocal && passCheck == passLocal) {
            e.preventDefault();
            formLogin.classList.add("hiddenContent");
        }

    }
}



function register() {
    formRegister.onsubmit = (e) => {
        e.preventDefault();
        //si el campo email y contraseña esta vacio se produce la animacion del shake y aparece el texto de error
        (eInputR.value == "") ? eFieldR.classList.add("shake", "error"): checkEmail();
        (pInputR.value == "") ? pFieldR.classList.add("shake", "error"): checkPass();
        setTimeout(() => { //elimina la clase shake despues de 500ms
            eFieldR.classList.remove("shake");
            pFieldR.classList.remove("shake");
        }, 500);
        eInputR.onkeyup = () => {
            checkEmail();
        } //llama a la funcion checkEmail despues del evento keyup
        pInputR.onkeyup = () => {
            checkPass();
        } //llama a la funcion checkPass despues del evento keyup

        function checkEmail() {
            let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; //expresion regular para validar el email
            if (!eInputR.value.match(pattern)) { //si no coincide agrega la clase error y le saca la clase valid
                eFieldR.classList.add("error");
                eFieldR.classList.remove("valid");
                let errorTxt = eFieldR.querySelector(".error-txt");
                //Si el email no esta vacio muestra "ingresa una direccion de correo valida" sino muestra "el email no puede estar vacio"
                (eInputR.value != "") ? errorTxt.innerText = "Ingresa una direccion de correo valida": errorTxt.innerText = "El email no puede estar vacio";
            } else { // Si el email coincide con la expresion regular le saca la clase error y le agrega la clase valid
                eFieldR.classList.remove("error");
                eFieldR.classList.add("valid");
                localStorage.setItem("userEmail", JSON.stringify(eInputR.value));
            }
        }

        function checkPass() {
            if (pInputR.value == "") { //si la contraseña esta vacia agrega la clase error y saca la clase valid
                pFieldR.classList.add("error");
                pFieldR.classList.remove("valid");
            } else { // si no esta vacio entonces pone la clase valid y saca la clase error
                pFieldR.classList.remove("error");
                pFieldR.classList.add("valid");
                localStorage.setItem("userPass", JSON.stringify(pInputR.value));
            }
        }
        //si el campo del email y el de la contraseña no tienen errores entonces el usuario relleno los datos apropiadamente
        if (!eFieldR.classList.contains("error") && !pFieldR.classList.contains("error")) {
            formRegister.classList.add("hiddenContent");
            formLogin.classList.remove("hiddenContent");
            login();
        }
    }
}


function selectGenre(genre) {
    if (genre == 0) {
        genre = "Aventura";
    } else if (genre == 1) {
        genre = "Accion";
    } else if (genre == 2) {
        genre = "Shooter";
    } else if (genre == 3) {
        genre = "Mundo Abierto";
    } else {
        genre = "Carreras"
    }
    return genre;
};


function addGame() {
    let nroGames = parseInt(prompt("Cuantos juegos desea comprar?(minimo 1, maximo 20): "))

    class Games {
        constructor(gameName, gameGenre, gamePrice, gamePayForm) {
            this.gameName = gameName;
            this.gameGenre = gameGenre;
            this.gamePrice = gamePrice;
            this.gamePayForm = gamePayForm;
        }
    }
    while (nroGames < 1 || nroGames > 20) {
        alert("Ingresaste una cantidad incorrecta, intentalo otra vez.");
        nroGames = parseInt(prompt("Cuantos juegos desea comprar?(minimo 1, maximo 20): "));
    }

    for (let index = 0; index < nroGames; index++) {
        let gameName = prompt("Escriba el nombre del juego nro " + index + ":");
        let gameGenre = parseInt(prompt("Elija el genero del juego: \n0.Aventura \n1.Accion \n2.Shooter \n3.Mundo Abierto \n4.Carreras"));
        while (gameGenre < 0 || gameGenre > 4) {
            alert("No elegiste ninguna de las opciones, intenta de nuevo.");
            gameGenre = parseInt(prompt("Elija el genero del juego: \n0.Aventura \n1.Accion \n2.Shooter \n3.Mundo Abierto \n4.Carreras"));
        }
        gameGenre = selectGenre(gameGenre);
        let price = parseFloat(prompt("Cual es el precio del juego?: "));
        let payForm = prompt("Pagas con tarjeta de debito o credito? con credito es un 10% mas");
        payForm.toLowerCase;
        if (payForm == "credito") {
            price = price * 1.10;
            Math.round(price);
        }
        const game = new Games(gameName, gameGenre, price, payForm);
        gamesArray.push(game);
        total = total + price;
    }
    console.log(gamesArray);
}

const menu = () => {
    let option = parseInt(prompt("Que quieres hacer?: \n0.Agregar productos al carrito \n1.Ver total de compra \n2.Ver todos los productos en el carrito. \n3.Salir"));
    switch (option) {
        case 0:
            addGame();
            menu();
            break;
        case 1:
            alert("El precio total de los productos del carrito es: " + Math.round(total));
            menu();
            break;
        case 2:
            let i = 1;
            for (const game of gamesArray) {
                alert(`el juego n ${i} es ${game.gameName}, su genero es ${game.gameGenre}, su forma de pago es ${game.gamePayForm} y su precio es $${Math.round(game.gamePrice)}`);
                i++;
            }
            break;
        case 3:
            alert("Gracias por visitarnos!");
            break;
        default:
            if (menu < 0 || menu > 2 || menu !== Number(menu)) {
                alert("No seleccionaste ninguna de las opciones, intenta otra vez.");
                menu();
            }
            break;
    }
}


function main() { //llama a todas las funciones 
    register();
    //login();
    //menu(); 
}

main();