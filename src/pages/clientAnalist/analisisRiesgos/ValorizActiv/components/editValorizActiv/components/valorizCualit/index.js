import { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { getEscalaRTO } from "../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../service/repository/RTEscalaRPO";
// import { updateValorProceso } from "../../../../../../../../service/repository/RTValorizarProces";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBottonSubmit, ForminputEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { updateValoriActiv } from "../../../../../../../../service/repository/RTValorizarActivo";
import { FormDimension } from "./components/formDimencion";
import { getDimensiones } from "../../../../../../../../service/repository/RTDimensiones";
import { getValoriActivDim, insertValoriActivDim } from "../../../../../../../../service/repository/RTValorizarActivoDim";
// import { updateValorProceso } from "../../../../../../../../../service/repository/RTValorizarProces";
// import { useNotification } from "../../../../../../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../../../../../../service/Notifications/useNotificacion";
// import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../../service/morvius-service/form_input/form_input";
// import { getEscalaRTO } from "../../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../../service/repository/RTEscalaRPO";

export function EditarValorActivCualitativImformation(props){

    const [propinformationDataGeneral, ] = useState({
        "id_valorActiv": 1,
        "id_activProsVerAnali": 1,
        "valorActivCuanti": 1000,
        "promValorCuanti": 5,
        "nunValorDimen": 3,
        "fechaValorizacion": "2023-03-14T04:04:09.000Z",
        "estade": 1
      });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    const [propListDimen, setPropListDimen] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async () => {
            // capturar las dimensiones
            const listDimes = await getDimensiones()
            const listDimesIngres = await getValoriActivDim(informationDataGeneral.id_valorActiv)
            const listDimesIngresKey = listDimesIngres.map((item)=>{
                return item.id_dimension
            })
            console.log(listDimesIngres)
            const listMapDismes = listDimes.map((item)=>{
                const objAux = {
                    "id_dimension" : item.id_dimension,
                    "labeDimension" : item.nombreDimens,
                    "descripccio": item.preguAnalis,
                    "valorAcivCualit" : -1,
                    "id_varlotActivCualit" : -1,
                    "tipValoActivDimen" : "N"
                };
                if (parseInt(listDimesIngresKey.indexOf(item.id_dimension)) !== -1) {
                    const listfilterData = listDimesIngres.filter((itemdim) => {
                        return parseInt(itemdim.id_dimension) === parseInt(item.id_dimension)
                    })
                    if (parseInt(listfilterData.length) === 0) return objAux
                    const objfilterData = listfilterData[0]
                    objAux['valorAcivCualit'] = objfilterData.valorAcivCualit
                    objAux['id_varlotActivCualit'] = objfilterData.id_varlotActivCualit
                    objAux['tipValoActivDimen'] = objfilterData.tipValoActivDimen
                    return objAux
                }
                
                return objAux
            })
            // console.log(listMapDismes)
            setPropListDimen(listMapDismes)
        })();
    },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // se captura la informacion de las dimensiones
        const ListSelectedDimens = propListDimen.map((item) => {
            return JSON.parse(event.target[`selete${item.id_dimension}`].value);
        })
        // se filtrar la informacion que no se considera como una valorizacion
        const ListSelectedDimensFilter = ListSelectedDimens.filter((item) => {
            return (parseInt(item.valorAcivCualit) !== -1) && (parseInt(item.valorAcivCualit) !== -1)
        })
        
        let data = {
            "id_valorActiv": informationDataGeneral.id_valorActiv,
            "dataValor": ListSelectedDimensFilter
        };

        console.log(data)
        let resul = await insertValoriActivDim(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    await onAction();
                })();
        }, 500);
    }

    return (<form
        style={{
            margin: "0",
            padding: "0",
            width: "100%"
        }}
        layout="vertical"
        onSubmit={handleSubmit}
        onFinich
        autoComplete="off"
    >
        <div style={{height: '10px'}}></div>
        {(parseInt(propListDimen.length) !== 0)?(propListDimen.map((item)=>{
            return <>
                <FormDimension valueInit={item} keyname={`selete${item.id_dimension}`} />
                <div style={{height: '8px'}}></div>
            </>
        })):<></>}
        <div style={{height: '10px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
    </form>);
}