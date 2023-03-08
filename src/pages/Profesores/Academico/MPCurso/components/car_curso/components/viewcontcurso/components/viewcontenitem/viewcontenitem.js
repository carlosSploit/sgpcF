import { Componentcolapset, ComponentcolapsetHeader,ComponentItemSecionActions } from "../../../../../../../../../../service/morvius-service/components";
import { CheckCircleOutlined, CheckOutlined, DeleteOutlined,EditOutlined } from "@ant-design/icons";
import { deleteSesion } from "../../../../../../../../../../service/repository/Sesion";
import { ComponentcolapsetBody, ComponentcolapsetItem, ComponentItemSecionSelector, ComponentItemSecionSelectorItem } from "../../../../../../../../../../service/morvius-service/component/components";
import { useEffect, useRef, useState } from "react";
import { EditSesion } from "../editarsesion/editarsesion";
import { handleNewNotification, useNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import "./style/viewcontenitem.css";
import { ItemContentsescion } from "./components/ItemContentsescion/ItemContentsescion";
import { AddContSession } from "./components/AddContSession/AddContSession";
import { getContentSession } from "../../../../../../../../../../service/repository/Contensesion";
import { getContentActiv } from "../../../../../../../../../../service/repository/Contenactiv";
import { ItemContenttarea } from "./components/ItemContenttarea/ItemContenttarea";
import { AddContTarea } from "./components/AddContTarea/AddContTarea";
import MantenimPuntosClass from "./components/MantenimPuntosClass/mantenimPuntosClass";
// import { Provider } from "react-redux";
// import { sesionhook } from "../../../../../../../../../../hooks/hooks";
// import { actioninsertsesion } from "../../../../../../../../../../hooks/sesion.hooks";
// import { ItemContentsescion } from "./components/ItemContentsescion/ItemContentsescion";

export function Viewcontenitem(props){
    const {
        label = "default",
        dataac = {id_sesion: 0},
        onClickActions = () => {},
        onclickActionbasic = () => {}
    } = props;
    const [iscollapset, setiscollapse] = useState(false);
    const [listcontsess, setlistcontsess] = useState(null);
    const [listtarea, setlisttarea] = useState(null);
    // const [storesesion, setstoresesion] = useState(sesionhook);
    const refeditseccion = useRef();
    const refmantenimeinto = useRef();
    const refaddcont = useRef();
    const refaddtare = useRef();
    const dispatch = useNotification();

    useEffect(()=>{
        (async ()=>{
            await onlistcontsesion();
            await onlistconttarea();
            console.log("·························································")
            console.log(dataac);
            // storesesion.dispatch(actioninsertsesion({id_sesion: dataac.id_sesion, id_ciclocurso: dataac.id_ciclocurso}));
            // setstoresesion(storesesion);
        })();
    },[])

    const eliminaritem = async () => {
        let result = await deleteSesion(dataac.id_sesion);
        handleNewNotification(dispatch,result.messege, result.status);
        // console.log(result);
    }

    const onlistconttarea = async () => {
        let result = await getContentActiv(dataac.id_sesion);
        setlisttarea(null);
        setTimeout(() => {
            // console.log(result);
            setlisttarea(result);
        }, 500);
    }

    const onlistconttareabasic = async () => {
        let result = await getContentActiv(dataac.id_sesion);
        // console.log(result);
        setlisttarea(result);
    }

    const onlistcontsesion = async () => {
        let result = await getContentSession(dataac.id_sesion);
        setlistcontsess(null);
        setTimeout(() => {
            // console.log(result);
            setlistcontsess(result);
        }, 500);
    }

    const onlistcontsesionbasic = async () => {
        let result = await getContentSession(dataac.id_sesion);
        // console.log(result);
        setlistcontsess(result);
    }

    return (
        // <Provider store={storesesion}>
        <>
            <Componentcolapset>
                <ComponentcolapsetHeader oncollapset={(stade)=>{
                    setiscollapse(stade);
                }} label={label} isoptions={true} >
                    {/* <ComponentItemSecionActions onClickActions={async () => {
                        refmantenimeinto.current.click();
                    }} Icont={CheckCircleOutlined} />
                    <ComponentItemSecionActions onClickActions={async () => {
                        refeditseccion.current.click();
                    }} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async () => {
                        await eliminaritem();
                        setTimeout(() => {
                            (async ()=>{
                                await onClickActions();
                            })();
                        }, 500);
                    }} Icont={DeleteOutlined}/> */}
                    <ComponentItemSecionSelector colorIon={"white"}>
                        <ComponentItemSecionSelectorItem labelOption={"Puntuar un inscrito"} onClickActions={async () => {
                            refmantenimeinto.current.click();
                        }} Icont={CheckCircleOutlined} />
                        <ComponentItemSecionSelectorItem labelOption={"Editar una sesion"} onClickActions={async () => {
                            refeditseccion.current.click();
                        }} Icont={EditOutlined}/>
                        <ComponentItemSecionSelectorItem labelOption={"Eliminar una sesion"} onClickActions={async () => {
                            await eliminaritem();
                            setTimeout(() => {
                                (async ()=>{
                                    await onClickActions();
                                })();
                            }, 500);
                        }} Icont={DeleteOutlined}/>
                        {/* <ComponentItemSecionSelectorItem /> */}
                    </ComponentItemSecionSelector>
                    <div style={{width:"5px"}} />
                </ComponentcolapsetHeader>
                <ComponentcolapsetBody stateOcult={iscollapset}>
                    {
                        (listcontsess != null)?
                        listcontsess.map((item)=>{
                            return <ItemContentsescion label={item.nombre_conte} onUpdate={onlistcontsesionbasic} onDelect={onlistcontsesion} dataac={item} />;
                        })
                        :<></>
                    }
                    {
                        (listtarea != null)?
                        listtarea.map((item)=>{
                            return <ItemContenttarea label={item.nombre} onUpdate={onlistconttareabasic} onDelect={onlistconttarea} dataac={item} />;
                        })
                        :<></>
                    }
                    <div style={{height:"10px"}}/>
                    <div className="componet-colapse-footer">
                        <div className="componet-colapse-footer-bott"
                            onClick={()=>{refaddcont.current.click();}}
                        >
                            Agregar contenido
                        </div>
                        <div className="componet-colapse-footer-bott-inv"
                            onClick={()=>{refaddtare.current.click();}}
                        >
                            Agregar tarea
                        </div>
                    </div>
                </ComponentcolapsetBody>
            </Componentcolapset>
            <MantenimPuntosClass dataac={dataac} refid={refmantenimeinto} />
            <EditSesion onAction={onclickActionbasic} dataac={dataac} refid={refeditseccion}></EditSesion>
            <AddContSession onAction={onlistcontsesion} refaction={refaddcont} dataac={dataac}/>
            <AddContTarea onAction={onlistconttarea} refaction={refaddtare} dataac={dataac}/>
        </>
            // </Provider>
    );
}