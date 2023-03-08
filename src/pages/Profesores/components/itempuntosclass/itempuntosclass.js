import React, { useEffect, useState } from "react";
import { LisObjIcons } from "../../../../service/morvius-service/res/resSvgtoJS/objListIcon.react";
import "./style/itempuntosclass.css";

export default function ItemPuntosClass(props){
    const { pointstotal = -1, selectidenx = -1 ,id_puntos = 0, name = "puntos", value = 1, photo = "",onSelectItem=(index)=>{}, onchange=()=>{}} = props;
    const [objIcons, setobjIcons] = useState({
        id: 0,
        name: "",
        iconObjs: "⁉"
    });

    const colorItem = () => {
        return (selectidenx == id_puntos)? "#9686C3" :(value < 0)? "#c62828": "#2e7d32";
    }

    useEffect(()=>{
        if(photo != "" && photo != "0"){
            let ListObjicon = new LisObjIcons();
            let objIcon = ListObjicon.getIcon(parseInt(photo));
            setobjIcons(objIcon);
        }
    },[]);

    const onClickItem = () => {
        onSelectItem(id_puntos);
        onchange();
    };

    return (
        <div className="container_item_puntosclass_conte_bueno" onClick={onClickItem} style={{borderColor: `${colorItem()}`}}>
            <div className="container_item_puntosclass_conte_puntos" style={{backgroundColor: `${colorItem()}`}}>
                <div className="container_item_puntosclass_conte_puntos_text">
                    {(pointstotal == -1)?value:(value * pointstotal)}
                </div>
            </div>
            <div className="container_item_puntosclass_subcontaion" >
                <div className="container_item_puntosclass_subcontaion_text_cont" style={{color: `${colorItem()}`}}>
                    <div className="container_item_puntosclass_subcontaion_text_cont_icon" >{objIcons.iconObjs}</div>
                    <div style={{height:"10px"}}/> 
                    <div className="container_item_puntosclass_subcontaion_text" style={{color: `${colorItem()}`}}> {name}</div>
                </div>
            </div>
        </div>
    );
}