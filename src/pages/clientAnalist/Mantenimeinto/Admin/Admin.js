import React, { useEffect, useState } from "react";
import "./styles/admin.css"
import {ComponentItemSecionSelector, ComponentItemSecionSelectorItem, Componentsearchanimation, ComponentTable, ComponentTableHead} from "../../../../service/morvius-service/component/components";
import { AddAdmin } from "./components/addAlumnos/addAdmin";
import { ItemAdmin } from './components/itemAdmin/ItemAdmin';
import { getadmins } from '../../../../service/repository/Admin';
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

export function Admin(props){
    const [listdata,setlistdata] = useState(null);
    const [ismodeladd,setismodeladd] = useState(false);
    const [textsearch,settextsearch] = useState("");
    
    useEffect(()=>{
        (async()=>{
            let result = await getadmins(textsearch);
            setlistdata(result);
        })();
    },[]);

    const onDelectPerson = async () => {
        let result = await getadmins(textsearch);
        setlistdata(null);
        setTimeout(() => {
            setlistdata(result);
        }, 1000);
    }

    const onUpdate = async () => {
        let result = await getadmins(textsearch);
        setlistdata(result);
    }

    const onInsert = async () =>{
        let result = await getadmins(textsearch);
        setlistdata(result);
    }

    const onChangeseach = async (search) => {
        settextsearch(search);
        let result = await getadmins(search);
        setlistdata(result);
    }

    const onChangekey = async (seach) =>{
        if(seach == ""){
            settextsearch("");
            let result = await getadmins();
            setlistdata(result);
        }
    }

    return (
        // <div className="Container_admin_principal">
        //     <div className="Container_admin_principal_header">
                
        //         <div className="Container_admin_principal_header_content">
        //         <div className="Container_admin_principal_header_content_title">Mantenimiento de Administrador</div>
        //             <div style={{height:"30px"}}></div>
        //             <Componentsearch onChangekey={onChangekey} onChangeseach={onChangeseach}/>
        //         </div>
        //     </div>
        //     <div className="Container_admin_principal_subbody">
        //         <div className="Container_admin_principal_subbody_title">
        //             Ingresa un nuevo usuario administrador
        //         </div>
        //         <div className="Container_admin_principal_subbody_botton">
        //             <AddAdmin onInsert={onInsert}/>
        //         </div>
        //     </div>
        //     <div className="Container_admin_principal_body">
        //         <div className="Container_admin_principal_scroller">
        //             <div className="Container_admin_principa_contain">
        //                 {
        //                     (listdata != null)?
        //                     listdata.map((item)=>{
        //                         return <ItemAdmin onUpdate={onUpdate} onDelectPerson={onDelectPerson} itemdate ={item}/>;
        //                     }):<></>
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="Container_admin_principal">
            <div className="Container_admin_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_admin_principal_header">
                    <div className="Container_admin_principal_header_subcontent_title">
                        <div className="Container_admin_principal_header_content_title">Lista de Administradores</div>
                    </div>
                    <div className="Container_admin_principal_header_subcontent_search">
                        <div className="Container_admin_principal_header_subcontent_search_cont">
                            <Componentsearchanimation onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                        </div>
                        <div className="Container_admin_principal_header_subcontent_search_opt">
                            <div className="Container_admin_principal_header_container_optinon">
                                {/* <ComponentItemSecionSelector SiseIcon={"30"}>
                                    <ComponentItemSecionSelectorItem labelOption={"Agrega un administracion"} onClickActions={async () => {
                                        // refmantenimeinto.current.click();
                                        setismodeladd(true);
                                    }} Icont={CheckCircleOutlined} />
                                </ComponentItemSecionSelector> */}
                                <div onClick={()=>{
                                        setismodeladd(true);
                                }}>
                                    <PlusOutlined style={{color:"#ffffff",fontSize: "25px"}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Curpo */}
                <div className="Container_admin_principal_body">
                    <div className="Container_admin_principal_body_subContainer">
                        <ComponentTable>
                            <ComponentTableHead></ComponentTableHead>
                            <tbody>
                                {
                                    (listdata != null)?
                                    listdata.map((item)=>{
                                        return <ItemAdmin onUpdate={onUpdate} onDelectPerson={onDelectPerson} itemdate ={item}/>;
                                    }):<></>
                                }
                                {/* <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr>
                                <tr style={{height: "20px"}}>
                                    <th className="content-table-item-encabezado cent" style={{width:"10%"}}>15</th>
                                    <th className="content-table-item-encabezado lef">Carlos Arturo Guerrero Castillo</th>
                                    <th className="content-table-item-encabezado lef ocp">Caguerrerog@gmail.com</th>
                                    <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                                        <div onClick={async ()=>{
                                        }} className="container_ItemAdmin_conten_actions_item">
                                            <DeleteOutlined className="container_ItemAdmin_conten_actions_icondelect" />
                                        </div>
                                    </th>
                                </tr> */}
                            </tbody>
                        </ComponentTable>
                    </div>
                </div>
            </div>
            <AddAdmin onInsert={onInsert} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
            {/* <div className="Container_admin_principal_header">
                
                <div className="Container_admin_principal_header_content">
                <div className="Container_admin_principal_header_content_title">Mantenimiento de Administrador</div>
                    <div style={{height:"30px"}}></div>
                    <Componentsearch onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                </div>
            </div>
            <div className="Container_admin_principal_subbody">
                <div className="Container_admin_principal_subbody_title">
                    Ingresa un nuevo usuario administrador
                </div>
                <div className="Container_admin_principal_subbody_botton">
                    
                </div>
            </div>
            <div className="Container_admin_principal_body">
                <div className="Container_admin_principal_scroller">
                    <div className="Container_admin_principa_contain">
                        {
                            (listdata != null)?
                            listdata.map((item)=>{
                                return <ItemAdmin onUpdate={onUpdate} onDelectPerson={onDelectPerson} itemdate ={item}/>;
                            }):<></>
                        }
                    </div>
                </div>
            </div> */}
        </div>
    );
}