import { CloseCircleOutlined, CloseOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FormModalSelectItem } from "./complements/formModelSelectItem/formModalSelectItem";
import "./ForminputSelectItem.css";

export function ForminputSelectItemDependenci(props){
    const [stateSelectItem, changestateSelectItem] = useState("");
    const [proplistaObj, propsetlistaObj] = useState([
        {
          "id_tipoActivo": 1,
          "nombreTipoActivo": "Activos esenciales",
          "abrebiat": "essential",
          "dependAbreb": "essential",
          "isDependeTipoPad": 0,
          "id_dependeTipoPad": 0,
          "estade": 1
        },
        {
          "id_tipoActivo": 2,
          "nombreTipoActivo": "Informaci�n",
          "abrebiat": "info",
          "dependAbreb": "essential.info",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 1,
          "estade": 1
        },
        {
          "id_tipoActivo": 3,
          "nombreTipoActivo": "informacion empresa",
          "abrebiat": "biz",
          "dependAbreb": "essential.info.biz",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 2,
          "estade": 1
        },
        {
          "id_tipoActivo": 4,
          "nombreTipoActivo": "informacion comercial",
          "abrebiat": "com",
          "dependAbreb": "essential.info.com",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 2,
          "estade": 1
        },
        {
          "id_tipoActivo": 5,
          "nombreTipoActivo": "Datos de inter�s para la administraci�n p�blica",
          "abrebiat": "adm",
          "dependAbreb": "essential.info.adm",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 2,
          "estade": 1
        },
        {
          "id_tipoActivo": 6,
          "nombreTipoActivo": "Datos vitales (registros de la organizaci�n)",
          "abrebiat": "vr",
          "dependAbreb": "essential.info.vr",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 2,
          "estade": 1
        },
        {
          "id_tipoActivo": 7,
          "nombreTipoActivo": "datos de car�cter personal",
          "abrebiat": "per",
          "dependAbreb": "essential.info.per",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 2,
          "estade": 1
        },
        {
          "id_tipoActivo": 8,
          "nombreTipoActivo": "datos de persona normal",
          "abrebiat": "normal",
          "dependAbreb": "essential.info.per.normal",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 7,
          "estade": 1
        },
        {
          "id_tipoActivo": 9,
          "nombreTipoActivo": "[identification data (name and surname, id, postal address, email address, telephone, ...)",
          "abrebiat": "1",
          "dependAbreb": "essential.info.per.normal.1",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 8,
          "estade": 1
        },
        {
          "id_tipoActivo": 10,
          "nombreTipoActivo": "personal characteristics (civil status, date and place of birth, age, sex, nationality, ...)",
          "abrebiat": "2",
          "dependAbreb": "essential.info.per.normal.2",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 8,
          "estade": 1
        },
        {
          "id_tipoActivo": 11,
          "nombreTipoActivo": "academic data",
          "abrebiat": "3",
          "dependAbreb": "essential.info.per.normal.3",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 8,
          "estade": 1
        },
        {
          "id_tipoActivo": 12,
          "nombreTipoActivo": "professional data",
          "abrebiat": "4",
          "dependAbreb": "essential.info.per.normal.4",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 8,
          "estade": 1
        },
        {
          "id_tipoActivo": 13,
          "nombreTipoActivo": "bank data",
          "abrebiat": "5",
          "dependAbreb": "essential.info.per.normal.5",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 8,
          "estade": 1
        },
        {
          "id_tipoActivo": 14,
          "nombreTipoActivo": "regular personal data",
          "abrebiat": "regular",
          "dependAbreb": "essential.info.per.regular",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 7,
          "estade": 1
        },
        {
          "id_tipoActivo": 15,
          "nombreTipoActivo": "economic",
          "abrebiat": "1",
          "dependAbreb": "essential.info.per.regular.1",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 14,
          "estade": 1
        },
        {
          "id_tipoActivo": 16,
          "nombreTipoActivo": "cultural identity",
          "abrebiat": "2",
          "dependAbreb": "essential.info.per.regular.2",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 14,
          "estade": 1
        },
        {
          "id_tipoActivo": 17,
          "nombreTipoActivo": "social idemtity",
          "abrebiat": "3",
          "dependAbreb": "essential.info.per.regular.3",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 14,
          "estade": 1
        },
        {
          "id_tipoActivo": 18,
          "nombreTipoActivo": "online identity",
          "abrebiat": "4",
          "dependAbreb": "essential.info.per.regular.4",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 14,
          "estade": 1
        },
        {
          "id_tipoActivo": 19,
          "nombreTipoActivo": "location",
          "abrebiat": "5",
          "dependAbreb": "essential.info.per.regular.5",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 14,
          "estade": 1
        },
        {
          "id_tipoActivo": 20,
          "nombreTipoActivo": "pseudonymous data (art. 4, 6, 25, 32, 40, 89)",
          "abrebiat": "pseudonymous",
          "dependAbreb": "essential.info.per.pseudonymous",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 7,
          "estade": 1
        },
        {
          "id_tipoActivo": 21,
          "nombreTipoActivo": "sensitive personal data (art. 9)",
          "abrebiat": "sensitive",
          "dependAbreb": "essential.info.per.sensitive",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 7,
          "estade": 1
        },
        {
          "id_tipoActivo": 22,
          "nombreTipoActivo": "racial",
          "abrebiat": "1",
          "dependAbreb": "essential.info.per.sensitive.1",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 23,
          "nombreTipoActivo": "ethnic origin",
          "abrebiat": "2",
          "dependAbreb": "essential.info.per.sensitive.2",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 24,
          "nombreTipoActivo": "political opinions",
          "abrebiat": "3",
          "dependAbreb": "essential.info.per.sensitive.3",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 25,
          "nombreTipoActivo": "religions beliefs",
          "abrebiat": "4",
          "dependAbreb": "essential.info.per.sensitive.4",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 26,
          "nombreTipoActivo": "philosophical beliefs",
          "abrebiat": "5",
          "dependAbreb": "essential.info.per.sensitive.5",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 27,
          "nombreTipoActivo": "trade-union membership",
          "abrebiat": "6",
          "dependAbreb": "essential.info.per.sensitive.6",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 28,
          "nombreTipoActivo": "health",
          "abrebiat": "7",
          "dependAbreb": "essential.info.per.sensitive.7",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 29,
          "nombreTipoActivo": "physical",
          "abrebiat": "1",
          "dependAbreb": "essential.info.per.sensitive.7.1",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 28,
          "estade": 1
        },
        {
          "id_tipoActivo": 30,
          "nombreTipoActivo": "physiological",
          "abrebiat": "2",
          "dependAbreb": "essential.info.per.sensitive.7.2",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 28,
          "estade": 1
        },
        {
          "id_tipoActivo": 31,
          "nombreTipoActivo": "mental",
          "abrebiat": "3",
          "dependAbreb": "essential.info.per.sensitive.7.3",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 28,
          "estade": 1
        },
        {
          "id_tipoActivo": 32,
          "nombreTipoActivo": "health care services",
          "abrebiat": "4",
          "dependAbreb": "essential.info.per.sensitive.7.4",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 28,
          "estade": 1
        },
        {
          "id_tipoActivo": 33,
          "nombreTipoActivo": "health status",
          "abrebiat": "5",
          "dependAbreb": "essential.info.per.sensitive.7.5",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 28,
          "estade": 1
        },
        {
          "id_tipoActivo": 34,
          "nombreTipoActivo": "sex life",
          "abrebiat": "8",
          "dependAbreb": "essential.info.per.sensitive.8",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 35,
          "nombreTipoActivo": "sexual orientation",
          "abrebiat": "9",
          "dependAbreb": "essential.info.per.sensitive.9",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 36,
          "nombreTipoActivo": "genetic data",
          "abrebiat": "10",
          "dependAbreb": "essential.info.per.sensitive.10",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 37,
          "nombreTipoActivo": "biometric data",
          "abrebiat": "11",
          "dependAbreb": "essential.info.per.sensitive.11",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 21,
          "estade": 1
        },
        {
          "id_tipoActivo": 38,
          "nombreTipoActivo": "children",
          "abrebiat": "children",
          "dependAbreb": "essential.info.per.children",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 7,
          "estade": 1
        },
        {
          "id_tipoActivo": 39,
          "nombreTipoActivo": "criminal law (art. 10)",
          "abrebiat": "criminal",
          "dependAbreb": "essential.info.per.criminal",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 7,
          "estade": 1
        },
        {
          "id_tipoActivo": 40,
          "nombreTipoActivo": "criminal offences",
          "abrebiat": "1",
          "dependAbreb": "essential.info.per.criminal.1",
          "isDependeTipoPad": 1,
          "id_dependeTipoPad": 39,
          "estade": 1
        }
      ]);
    let {
        nameTitle = "Selecciona el item",
        keyphoto = "KeySelectIcon",
        keyname = "KeySelectIcon",
        keyid = "id_tipoActivo",
        keylabe = 'nombreTipoActivo',
        keydepende = 'id_dependeTipoPad',
        isVisibleFoto = false,
        checkbox = stateSelectItem,
        setcheckbox = changestateSelectItem,
        listaObj = proplistaObj,
        setlistaObj = propsetlistaObj,
        valueInit = 0,
        isVisibleErrorLabel = false,
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
            return item[keyid] == key;
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
                                        {(isVisibleFoto)?<div className="container_item_selectItem_subcontaion_photo" style={{backgroundImage: `url('${itemIcon[keyphoto]}')`}} ></div>:<></>}
                                        
                                        <div style={{width:"10px"}}/> 
                                        <div className="container_item_selectItem_subcontaion_nametext"> {(itemIcon[keylabe].length > 40)?itemIcon[keylabe].substring(0,40) + '...': itemIcon[keylabe]}</div>
                                        <div style={{width:"10px"}}/>
                                        <div onClick={()=>{setcheckbox(0); }}>
                                            <CloseCircleOutlined className="container_item_selectItem_subcontaion_nametext" />
                                        </div>
                                        <div style={{width:"5px"}}/>
                                    </div>
                                    
                                </div>
                            </div>
                        }
                    </div>
                    <div className="form_seletItem_conteiner_buttton" onClick={onchange} >
                        <SendOutlined className="form_seletItem_conteiner_buttton_icon" />
                    </div>
                </div>
                <input
                    type="text"
                    style={{display: "none"}}
                    id={`${keyname}`} 
                    name={`${keyname}`} 
                    value={checkbox}
                />
                <FormModalSelectItem valueInit = {valueInit} keyid = {keyid} keylabe = {keylabe} keydepende = {keydepende} isVisibleFoto={isVisibleFoto} nameTitle={nameTitle} listaObj={listaObj} setlistaObj = {setlistaObj} propismodalvisible={ismodalvisible} propsetismodalvisible={setismodalvisible} onChangeSelect={onChangeSelect} />
                
                {(valuestade && isVisibleErrorLabel)?<div style={{height: "10px"}}/>:<div></div>}
                {(valuestade && isVisibleErrorLabel)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
            </div>
        </>
    );

}

