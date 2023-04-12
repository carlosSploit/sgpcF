import React, { useEffect, useState } from "react";
import { useNotification } from "../../../../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../../../../service/Notifications/useNotificacion";
import { Forminput, ForminputArea, ForminputBottonSubmit, ForminputSelectItem } from "../../../../../../../service/morvius-service/form";
// import { addVersionAnalitiv } from "../../../../../../../service/repository/RTVersionAnalitiv";
import { getActivosProceso } from "../../../../../../../service/repository/RTActivosProceso";
import { ForminputSelectItemFilter } from "../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemFilter/ForminputSelectItem";
import { getTiposAmenasas } from "../../../../../../../service/repository/RTTiposAmenass";
import { getAmenasas } from "../../../../../../../service/repository/RTAmenass";
import { addInsideProces } from "../../../../../../../service/repository/RTInsidencias";

export function ExisteVersionEmpresa(props){

    const { onInsert=()=>{}, informacionProceso} = props;

    // input de contenidos
    // selecctor de Activos
    const [listActivosProceso,setlistActivosProceso] = useState([]);
    const [textActivosProceso, settextActivosProceso] = useState(0);
    // selecctor de Amenazas
    const [listAmenaz, setlistAmenaz] = useState([]);
    const [listAmenazFilter, setlistAmenazFilter] = useState([]);
    const [textAmenaz, settextAmenaz] = useState(0);
    // variables externas
    const [textname, settextname] = useState('');
    const [textdescrip, settextdescrip] = useState('');
    const [, setidselectInscrip] = useState(-1);
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
            // setlistdataHistory(result);
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
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            "nombreInsid" : event.target.nombrEmp.value,
            "descrpInsid": event.target.descr.value,
            "id_activProc": textActivosProceso,
            "id_amenaza" :  textAmenaz
        };
        let resulEn = await addInsideProces(data);
        handleNewNotification(dispatch,resulEn.messege, resulEn.status);
        setTimeout(() => {
            (async ()=>{await onInsert();})();
            limpiezCasillas();
        }, 500);
    }

    const limpiezCasillas = () => {
        setidselectInscrip(-1);
        settextActivosProceso(-1);
        settextAmenaz(-1);
        settextname('');
        settextdescrip('');
    }

    const onSelectItemActiv = (json) => {
        settextActivosProceso(json.id);
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
                        <div className="container_AreaInterProces_selectet_data">
                            <ForminputSelectItem  
                                nameTitle ={'Selecciona el Activo'}
                                listaObj={listActivosProceso} 
                                setlistaObj = {setlistActivosProceso} 
                                keyname={"selestProcesoDep"} 
                                checkbox={textActivosProceso} 
                                setcheckbox={settextActivosProceso} 
                                onChangeinput={onSelectItemActiv} />
                        </div>
                    :<></>}
                    <div style={{height:'5px'}} />
                    {(listActivosProceso.length != 0)? 
                        <div className="container_AreaInterProces_selectet_data">
                            {(parseInt(listAmenaz.length) !== 0)?
                            <ForminputSelectItemFilter 
                                nameTitle ={'Selecciona el Amenaza'} 
                                onChangeinput={(item)=>{
                                    settextAmenaz(item.id)
                                }} 
                                valueInit = {textAmenaz}
                                isVisibleDescri={true} 
                                checkbox={textAmenaz} 
                                setcheckbox={settextAmenaz} 
                                listaObj={listAmenaz} 
                                setlistaObj={setlistAmenaz} 
                                listFilter={listAmenazFilter} 
                                setlistFilter={setlistAmenazFilter} >    
                            </ForminputSelectItemFilter>:<></>}
                        </div>
                    :<></>}
                    <div style={{height:'5px'}} />
                    <Forminput textinput ={textname} settextinput = {settextname} placeHolder="Nombre de la Insidencia" keyname ={`nombrEmp`}/>
                    <div style={{height:'5px'}} />
                    <ForminputArea textinput ={textdescrip} settextinput = {settextdescrip} placeHolder="Descripccion de la Insidencia" keyname ={`descr`}/>
                </>
                <div style={{height:'20px'}} />
                <ForminputBottonSubmit label = {'Registrar'} />
                {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
            </form>
        </>
    );
}