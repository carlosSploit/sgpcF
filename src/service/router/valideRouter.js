import { ConsuldataLogm, getKeysesion, gettoken, isExistDataLog, isExistKeyApi } from "../repository/mithelworks";

// valida si se inicio secion
export const valideInicioSecion = async () => {
    // comprueva si se a iniciado secion como administrador
    let keysecciona = await getKeysesion();
    if (!keysecciona) return false;
    // comprueba si ya se tiene una api rest
    let valudeExKeyAp = isExistKeyApi();
    if (!valudeExKeyAp) return false;
    // valida si se puede consultar la informacion del usuario activo
    let dataUs = isExistDataLog();
    if (!dataUs) return false;
    return true;
}
// valida si esque el usuario que analizo secion es administrador
export const validationAdmin = async () => {
    // valida si se inicio sesion
    let valueSesion = await valideInicioSecion();
    if (!valueSesion) return false;
    // valida si el usuario es administrador
    let keysecciona = await getKeysesion()
    let dataUs = await ConsuldataLogm({
        seccionkey: `${keysecciona}`
    });
    // console.log(dataUs)
    // // console.log(dataUs);
    // if (dataUs.tipo_user != 'C') return false
    // return true 
    return true
}
// valida si esque el usuario que analizo secion es profesor
export const validationProfesor = async () => {
    // valida si se inicio sesion
    let valueSesion = await valideInicioSecion();
    if (!valueSesion) return false;
    // valida si el usuario es administrador
    let keysecciona = await getKeysesion()
    let dataUs = await ConsuldataLogm({
        seccionkey: `${keysecciona}`
    });
    // valida si el usuario es administrador
    if (dataUs.tipo_user != 'P') return false
    return true 
}