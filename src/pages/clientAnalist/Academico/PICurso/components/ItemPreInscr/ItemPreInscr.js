import { CheckCircleOutlined, CloseCircleOutlined, FileImageOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import "./style/ItemPreInscr.css"
import { deleteadmin } from "../../../../../../service/repository/Admin";
import { EditAdmin } from "../editAdmin/editAdmin"
import { ComponentChipst } from "../../../../../../service/morvius-service/components";
import { updatestadeInscrip } from "../../../../../../service/repository/Inscripcc";
import { EdistadeInscrip } from "./components/edistadeInscrip/edistadeInscrip";
import { Viewbaucherinscri } from "./components/viewbaucherinscri/viewbaucherinscri";

export function ItemPreInscr(props){
    const {itemdate, onUpdate=()=>{}} = props;
    const [interfaces,setinterface] = useState(null);
    const [isupdatecancel,setisupdatecancel] = useState(-1);
    const refeditstade = useRef();
    const refviewvaucher = useRef();

    useEffect(()=>{
        setinterface(<EditAdmin onUpdate={onUpdate} dataact={itemdate} />);
    },[]);

    const Updateinscrp = (stade = 0) =>{
        setisupdatecancel(stade);
    }
    return (
        <>
            <tr style={{height: "20px"}}>
                <th className="content-table-item-encabezado cent" style={{width:"10%"}}>{itemdate.id_inscrip}</th>
                <th className="content-table-item-encabezado lef">{itemdate.nombre}</th>
                <th className="content-table-item-encabezado lef ocp">
                    <div className="container_ItemPreInscr_conten_itemcourse">
                        <ComponentChipst colorchip={""} name={itemdate.namecurso} isStadeOptions={false}/>
                    </div>
                </th>
                <th className="content-table-item-encabezado cent" style={{width:"100px"}}>
                    <div onClick={async ()=>{
                        refviewvaucher.current.click();
                    }} className="container_ItemPreInscr_conten_actions_item">
                        <FileImageOutlined className="container_ItemPreInscr_conten_actions_icon" />
                    </div>
                    <div onClick={async ()=>{
                        Updateinscrp(1);
                        refeditstade.current.click();
                    }} className="container_ItemPreInscr_conten_actions_item">
                        <CheckCircleOutlined className="container_ItemPreInscr_conten_actions_icon" />
                    </div>
                    <div onClick={async ()=>{
                        Updateinscrp();
                        refeditstade.current.click();
                    }} className="container_ItemPreInscr_conten_actions_item">
                        <CloseCircleOutlined className="container_ItemPreInscr_conten_actions_icon" />
                    </div>
                </th>
            </tr>
            <EdistadeInscrip refmodal={refeditstade} onUpdate={onUpdate} data={itemdate} isupdatecancel={isupdatecancel}/>
            <Viewbaucherinscri refmodal={refviewvaucher} onUpdate={onUpdate} data={itemdate}/>
        </>
    );
    // return (
    // <div className="container_ItemPreInscr">
    //     <div className="container_ItemPreInscr_conten">
    //         <div className="container_ItemPreInscr_conten_photo_content">
    //             <div className="container_ItemPreInscr_conten_photo"
    //                 style={{
    //                     backgroundImage: `url('${itemdate.photo}')`
    //                 }}
    //             ></div>
    //         </div>
    //         <div className="container_ItemPreInscr_conten_nameperson">{itemdate.nombre}</div>
    //         <div className="container_ItemPreInscr_conten_itemcourse">
    //             <ComponentChipst colorchip={""} name={itemdate.namecurso} isStadeOptions={false}/>
    //         </div>
    //         <div className="container_ItemPreInscr_conten_actions">
    //             <div onClick={async ()=>{
    //                 refviewvaucher.current.click();
    //             }} className="container_ItemPreInscr_conten_actions_item">
    //                 <FileImageOutlined className="container_ItemPreInscr_conten_actions_icon" />
    //             </div>
    //             <div onClick={async ()=>{
    //                 Updateinscrp(1);
    //                 refeditstade.current.click();
    //             }} className="container_ItemPreInscr_conten_actions_item">
    //                 <CheckCircleOutlined className="container_ItemPreInscr_conten_actions_icon" />
    //             </div>
    //             <div onClick={async ()=>{
    //                 Updateinscrp();
    //                 refeditstade.current.click();
    //             }} className="container_ItemPreInscr_conten_actions_item">
    //                 <CloseCircleOutlined className="container_ItemPreInscr_conten_actions_icon" />
    //             </div>
    //             <EdistadeInscrip refmodal={refeditstade} onUpdate={onUpdate} data={itemdate} isupdatecancel={isupdatecancel}/>
    //             <Viewbaucherinscri refmodal={refviewvaucher} onUpdate={onUpdate} data={itemdate}/>
    //             {/* {(interfaces != null)?interfaces:<></>} */}
    //         </div>
    //     </div>
    // </div>);
}