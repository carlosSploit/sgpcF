import { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../../service/Notifications/NotificationProvider";
// import { getEscalaRTO } from "../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../service/repository/RTEscalaRPO";
// import { updateValorProceso } from "../../../../../../../../service/repository/RTValorizarProces";
import { handleNewNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputBotton, ForminputBottonSubmit } from "../../../../../../../../service/morvius-service/form_input/form_input";
// import { updateValoriActiv } from "../../../../../../../../service/repository/RTValorizarActivo";
import { FormDimension } from "./components/formDimencion";
import { getDimensiones } from "../../../../../../../../service/repository/RTDimensiones";
// import { insertValoriActivDim } from "../../../../../../../../service/repository/RTValorizarActivoDim";
import { addValorizarAmenazDim, getValoriAmenazDimAfect, getValorizarAmenazDim } from "../../../../../../../../service/repository/RTValorizarAmenazDim";
// import { updateValorProceso } from "../../../../../../../../../service/repository/RTValorizarProces";
// import { useNotification } from "../../../../../../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../../../../../../service/Notifications/useNotificacion";
// import { ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit } from "../../../../../../../../../service/morvius-service/form_input/form_input";
// import { getEscalaRTO } from "../../../../../../../../../service/repository/RTEscalaRTO";
// import { getEscalaRPO } from "../../../../../../../../../service/repository/RTEscalaRPO";

export function EditarValorActivCualitativImformation(props){

    const [propinformationDataGeneral, ] = useState({
        "id_valorAfectAmen": 5,
        "id_afectaActiv": 21,
        "id_escalaFrecuen": 3,
        "promEscalDregad": 0,
        "impactCuanti": 0,
        "riesgoCuanti": 0,
        "numValDim": 0,
        "estade": 1
      });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    const [propListDimen, setPropListDimen] = useState([]);
    const dispatch = useNotification();

    useEffect(()=>{
        (async () => {
            console.log(informationDataGeneral)
            const listDimesIngres = await getValorizarAmenazDim(informationDataGeneral.id_valorAfectAmen)
            console.log(listDimesIngres)
            const listDimesIngresKey = listDimesIngres.map((item)=>{
                return item.id_dimension
            })
            // capturar las dimensiones
            const listDimes = await getDimensiones()
            const listMapDimVal = listDimes.map((item)=>{
                const objAux = {
                    "id_dimension" : item.id_dimension,
                    "labeDimension" : item.nombreDimens,
                    "descripccio": item.preguAnalis,
                    "valorDegrad" : -1
                };
                // cargar la informacion que ya se valorizo
                if (parseInt(listDimesIngresKey.indexOf(item.id_dimension)) !== -1) {
                    const listfilterData = listDimesIngres.filter((itemdim) => {
                        return parseInt(itemdim.id_dimension) === parseInt(item.id_dimension)
                    })
                    if (parseInt(listfilterData.length) === 0) return objAux
                    const objfilterData = listfilterData[0]
                    objAux['valorDegrad'] = objfilterData.valorDegrad
                    return objAux
                }
                return objAux
            })
            setPropListDimen(listMapDimVal)
        })();
    },[]);

    // recomendar dimensiones para su valorizacion
    const recomendDimensiones = async () => {
        const listDimesIngres = await getValoriAmenazDimAfect(informationDataGeneral.id_valorAfectAmen)
        const listDimesIngresKey = listDimesIngres.map((item)=>{
            return item.id_dimension
        })
        const listDimensionValor = [...propListDimen];
        setPropListDimen([])
        setTimeout(() => {
            const listMapDismes = listDimensionValor.map((item)=>{
                const objAux = {...item};
                if (parseInt(listDimesIngresKey.indexOf(item.id_dimension)) !== -1) {
                    const listfilterData = listDimesIngres.filter((itemdim) => {
                        return parseInt(itemdim.id_dimension) === parseInt(item.id_dimension)
                    })
                    if (parseInt(listfilterData.length) === 0) return objAux
                    objAux['valorDegrad'] = (parseInt(objAux.valorDegrad) === -1)? 0 : objAux.valorDegrad
                    return objAux
                }
                return objAux
            })
            setPropListDimen(listMapDismes)
            // console.log(listMapDismes)
        }, 500);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // se captura la informacion de las dimensiones
        const ListSelectedDimens = propListDimen.map((item) => {
            return JSON.parse(event.target[`selete${item.id_dimension}`].value);
        })
        console.log(ListSelectedDimens)
        // se filtrar la informacion que no se considera como una valorizacion
        const ListSelectedDimensFilter = ListSelectedDimens.filter((item) => {
            return (parseInt(item.valorDegrad) !== -1)
        })
        
        let data = {
            "id_valorAfectAmen": informationDataGeneral.id_valorAfectAmen,
            "dataValor": ListSelectedDimensFilter
        };

        let resul = await addValorizarAmenazDim(data);
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
        <ForminputBotton label={'Dimensiones Afectadas'} isInvertColor={true} onChange={async()=>{
            await recomendDimensiones()
        }} />
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