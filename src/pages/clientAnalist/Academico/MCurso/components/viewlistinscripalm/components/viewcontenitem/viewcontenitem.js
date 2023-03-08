import { Componentcolapset, ComponentcolapsetHeader,ComponentItemSecionActions } from "../../../../../../../../service/morvius-service/components";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import { deleteSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentcolapsetBody, ComponentItemSecion } from "../../../../../../../../service/morvius-service/component/components";
import { useRef, useState } from "react";
import { Editarciclocurso } from "../editarsesion/editarciclocurso";
import { deleteciclocurso } from "../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";

export function Viewcontenitem(props){
    const {
        label = "default",
        dataac = {id_sesion: 0},
        onClickActions = () => {},
        onclickActionbasic = () => {}
    } = props;
    const [iscollapset, setiscollapse] = useState(false);
    const refeditseccion = useRef();
    const dispatch = useNotification();

    const eliminaritem = async () => {
        let result = await deleteciclocurso(dataac.id_ciclo_curso);
        console.log(result);
        handleNewNotification(dispatch,result.messege, result.status);
    }

    return (
        <>
            <ComponentItemSecion label={label}>
                {(dataac.estado == 1)?<>
                    <ComponentItemSecionActions onClickActions={async () => {
                        refeditseccion.current.click();
                    }} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async () => {
                        await eliminaritem();
                        setTimeout(() => {
                            (async()=>{
                                await onClickActions();
                            })();
                        }, 500);
                    }} Icont={DeleteOutlined}/>
                    <div style={{width:"5px"}} />
                </> :<></>}
            </ComponentItemSecion>

            {/* <Componentcolapset>
                <ComponentcolapsetHeader oncollapset={(stade)=>{
                    setiscollapse(stade);
                }} label={label} >
                    <ComponentItemSecionActions onClickActions={async () => {
                        refeditseccion.current.click();
                    }} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async () => {
                        await eliminaritem();
                        await onClickActions();
                    }} Icont={DeleteOutlined}/>
                    <div style={{width:"5px"}} />
                </ComponentcolapsetHeader>
                <ComponentcolapsetBody stateOcult={iscollapset}>
                </ComponentcolapsetBody>
            </Componentcolapset> */}
            {(dataac.estado == 1)?<>
                <Editarciclocurso onAction={onclickActionbasic} dataac={dataac} refid={refeditseccion}></Editarciclocurso>
            </> :<></>}
            
        </>
    );
}