import { CloseOutlined, FileExclamationOutlined, MenuOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./componentMenuBar.css";

// component menu bar
export function ComponentMenuBar(props){
    const {onchangeoption=(id)=>{},databasic = [
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
    const [iskeyoptions, setiskeyoptions] = useState(iskeyinit);
    const [memoricollapse,setmemoricollapse] = useState([]); // lista de los componentes con su historial de collapso
    const [isocultmenu, setisocultmenu] = useState(false);

    const onChangeClick = (id) =>{
        console.log(id);
        setiskeyoptions(id);
        onchangeoption(id);
    }
    // se inicializa los primeros datos

    useEffect(()=>{
        setmemoricollapse(databasic.map((item,index)=>{
            return {key: index, stadecolap: false};
        }));
    },[])
    
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
            <div className={"container_Menubar_heard_title"}/>
            <div onClick={()=>{
                setisocultmenu(true);
            }}>
                <MenuOutlined className="container_Menubar_icon" />
            </div>
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
                                    keystade={iskeyoptions} 
                                    onChangeClick={onChangeClick}/>);
                    })}
                </div>
            </div>:<></>}
        </div>
    );
}

export function ComponentMenuBarItem(props){
    const { 
            // iscollapset,
            // indexkey,
            // ishistoricollapset,
            // onCollapset=(id,stade)=>{},
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
    // const [iscollapsetitem,setiscollapsetitem ] = useState(ishistoricollapset);

    // const ListItems= () =>{
    //     let auxarray = InfoItem.options.filter((item)=>{
    //         return item.key === keystade;
    //     });
    //     return auxarray.length;
    // }

    const ClassnameHearder=()=>{
        return "container_Menubar_body_item_header_activate";
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
            // if(InfoItem.options.length !== 0) {
            //     onCollapset(indexkey,!iscollapsetitem);
            //     setiscollapsetitem(!iscollapsetitem);
            // } 
        }} className="container_Menubar_body_item">
            <div className={ClassnameHearder()}>
                <div className="container_Menubar_body_item_header_icon container_Menubar_body_item_header_color"><InfoItem.Icon /></div>
                <div className="container_Menubar_body_item_header_title container_Menubar_body_item_header_color">{InfoItem.label}</div>
            </div>
            {/* imprecion de cada opccion dentro del componente */}
            <div className="container_Menubar_body_item_body">
                {InfoItem.options.map((item)=>{
                    return (<div onClick={()=>{
                        if(InfoItem.options.length !== 0) onChangeClick(item.key);
                    }} className={ClassnameItem(item.key)}>{item.label}</div>);
                })}
            </div>
        </div>
        // onClick={()=>{
        //     if(InfoItem.options.length === 0) onChangeClick(InfoItem.key);
        //     if(InfoItem.options.length !== 0) {
        //         onCollapset(indexkey,!iscollapsetitem);
        //         setiscollapsetitem(!iscollapsetitem);
        //     } 
        // }}
    );
}