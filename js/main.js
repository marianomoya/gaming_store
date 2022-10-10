let total = 0;
const gamesArray = [];

class User{
    constructor(username,password){
        this.username = username;
        this.password = password;
    }


}
function login(){
    alert("Hola! antes de empezar tienes que crear un usuario y contraseña");
    let username = prompt("Ingresa un nombre de usuario");
    let password = prompt("Ingresa una contraseña de 8 caracteres");
    while (password.length < 8){
        password = prompt("No ingresaste 8 caracteres, intenta otra vez.");
    }

    const user = new User(username,password);
    
    alert("Ahora inicia sesion con tu nuevo usuario")
    let nameCheck = prompt("Ingresa tu nombre de usuario");
    while(nameCheck != user.username){
        alert("Ingresaste incorrectamente el nombre de usuario, intenta otra vez");
        nameCheck = prompt("Ingresa tu nombre de usuario");
    }
    let passwordCheck = prompt("Ingresa tu contraseña");
    while(passwordCheck != user.password){
        alert("Ingresaste incorrectamente la contraseña, intenta otra vez");
        passwordCheck = prompt("Ingresa tu contraseña");
    }
    alert("Ingresaste correctamente!");

}

function selectGenre(genre){
    if(genre == 0){
        genre = "Aventura";
    }else if(genre == 1){
        genre = "Accion";
    }else if(genre == 2){
        genre = "Shooter";
    }else if(genre == 3){
        genre = "Mundo Abierto";
    }else{
        genre = "Carreras"
    }
    return genre;
};


function addGame(){
    let nroGames = parseInt(prompt("Cuantos juegos desea comprar?(minimo 1, maximo 20): "))
    
    class Games{
        constructor(gameName, gameGenre, gamePrice, gamePayForm){
            this.gameName = gameName;
            this.gameGenre = gameGenre;
            this.gamePrice = gamePrice;
            this.gamePayForm = gamePayForm;
        }
    }    
    while(nroGames<1 || nroGames>20){
        alert("Ingresaste una cantidad incorrecta, intentalo otra vez.");
        nroGames = parseInt(prompt("Cuantos juegos desea comprar?(minimo 1, maximo 20): "));
    }

    for(let index = 0; index < nroGames; index++){
        let gameName = prompt("Escriba el nombre del juego nro "+ index + ":");
        let gameGenre = parseInt(prompt("Elija el genero del juego: \n0.Aventura \n1.Accion \n2.Shooter \n3.Mundo Abierto \n4.Carreras"));
        while(gameGenre<0 || gameGenre>4){
            alert("No elegiste ninguna de las opciones, intenta de nuevo.");
            gameGenre = parseInt(prompt("Elija el genero del juego: \n0.Aventura \n1.Accion \n2.Shooter \n3.Mundo Abierto \n4.Carreras"));
        }
        gameGenre = selectGenre(gameGenre);
        let price = parseFloat(prompt("Cual es el precio del juego?: "));
        let payForm= prompt("Pagas con tarjeta de debito o credito? con credito es un 10% mas");
        payForm.toLowerCase;
        if(payForm =="credito"){
            price = price *1.10;
            Math.round(price);
        }
        const game = new Games(gameName, gameGenre, price, payForm);
        gamesArray.push(game);
        total = total + price;
    }
    console.log(gamesArray);
}

const menu= ()=> {
    let option = parseInt(prompt("Que quieres hacer?: \n0.Agregar productos al carrito \n1.Ver total de compra \n2.Ver todos los productos en el carrito. \n3.Salir"));
    switch(option){
        case 0:
            addGame();
            menu();
            break;
        case 1:
            alert("El precio total de los productos del carrito es: "+ Math.round(total));
            menu();
            break;
        case 2:
            let i = 1;
            for(const game of gamesArray){
                alert(`el juego n ${i} es ${game.gameName}, su genero es ${game.gameGenre}, su forma de pago es ${game.gamePayForm} y su precio es $${Math.round(game.gamePrice)}`);
                i++;
            }
            break;
        case 3:
            alert("Gracias por visitarnos!");
            break;
        default:
            if(menu<0 || menu>2 || menu!==Number(menu)){
                alert("No seleccionaste ninguna de las opciones, intenta otra vez.");
                menu();
            }
            break;
    }
}


function main(){
    alert("Bienvenido a GAMING STORE");
    login();
    menu();
}

main();