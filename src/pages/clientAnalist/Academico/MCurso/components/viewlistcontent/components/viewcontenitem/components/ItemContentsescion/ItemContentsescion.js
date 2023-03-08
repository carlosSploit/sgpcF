import { AudioOutlined, DeleteOutlined, EditOutlined, FileOutlined, VideoCameraOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { ComponentcolapsetItem, ComponentItemSecionActions } from "../../../../../../../../../../service/morvius-service/component/components";
import { handleNewNotification, useNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { deleteContentSession } from "../../../../../../../../../../service/repository/Contensesion";
import { EditContSession } from "../EditContSession/EditContSession";

export function ItemContentsescion(props){
    const {label = "desconosido", dataac={}, onAction={} } = props;
    const refeditcont = useRef();
    const dispatch = useNotification();

    const Iconinteractor = () =>{
        switch (dataac.id_tipo_conte) {
            case 1: return VideoCameraOutlined;
                case 2: return FileOutlined;
                    case 3: return AudioOutlined;
            default:
                break;
        }
    }

    const onEliminarcontent = async () => {
        let result = await deleteContentSession(dataac.id_conte_sesion);
        handleNewNotification(dispatch,result.messege, result.status);
        console.log(result);
    }

    return (
        <>
            <div>
                <ComponentcolapsetItem Iconitem={Iconinteractor()} onChange={()=>{
                    window.open(dataac.url_contenido, '_blank');
                }} label={label} >
                    {/* <ComponentItemSecionActions onClickActions={()=>{refeditcont.current.click();}} colorIon={"#9686C3"} Icont={EditOutlined} /> */}
                    <ComponentItemSecionActions onClickActions={async ()=>{
                        await onEliminarcontent();
                        await onAction();
                    }} colorIon={"#9686C3"} Icont={DeleteOutlined} />
                </ComponentcolapsetItem>
            </div>
            <EditContSession refaction={refeditcont} onAction={onAction} dataac={dataac} />
        </>
    );
}