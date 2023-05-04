import React,{useEffect, useRef, useState} from "react";
import { ForminputBotton, ForminputComboBox } from "../form"
import { SearchOutlined,DownOutlined,UpOutlined,FileOutlined, MoreOutlined } from "@ant-design/icons";
import "./components.css";
// import NotificationProvider from "../../Notifications/NotificationProvider";
import { ComponentModalFloting, ComponentModalFlotingHeader, ComponentModalFlotingBody, PopModal } from "./complements/componentModal/componentModal";
import { ComponentRanking } from "./complements/componentRanking/componentRanking";
// import ComponentItenRank from "./complements/componentItenRank/componentItenRank";
import { ComponentInfoitem } from "./complements/componetMostInfoItem/componetMostInfoItem";
import { ComponentMenuBar } from "./complements/componentMenuSlingv2/bar/componentMenuBar";
import { ComponentMenuSling } from "./complements/componentMenuSlingv2/slice/componentMenuSling";
import { ComponentTable,ComponentTableHead } from "./complements/componentTable/componentTable";
import { ComponentModalPrincipal,
        ComponentModalPrincipalHeader,
        ComponentModalPrincipalListtabs,
        ComponentModalPrincipalBody,
        ComponentModalPrincipalFooter} from "./complements/componentModalPrincipal/componentModalPrincipal";
import useScreenSize from "../../hooks/resolution.hooks";
import { CargarInformation } from "../../router/page/pagecarga/loadData";

// component Item secion
export function ComponentItemSecionActions(props){
    const {colorIon= "white", SiseIcon=20, Icont = UpOutlined, onClickActions = () =>{
        console.log("Teniendo Accion")
    }} = props;

    return(
        <div onClick={()=>{onClickActions()}} className="component_collaps_header_actioncolap">
            <Icont className="component_collaps_header_icon" style={{fontSize: `${SiseIcon}px`,color: `${colorIon}`}} />
        </div>
    );
}

export function ComponentItemSecionSelectorItem(props){
    const {colorIon= "black", labelOption = "Eliminar un contenido", Icont = UpOutlined, onClickActions = () =>{
        console.log("Teniendo Accion")
    }} = props;

    return(
        <div onClick={()=>{onClickActions()}} className="component_collaps_Selector_content">
            <div className="component_collaps_Selector_icon_content"><Icont className="component_collaps_Selector_icon_item" style={{color: `${colorIon}`}} /></div>
            <div className="component_collaps_Selector_text">{labelOption}</div>
        </div>
    );
}

export function ComponentItemSecionSelector(props){
    let {colorIon= "#9686C3", Icont = MoreOutlined, children, SiseIcon, zindex = 1000} = props;
    const [contentselect, setcontentselect] = useState(false);

    return(
        <div className="component_selector_options_content">
            {(contentselect)?<div className="component_selector_options_subcontent" style={{zIndex: `${zindex}`}}>
                <div style={{height:"10px"}}></div>
                {children}
                <div style={{height:"10px"}}></div>
            </div>:<></>}
            <ComponentItemSecionActions SiseIcon={SiseIcon} colorIon={colorIon} Icont={Icont} onClickActions={()=>{
                let bool = !contentselect;
                setcontentselect(bool);
            }} />
        </div>
    );
}

export function ComponentItemSecion(props){
    const {children, label="Title de chips", oncollapset = (stade) => {}, onClikchange=()=>{}} = props;
    const [stateOcult,setstateOcult] = useState(false);
    return (
        <>
            <div style={{height:"5px"}}/>
            <div className="component_collaps_content">
                <div className="component_collaps_header">
                    <div onClick={onClikchange} className="component_collaps_header_title">{label}</div>
                    {children}
                    {/* <div onClick={()=>{
                        setstateOcult(!stateOcult);
                        oncollapset(!stateOcult);
                    }} className="component_collaps_header_actioncolap">
                        {(!stateOcult)?
                            <DownOutlined className="component_collaps_header_icon" />:
                            <UpOutlined className="component_collaps_header_icon" />
                        }
                    </div> */}
                    <div style={{width:"10px"}} />
                </div>                
            </div>
        </>
    );
}
// Fin component Item secion
// Component secion colapset
export function Componentcolapset(props){
    const [ isstateOcult,setisstateOcult] = useState(false);
    const { stateOcult = isstateOcult,setstateOcult = setisstateOcult, children } = props;

    return (
        <>
            <div style={{height:"5px"}}/>
            <div className="component_collaps_content">
                {children}
            </div>
        </>
    );
}

