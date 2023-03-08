import { FileExclamationOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./componentMenuSling.css";

// component menu
export function ComponentMenuSling(props){
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

    const [collapesemenu, setcollapsemenu] = useState(false);
    const [iskeyoptions, setiskeyoptions] = useState(iskeyinit);
    const [memoricollapse,setmemoricollapse] = useState([]); // lista de los componentes con su historial de collapso

    const onChangeClick = (id) =>{
        // console.log(id);
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
                // console.log(`${index},${item.key}`);
                return {key: index, stadecolap: stade};
            }else{
                return item;
            }
        }));
    }

    return (
        <div className={(collapesemenu)?"container_Menu_collapset":"container_Menu"}>
            <div className="container_Menu_heard">
                <div className={(collapesemenu)?"container_Menu_heard_title_colapse":"container_Menu_heard_title"}/>
            </div>
            <div className="container_Menu_body">
                {databasic.map((item,index)=>{
                    return (<ComponentMenuSlingItem
                                indexkey = {index}
                                ishistoricollapset = {HistoryCollapse(index)}
                                onCollapset = {onCollapset}
                                InfoItem = {item}
                                keystade={iskeyoptions} 
                                onChangeClick={onChangeClick} 
                                iscollapset={collapesemenu}/>);
                })}
            </div>
            <div onClick={()=>{
                setcollapsemenu(!collapesemenu);
            }} className="container_Menu_footer">
                {(collapesemenu)?<RightOutlined className="container_Menu_footer_icon" />:<LeftOutlined className="container_Menu_footer_icon" />}
            </div>
        </div>
    );
}

export function ComponentMenuSlingItem(props){
    const { iscollapset,
            indexkey,
            ishistoricollapset = false,
            onCollapset=(id,stade)=>{},
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
    const [iscollapsetitem,setiscollapsetitem ] = useState(ishistoricollapset);

    const ListItems= () =>{
        let auxarray = InfoItem.options.filter((item)=>{
            return item.key === keystade;
        });
        return auxarray.length;
    }

    const ClassnameHearder=()=>{
        // si esta colapsado

        // si no tiene items
        if(InfoItem.options.length === 0){
            return (InfoItem.key != keystade)?"container_Menu_body_item_header":"container_Menu_body_item_header_activate";
        }
        // si no tiene items
        if(InfoItem.options.length !== 0){
            return (ListItems() == 0)?"container_Menu_body_item_header":"container_Menu_body_item_header_activate2";
        }
        return "container_Menu_body_item_header";
    }

    const ClassnameItem=(id)=>{
        if(InfoItem.options.length !== 0){
            return (id !== keystade)?"container_Menu_body_item_body_item":"container_Menu_body_item_body_item_activate";
        }
        return "container_Menu_body_item_body_item";
    }

    return (
        <div onClick={()=>{
            if(InfoItem.options.length === 0) onChangeClick(InfoItem.key);
            if(InfoItem.options.length !== 0) {
                onCollapset(indexkey,!iscollapsetitem);
                setiscollapsetitem(!iscollapsetitem);
            } 
        }} className="container_Menu_body_item">
            <div className={ClassnameHearder()}>
                <div className="container_Menu_body_item_header_icon"><InfoItem.Icon className={"container_Menu_body_item_header_color"} /></div>
                {(iscollapset)?<></>:<div className="container_Menu_body_item_header_title container_Menu_body_item_header_color">{InfoItem.label}</div>}
            </div>
            {/* imprecion de cada opccion dentro del componente */}
            {(iscollapsetitem && !iscollapset)?
            <div className="container_Menu_body_item_body">
                {InfoItem.options.map((item)=>{
                    return (<div onClick={()=>{
                        if(InfoItem.options.length !== 0) onChangeClick(item.key);
                    }} className={ClassnameItem(item.key)}>{item.label}</div>);
                })}
            </div>:<></>}
            {(iscollapsetitem && iscollapset)?
            <div className="container_Menu_body_item_body_floting">
                <div className="container_Menu_body_item_title_floting"> {InfoItem.label} </div>
                {InfoItem.options.map((item)=>{
                    return (<div onClick={()=>{
                        if(InfoItem.options.length !== 0) onChangeClick(item.key);
                    }} className={ClassnameItem(item.key)}>{item.label}</div>);
                })}
            </div>:<></>}
        </div>
    );
}