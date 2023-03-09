import { DeleteOutlined } from "@ant-design/icons";
import React,{useEffect, useState} from "react";
import "./style/ItemProfesor.css"
import {deletprofesor} from "../../../../../../service/repository/Profesor";
import {EditProfesor} from "../editProfesor/editProfesor"
import { useNotification, handleNewNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemProfesor(props){

    const {itemdate, onDelectPerson=()=>{}, onUpdate=()=>{}} = props;
    //const [dataterface,setdataterface] = useState(null);
    const [interfaces,setinterface] = useState(null);
    const dispatch = useNotification();
    // useEffect(()=>{
    //     setdataterface(itemdate);
    // },[]);

    useEffect(()=>{
        setinterface(<EditProfesor onUpdate={onUpdate} dataact={itemdate} />);
    },[]);
    
    return (
        <>
            <tr style={{height: "20px"}}>
                <th className="content-table-item-encabezado cent" style={{width:"10%"}}>{itemdate.id_profesor}</th>
                <th className="content-table-item-encabezado lef">{itemdate.nombre}</th>
                <th className="content-table-item-encabezado lef ocp">{itemdate.correo}</th>
                <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                    <div onClick={async ()=>{
                        let result = await deletprofesor(itemdate.id_profesor);
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
            </tr>
        </>
    // <div className="container_Itemprofesor">
    //     <div className="container_Itemprofesor_conten">
    //         <div className="container_Itemprofesor_conten_photo_content">
    //             <div className="container_Itemprofesor_conten_photo"
    //                 style={{
    //                     backgroundImage: `url('${itemdate.photo}')`
    //                 }}
    //             ></div>
    //         </div>
    //         <div onClick={()=>{
    //             // console.log(itemdate);
    //         }} className="container_Itemprofesor_conten_nameperson">{itemdate.nombre}</div>
    //         <div className="container_Itemprofesor_conten_actions">
    //             <div onClick={async ()=>{
    //                 let result = await deletprofesor(itemdate.id_profesor);
    //                 // window.location.reload(false);
    //                 await onDelectPerson();
    //                 // setinterface(null);
    //                 // setinterface(<EditProfesor onUpdate={onUpdate} dataact={itemdate} />);
    //             }} className="container_Itemprofesor_conten_actions_item">
    //                 <DeleteOutlined className="container_Itemprofesor_conten_actions_icon" />
    //             </div>
    //             {/* {(dataterface!=null)?<EditProfesor onUpdate={onUpdate} dataact={itemdate} />:<></>} */}
    //             {(interfaces != null)?interfaces:<></>}
    //         </div>
    //     </div>
    // </div>
    );
}