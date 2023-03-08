import { useEffect } from "react";
import { useParams } from "react-router-dom";

// hook que se encarga de comprovar si el parametro que se ingreso existe, y si se da ejecuta la funcion de parems.
// dicha funcion comprobara si el parametro ingresado esta dentro de nuestra caja de configuracion.
export function useParameterRouters({paramsVal = [],validedError=async (objJSON)=>{return true;}, onParems=(objJSON)=>{console.log(objJSON)}}){
    const dataParems = useParams();
    useEffect(()=>{
        let keys = Object.keys(dataParems);
        let valueData = (paramsVal.length == 0)? false: paramsVal.reduce((pv,cv)=>{
            let value = pv;
            let result = value || (keys.indexOf(cv) != -1);
            return result;
        },false);
        if (!valueData) return;
        // console.log(dataParems);
        (async ()=>{
            let valid = await validedError(dataParems);
            if (valid) onParems(dataParems);
        })();
    },[]);
}
