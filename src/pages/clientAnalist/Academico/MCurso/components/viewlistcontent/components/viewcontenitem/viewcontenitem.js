import { Componentcolapset, ComponentcolapsetHeader,ComponentItemSecionActions } from "../../../../../../../../service/morvius-service/components";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentcolapsetBody } from "../../../../../../../../service/morvius-service/component/components";
import { useEffect, useState } from "react";
// import { EditSesion } from "../editarsesion/editarsesion";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import "./style/viewcontenitem.css";
import { ItemContentsescion } from "./components/ItemContentsescion/ItemContentsescion";
// import { AddContSession } from "./components/AddContSession/AddContSession";
import { getContentSession } from "../../../../../../../../service/repository/Contensesion";
import { getContentActiv } from "../../../../../../../../service/repository/Contenactiv";
import { ItemContenttarea } from "./components/ItemContenttarea/ItemContenttarea";
// import { ItemContentsescion } from "./components/ItemContentsescion/ItemContentsescion";

export function Viewcontenitem(props){
    const {
        label = "default",
        dataac = {id_sesion: 0},
        onClickActions = () => {},
        // onclickActionbasic = () => {}
    } = props;
    const [listtarea, setlisttarea] = useState(null);
    const [iscollapset, setiscollapse] = useState(false);
    const [listcontsess, setlistcontsess] = useState(null);
    // const refeditseccion = useRef();
    // const refaddcont = useRef();
    const dispatch = useNotification();

    useEffect(()=>{
        (async ()=>{
            await onlistcontsesion();
            await onlistconttarea();
        })();
    },[]);

    const onlistconttarea = async () => {
        let result = await getContentActiv(dataac.id_sesion);
        setlisttarea(null);
        setTimeout(() => {
            console.log(result);
            setlisttarea(result);
        }, 500);
    }

    const onlistconttareabasic = async () => {
        let result = await getContentActiv(dataac.id_sesion);
        console.log(result);
        setlisttarea(result);
    }

    const eliminaritem = async () => {
        let result = await deleteSesion(dataac.id_sesion);
        handleNewNotification(dispatch,result.messege, result.status);
        console.log(result);
    }

    const onlistcontsesion = async () => {
        let result = await getContentSession(dataac.id_sesion);
        setlistcontsess(null);
        setTimeout(() => {
            console.log(result);
            setlistcontsess(result);
        }, 500);
    }

    const onlistcontsesionbasic = async () => {
        let result = await getContentSession(dataac.id_sesion);
        console.log(result);
        setlistcontsess(result);
    }

    return (
        <>
            <Componentcolapset>
                <ComponentcolapsetHeader oncollapset={(stade)=>{
                    setiscollapse(stade);
                }} label={label} >
                    {/* <ComponentItemSecionActions onClickActions={async () => {
                        refeditseccion.current.click();
                    }} Icont={EditOutlined} /> */}
                    <ComponentItemSecionActions onClickActions={async () => {
                        await eliminaritem();
                        setTimeout(() => {
                            (async ()=>{
                                await onClickActions();
                            })();
                        }, 500);
                    }} Icont={DeleteOutlined}/>
                    <div style={{width:"5px"}} />
                </ComponentcolapsetHeader>
                <ComponentcolapsetBody stateOcult={iscollapset}>
                    {
                        (listcontsess != null)?
                        listcontsess.map((item)=>{
                            return <ItemContentsescion label={item.nombre_conte} onAction={onlistcontsesionbasic} dataac={item} />;
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
                    {/* <div style={{height:"10px"}}/>
                    <div className="componet-colapse-footer">
                        <div className="componet-colapse-footer-bott"
                            onClick={()=>{refaddcont.current.click();}}
                        >
                            Agregar contenido
                        </div>
                        <div className="componet-colapse-footer-bott-inv">
                            Agregar tarea
                        </div>
                    </div> */}
                </ComponentcolapsetBody>
            </Componentcolapset>
            {/* <EditSesion onAction={onclickActionbasic} dataac={dataac} refid={refeditseccion}></EditSesion> */}
            {/* <AddContSession onAction={onlistcontsesion} refaction={refaddcont} dataac={dataac}/> */}
        </>
    );
}