export function ComponentcolapsetHeader(props){
    const {children, label="Title de chips", oncollapset = (stade) => {}, isoptions= false} = props;
    const [stateOcult,setstateOcult] = useState(false);
    return (
        <>
            <div className="component_collaps_header">
                    <div className="component_collaps_header_title">{label}</div>
                    {(!isoptions)?children:<></>}
                    <div onClick={()=>{
                        setstateOcult(!stateOcult);
                        oncollapset(!stateOcult);
                    }} className="component_collaps_header_actioncolap">
                        {(!stateOcult)?
                            <DownOutlined className="component_collaps_header_icon" />:
                            <UpOutlined className="component_collaps_header_icon" />
                        }
                    </div>
                    {(isoptions)?children:<></>}
                    <div style={{width:"10px"}} />
            </div>  
        </>
    );
}

export function ComponentcolapsetBody(props){
    const [ isstateOcult,setisstateOcult] = useState(false);
    const { stateOcult = isstateOcult,setstateOcult = setisstateOcult, children } = props;

    return [
        <>
            {
                (stateOcult)?
                <div className="component_collaps_body">
                    {children}
                </div>:
                <></>
            } 
        </>
    ];
}

export function ComponentcolapsetItem(props){
    const { Iconitem = FileOutlined, children, label="Primer item de process", onChange=()=>{}} = props;

    return (
        <div className="component_collaps_body_item">
            <div className="component_collaps_body_content">
                <div className="component_collaps_body_item_content_icon">
                    <Iconitem className="component_collaps_body_item_icon"/>
                </div>
                <div onClick={onChange} className="component_collaps_body_item_title">{label}</div>
                {children}
                {/* <div className="component_collaps_body_item_content_icon">
                    <FileOutlined className="component_collaps_body_item_icon" />
                </div>
                <div className="component_collaps_body_item_content_icon">
                    <FileOutlined className="component_collaps_body_item_icon" />
                </div> */}
            </div>
            <div className="component_collaps_body_item_liner"></div>
        </div>
    );
}

export function ComponentcolapsetItemActions(props){
    const {Icont = UpOutlined, onClickActions = () =>{
        console.log("Teniendo Accion")
    }} = props;

    return(
        <div onClick={()=>{onClickActions()}} className="component_collaps_header_actioncolap">
            <Icont className="component_collaps_header_icon" />
        </div>
    );
}
// Fin Component secion colapset
export function Componentsearchanimation(props){

    const {
        onChangekey = (search) => {
            //console.log(search);
        },
        onChangeseach = (search) =>{
            console.log(search);
        },
        onSpandedAnimate = (stade) => {

        },
        height = "26px"
    } = props;
    const [changseach,setchangseach] = useState("");
    const [isVisible,setisVisible] = useState(false);
    const [changWigth,setchangeWigth] = useState(0);
    const refcontainer = useRef();

    useEffect(()=>{
        setchangeWigth(refcontainer.current.clientWidth);
    });

    return (
        <>
            {/* <div style={{height:"5px"}} /> */}
            <div ref={refcontainer} className="component_content_search">
                <div className="component_search_containert" style={{height:height}}>
                    {(isVisible) ? <input
                        className="component_search_input"
                        style={{width: `${(()=>{
                            // console.log(changWigth);
                            return changWigth - 50;
                        })()}px`}}
                        type="text" 
                        value={changseach}
                        onBlur={()=>{
                            setisVisible(false);
                            onSpandedAnimate(false);
                        }}
                        onKeyDown={(e)=>{
                            console.log(e.keyCode);
                            if (e.keyCode === 13) {
                                onChangeseach(changseach);
                            }
                        }}
                        onChange={(e)=>{
                            onChangekey(e.target.value);
                            setchangseach(e.target.value);
                        }} 
                    />:<></>}
                    <div className="component_search_boton_seach" style={{height:height, width: height}} onClick={()=>{
                        // onChangeseach(changseach);
                        let stade = !isVisible;
                        setisVisible(stade);
                        onSpandedAnimate(stade);
                    }}>
                        <SearchOutlined className="component_search_boton_seach_icon" style={{fontSize: `calc(${height} / 2)`}} />
                    </div>
                </div>
            </div>
        </>
    );
}

export function Componentsearch(props){

    const {
        onChangekey = (search) => {
            //console.log(search);
        },
        onChangeseach = (search) =>{
            console.log(search);
        },
        height = "40px"
    } = props;
    const [changseach,setchangseach] = useState("");
    const [changWigth,setchangeWigth] = useState(0);
    const refcontainer = useRef();

    useEffect(()=>{
        setchangeWigth(refcontainer.current.clientWidth);
    });

    return (
        <>
            <div style={{height:"5px"}} />
            <div ref={refcontainer} className="component_content">
                <div className="component_search_containert" style={{height:height}}>
                    <input
                        className="component_search_input"
                        style={{width: `${(()=>{
                            // console.log(changWigth);
                            // refcontainer.current.clientWidth
                            return changWigth - 50;
                        })()}px`}}
                        type="text" 
                        value={changseach}
                        onChange={(e)=>{
                            onChangekey(e.target.value);
                            setchangseach(e.target.value);
                        }} 
                    />
                    <div className="component_search_boton_seach" onClick={()=>{
                        onChangeseach(changseach);
                    }}>
                        <SearchOutlined className="component_search_boton_seach_icon" />
                    </div>
                </div>
            </div>
        </>
    );
}

