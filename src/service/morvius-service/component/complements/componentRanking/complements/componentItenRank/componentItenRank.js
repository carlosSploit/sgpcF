// import { CheckCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
// import { ComponentInfoitem } from "../../components";
// import { Gamepad } from "../../../res/resSvgtoJS/listIcons";
import "./style/componentItenRank.css";

export default function ComponentItenRank(props){
    const { position = 1, name = "puntos", punto = 0, photo="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"} = props;
    const listicons = {1: "🥇", 2:"🥈", 3:"🥉"};
    const [propismodalvisible, propsetismodalvisible] = useState(false);

    const colorItemBackground = () => {
        return  "#ffff";
    }

    const colorItem = () => {
        return  "#C7C7C7";
    }

    const colorItemText = () => {
        return  "#546e7a";
    }

    const keypocicion = (posicion) => {
        return  (posicion > 3)? `${posicion}.`: listicons[posicion];
    }

    return (
        <>
            <div className="container_item_rankItem_conte_bueno" onClick={()=>{
                let state = !propismodalvisible;
                propsetismodalvisible(state);
            }} style={{backgroundColor: `${colorItemBackground()}`}}>
                <div className="container_item_rankItem_subcontaion" >
                    <div className="container_item_rankItem_subcontaion_text_cont" style={{color: `${colorItem()}`}}>
                        <div style={{width:"10px"}}/>
                        <div className="container_item_rankItem_subcontaion_position">{keypocicion(position)}</div>
                        <div style={{width:"10px"}}/>
                        <div className="container_item_rankItem_subcontaion_text_cont_icon" style={{backgroundImage: `url('${photo}')`}} ></div>
                        <div style={{width:"10px"}}/> 
                        <div className="container_item_rankItem_subcontaion_text" style={{color: `${colorItemText()}`}}> {name}</div>
                    </div>
                    <div className="container_item_rankItem_conte_puntos" style={{backgroundColor: `${colorItem()}`}}>
                        <div className="container_item_rankItem_conte_puntos_text">
                        {punto}
                        </div>
                    </div>
                </div>
            </div>
            {/* <ComponentInfoitem propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} /> */}
        </>
    );
}