import React from "react";
// import { Gamepad } from "../../../res/resSvgtoJS/listIcons";
import "./style/cartsItemsIcons.css";

export default function CartsItemsIcons(props){
    const { keyid = 0, name = "puntos", value = 0, Icon = "🙋", photo = "", onchange=(Keyicono)=>{}, keySelet = 0} = props;

    const colorItem = () => {
        return  (keyid != keySelet)? "#546e7a": "#9686C3";
    }

    const onChangePress = () => {
        onchange(keyid);
    }

    return (
        <div className="container_item_selecticonItem_conte_bueno" onClick={()=>{onChangePress();}} style={{borderColor: `${colorItem()}`}}>
            <div className="container_item_selecticonItem_conte_puntos" style={{backgroundColor: `${colorItem()}`}}>
                {(value == 0)?
                    <></>:
                    <div className="container_item_selecticonItem_conte_puntos_text">
                        {value}
                    </div>
                }
            </div>
            <div className="container_item_selecticonItem_subcontaion" >
                <div className="container_item_selecticonItem_subcontaion_text_cont" style={{color: `${colorItem()}`}}>
                    <div className="container_item_selecticonItem_subcontaion_text_cont_icon" >{Icon}</div>
                    <div style={{height:"10px"}}/> 
                    <div className="container_item_selecticonItem_subcontaion_text" style={{color: `${colorItem()}`}}> {name}</div>
                </div>
            </div>
        </div>
    );
}