/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { Profesor } from "../../pages/Profesores/Profesores";
import { closeSesion, ConsuldataLogm, getKeysesion } from "../repository/mithelworks";
import { MessegePermision } from "./page/messegepermision/messegepermision";
import { LoadData } from "./page/pagecarga/loadData";
import { routerLinks } from "./routers";
import { validationAdmin, valideInicioSecion } from "./valideRouter";
import ReactDOM from "react-dom";
import {v4} from "uuid";
// objeto encargado de poder controlar las rutas con respecto al formato
export class ControllerRouter{
    id = 0;
    abrebiatura = 'adm'
    patchorigin = '/generic'
    pathcinfo = []
    patch = '/generic/:dhsfjdsh'
    component = <></>
    valid = () => {}

    constructor({id = 0,patch = '/generic',component = <></>, valid = () => {return true;}}){
        this.id = id
        this.patch = patch
        this.component = component
        this.valid = valid;
        this.patchorigin = this.extracRouterOrigin(patch);
        let infodata = this.extracInformation(patch);
        this.pathcinfo = infodata;
    }

    extracRouterOrigin(path = '/generic/:dhsfjdsh'){
        let data = path.split('/').filter((item) => {
            return (item[0] + '') !== ':';
        }).reduce((pc,cv)=>{
            if ((cv + '') === '') return pc;
            let value = pc;
            let result = value + '/' + cv;
            return result;
        },'');
        return data;
    }

    extracInformation(patch = '/generic/:dhsfjdsh'){
        let listlabeloptions = ['abrebiarua','opc_prin','sub_opc'];
        let listoptions = {};
        patch.split('/').filter((item)=>{
            return (item != '') && ((item[0] + '') !== ':');
        }).map((item,ind)=>{
            listoptions[listlabeloptions[ind]] = item;
            return {};
        });
        return listoptions;
    }

    toJson(){
        return {
            id: this.id,
            pathcinfo: this.pathcinfo,
            patchorigin: this.patchorigin,
            patch: this.patch,
            component: <RouterController path={this.patch} permision = {this.valid} >{this.component}</RouterController>
        };
    }
}
// realiza una redireccion teniendo en cuenta la ruta especificada y el id de la opccion del menu del opcciones
// bota los apartados alineados a las rutas espesificadas
export function getRutaOptions(){
    let routers  = routerLinks();
    let keyApartados = Object.keys(routers);
    return keyApartados;
}
// extrae las rutas que esten alineados a un atributo en espesifico segun el formato indicado en roouter.js
export function getRutaSubOptions(abrebiatura = 'adm'){
    let routers  = routerLinks();
    let routerApartados = getRutaOptions();
    let routersSubRut = routerApartados.map((item)=>{
        let subroutersaux = routers[item];
        let subrouters = subroutersaux.filter((item)=>{
            let pathinfo = item['pathcinfo'];
            return pathinfo['abrebiarua'] == abrebiatura;
        })
        return (subrouters.length != 0)? subrouters : [];
    });
    return routersSubRut;
}
// extrae la abrebiatura de un patch en espesifico
export function getAbrebiarturaToRouter(){
    let patch = window.location.href.replace(window.location.origin,'');
    let info = new ControllerRouter({}).extracInformation(patch);
    return info['abrebiarua'];
}
// valida el comportamiento de una ruta, por predeterminado valida si una ruta a cambiado por otra considerando el path principal
// o path sin parametros
export function valueRouteActual(path = '', validedrouter = (path,pathact)=>{
    if (path == '') return false;
    return pathact.indexOf(path) == -1;
}){
    let pathact = window.location.href.replace(window.location.origin,'');
    return validedrouter(path,pathact);
}
// retorna la ruta segun el atributo actual y el id de la opccion en espesifico
export function redirectRutaOptions (id_options = 0){
    let abreb = getAbrebiarturaToRouter();
    // limpia las rutas de cada apartado, luego limpiadas para solo extraer las que pertenecen al apartado correcto
    let data = getRutaSubOptions(abreb).filter((item)=>{return item.length != 0;})[0];
    let dataOption = data.filter((item)=>{return item.id == id_options;})
    if(dataOption.length != 0){
        // window.location.href = window.location.origin + dataOption[0].patch;
        return dataOption[0].patch;
    }
    // console.log(dataOption);
}
// se encarga de validar si el usuario ya inicio secion y si lo iso se cargaran sus datos e aparecera el apartado de profesor
export const ComponentLoadDataProf = (props) => {
    const {idPageLoad = 0} = props;
    const [datausser, setdatausser] = useState({
        id_info: 0,
        id_user: 0,
        tipo_user: "P"
    });

    useEffect(()=>{
        (async () => {
            let datSesion = await getKeysesion();
            let dataUs = await ConsuldataLogm({
                seccionkey: `${datSesion}`
            });
            if (!dataUs){
                window.location.href = `${window.location.origin}/login`
                return;
            }
            setdatausser(dataUs);
        })();
    },[]);

    return ((datausser.id_info != 0)?<></>:<LoadData />)
}
// SE encarga de validar si el usuario ya inicio secion y si lo iso imprime el contenido pasado por element
export function RouterController(props){

    const {children, path = '/generic', permision = ()=> {return true;}} = props;
    const [isAcceso, setisAcceso] = useState(null);

    useEffect(()=>{
        (async ()=>{
            let validSecion = await valideInicioSecion()
            console.log(validSecion)
            // if (!validSecion){
            //     window.location.href = `${window.location.origin}/login`
            //     return;
            // }
            let permi = await permision();
            setisAcceso(permi);
        })();
    },[]);

    return (
        <>
            {(isAcceso != null)?((isAcceso)?children:<MessegePermision />):<></>}
        </>
    );
}
// en caso que se aya iniciado secion, comprueba que tipo de usuario eres, si administrador o profesor
export function ReconociLoginDat(props){
    // const [datausser, setdatausser] = useState();

    useEffect(()=>{
        (async () => {
            let validSecion = await valideInicioSecion();
            console.log(validSecion);
            if (!validSecion){
                setTimeout(()=>{
                    window.location.href = `${window.location.origin}/login`
                },1000)
                return;
            }
            // let validAdmin = await validationAdmin();
            // console.log(validAdmin)
            setTimeout(()=>{
                window.location.href = `${window.location.origin}/${'cliAdmin'}`
            },1000)
        })();
    },[]);

    return (<LoadData />)
}