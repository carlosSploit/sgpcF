const keymodalcompot = "jdfjdkfjdk";

// carga la variable encargada de guardad la cantidad de modales abiertos
export function getAccesModal(){
    if (!localStorage.getItem(keymodalcompot)){
        localStorage.setItem(keymodalcompot,"0");
        return 0;
    }else{
        return parseInt(localStorage.getItem(keymodalcompot));
    }
}
// agregar un modal abiertor en la variable
export function addModal(){
    let vardat =  getAccesModal();
    vardat = vardat + 1;
    localStorage.setItem(keymodalcompot,`${vardat}`);
}

export function delectModal(){
    let vardat =  getAccesModal();
    vardat = (vardat > 0)?(vardat - 1):0;
    localStorage.setItem(keymodalcompot,`${vardat}`);
}