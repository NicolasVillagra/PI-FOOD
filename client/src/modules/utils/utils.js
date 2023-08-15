// Filtro de dietas
export const filterDiets = (recetas, dietsFilter) => {
    return recetas.filter(recipe =>
      recipe.diets.some(diet => {
        if (typeof diet === 'string') {   //verifico si la dieta recibida es un stringo un objeto
          return diet.toLowerCase().includes(dietsFilter);
        } else if (typeof diet === 'object' && diet.name) {
          return diet.name.toLowerCase().includes(dietsFilter);
        }
        return false;
      })
    );
  };
  
  // Filtro A to Z
  export const orderToAZ = (recetas) => {
    return [...recetas].sort((a, b) => a.name.localeCompare(b.name));
  };
  
  //Filtro Z to A
  export const orderToZA = (recetas) => {
    return [...recetas].sort((a, b) => b.name.localeCompare(a.name));
  };

  //Filtro por DataBase
  
  export const dataBaseFn = (state)=>{
    return state.filter((e)=>typeof e.id !== 'number') //verifico si la id es un string
  }

  //Filtro por API

  export const apiFn = (state) =>{
    return state.filter((e)=>typeof e.id !== 'string')
  }
