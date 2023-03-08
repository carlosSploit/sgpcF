import { CloseCircleOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FormModalSelectItem } from "./complements/formModelSelectItem/formModalSelectItem";
import "./ForminputSelectItem.css";

export function ForminputSelectItem(props){
    const [stateSelectItem, changestateSelectItem] = useState("");
    let {
        nameTitle = "Selecciona el item",
        keyname = "KeySelectIcon",
        checkbox = stateSelectItem,
        setcheckbox = changestateSelectItem,
        listaObj = [
            {
                id: 1,
                name: "basic1",
                photo: "https://idisl.info/wp-content/uploads/2015/07/generic-avatar.png"
            },
            {
                id: 2,
                name: "basic2",
                photo: "https://idisl.info/wp-content/uploads/2015/07/generic-avatar.png"
            }
        ],
        valueInit = 0,
        onChangeinput=(json)=>{}
    } = props;
    const messValidator = "No se a seleccionado a un icono";
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [valuestade, changevaluestade] = useState(false);
    const [itemIcon, setitemIcon] = useState({
        id: 0,
        name: "",
        photo: ""
    });

    useEffect(()=>{
        setcheckbox(valueInit);
        if (valueInit != 0){
            let listjsondata = listaObj.filter((item)=>{
                return item.id == valueInit;
            });
            let jsondata = (listjsondata.length != 0)? listjsondata[0]: {} 
            setitemIcon(jsondata);
        }
    },[]);

    const onchange = ()=>{
        // console.log("holanda");
        let state = !ismodalvisible;
        setismodalvisible(state);
    }

    const onChangeSelect = (key) => {
        setcheckbox(key);
        let jsondata = listaObj.filter((item)=>{
            return item.id == key;
        });
        if (jsondata.length != 0){
            setitemIcon(jsondata[0]);
            onChangeinput(jsondata[0]);
        }
        // console.log(jsondata);
    }
    
    return (
        <>
            <div className="form_conteiner_seletItem">
                <div className="form_seletItem_conteiner">
                    <div 
                        className="form_seletItem_input_conteiner"
                        style={{
                            borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                        }}
                    >
                        {(checkbox <= 0)?
                            <div className="form_seletItem_conteiner_itemScelecciont" style={{alignItems: "center"}}>
                                <div className="form_seletItem_conteiner_itemScelecciont_textdefault">{nameTitle}</div>
                            </div>:
                            <div className="form_seletItem_conteiner_itemScelecciont">
                                <div className="container_item_selectItem_subcont">
                                    <div className="container_item_selectItem_contentItem">
                                        <div className="container_item_selectItem_subcontaion_photo" style={{backgroundImage: `url('${itemIcon.photo}')`}} ></div>
                                        <div style={{width:"10px"}}/> 
                                        <div className="container_item_selectItem_subcontaion_nametext"> {itemIcon.name}</div>
                                        <div style={{width:"10px"}}/>
                                        <div onClick={()=>{setcheckbox(0); }}>
                                            <CloseCircleOutlined style={{color: "white"}} />
                                        </div>
                                        <div style={{width:"5px"}}/>
                                    </div>
                                    
                                </div>
                            </div>
                        }
                    </div>
                    <div className="form_seletItem_conteiner_buttton" onClick={onchange} >
                        <SendOutlined style={{color: "white"}} />
                    </div>
                </div>
                <input
                    type="text"
                    style={{display: "none"}}
                    id={`${keyname}`} 
                    name={`${keyname}`} 
                    value={checkbox}
                />
                <FormModalSelectItem nameTitle={nameTitle} listaObj={listaObj} propismodalvisible={ismodalvisible} propsetismodalvisible={setismodalvisible} onChangeSelect={onChangeSelect} />
                <div style={{height: "10px"}}/>
                {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
            </div>
        </>
    );

}