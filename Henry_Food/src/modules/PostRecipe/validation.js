export const validate = (inputs) =>{
    const errores = {}
    const array = Object.values(errores)
    if (inputs.name === "") {
        errores.name = 'El nombre es obligatorio';
     }
     else if(inputs.name.length < 3){
        errores.name = 'Tiene que tener mas de 3 caracteres'
     }
     else if(inputs.name.length> 35){
        errores.name = 'Tiene que tener menos de 35 caracteres'
     }
     if (inputs.summary === "") {
      errores.summary = 'Tienes que poner un resumen de la receta';
    } else if (inputs.summary.length < 5 ) {
      errores.summary = 'El resumen es muy corto';
    } if (inputs.healthScore === "" || inputs.healthScore.length < 0 || inputs.healthScore === 0) {
      errores.healthScore = 'Tienes que poner el healthScore';
    }
    if(inputs.image === "" || inputs.image.length === 0){
        errores.image = 'Tienes que poner una imagen'
    }
    if(inputs.stepByStep === ""){
        errores.stepByStep = 'Tienes que poner tu Paso a Paso'
    }
    if(inputs.diets === ""){
        errores.diets = 'Selecciona una dieta'
    }
     return errores
}