export function ComponentsearchConbofilter(props){

    const {
        keyvalue = "id",
        keylabel = "label",
        datacombo = [],
        onChangekey = (search) => {
            //console.log(search);
        },
        onChangeseach = (search,jsonfilter) =>{
            console.log(search,`/`);
            console.log(jsonfilter);
        }
    } = props;
    const [changseach,setchangseach] = useState("");
    const [checkfilter,setcheckfilter] = useState("0");

    return (
        <>
            <div style={{height:"5px"}} />
            <div className="component_content">
            
                <div className="component_search_containert">
                    <input
                        className="component_search_input"
                        type="text" 
                        value={changseach}
                        onChange={(e)=>{
                            onChangekey(e.target.value);
                            setchangseach(e.target.value);
                        }} 
                    />
                    <div className="component_search_input_combofilter">
                        {(datacombo != null)?<ForminputComboBox keyvalue={keyvalue} keylabel={keylabel} datacombo={datacombo} isdefault={true} onChangeinput={(jsonval)=>{
                            setcheckfilter(jsonval);
                        }} />:<></>}
                    </div>
                    <div style={{width:"5px"}}/>
                    <div className="component_search_boton_seach" onClick={()=>{
                        onChangeseach(changseach,checkfilter);
                    }}>
                        <SearchOutlined className="component_search_boton_seach_icon" />
                    </div>
                </div>
            </div>
        </>
    );
}

// component filter

export function Componentfilter(props){

    const [propsListOpccion, prososetListOpccion] = useState([
        {
            nomenclature: 'tecno',
            keyvalue: 'id',
            masterLabel: 'label',
            opccions: [{id:1,label:"tecnologia"},{id:2,label:"computer"},{id:3,label:"cultura"}],
        },{
            nomenclature: 'nombrenc',
            keyvalue: 'id',
            masterLabel: 'label',
            opccions: [{id:1,label:"tecnologia"},{id:2,label:"computer"},{id:3,label:"cultura"}],
        }
        ]);
    
    const {
        ListOpccion = propsListOpccion,
        onSeleccionOpccion = (jsonfilter) =>{
            console.log(jsonfilter);
        },
        onChangeseach = (jsonfilter) =>{
            console.log(jsonfilter);
        }
    } = props;
    // const [changseach,setchangseach] = useState("");
    const [checkfilter,setcheckfilter] = useState({});
    const [isresolutiocomp, setisresolutiocomp] = useState(false);
    const [propismodalvisible, propsetismodalvisible] = useState(false);
    const resoluWindows = useScreenSize();

    useEffect(()=>{
        (async () => {
            // inicializar los combobox
            ListOpccion.forEach(element => {
                if (compruebeValueInit(element)){
                    let data = checkfilter;
                    data[element.nomenclature] = element.initValue
                    setcheckfilter(data);
                }
            });
        })();
    },[])

    const compruebeValueInit = (element = {}) => {
        const Keys = Object.keys(element);
        return (Keys.indexOf('initValue') != -1)
    }

    return (
        <>
            <div style={{height:"5px"}} />
            <div className="component_content" style={{width: "100%"}}>
                <div className="component_filter_containert">
                    {(resoluWindows.width >= 500)?
                    <>
                        {/* --------------------- Iten de Generacion de datatos */}
                        {
                            (Array.isArray(ListOpccion))?
                            ((ListOpccion.length != 0)?
                            <div className="component_filter_containert_filtOptions">
                                {(ListOpccion.map((item)=>{
                                    // console.log(item)
                                    return (<div className="component_search_input_combofilter">
                                    {(item.opccions != null && item.opccions.length != 0)?<ForminputComboBox valueInit={(compruebeValueInit(item)?item.initValue:0)} keyname={item.nomenclature} isInvert={true} width={100} height={35} keyvalue={item.keyvalue} keylabel={item.masterLabel} datacombo={item.opccions} isdefault={true} onChangeinput={(jsonval)=>{
                                        let data = checkfilter;
                                        data[jsonval.nomenclature] = jsonval.value
                                        // detectar el ultimo ingresado
                                        const objData = {...data}
                                        delete objData[jsonval.nomenclature];
                                        objData[jsonval.nomenclature] = jsonval.value
                                        onSeleccionOpccion(objData);
                                        setcheckfilter(data);
                                    }} />:<></>}
                                </div>);
                                }))}
                            </div>:
                            <div className="component_filter_containert_filtOptions_load">
                                <CargarInformation height = {40} width = {40} color = {'#375D81'} borderwidth = {4} />
                            </div>):
                            <div className="component_filter_containert_filtOptions_load">
                                <CargarInformation height = {40} width = {40} color = {'#375D81'} borderwidth = {4} />
                            </div>
                        }
                        {/* --------------------------------------------------- */}
                        <div className="component_filter_containert_filtButtons">
                            <div className="component_filter_containert_filtButtons_button" onClick={()=>{
                                // console.log(checkfilter);
                                onChangeseach(checkfilter);
                            }}>
                                Generar
                            </div>
                        </div>
                    </>:
                    <>
                        <div className="component_filter_containert_filtButtons_max">
                            <ForminputBotton label={'Generar datos'} onChange={() => {
                                propsetismodalvisible(!propismodalvisible);
                            }} />
                        </div>
                    </>}
                </div>
                <PopModal colorTitle={'#183152'} width={'800px'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} namemodal={'Generar datos'}>
                    <ComponentModalFlotingBody>
                        <>
                            {/* --------------------- Iten de Generacion de datatos */}
                            <div className="component_filter_containert_filtOptions">
                                {(ListOpccion.map((item)=>{
                                    // console.log(item)
                                    return (<div className="component_search_input_combofilter">
                                    {(item.opccions != null && item.opccions.length != 0)?<ForminputComboBox valueInit={(compruebeValueInit(item)?item.initValue:0)} keyname={item.nomenclature} isInvert={true} width={100} height={35} keyvalue={item.keyvalue} keylabel={item.masterLabel} datacombo={item.opccions} isdefault={true} onChangeinput={(jsonval)=>{
                                        let data = checkfilter;
                                        data[jsonval.nomenclature] = jsonval.value
                                        // detectar el ultimo ingresado
                                        const objData = {...data}
                                        delete objData[jsonval.nomenclature];
                                        objData[jsonval.nomenclature] = jsonval.value
                                        onSeleccionOpccion(objData);
                                        setcheckfilter(data);
                                    }} />:<></>}
                                </div>);
                                }))}
                            </div>
                            {/* --------------------------------------------------- */}
                            <div className="component_filter_containert_filtButtons">
                                <div className="component_filter_containert_filtButtons_button" onClick={()=>{
                                    onChangeseach(checkfilter);
                                    propsetismodalvisible(!propismodalvisible);
                                }}>
                                    Generar
                                </div>
                            </div>
                        </> 
                    </ComponentModalFlotingBody>
                </PopModal>
            </div>
        </>
    );
}

