// import { SendOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { PopModal } from "../../../../../component/complements/componentModal/componentModal";
import { ComponentChipst, ComponentModalFlotingBody, Componentsearch } from "../../../../../component/components";
// import { LisObjIcons } from "../../../res/resSvgtoJS/objListIcon.react";
import { FormListchipts, ForminputBotton } from "../../../../form_input";
import CartsItemsIcons from "../itemCardSelect/itemCardSelect";
import "./style/formModalSelectItem.css";
import { CloseOutlined } from "@ant-design/icons";

export function FormModalSelectItem(props){

    const [ismodalvisibleIN, setismodalvisibleIN] = useState(false);
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
    const {
        nameTitle = "",
        isVisibleDescri = false,
        keyid = "id_tipoActivo",
        keylabe = 'nombreTipoActivo',
        keydepende = 'id_dependeTipoPad',
        keydescr = 'dependAbreb',
        isVisibleFoto = false,
        onChangeSelect = (key) => {},
        propismodalvisible = ismodalvisibleIN,
        propsetismodalvisible = setismodalvisibleIN,
        listaObj = proplistaObj,
        setlistaObj = propsetlistaObj
    } = props;
    const [isSelectIcon, setisSelectIcon] = useState(0);
    const [listIcons, setlistIcons] = useState([]);
    const [histlistIcons, sethistlistIcons] = useState([]);
    // variables de utilizar
    const [listgerargeki, setlistgerargeki] = useState([]);
    // const [textnamepuntoclass, settextnamepuntoclass] = useState(item.nombre);
    // const dispatch = useNotification();

    useEffect(()=>{
        let list = listaObj;
        setlistIcons([]);
        sethistlistIcons([]);
        setTimeout(()=>{
            let dataFilter = list.filter((item)=>{
                return item[keydepende] == 0;
            })
            console.log(dataFilter)
            setlistIcons(dataFilter);
            sethistlistIcons(list);
        },100)
    },[]);

    // const onChangeseach = (search) => {
    //     let listiconsfilt = listIcons.filter((item)=>{
    //         return item.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
    //     });
    //     sethistlistIcons([]);
    //     setTimeout(()=>{
    //         sethistlistIcons(listiconsfilt);
    //     },100)
    // };

    // const onChangekey = () =>{
    //     sethistlistIcons(listIcons);
    // }

    const onchange = (key) => {
        setisSelectIcon(key);
        // inprimir los nuevos datos
        let LisobjHijos = histlistIcons.filter((item)=>{
            return item[keydepende] == key;
        })
        if(LisobjHijos.length == 0) return
        setlistIcons(LisobjHijos);
        // Inicializar los datos de gerargi
        let objInfo = histlistIcons.filter((item)=>{
            return item[keyid] == key;
        })
        let lsitGeragiData = [...listgerargeki];
        lsitGeragiData.push(objInfo[0])
        setlistgerargeki(lsitGeragiData)
    }

    const onchangeDelete = (key) => {
        setisSelectIcon(0);
        // Inicializar los datos de gerargi
        let objInfo = listgerargeki.filter((item)=>{
            return item[keyid] != key;
        })
        let lsitGeragiData = [...objInfo];
        setlistgerargeki(lsitGeragiData)
        // // inprimir los nuevos datos
        let LisobjHijos = histlistIcons.filter((item)=>{
            if (lsitGeragiData.length == 0){
                return item[keydepende] == 0;
            }

            let dataUltime = lsitGeragiData[lsitGeragiData.length - 1]
            console.log()
            return item[keydepende] == dataUltime[keyid]; 
        })
        setlistIcons(LisobjHijos);
    }

    const onSelectitem = () => {
        
        onChangeSelect(isSelectIcon);
        propsetismodalvisible(false);
    }

    return (
        <>
            {/* <ComponentItemPuntosClass onchange={onchange} id_puntos = {item.id_tipo_puntos} name = {item.nombre} value = {item.value_point} photo = {item.photo} /> */}
            <PopModal onClose={()=>{
                onChangeSelect(0);
                propsetismodalvisible(false);
            }} colorTitle={'#183152'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} namemodal={nameTitle}>
                <ComponentModalFlotingBody>
                    <div style={{height:"10px"}} ></div>
                    <div style={{width: "96%", marginLeft: "2%"}}>
                      {(listgerargeki.length != 0)?<FormListchipts isInterationsUltime={true} isActionChips={true} listdatos={listgerargeki} keytitle={keylabe} keyitem={keyid} actionChips = {[
                          {
                              icon: CloseOutlined,
                              onAction: (id)=>{
                                  onchangeDelete(id)
                              }
                          }
                      ]} />:<></>}
                    </div>  
                    {/* <div style={{height:"10px"}} ></div>
                    <Componentsearch height= "30px" onChangeseach = {onChangeseach} onChangekey = {onChangekey}/> */}
                    <div style={{height:"10px"}} ></div>
                    <div className="container_view_selectItem_body_content">
                        <div className="container_view_selectItem_body">
                            {listIcons.map((item)=>{
                                return <CartsItemsIcons isVisibleDescri = {isVisibleDescri} isVisibleFoto={isVisibleFoto} keyid={item[keyid]} name={item[keylabe]} value={item[keyid]} descr={item[keydescr]} photo={item.photo} onchange={onchange} keySelet={isSelectIcon}/>
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