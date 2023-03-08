import { ComponentItemSecionActions } from "../../../../../../../../service/morvius-service/components";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
// import { deleteSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentItemSecion } from "../../../../../../../../service/morvius-service/component/components";
import { useRef } from "react";
import { Editarciclocurso } from "../editarsesion/editarciclocurso";
import { deleteciclocurso } from "../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { Viewciclosession } from "../viewciclosession/viewciclosession";

export function Viewcontenitem(props){
    const {
        label = "default",
        dataac = {id_sesion: 0},
        onClickActions = () => {},
        onclickActionbasic = () => {}
    } = props;
    // const [iscollapset, setiscollapse] = useState(false);
    const refeditseccion = useRef();
    const refviewcontent = useRef();
    const dispatch = useNotification();

    const eliminaritem = async () => {
        let result = await deleteciclocurso(dataac.id_ciclo_curso);
        console.log(result);
        handleNewNotification(dispatch,result.messege, result.status);
    }

    return (
        <>
            <ComponentItemSecion onClikchange={()=>{
                refviewcontent.current.click();
            }} label={label}>
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
            {(dataac.estado == 1)?<>
                <Editarciclocurso onAction={onclickActionbasic} dataac={dataac} refid={refeditseccion}></Editarciclocurso>
            </> :<></>}
            <Viewciclosession dataac={dataac} refid={refviewcontent}></Viewciclosession>
            
        </>
    );
}