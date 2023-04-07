import { CloseCircleOutlined, CloseOutlined, FileExclamationOutlined, MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
// import { keyresolution } from '../../../../../repository/variables';
import "./componentMenuBar.css";

// component menu bar
export function ComponentMenuBar(props){
    const [iskeyoptions, setiskeyoptions] = useState(0);
    const [propisocultmenu, propsetisocultmenu] = useState(false);
    const {
        isocultmenu = propisocultmenu,
        setisocultmenu = propsetisocultmenu,
        onOcultMenu = () => {} ,
        onChangePerfil = () => {},
        propiskeyoptions = iskeyoptions,
        propsetiskeyoptions = setiskeyoptions,
        informationData = {
            nameUser: 'Carlos Arturo Guerrero Castillo',
            user: '@arturo14212000',
            photo: 'https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png'
        },
        opccionSistem = [
            {
                label: "options",
                icon: CloseCircleOutlined,
                onChange: () => {}
            },
            {
                label: "options",
                icon: CloseCircleOutlined,
                onChange: () => {}
            },
            {
                label: "options",
                icon: CloseCircleOutlined,
                onChange: () => {}
            }
        ],
        onchangeoption=(id)=>{},databasic = [
        {
            label: "options1",
            Icon: FileExclamationOutlined,
            key: -1,
            options:[
                {
                    label: "options",
                    key: 1
                },
                {
                    label: "options",
                    key: 2
                },
                {
                    label: "options",
                    key: 3
                }
            ]
        },
        {
            label: "options2",
            Icon: FileExclamationOutlined,
            key: 4,
            options:[]
        }
    ],iskeyinit = 0 } = props;

    // const [collapesemenu, setcollapsemenu] = useState(false);
    const [memoricollapse,setmemoricollapse] = useState([]); // lista de los componentes con su historial de collapso
    const [isVisiblePerfilOpctions,setisVisiblePerfilOpctions] = useState(false);
    // const [isresolutiocomp, setisresolutiocomp] = useState(false);

    

    const onChangeClick = (id) =>{
        console.log(id);
        propsetiskeyoptions(id);
        onchangeoption(id);
    }
    // se inicializa los primeros datos

    useEffect(()=>{
        propsetiskeyoptions(iskeyinit);
        setmemoricollapse(databasic.map((item,index)=>{
            return {key: index, stadecolap: false};
        }));
        // inicializacion del la rezolucion de la pantalla
        // let anchodepantalla = window.screen.width;
        // if(anchodepantalla <= 500){
        // if (!localStorage.getItem(keyresolution)) {
        //     setisresolutiocomp(true);
        // }else{
        //     setisresolutiocomp(false);
        // }
        // }
    },[])

    // const Onaccepterredirection = () => {
    //     if (!localStorage.getItem(keyresolution)) {
    //         localStorage.setItem(keyresolution, "djfkdslj");
    //         window.location.href = window.location.href;
    //     }
    // }
    
    const HistoryCollapse = (index) => {
        let auxdata = memoricollapse.filter((item)=>{
            return item.key == index; 
        });
        return (auxdata.length != 0)?auxdata[0].stadecolap:false;
    }
    // guarcar la informacion del colapso de un item
    const onCollapset = (index, stade) => {
        setmemoricollapse(memoricollapse.map((item)=>{
            if(index == item.key){
                console.log(`${index},${item.key}`);
                return {key: index, stadecolap: stade};
            }else{
                return item;
            }
        }));
    }

    return (
        <div className={"container_Menubar"}>
            {/* <div className={"container_Menubar_heard_title"}/> */}
            <div className="container_Menubar_icon_container" onClick={()=>{
                setisocultmenu(true);
                onOcultMenu();
            }}>
                <MenuOutlined className="container_Menubar_icon" />
            </div>
            <div className="container_Menubar_loginUsername"></div>
            <div className="container_Menubar_imagePerfil" style={{backgroundImage: `url('${informationData.photo}')`}} onClick={()=>{
                setisVisiblePerfilOpctions(!isVisiblePerfilOpctions);
            }}></div>
            {(isVisiblePerfilOpctions)?<div className="container_Menubar_Perfil_container">
                    <div className="container_Menubar_Perfil_container_header_close">
                        <CloseOutlined className="container_Menubar_Perfil_container_header_close_icon" />
                    </div>
                    <div className="container_Menubar_Perfil_container_header" onClick={()=>{
                        onChangePerfil();
                        setisVisiblePerfilOpctions(false);
                    }}>
                        {/* <div style={{height: "30px"}}></div> */}
                        <div className="container_Menubar_Perfil_container_header_photo_container">
                            <div className="container_Menubar_Perfil_container_header_photo" style={{backgroundImage: `url('${informationData.photo}')`}}></div>
                        </div>
                        <div className="container_Menubar_Perfil_container_header_informat_container">
                            <div className="container_Menubar_Perfil_container_header_informat_correo">{informationData.nameUser}</div>
                            <div className="container_Menubar_Perfil_container_header_informat_user">{informationData.user}</div>
                        </div>
                    </div>
                    <div className="container_Menubar_Perfil_container_header_lineBorder" />
                    {/* imtem ----------------------------------------------------------- */}
                    <div style={{height: '10px'}}></div>
                    {opccionSistem.map((item)=>{
                        return (<div className="container_Menubar_Perfil_container_body_item" onClick={item.onChange}>
                                    <div className="container_Menubar_Perfil_container_body">
                                        <div className="container_Menubar_Perfil_container_body_opccion">
                                            <div className="container_Menubar_Perfil_container_body_opccion_photo_container">
                                                <div className="container_Menubar_Perfil_container_body_opccion_photo_subcontainer">
                                                    <item.icon className="container_Menubar_Perfil_container_body_opccion_photo" />
                                                </div>
                                            </div>
                                            <div className="container_Menubar_Perfil_container_body_opccion_informat_container">
                                                <div className="container_Menubar_Perfil_container_body_opccion_informat_correo">{item.label}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>);
                    })}
                    <div style={{height: '10px'}}></div>
                </div>:<></>}
            {(isocultmenu)?<div className="container_Menubar_body">
                <div className="container_Menubar_body_head" >
                    <div onClick={()=>{
                        setisocultmenu(false);
                    }}>
                        <CloseOutlined className="container_Menubar_icon_close" />
                    </div>
                </div>
                <div className="container_Menubar_body_content_item">
                    {databasic.map((item,index)=>{
                        return (<ComponentMenuBarItem
                                    indexkey = {index}
                                    ishistoricollapset = {HistoryCollapse(index)}
                                    onCollapset = {onCollapset}
                                    InfoItem = {item}
                                    keystade={propiskeyoptions} 
                                    onChangeClick={onChangeClick}/>);
                    })}
                </div>
            </div>:<></>}
        </div>
    );
}

export function ComponentMenuBarItem(props){
    const { 
            onChangeClick=(id)=>{},
            InfoItem={
                label: "options",
                Icon: FileExclamationOutlined,
                key: 0,
                options:[
                    {
                        label: "options",
                        key: 1
                    }
                ]
            }, keystade = -1} = props;

    const ListItems= () =>{
        let auxarray = InfoItem.options.filter((item)=>{
            return item.key === keystade;
        });
        return auxarray.length;
    }

    const ClassnameHearder=()=>{
        // si no tiene items
        if(InfoItem.options.length === 0){
            return (InfoItem.key != keystade)?"container_Menubar_body_item_header":"container_Menubar_body_item_header_activate";
        }
        // si no tiene items
        if(InfoItem.options.length !== 0){
            return (ListItems() == 0)?"container_Menubar_body_item_header":"container_Menubar_body_item_header_activate";
        }
        return "container_Menubar_body_item_header";
    }

    const ClassnameItem=(id)=>{
        if(InfoItem.options.length !== 0){
            return (id !== keystade)?"container_Menubar_body_item_body_item":"container_Menubar_body_item_body_item_activate";
        }
        return "container_Menubar_body_item_body_item";
    }

    return (
        <div onClick={()=>{
            if(InfoItem.options.length === 0) onChangeClick(InfoItem.key);
        }} className="container_Menubar_body_item">
            {/* imprecion de cada opccion Header */}
            <div className={"container_Menubar_body_item_header_content"}>
                <div className={ClassnameHearder()} />
                <div className="container_Menubar_body_item_header_subcontent" >
                    {/* <div className="container_Menubar_body_item_header_icon container_Menubar_body_item_header_color"><InfoItem.Icon /></div> */}
                    <div className="container_Menubar_body_item_header_title">{InfoItem.label}</div>
                </div>
            </div>
            {/* imprecion de cada opccion dentro del componente */}
            <div className="container_Menubar_body_item_body">
                {InfoItem.options.map((item)=>{
                    return (<div className="container_Menubar_body_item_body_item_content">
                    <div onClick={()=>{
                        if(InfoItem.options.length !== 0) onChangeClick(item.key);
                    }} className={ClassnameItem(item.key)}>
                        <div className="container_Menubar_body_item_body_item_icon"><InfoItem.Icon /></div>
                        <div className="container_Menubar_body_item_body_item_label">{item.label}</div>
                    </div>
                </div>);
                })}
            </div>
        </div>
    );
}