// function ContainerInformationRedirecModel(props){
//     const [ismodalvisible, setismodalvisible] = useState(false);
//     const {propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, url = `https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg`, label='Image' } = props;
//     const refImage = useRef();
//     const refContainImage = useRef();

//     useEffect(()=>{
//         var containImage = refContainImage.current.offsetWidth;
//         var altoOriginal = refImage.current.naturalHeight;
//         var anchoOriginal = refImage.current.naturalWidth;
//         var promed = ((altoOriginal * 100)/ anchoOriginal) / 100;
//         refContainImage.current.style.height = `${(containImage * promed)}px` 
//     },[])

//     return ();
// }

// component modal Principal
// export function ComponentModalPrincipal(props){
//     const {color="white", children, zindex = 1,statemode = true, onClosechange=()=>{}} = props;
//     return(
//         <>
//             {/* onClick={onClosechange} */}
//             <div className="component_modalPrin" style={{zIndex: `${zindex*9999}`,display:`${(!statemode)?"none":"block"}`}}>
//                 <div className="component_modalPrin_container" style={{background:`${color}`}} >
//                     {children}
//                 </div>
//             </div>
//         </>
//     );
// }

// export function ComponentModalPrincipalHeader(props){
//     const {children, onClosechange=()=>{},title="Titulo por default"} = props;
//     return(
//         <>
//             <div className="component_modalPrin_header">
//                 <div onClick={onClosechange} className="component_modalPrin_close"><CloseOutlined className="component_modalPrin_close_icon" /></div>
//                 <div style={{width:"5px"}}/>
//                 <div className="component_modalPrin_header_container">
//                     <div className="component_modalPrin_header_title">{title}</div>
//                 </div>
//                 <div style={{width:"5px"}}/>
//             </div>
//             <div className="component_modalPrin_header_fot">
//                 {children}
//             </div>
//         </>
//     );
// }

