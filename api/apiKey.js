require('dotenv').config();
const {API_KEY , API_KEY_TWO,API_KEY_THREE,API_KEY_FOUR} = process.env;


function sacarElementoAleatorio() {
    const arr = [API_KEY,API_KEY_TWO,API_KEY_THREE,API_KEY_FOUR]

    const indiceAleatorio = Math.floor(Math.random() * arr.length);
    const elementoAleatorio = arr.splice(indiceAleatorio, 1)[0];
    return elementoAleatorio;
}
console.log(sacarElementoAleatorio());
console.log(API_KEY_TWO);
