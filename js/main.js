let total = 0;

function addGame(){
    let nroGames = parseInt(prompt("Cuantos juegos desea comprar?(minimo 1, maximo 20): "));

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
        let price = parseFloat(prompt("Cual es el precio del juego?: "));
        let payForm= prompt("Pagas con tarjeta de debito o credito? con credito es un 10% mas");
        payForm.toLowerCase;
        if(payForm =="credito"){
            price = price *1.10;
        }
        total = total + price;
    }
}

const menu= ()=> {
    let option = parseInt(prompt("Que quieres hacer?: \n0.Agregar productos al carrito \n1.Ver total de compra \n2.Salir"));
    switch(option){
        case 0:
            addGame();
            menu();
            break;
        case 1:
            alert("El precio total de los productos del carrito es: "+ total);
            menu();
            break;
        case 2:
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
    menu();
}

main();