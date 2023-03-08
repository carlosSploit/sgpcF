import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./style/ItemAdmin.css"
import {deleteadmin} from "../../../../../../service/repository/Admin";
import {EditAdmin} from "../editAdmin/editAdmin"
import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemAdmin(props){
    const {itemdate, onDelectPerson=()=>{}, onUpdate=()=>{}} = props;
    const [interfaces,setinterface] = useState(null);
    const dispatch = useNotification();

    useEffect(()=>{
        // console.log(itemdate);
        setinterface(<EditAdmin onUpdate={onUpdate} dataact={itemdate} />);
    },[]);

    // return (<div className="container_ItemAdmin">
    //     <div className="container_ItemAdmin_conten">
    //         <div className="container_ItemAdmin_conten_photo_content">
    //             <div className="container_ItemAdmin_conten_photo"
    //                 style={{
    //                     backgroundImage: `url('${itemdate.photo}')`
    //                 }}
    //             ></div>
    //         </div>
    //         <div className="container_ItemAdmin_conten_nameperson">{itemdate.nombre}</div>
    //         <div className="container_ItemAdmin_conten_actions">
    //             <div onClick={async ()=>{
    //                 let result = await deleteadmin(itemdate.id_admin);
    //                 handleNewNotification(dispatch,result.messege, result.status);
    //                 setTimeout(() => {
    //                         (async ()=>{await onDelectPerson();})();
    //                         // limpiartext();
    //                         // console.log(resul);
    //                 }, 500);
    //                 //window.location.reload(false);
    //                 // recarga los datos dentro de la data
    //                 // setinterface(null);
    //                 // setinterface(<EditAdmin onUpdate={onUpdate} dataact={itemdate} />);
    //             }} className="container_ItemAdmin_conten_actions_item">
    //                 <DeleteOutlined className="container_ItemAdmin_conten_actions_icon" />
    //             </div>
    //             {(interfaces != null)?interfaces:<></>}
    //         </div>
    //     </div>
    // </div>);
    return (<tr style={{height: "20px"}}>
                <th className="content-table-item-encabezado cent" style={{width:"10%"}}>{itemdate.id_admin}</th>
                <th className="content-table-item-encabezado lef">{itemdate.nombre}</th>
                <th className="content-table-item-encabezado lef ocp">{itemdate.correo}</th>
                <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                    <div onClick={async ()=>{
                        let result = await deleteadmin(itemdate.id_admin);
                        handleNewNotification(dispatch,result.messege, result.status);
                        setTimeout(() => {
                                (async ()=>{await onDelectPerson();})();
                                // limpiartext();
                                // console.log(resul);
                        }, 500);
                    }} className="container_ItemAdmin_conten_actions_item">
                        <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                    </div>
                    {(interfaces != null)?interfaces:<></>}
                </th>
            </tr>);
}