// import { SendOutlined } from "@ant-design/icons";

// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../../service/morvius-service/components";
// import { Forminput, ForminputBotton, ForminputBottonSubmit, ForminputComboBox } from "../form_input";
// import ComponentItemPuntosClass from "../itempuntosclass/componentitempuntosclass";
// import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { deletepuntclass, updatepuntclass } from "../../../../../../../../service/repository/puntosclass";

import { useEffect, useState } from "react";
// import { handleNewAlertComponent } from "../../../../../../../../../../../../../../service/morvius-service/component/complements/componentAlertNotify/componentAlertNotify.hooks";
// import { useAlertNotify } from "../../../../../../../../../../../../../../service/morvius-service/component/complements/componentAlertNotify/componentAlertNotify.provider";
import { ComponentModalFlotingBody,Component } from "../../../../../../../../../../../../../../service/morvius-service/components";
import { ForminputBotton, ForminputSelectItem, FormListchipts } from "../../../../../../../../../../../../../../service/morvius-service/form";
import { handleNewNotification, useNotification } from "../../../../../../../../../../../../../../service/Notifications/useNotificacion";
import { getlistinscripalum } from "../../../../../../../../../../../../../../service/repository/Inscripcc";
import { addinscripPuntosClass, ConsultinscripPuntosClass } from "../../../../../../../../../../../../../../service/repository/inscripuntosclass";
import { getKeysesion } from "../../../../../../../../../../../../../../service/repository/mithelworks";
import { getpuntclasstoprof } from "../../../../../../../../../../../../../../service/repository/puntosclass";
import { ConsuldataLog } from "../../../../../../../../../../../../../../service/repository/Usuarios";
import ComponentItemPuntosClass from "../../../../../../../../../../../../components/itempuntosclass/itempuntosclass";
import "./insertarpunto.css";

// import { ComponentModalPrincipalListtabs } from "../../../../../../../../../../../../service/morvius-service/components";
// import { EditOutlined } from "@ant-design/icons";
// import { getlistinscripalum } from "../../../../../../../../../../../../service/repository/Inscripcc";
// import { actioninsertsesion } from "../../../../../../../../../../../../hooks/sesion.hooks";
// import { connect } from "react-redux";
// import { actiongetCicloCurso, storeCiclocurso, constumerfunction, objCiclo, actioninsertCicloCurso } from "../../../../../../../../../../../../hooks/sesion.hooks";

function InsertarPunto(props){
    // const [ismodalvisibleIN, setismodalvisibleIN] = useState(false);
    const {
        dataac,
    } = props;

    // const [isSelectIcon, setisSelectIcon] = useState(0);
    // const [listIcons, setlistIcons] = useState([]);
    // const [histlistIcons, sethistlistIcons] = useState([]);
    const [listdatapuntclass, setlistdatapuntclass] = useState([]);
    const [idselectfilter, setidselectfilter] = useState(0);
    const [idselectPunto, setidselectPunto] = useState(-1);
    const [idselectInscrip, setidselectInscrip] = useState(-1);
    const [listlistalumn , setlistlistalumn] = useState([]);
    const [filterlistdatapuntclass, setfilterlistdatapuntclass] = useState([]);
    const listTipoCurso = [{id:0, name:"Default"},{id:1, name:"Puntos positivos"},{id:2, name:"Puntos negativos"}]
    const dispatch = useNotification();
    // const dispnotify = useAlertNotify();

    useEffect(()=>{(async ()=>{
        await getpuntclass();
        await getinscrit();
    })();},[])

    // ------------------------------------------------------------- eventos de insercion de puntos

    const onInsertPunto = async () => {
        // onChangeSelect(isSelectIcon);
        // propsetismodalvisible(false);
        let data = {
            id_inscrip : idselectInscrip,
            id_tipopunt : idselectPunto,
            id_sesion : dataac.id_sesion
        };

        const resul = await addinscripPuntosClass(data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
            (async()=>{
                console.log(resul);
                limpiarselectores();
            })();
        }, 500);
    }

    const limpiarselectores = () => {
        setidselectInscrip(-1);
        setidselectPunto(-1);
    }

    // ------------------------------------------------------------- retornar los items de puntos y usuarios

    const getinscrit = async ()=>{
        console.log(dataac);
        let result = await getlistinscripalum(dataac.id_ciclocurso);
        setlistlistalumn(null);
        setTimeout(() => {
            console.log(result);
            if (result.length != 0){
                let data = result.map((item)=>{
                    return {
                        id: item.id_inscrip,
                        name: item.nombre,
                        photo: item.photo
                    };
                });
                console.log(data);
                setlistlistalumn(data);
            }
        }, 500);
    }

    const getpuntclass = async () => {
        //console.log(dataact);
        //console.log("Insertr datos");
        let token = await getKeysesion();
        // console.log(token);
        let data_user = await ConsuldataLog({
            seccionkey: token
        });
        console.log(data_user);
        let resul = await getpuntclasstoprof(data_user.id_info);
        setlistdatapuntclass([]);
        setfilterlistdatapuntclass([]);
        setTimeout(()=>{
            setlistdatapuntclass(resul);
            setfilterlistdatapuntclass(onChangeFilter(resul,idselectfilter));
            // console.log(resul);
        },500);
    }

    // ------------------------------------------------------------- eventos de seleccion 
    const onChangeFilter = (array = [],id_filter) => {
        return array.filter((item)=>{
            return (id_filter != 0)? ((id_filter == 1)?(item.value_point > 0):(item.value_point < 0)): true;
        });
    }

    const onChangeItems = (item) =>{
        setidselectfilter(item.id);
        setfilterlistdatapuntclass([]);
        setTimeout(()=>{
            setfilterlistdatapuntclass(onChangeFilter(listdatapuntclass, item.id));
        },500);
    }

    const onSelectItem = (json) => {
        setidselectInscrip(json.id);
    }


    return (
        <>
            <ComponentModalFlotingBody>
                <div style={{height:"20px"}} ></div>
                {((listlistalumn != null)?(listlistalumn.length > 0):false)?<ForminputSelectItem  listaObj={listlistalumn} keyname={"selestInscrip"} checkbox={idselectInscrip} setcheckbox={setidselectInscrip} onChangeinput={onSelectItem} />:<></>}
                <div style={{height: "5px"}}/>
                <FormListchipts listdatos={listTipoCurso} initvalue={0} onChangeItems={onChangeItems}/>
                <div style={{height: "5px"}}/>
                <div className="container_view_puntoclass_body">
                    {(filterlistdatapuntclass != null)? filterlistdatapuntclass.map((item)=>{
                        return (<ComponentItemPuntosClass 
                                    selectidenx={idselectPunto} 
                                    onSelectItem={(index)=>{ setidselectPunto(index);}}  
                                    onchange={()=>{}} 
                                    id_puntos = {item.id_tipo_puntos} 
                                    name = {item.nombre} 
                                    value = {item.value_point} 
                                    photo = {item.photo} 
                                    onEdit={getpuntclass} />);
                    }):<></>}
                </div>
                <div style={{height:"15px"}} ></div>
                <ForminputBotton label = "Insertar" onChange={onInsertPunto} />
            </ComponentModalFlotingBody>
        </>
    );
}

export default InsertarPunto;

// export default connect((state)=>{
//     return {
//         storedate: state 
//     };
// },{ actioninsertsesion })(MantenimPuntosClass);