// export function ComponentModalPrincipalListtabs(props){
//     const [indexselect, setindexselect] = useState(0);
//     const {children, listOptions = [
//         {
//             id: 1,
//             label : "Editar taller",
//             icontab : FileExclamationOutlined
//         },
//         {
//             id: 2,
//             label : "Ciclo de curso",
//             icontab : FileExclamationOutlined
//         }
//     ], 
//     indexinitial = -2,
//     chaindexselect = indexselect,
//     chasetindexselect = setindexselect,
//     onChangeindex=(index,titletab)=>{}} = props;

//     useEffect(()=>{
//         (async ()=>{
//             if (indexinitial != -2) {
//                 chasetindexselect(indexinitial);
//             }else{
//                 chasetindexselect(listOptions[0].id);
//             }
//         })();
//     },[]);

//     const Tabs = (props) =>{
//         const {titletab="default",index=-2, Icontab = FileExclamationOutlined} = props;
//         return <div onClick={()=>{
//             chasetindexselect(index);
//             onChangeindex(index,titletab);
//         }} className={(chaindexselect == index)?"component_modalPrin_tabs_activate":"component_modalPrin_tabs"}>
//             <Icontab />
//             <div style={{width:"5px"}}/>
//             {(chaindexselect == index)?<div>{titletab}</div>:<></>}
//         </div>
//     }

//     return(
//         <>
//             <div className="component_modalPrin_header">
//                 {/* <div onClick={onClosechange} className="component_modalPrin_close"><CloseOutlined className="component_modalPrin_close_icon" /></div> */}
//                 {/* <div style={{width:"5px"}}/> */}
//                 <div className="component_modalPrin_header_list_tabs">
//                     {listOptions.map((item)=>{
//                         return <Tabs titletab={item.label} index={item.id} Icontab={item.icontab} />;
//                     })}
//                 </div>
//                 {/* <div style={{width:"5px"}}/> */}
//             </div>
//             {/* <div className="component_modalPrin_header_fot">
//                 {children}
//             </div> */}
//         </>
//     );
// }

// export function ComponentModalPrincipalBody(props){
//     const {children} = props;
//     return(
//         <>
//             <div className="component_modalPrin_body">
//                 <div className="component_modalPrin_body_container">
//                     {children}
//                     <div style={{height:"100px"}}/>
//                 </div>
//             </div>
//         </>
//     );
// }

// export function ComponentModalPrincipalFooter(props){
//     const {children} = props;
//     return(
//         <>
//             <div className="component_modalPrin_footer">
//                 <div className="component_modalPrin_footer_container">
//                     {children}
//                 </div>
//             </div>
//         </>
//     );
// }
export {ComponentModalPrincipal};
export {ComponentModalPrincipalHeader};
export {ComponentModalPrincipalListtabs};
export {ComponentModalPrincipalBody};
export {ComponentModalPrincipalFooter};

// component modal Flotante

export {ComponentModalFloting};
export {ComponentModalFlotingHeader};
export {ComponentModalFlotingBody};

// component menu
// export function ComponentMenuCompoent(props){
//     const {onchangeoption=(id)=>{},databasic = [
//         {
//             label: "options1",
//             Icon: FileExclamationOutlined,
//             key: -1,
//             options:[
//                 {
//                     label: "options",
//                     key: 1
//                 },
//                 {
//                     label: "options",
//                     key: 2
//                 },
//                 {
//                     label: "options",
//                     key: 3
//                 }
//             ]
//         },
//         {
//             label: "options2",
//             Icon: FileExclamationOutlined,
//             key: 4,
//             options:[]
//         }
//     ],iskeyinit = 0 } = props;

//     const [collapesemenu, setcollapsemenu] = useState(false);
//     const [iskeyoptions, setiskeyoptions] = useState(iskeyinit);
//     const [memoricollapse,setmemoricollapse] = useState([]); // lista de los componentes con su historial de collapso

//     const onChangeClick = (id) =>{
//         // console.log(id);
//         setiskeyoptions(id);
//         onchangeoption(id);
//     }
//     // se inicializa los primeros datos

//     useEffect(()=>{
//         setmemoricollapse(databasic.map((item,index)=>{
//             return {key: index, stadecolap: false};
//         }));
//     },[])
    
//     const HistoryCollapse = (index) => {
//         let auxdata = memoricollapse.filter((item)=>{
//             return item.key == index; 
//         });
//         return (auxdata.length != 0)?auxdata[0].stadecolap:false;
//     }
//     // guarcar la informacion del colapso de un item
//     const onCollapset = (index, stade) => {
//         setmemoricollapse(memoricollapse.map((item)=>{
//             if(index == item.key){
//                 // console.log(`${index},${item.key}`);
//                 return {key: index, stadecolap: stade};
//             }else{
//                 return item;
//             }
//         }));
//     }

