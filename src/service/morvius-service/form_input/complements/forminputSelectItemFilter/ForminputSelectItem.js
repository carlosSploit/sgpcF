import { CloseCircleOutlined, CloseOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { FormModalSelectItem } from "./complements/formModelSelectItem/formModalSelectItem";
import "./ForminputSelectItem.css";

export function ForminputSelectItemFilter(props){
    const [stateSelectItem, changestateSelectItem] = useState("");
    const [proplistaObj, propsetlistaObj] = useState([
        {
            id: 1,
            name: "basic1",
            photo: "https://idisl.info/wp-content/uploads/2015/07/generic-avatar.png",
            descr: '',
            keyfilter: 1
        },
        {
            id: 2,
            name: "basic2",
            photo: "https://idisl.info/wp-content/uploads/2015/07/generic-avatar.png",
            descr: '',
            keyfilter: 2
        }
    ]);
    const [proplistfilter, setproplistfilter] = useState([
        {
            id: 0,
            name: "default",
        },
        {
            id: 1,
            name: "basic1",
        },
        {
            id: 2,
            name: "basic2"
        }
    ]);
    let {
        nameTitle = "Selecciona el item",
        keyname = "KeySelectIcon",
        isVisibleFoto = false,
        isVisibleDescri = false,
        checkbox = stateSelectItem,
        setcheckbox = changestateSelectItem,
        listaObj = proplistaObj,
        setlistaObj = propsetlistaObj,
        listFilter = proplistfilter,
        setlistFilter = setproplistfilter,
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
        console.log(valueInit)
        if (valueInit != 0){
            console.log(valueInit)
            setcheckbox(valueInit);
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
            <div className="form_conteiner_selectecItemFilter">
                <div className="form_selectecItemFilter_conteiner">
                    <div 
                        className="form_selectecItemFilter_input_conteiner"
                        style={{
                            borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                        }}
                    >
                        {(checkbox <= 0)?
                            <div className="form_selectecItemFilter_conteiner_itemScelecciont" style={{alignItems: "center"}}>
                                <div className="form_selectecItemFilter_conteiner_itemScelecciont_textdefault">{nameTitle}</div>
                            </div>:
                            <div className="form_selectecItemFilter_conteiner_itemScelecciont">
                                <div className="container_item_selectecItemFilter_subcont">
                                    <div className="container_item_selectecItemFilter_contentItem">
                                        {(isVisibleFoto)?<div className="container_item_selectecItemFilter_subcontaion_photo" style={{backgroundImage: `url('${itemIcon.photo}')`}} ></div>:<></>}
                                        
                                        <div style={{width:"10px"}}/> 
                                        <div className="container_item_selectecItemFilter_subcontaion_nametext"> {(itemIcon.name.length >= 30)?itemIcon.name.substring(0,30):<></>}</div>
                                        <div style={{width:"10px"}}/>
                                        <div className="container_item_selectecItemFilter_subcontaion_button" onClick={()=>{setcheckbox(0); }}>
                                            <CloseCircleOutlined className="container_item_selectecItemFilter_subcontaion_button_icon" />
                                        </div>
                                        <div style={{width:"5px"}}/>
                                    </div>
                                    
                                </div>
                            </div>
                        }
                    </div>
                    <div className="form_selectecItemFilter_conteiner_buttton" onClick={onchange} >
                        <SendOutlined className="form_selectecItemFilter_conteiner_buttton_icon" />
                    </div>
                </div>
                <input
                    type="text"
                    style={{display: "none"}}
                    id={`${keyname}`} 
                    name={`${keyname}`} 
                    value={checkbox}
                />
                <FormModalSelectItem listFilter={listFilter} setlistFilter={setlistFilter} isVisibleDescri={isVisibleDescri} isVisibleFoto={isVisibleFoto} nameTitle={nameTitle} listaObj={listaObj} setlistaObj = {setlistaObj} propismodalvisible={ismodalvisible} propsetismodalvisible={setismodalvisible} onChangeSelect={onChangeSelect} />
                
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
                            {(indexinput != -1)?<ForminputSelectItemFilter valueInit={indexinput} listaObj={datacombo} setlistaObj = {setpropdatacombo} keyname={keyname} checkbox={indexinput} setcheckbox={setindexinput} onChangeinput={(jsonval)=>{
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