const apiOne = "c0eb492754d24d8789d41e6765fec6fb"
const apiTwo = "a0f51f3a58d7418fb21e10147079c2ac"
const apiThre = "605b835d6980480795d032be899677fe"
const apiFour = "a386bcd8ae00423fab9e98933b0b76d8"

const apiKey=()=>{
    const arr = [apiOne,apiTwo,apiThre,apiFour]

    const indiceAleatorio = Math.floor(Math.random() * arr.length);
    const elementoAleatorio = arr.splice(indiceAleatorio, 1)[0];
    return elementoAleatorio;
}
module.exports={apiKey}