//     return (
//         <div className={(collapesemenu)?"container_Menu_collapset":"container_Menu"}>
//             <div className="container_Menu_heard">
//                 <div className={(collapesemenu)?"container_Menu_heard_title_colapse":"container_Menu_heard_title"}/>
//             </div>
//             <div className="container_Menu_body">
//                 {databasic.map((item,index)=>{
//                     return (<ComponentMenuItem
//                                 indexkey = {index}
//                                 ishistoricollapset = {HistoryCollapse(index)}
//                                 onCollapset = {onCollapset}
//                                 InfoItem = {item}
//                                 keystade={iskeyoptions} 
//                                 onChangeClick={onChangeClick} 
//                                 iscollapset={collapesemenu}/>);
//                 })}
//             </div>
//             <div onClick={()=>{
//                 setcollapsemenu(!collapesemenu);
//             }} className="container_Menu_footer">
//                 {(collapesemenu)?<RightOutlined className="container_Menu_footer_icon" />:<LeftOutlined className="container_Menu_footer_icon" />}
//             </div>
//         </div>
//     );
// }

// export function ComponentMenuItem(props){
//     const { iscollapset,
//             indexkey,
//             ishistoricollapset = false,
//             onCollapset=(id,stade)=>{},
//             onChangeClick=(id)=>{},
//             InfoItem={
//                 label: "options",
//                 Icon: FileExclamationOutlined,
//                 key: 0,
//                 options:[
//                     {
//                         label: "options",
//                         key: 1
//                     }
//                 ]
//             }, keystade = -1} = props;
//     const [iscollapsetitem,setiscollapsetitem ] = useState(ishistoricollapset);

//     const ListItems= () =>{
//         let auxarray = InfoItem.options.filter((item)=>{
//             return item.key === keystade;
//         });
//         return auxarray.length;
//     }

//     const ClassnameHearder=()=>{
//         // si esta colapsado

//         // si no tiene items
//         if(InfoItem.options.length === 0){
//             return (InfoItem.key != keystade)?"container_Menu_body_item_header":"container_Menu_body_item_header_activate";
//         }
//         // si no tiene items
//         if(InfoItem.options.length !== 0){
//             return (ListItems() == 0)?"container_Menu_body_item_header":"container_Menu_body_item_header_activate2";
//         }
//         return "container_Menu_body_item_header";
//     }

//     const ClassnameItem=(id)=>{
//         if(InfoItem.options.length !== 0){
//             return (id !== keystade)?"container_Menu_body_item_body_item":"container_Menu_body_item_body_item_activate";
//         }
//         return "container_Menu_body_item_body_item";
//     }

//     return (
//         <div onClick={()=>{
//             if(InfoItem.options.length === 0) onChangeClick(InfoItem.key);
//             if(InfoItem.options.length !== 0) {
//                 onCollapset(indexkey,!iscollapsetitem);
//                 setiscollapsetitem(!iscollapsetitem);
//             } 
//         }} className="container_Menu_body_item">
//             <div className={ClassnameHearder()}>
//                 <div className="container_Menu_body_item_header_icon container_Menu_body_item_header_color"><InfoItem.Icon /></div>
//                 {(iscollapset)?<></>:<div className="container_Menu_body_item_header_title container_Menu_body_item_header_color">{InfoItem.label}</div>}
//             </div>
//             {/* imprecion de cada opccion dentro del componente */}
//             {(iscollapsetitem && !iscollapset)?
//             <div className="container_Menu_body_item_body">
//                 {InfoItem.options.map((item)=>{
//                     return (<div onClick={()=>{
//                         if(InfoItem.options.length !== 0) onChangeClick(item.key);
//                     }} className={ClassnameItem(item.key)}>{item.label}</div>);
//                 })}
//             </div>:<></>}
//             {(iscollapsetitem && iscollapset)?
//             <div className="container_Menu_body_item_body_floting">
//                 <div className="container_Menu_body_item_title_floting"> {InfoItem.label} </div>
//                 {InfoItem.options.map((item)=>{
//                     return (<div onClick={()=>{
//                         if(InfoItem.options.length !== 0) onChangeClick(item.key);
//                     }} className={ClassnameItem(item.key)}>{item.label}</div>);
//                 })}
//             </div>:<></>}
//         </div>
//     );
// }

// component menu bar
export {ComponentMenuSling};
// component menu bar
export {ComponentMenuBar};
// export function ComponentMenuBarCompoent(props){
//     const {onchangeoption=(id)=>{},databasic = [
//         {
//             label: "options1",
//             Icon: FileExclamationOutlined,
//             key: -1,
//             options:[
//                 {
//                     label: "options",
//                     key: 1
//                 },
//                 {
//                     label: "options",
//                     key: 2
//                 },
//                 {
//                     label: "options",
//                     key: 3
//                 }
//             ]
//         },
//         {
//             label: "options2",
//             Icon: FileExclamationOutlined,
//             key: 4,
//             options:[]
//         }
//     ],iskeyinit = 0 } = props;

