import { ComponentItemSecionActions } from "../../../../../../../../../../service/morvius-service/components";
import "./style/itemcontenasisten.css";
import { EditOutlined } from "@ant-design/icons";
// import { deleteSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentItemSecion } from "../../../../../../../../../../service/morvius-service/component/components";
import { useRef } from "react";
import { Editpointresoltarea } from "../editasisteninscrip/editasisteninscrip";

export function ItemAsistem(props){
    const {
        label = "default",
        // datatart = {},
        dataac = {id_sesion: 0},
        onClickActions = () => {}
        // onclickActionbasic = () => {}
    } = props;

    let tipoasisten = ["Desconosido", "Asistio", "Falto"];
    const refeeditasisten = useRef();

    return (
        <>
            <ComponentItemSecion onClikchange={()=>{
            }} label={label}>
                <div className="container_restare_nota" >
                    <div className="container_restare_nota_cont">
                        {`${tipoasisten[dataac.estado_asistenc]}`}
                    </div>
                </div>
                <div style={{width:"25px"}} />
                <ComponentItemSecionActions onClickActions={async () => {
                    refeeditasisten.current.click();
                }} Icont={EditOutlined} />
            </ComponentItemSecion>
            <Editpointresoltarea dataac={dataac} refcont={refeeditasisten} onAction={onClickActions} />
        </>
    );
}