
let objsesion = {
    id_sesion: 0,
    id_ciclocurso: 0
}

const actioninsertsesion = (objSesion = objsesion) => {
    return {
        type: "@ciclo/insertciclo",
        payload: objSesion
    };
}

const constumerfunction = (state = objsesion, action = {type: "", payload: {}})=> {
    const {type, payload} = action;

    switch(type){
        case "@ciclo/insertciclo":
            return payload;
        default:
            return state
    }
}

export {actioninsertsesion};
export {constumerfunction};