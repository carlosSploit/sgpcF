// import { ComponentItemSecionActions } from "../../../../../../../../service/morvius-service/components";
import "./style/itemcontenresul.css";
// import { EditOutlined } from "@ant-design/icons";
// import { deleteSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentItemSecion } from "../../../../../../../../service/morvius-service/component/components";
// import { useRef } from "react";
// import { Editarciclocurso } from "../editarsesion/editarciclocurso";
// import { deleteciclocurso } from "../../../../../../../../../../../../../../service/repository/CicloCurso";
// import { handleNewNotification, useNotification } from "../../../../../../../../../../../../../../service/Notifications/useNotificacion";
// import { deleteResulTarea } from "../../../../../../../../../../../../../../service/repository/ResulTarea";
// import { Editpointresoltarea } from "../editpointresoltarea/editpointresoltarea";
// import { Editresoltarea } from "../editresoltarea/editresoltarea";
// import { Viewciclosession } from "../viewciclosession/viewciclosession";

export function Itemcontenrank(props){
    const {
        label = "default",
        // datatart = {},
        dataac = {id_sesion: 0},
        // onClickActions = () => {}
        // onclickActionbasic = () => {}
    } = props;
    // const refeditseccion = useRef();

    // useEffect(()=>{
    //     console.log(datatart);
    // },[]);

    return (
        <>
            <ComponentItemSecion onClikchange={()=>{
                 console.log(dataac.urlconte);
                 window.open(dataac.urlconte, '_blank');
            }} label={label}>
                <div className="container_restare_nota" >
                    <div className="container_restare_nota_cont">
                        {`${dataac.point}`}
                    </div>
                </div>
                <div style={{width:"5px"}} />
                {/* <ComponentItemSecionActions onClickActions={async () => {
                    refeditseccion.current.click();
                }} Icont={EditOutlined} />
                <div style={{width:"5px"}} /> */}
            </ComponentItemSecion>
            {/* <Editpointresoltarea dataac={dataac} datatart={datatart} refcont={refeditseccion} onAction={onClickActions} /> */}
        </>
    );
}