export function ForminputSelectItemEdit(props){
    // encabezados
    const [stateindexinput, changesetindexinput] = useState(-1);
    const [indexinputmemory, changesetindexinputmemory] = useState("");
    const [propdatacombo, changesetpropdatacombo] = useState([{id:1,label:"tecnologia"},{id:2,label:"computer"},{id:3,label:"cultura"}]);
    const {
        datacombo = propdatacombo,
        setpropdatacombo = changesetpropdatacombo,
        indexinput = stateindexinput,
        setindexinput = changesetindexinput,
        keyname="keyinputgeneric",
        valueInit = 0,
        placeHolder = "name"
        // isVisibleErrorLabel = false,
        // messValidator="Error. La casilla esta vacia.",
    } = props;
    // estados del componentes
    const [textinput, settextinput] = useState('');
    // const [valuestade,setvaluestade] = useState(false);
    const [BottonData,setBottonData] = useState(false);
    // const refInput = useRef();

    useEffect(()=>{
        console.log(valueInit)
        // console.log(valueInit)
        nameIndexCapture({valueInit:valueInit});
        changesetindexinputmemory(valueInit);
    },[]);

    const nameIndexCapture = ({valueInit}) => {
        setindexinput(valueInit);
        console.log(datacombo)
        console.log(valueInit);
        let dataInf = datacombo.filter((item)=>{
            return item.id == valueInit;
        })
        if(dataInf.length == 0){
            settextinput('Desconocido');
            setindexinput(0);
            return;
        }
        const info = dataInf[0]
        settextinput(info.name)
    }

    return (
        <>
            <div className="Container_FormSelectItem_principal_master">
                <div className="Container_FormSelectItem_principal">
                    {(!BottonData)?<div className="Container_FormSelectItem_subContainer_information">
                        <div className="Container_FormSelectItem_subContainer_information_value">{textinput}</div>
                        <div className="Container_FormSelectItem_subContainer_information_placeholder">{placeHolder}</div>
                    </div>:<></>}
                    <div className="Container_FormSelectItem_subContainer_information" style={{display: `${(!BottonData)?'none':'block'}`}}>
                        <div style={{width: '95%'}}>
                            {/* {(indexinput != -1)?<ForminputSelectItem valueInit={indexinput} keyname={keyname} isInvert={true} width={100} height={28} keyvalue={keyvalue} keylabel={keylabel} datacombo={datacombo} isdefault={true} onChangeinput={(jsonval)=>{
                                nameIndexCapture({valueInit:jsonval.value})
                            }}/>:<></>} */}
                            {(indexinput != -1)?<ForminputSelectItemDependenci valueInit={indexinput} listaObj={datacombo} setlistaObj = {setpropdatacombo} keyname={keyname} checkbox={indexinput} setcheckbox={setindexinput} onChangeinput={(jsonval)=>{
                                console.log(jsonval)
                                nameIndexCapture({valueInit:jsonval.id})
                            }} />:<></>}
                        </div>
                    </div>
                    {(!BottonData)?<div className="Container_FormSelectItem_subContainer_bottonEdit"> 
                        <div className={"Container_FormSelectItem_subContainer_bottonEdit_botonEdit"} onClick={()=>{setBottonData(!BottonData)}}>
                            <EditOutlined className="Container_FormSelectItem_subContainer_bottonEdit_botonEdit_icon"/>
                        </div>
                    </div>:<div className="Container_FormSelectItem_subContainer_bottonEdit"> 
                        <div className={(BottonData)?"Container_FormSelectItem_subContainer_bottonEdit_botonEdit_actic":"Container_FormSelectItem_subContainer_bottonEdit_botonEdit"} onClick={()=>{setBottonData(!BottonData)}}>
                            <EditOutlined className="Container_FormSelectItem_subContainer_bottonEdit_botonEdit_icon"/>
                        </div>
                        <div style={{marginRight: '5px'}}></div>
                        <div className={(!BottonData)?"Container_FormSelectItem_subContainer_bottonEdit_botonEdit_actic":"Container_FormSelectItem_subContainer_bottonEdit_botonEdit"} onClick={()=>{nameIndexCapture({valueInit:indexinputmemory});setBottonData(!BottonData);}}>
                            <CloseOutlined className="Container_FormSelectItem_subContainer_bottonEdit_botonEdit_icon"/>
                        </div>
                    </div>}
                </div>
            </div>
            {/*  */}
        </>
    );
}