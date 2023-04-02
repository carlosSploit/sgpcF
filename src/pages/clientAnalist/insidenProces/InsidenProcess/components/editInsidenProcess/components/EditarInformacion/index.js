import { useEffect, useState } from "react";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ForminputSelectItemEdit } from "../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItem/ForminputSelectItem";
import { ForminputSelectItemFilterEdit } from "../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemFilter/ForminputSelectItem";
import { ForminputAreatEdit, ForminputBottonSubmit, ForminputEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { getActivosProceso } from "../../../../../../../../service/repository/RTActivosProceso";
import { getAmenasas } from "../../../../../../../../service/repository/RTAmenass";
import { updateInsideProces } from "../../../../../../../../service/repository/RTInsidencias";
import { getTiposAmenasas } from "../../../../../../../../service/repository/RTTiposAmenass";

export function ExisteInsidenciaProces(props){

    const [infoGeneral, setinfoGeneral] = useState({
        "id_insidencia": 2,
        "id_activProc": 8,
        "id_amenaza": 10,
        "dependAbreb": "P.prov",
        "nombroInsid": "Se quemo un discoduro",
        "descrpInsid": "Sistema donde se realiza todos los procesos de enseñansa, control, monitoreo, registro de cursos."
    });
    const { onUpdate=()=>{}, informacionProceso, informationGeneral = infoGeneral } = props;

    // input de contenidos
    // selecctor de Activos
    const [listActivosProceso,setlistActivosProceso] = useState([]);
    const [textActivosProceso, settextActivosProceso] = useState(0);
    // selecctor de Amenazas
    const [listAmenaz, setlistAmenaz] = useState([]);
    const [listAmenazFilter, setlistAmenazFilter] = useState([]);
    const [textAmenaz, settextAmenaz] = useState(0);
    // variables externas
    // const [textdescrip, settextdescrip] = useState('');
    // const [, setidselectInscrip] = useState(-1);
    const dispatch = useNotification();

    useEffect(()=>{
        (async()=>{
            await onLoadAreas();
            await onLoadAmenas();
        })();
    },[]);

    const onLoadAreas = async ()=>{
        let result = await getActivosProceso(informacionProceso);
        setlistActivosProceso([]);
        // setlistdataHistory([]);
        setTimeout(() => {
            let data = result.map((item)=>{
                return {
                    id: item.id_activproc,
                    name: item.nombre_Activo
                }
            })
            setlistActivosProceso(data)
            settextActivosProceso(informationGeneral.id_activProc);
        }, 500);
    }

    const onLoadAmenas = async ()=>{
        // inicializar los tipos de escalas de activos
        const Listresult = await getTiposAmenasas();
        const lisMapResulTipCrit = Listresult.map((item)=>{
            return {
                id: item.id_tipoActiv,
                name: item.nombreTipoActiv
            }
        })
        lisMapResulTipCrit.unshift({
            id: 0,
            name: 'Todo'
        })
        setlistAmenazFilter(lisMapResulTipCrit)
        // inicializar los de escalas de activos
        const Listresultesc = await getAmenasas();
        const lisMapResulEsc = Listresultesc.map((item)=>{
            return {
                id: item.id_amenaza,
                name: item.nombreAmena,
                descr: item.abreb,
                keyfilter: item.id_tipoActiv
            }
        })
        setlistAmenaz(lisMapResulEsc)
        settextAmenaz(informationGeneral.id_amenaza);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            "nombreInsid" : event.target[`nombrEmp${informationGeneral.id_insidencia}`].value,
            "descrpInsid": event.target[`descr${informationGeneral.id_insidencia}`].value,
            "id_activProc": textActivosProceso,
            "id_amenaza" :  textAmenaz
        };

        let resulEn = await updateInsideProces(informationGeneral.id_insidencia, data);
        handleNewNotification(dispatch,resulEn.messege, resulEn.status);
        setTimeout(() => {
            (async ()=>{await onUpdate();})();
        }, 500);
    }

    return (
        <>
           <form
                style={{
                    margin: "0",
                    padding: "0",
                    width: "90%",
                    paddingLeft: '5%',
                    paddingRight: '5%'
                }}
                layout="vertical"
                onSubmit={handleSubmit}
                onFinich
                autoComplete="off"
            >
                <>
                    <div style={{height:'5px'}} />
                    {(listActivosProceso.length != 0)? 
                        // <div className="container_AreaInterProces_selectet_data">
                            <ForminputSelectItemEdit  
                                nameTitle ={'Selecciona el Activo'}
                                datacombo ={listActivosProceso} 
                                setpropdatacombo = {setlistActivosProceso} 
                                keyname={"selestProcesoDep"}
                                valueInit = {textActivosProceso} 
                                indexinput = {textActivosProceso} 
                                setindexinput ={settextActivosProceso}
                                placeHolder = {"Activo afectado"}
                            />
                        // </div>
                    :<></>}
                    <div style={{height:'5px'}} />
                    {(listActivosProceso.length != 0)? 
                        // <div className="container_AreaInterProces_selectet_data">
                            (parseInt(listAmenaz.length) !== 0)?
                            <ForminputSelectItemFilterEdit 
                                nameTitle ={'Selecciona el Amenaza'} 
                                valueInit = {textAmenaz}
                                isVisibleDescri={true} 
                                indexinput ={textAmenaz} 
                                setindexinput ={settextAmenaz} 
                                datacombo ={listAmenaz} 
                                setpropdatacombo ={setlistAmenaz} 
                                datacombofilter ={listAmenazFilter} 
                                setpropdatacombofilter ={setlistAmenazFilter} 
                                placeHolder = {"Amenaza de la Insidencia"} >    
                            </ForminputSelectItemFilterEdit>:<></>
                        // </div>
                    :<></>}
                    <div style={{height:'5px'}} />
                    <ForminputEdit valueInit={informationGeneral.nombroInsid} placeHolder="Nombre de la Insidencia" keyname ={`nombrEmp${informationGeneral.id_insidencia}`}/>
                    <div style={{height:'5px'}} />
                    <ForminputAreatEdit valueInit={informationGeneral.descrpInsid} placeHolder="Descripccion de la Insidencia" keyname ={`descr${informationGeneral.id_insidencia}`}/>
                </>
                <div style={{height:'20px'}} />
                <ForminputBottonSubmit label = {'Editar'} />
            </form>
        </>
    );
}