//     // const [collapesemenu, setcollapsemenu] = useState(false);
//     const [iskeyoptions, setiskeyoptions] = useState(iskeyinit);
//     const [memoricollapse,setmemoricollapse] = useState([]); // lista de los componentes con su historial de collapso
//     const [isocultmenu, setisocultmenu] = useState(false);

//     const onChangeClick = (id) =>{
//         console.log(id);
//         setiskeyoptions(id);
//         onchangeoption(id);
//     }
//     // se inicializa los primeros datos

//     useEffect(()=>{
//         setmemoricollapse(databasic.map((item,index)=>{
//             return {key: index, stadecolap: false};
//         }));
//     },[])
    
//     const HistoryCollapse = (index) => {
//         let auxdata = memoricollapse.filter((item)=>{
//             return item.key == index; 
//         });
//         return (auxdata.length != 0)?auxdata[0].stadecolap:false;
//     }
//     // guarcar la informacion del colapso de un item
//     const onCollapset = (index, stade) => {
//         setmemoricollapse(memoricollapse.map((item)=>{
//             if(index == item.key){
//                 console.log(`${index},${item.key}`);
//                 return {key: index, stadecolap: stade};
//             }else{
//                 return item;
//             }
//         }));
//     }

//     return (
//         <div className={"container_Menubar"}>
//             <div className={"container_Menubar_heard_title"}/>
//             <div onClick={()=>{
//                 setisocultmenu(true);
//             }}>
//                 <MenuOutlined className="container_Menubar_icon" />
//             </div>
//             {(isocultmenu)?<div className="container_Menubar_body">
//                 <div className="container_Menubar_body_head" >
//                     <div onClick={()=>{
//                         setisocultmenu(false);
//                     }}>
//                         <CloseOutlined className="container_Menubar_icon_close" />
//                     </div>
//                 </div>
//                 <div className="container_Menubar_body_content_item">
//                     {databasic.map((item,index)=>{
//                         return (<ComponentMenuBarItem
//                                     indexkey = {index}
//                                     ishistoricollapset = {HistoryCollapse(index)}
//                                     onCollapset = {onCollapset}
//                                     InfoItem = {item}
//                                     keystade={iskeyoptions} 
//                                     onChangeClick={onChangeClick}/>);
//                     })}
//                 </div>
//             </div>:<></>}
//         </div>
//     );
// }

// export function ComponentMenuBarItem(props){
//     const { 
//             // iscollapset,
//             // indexkey,
//             // ishistoricollapset,
//             // onCollapset=(id,stade)=>{},
//             onChangeClick=(id)=>{},
//             InfoItem={
//                 label: "options",
//                 Icon: FileExclamationOutlined,
//                 key: 0,
//                 options:[
//                     {
//                         label: "options",
//                         key: 1
//                     }
//                 ]
//             }, keystade = -1} = props;
//     // const [iscollapsetitem,setiscollapsetitem ] = useState(ishistoricollapset);

//     // const ListItems= () =>{
//     //     let auxarray = InfoItem.options.filter((item)=>{
//     //         return item.key === keystade;
//     //     });
//     //     return auxarray.length;
//     // }

//     const ClassnameHearder=()=>{
//         return "container_Menubar_body_item_header_activate";
//     }

//     const ClassnameItem=(id)=>{
//         if(InfoItem.options.length !== 0){
//             return (id !== keystade)?"container_Menubar_body_item_body_item":"container_Menubar_body_item_body_item_activate";
//         }
//         return "container_Menubar_body_item_body_item";
//     }

