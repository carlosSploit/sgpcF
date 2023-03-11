import { CheckCircleOutlined } from "@ant-design/icons";
import React from "react";
// import { Gamepad } from "../../../res/resSvgtoJS/listIcons";
import "./style/itemCardSelect.css";

export default function itemCardSelect(props){
    const { keyid = 0, name = "puntos", value = 0, photo = "", onchange=(Keyicono)=>{}, keySelet = 0, isVisibleFoto = false} = props;

    const colorItemBackgroundSeleter = () => {
        return  (keyid != keySelet)? "transparent": "#375D81";
    }
    
    const colorItemBackground = () => {
        return  (keyid != keySelet)? "#f8f9fd": "#375D81";
    }

    const colorItem = () => {
        return  (keyid != keySelet)? "#C7C7C7": "#9686C3";
    }

    const colorItemText = () => {
        return  (keyid != keySelet)? "#546e7a": "#ffff";
    }

    const onChangePress = () => {
        onchange(keyid);
    }

    return (
        <div className="container_item_selectItem_conte_bueno" onClick={()=>{onChangePress();}} style={{backgroundColor: `${colorItemBackground()}`}}>
            <div className="container_item_selectItem_subcontaion" >
                <div className="container_item_selectItem_subcontaion_text_cont" style={{color: `${colorItem()}`}}>
                    <div style={{width:"10px"}}/>
                    {(isVisibleFoto)?
                        <div className="container_item_selectItem_subcontaion_text_cont_icon" style={{backgroundImage: `url('${photo}')`}} ></div>
                    :<></>}
                    
                    <div style={{width:"10px"}}/> 
                    <div className="container_item_selectItem_subcontaion_text" style={{color: `${colorItemText()}`}}> {name}</div>
                </div>
                <div className="container_item_selectItem_conte_puntos">
                    <div className="container_item_selectItem_conte_puntos_text" style={{backgroundColor: `${colorItemBackgroundSeleter()}`}}>
                        {/* <CheckCircleOutlined /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}