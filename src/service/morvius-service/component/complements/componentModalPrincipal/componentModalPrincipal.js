import { CloseOutlined, FileExclamationOutlined } from "@ant-design/icons";
import React,{useEffect, useState} from "react";
import "./componentModalPrincipal.css";

export function ComponentModalPrincipal(props){
    const {color="white", children, zindex = 1,statemode = true, onClosechange=()=>{}} = props;
    return(
        <>
            {/* onClick={onClosechange} */}
            <div className="component_modalPrin" style={{zIndex: `${zindex*9999}`,display:`${(!statemode)?"none":"block"}`}}>
                <div className="component_modalPrin_container" style={{background:`${color}`}} >
                    {children}
                </div>
            </div>
        </>
    );
}

export function ComponentModalPrincipalHeader(props){
    const {children, onClosechange=()=>{},title="Titulo por default"} = props;

    const formarTitleData = (title) => {
        return title.split(" ").map((item=>{
            let paltabra = item.toLowerCase();
            let arrayleter = paltabra.split("");
            arrayleter[0] = arrayleter[0].toUpperCase();
            // console.log(arrayleter.join(""));
            return arrayleter.join("");
        })).join(" ");
    }

    return(
        <>
            <div className="component_modalPrin_header" >
                <div onClick={onClosechange} className="component_modalPrin_close"><CloseOutlined className="component_modalPrin_close_icon" /></div>
                <div style={{width:"5px"}}/>
                <div className="component_modalPrin_header_container" >
                    <div className="component_modalPrin_header_title" >{formarTitleData(title)}</div>
                </div>
                <div style={{width:"5px"}} />
            </div>
            <div className="component_modalPrin_header_fot">
                {children}
            </div>
        </>
    );
}

export function ComponentModalPrincipalListtabs(props){
    const [indexselect, setindexselect] = useState(0);
    const {children, listOptions = [
        {
            id: 1,
            label : "Editar taller",
            icontab : FileExclamationOutlined
        },
        {
            id: 2,
            label : "Ciclo de curso",
            icontab : FileExclamationOutlined
        }
    ], 
    indexinitial = -2,
    chaindexselect = indexselect,
    chasetindexselect = setindexselect,
    onChangeindex=(index,titletab)=>{}} = props;

    useEffect(()=>{
        (async ()=>{
            if (indexinitial != -2) {
                chasetindexselect(indexinitial);
            }else{
                chasetindexselect(listOptions[0].id);
            }
        })();
    },[]);

    const Tabs = (props) =>{
        const {titletab="default",index=-2, Icontab = FileExclamationOutlined} = props;
        return <div onClick={()=>{
            chasetindexselect(index);
            onChangeindex(index,titletab);
        }} className={(chaindexselect == index)?"component_modalPrin_tabs_activate":"component_modalPrin_tabs"}>
            <Icontab />
            <div style={{width:"5px"}}/>
            {(chaindexselect == index)?<div>{titletab}</div>:<></>}
        </div>
    }

    return(
        <>
            <div className="component_modalPrin_header">
                {/* <div onClick={onClosechange} className="component_modalPrin_close"><CloseOutlined className="component_modalPrin_close_icon" /></div> */}
                {/* <div style={{width:"5px"}}/> */}
                <div className="component_modalPrin_header_list_tabs">
                    {listOptions.map((item)=>{
                        return <Tabs titletab={item.label} index={item.id} Icontab={item.icontab} />;
                    })}
                </div>
                {/* <div style={{width:"5px"}}/> */}
            </div>
            {/* <div className="component_modalPrin_header_fot">
                {children}
            </div> */}
        </>
    );
}

export function ComponentModalPrincipalBody(props){
    const {children} = props;
    return(
        <>
            <div className="component_modalPrin_body">
                <div className="component_modalPrin_body_container">
                    {children}
                    <div style={{height:"100px"}}/>
                </div>
            </div>
        </>
    );
}

export function ComponentModalPrincipalFooter(props){
    const {children} = props;
    return(
        <>
            <div className="component_modalPrin_footer">
                <div className="component_modalPrin_footer_container">
                    {children}
                </div>
            </div>
        </>
    );
}