//     return (
//         <div onClick={()=>{
//             if(InfoItem.options.length === 0) onChangeClick(InfoItem.key);
//             // if(InfoItem.options.length !== 0) {
//             //     onCollapset(indexkey,!iscollapsetitem);
//             //     setiscollapsetitem(!iscollapsetitem);
//             // } 
//         }} className="container_Menubar_body_item">
//             <div className={ClassnameHearder()}>
//                 <div className="container_Menubar_body_item_header_icon container_Menubar_body_item_header_color"><InfoItem.Icon /></div>
//                 <div className="container_Menubar_body_item_header_title container_Menubar_body_item_header_color">{InfoItem.label}</div>
//             </div>
//             {/* imprecion de cada opccion dentro del componente */}
//             <div className="container_Menubar_body_item_body">
//                 {InfoItem.options.map((item)=>{
//                     return (<div onClick={()=>{
//                         if(InfoItem.options.length !== 0) onChangeClick(item.key);
//                     }} className={ClassnameItem(item.key)}>{item.label}</div>);
//                 })}
//             </div>
//         </div>
//         // onClick={()=>{
//         //     if(InfoItem.options.length === 0) onChangeClick(InfoItem.key);
//         //     if(InfoItem.options.length !== 0) {
//         //         onCollapset(indexkey,!iscollapsetitem);
//         //         setiscollapsetitem(!iscollapsetitem);
//         //     } 
//         // }}
//     );
// }
// component botton
export function ComponentBotton(props){
    const {label="Submit", onChange=()=>{},isInvertColor=false} = props;

    return (
    <>
        <div className="component_Botton" >
            <div onClick={()=>{
                onChange();
            }} className="component_botton_container">
                <div className={(isInvertColor)?"component_botton_container_content_invert":"component_botton_container_content"}>
                    {label}
                </div>
            </div>
        </div>
    </>
    );
}

// component chipts botton
export const ComponentChipst = (props) =>{
    const {colorchip="white", isStadeOptions=true, name="pedeterminado",iditem=999,itemSelect=-1,onclickcall=(item)=>{
        console.log(item);
    },photo = "https://idisl.info/wp-content/uploads/2015/07/generic-avatar.png",isphoto=false} = props;
    const {statechip, setstatechip} = useState(false);

    const stylechipcontainer = () => {
        // si no presenta un estado retornara siempre activo
        if(!isStadeOptions){
            return "component-item-chips-activate";
        }
        // si esta activo se comprueba si el chip se a seleccionado
        return (iditem === itemSelect)?"component-item-chips-activate":"component-item-chips";
    }

    const stylechiptext = () => {
        // si no presenta un estado retornara siempre activo
        if(!isStadeOptions){
            return "component-item-chips-label-active";
        }
        // si esta activo se comprueba si el chip se a seleccionado
        return (iditem === itemSelect)?"component-item-chips-label-active":"component-item-chips-label";
    }

    return (
        <div className={stylechipcontainer()} style={{backgroundColor:`${colorchip}`}} >
            {(isphoto)?<div className="component-item-chips-photo" style={{backgroundImage:`url('${photo}')`}}/>:<div></div>}
            <div className={stylechiptext()} onClick={()=>{
                onclickcall(iditem);
            }}>{name}</div>
        </div>
    );
}

//------------------------------------------ components externos

// component ranking
export {ComponentRanking};
// export const ComponentRanking = (props) =>{

//     const {listdata=[
//         {
//             position: 1,
//             name: "Carlos arturo guerrero",
//             photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
//             punto: 200
//         },
//         {
//             position: 2,
//             name: "Carlos arturo guerrero",
//             photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
//             punto: 180
//         },
//         {
//             position: 3,
//             name: "Carlos arturo guerrero",
//             photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
//             punto: 170
//         },
//         {
//             position: 4,
//             name: "Carlos arturo guerrero",
//             photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
//             punto: 140
//         },
//         {
//             position: 5,
//             name: "Carlos arturo guerrero",
//             photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
//             punto: 130
//         },
//         // {
//         //     position: 6,
//         //     name: "Carlos arturo guerrero",
//         //     photo: "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
//         //     punto: 120
//         // }
//     ]} = props;

//     return (
//         <div className="conten_ranking_general">
//             {
//                 (listdata.length > 4)?
//                 <>
//                     <div style={{height:"10px"}} />
//                     <div className="conten_ranking_general_rankbasic" >
//                         <ComponentRankprins position={listdata[1].position} name={listdata[1].name} punto={listdata[1].punto} photo={listdata[1].photo}/>
//                         <ComponentRankprins position={listdata[0].position} name={listdata[0].name} punto={listdata[0].punto} photo={listdata[0].photo}/>
//                         <ComponentRankprins position={listdata[2].position} name={listdata[2].name} punto={listdata[2].punto} photo={listdata[2].photo}/>
//                     </div>
//                     <div style={{height: "20px"}}/>
//                 </>
//                 : <></>
//             }
//             {/* <div className="conten_ranking_general_subtitle">Lista de participantes:</div> */}
//             <div className="conten_ranking_general_rankgenerl" >
//                 {/* filtra los primeros 3 items si es mayor de 4 items, sino imprimira 4 */}
//                 {((listdata.length > 4)?listdata.filter((_,ind)=>{return ind > 2}):listdata).map((item)=>{
//                     return <ComponentItenRank position={item.position} name={item.name} punto={item.punto} photo={item.photo}/>
//                 })}
//             </div>
//         </div>
//     );
// }
// component mostrar informacion item
export {ComponentInfoitem};

// componente de tabla
export {ComponentTable};
export {ComponentTableHead};