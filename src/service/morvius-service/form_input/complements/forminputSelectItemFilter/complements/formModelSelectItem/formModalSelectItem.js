// import { SendOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { PopModal } from "../../../../../component/complements/componentModal/componentModal";
import { ComponentModalFlotingBody, Componentsearch } from "../../../../../component/components";
// import { LisObjIcons } from "../../../res/resSvgtoJS/objListIcon.react";
import { FormListchipts, ForminputBotton } from "../../../../form_input";
import CartsItemsIcons from "../itemCardSelect/itemCardSelect";
import "./style/formModalSelectItem.css";

export function FormModalSelectItem(props){

    const [ismodalvisibleIN, setismodalvisibleIN] = useState(false);
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
    const {
        nameTitle = "",
        isVisibleDescri = false,
        isVisibleFoto = false,
        onChangeSelect = (key) => {},
        propismodalvisible = ismodalvisibleIN,
        propsetismodalvisible = setismodalvisibleIN,
        listaObj = proplistaObj,
        setlistaObj = propsetlistaObj,
        listFilter = proplistfilter,
        setlistFilter = setproplistfilter
    } = props;
    const [isSelectIcon, setisSelectIcon] = useState(0);
    const [listIcons, setlistIcons] = useState([]);
    const [histlistIcons, sethistlistIcons] = useState([]);
    // const [textnamepuntoclass, settextnamepuntoclass] = useState(item.nombre);
    // const dispatch = useNotification();

    useEffect(()=>{
        let list = listaObj;
        setlistIcons([]);
        sethistlistIcons([]);
        setTimeout(()=>{
            setlistIcons(list);
            sethistlistIcons(list);
        },100)
    },[]);

    const onChangeseach = (keyitem = 0) => {
        if (parseInt(keyitem) === 0){
            sethistlistIcons([]);
            setTimeout(()=>{
                sethistlistIcons([...listIcons]);
            },100)
            return
        }
        let listiconsfilt = listIcons.filter((item)=>{
            return parseInt(item.keyfilter) === parseInt(keyitem);
        });
        sethistlistIcons([]);
        setTimeout(()=>{
            sethistlistIcons(listiconsfilt);
        },100)
    };

    // const onChangekey = () =>{
    //     sethistlistIcons(listIcons);
    // }

    const onchange = (key) => {
        setisSelectIcon(key);
    }

    const onSelectitem = () => {
        onChangeSelect(isSelectIcon);
        propsetismodalvisible(false);
    }

    return (
        <>
            {/* <ComponentItemPuntosClass onchange={onchange} id_puntos = {item.id_tipo_puntos} name = {item.nombre} value = {item.value_point} photo = {item.photo} /> */}
            <PopModal zvisiblex={11} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} namemodal={nameTitle}>
                <ComponentModalFlotingBody>
                    <div style={{height:"10px"}} ></div>
                    {(listFilter.length != 0)?<FormListchipts listdatos={listFilter} keytitle={'name'} keyitem={'id'} onChangeItems={(item)=>{
                        onChangeseach(item.id)
                    }} />:<></>}
                    {/* <Componentsearch height= "30px" onChangeseach = {onChangeseach} onChangekey = {onChangekey}/> */}
                    <div style={{height:"10px"}} ></div>
                    <div className="container_view_selectItem_body_content">
                        <div className="container_view_selectItem_body">
                            {histlistIcons.map((item)=>{
                                return <CartsItemsIcons isVisibleDescri = {isVisibleDescri} isVisibleFoto={isVisibleFoto} descr={item.descr} keyid={item.id} name={item.name} value={item.id} photo={item.photo} onchange={onchange} keySelet={isSelectIcon}/>
                            })}
                        </div>
                    </div>
                    <div style={{height:"10px"}} ></div>
                    <ForminputBotton label = "Seleccionar" onChange={onSelectitem} />
               </ComponentModalFlotingBody>
            </PopModal>
        </>
    );
}