// import { SendOutlined } from "@ant-design/icons";

// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../../../service/morvius-service/components";
// import { Forminput, ForminputBotton, ForminputBottonSubmit, ForminputComboBox } from "../form_input";
// import ComponentItemPuntosClass from "../itempuntosclass/componentitempuntosclass";
// import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { deletepuntclass, updatepuntclass } from "../../../../../../../../service/repository/puntosclass";
import { useState } from "react";
// import { ComponentModalFlotingBody, PopModal } from "../../../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import { Componentsearch } from "../../../../../../../../../../../../service/morvius-service/components";
// import { ForminputBotton,ForminputSelectItem, FormListchipts } from "../../../../../../../../../../../../service/morvius-service/form";
// import CartsItemsIcons from "../../../../../../../../../../../../service/morvius-service/form_input/complements/forminputSelectIcon/cartsItemsIcons/cartsItemsIcons";
// import { LisObjIcons } from "../../../../../../../../../../../../service/morvius-service/res/resSvgtoJS/objListIcon.react";
// import { getpuntclasstoprof } from "../../../../../../../../../../../../service/repository/puntosclass";
// import { getKeysesion, gettoken } from "../../../../../../../../../../../../service/repository/mithelworks";
// import { ConsuldataLog } from "../../../../../../../../../../../../service/repository/Usuarios";
// import ComponentItemPuntosClass from "../../../../../../../../../../components/itempuntosclass/itempuntosclass";
// import "./style/mantenimPuntosClass.css";
// import { getlistinscripalum } from "../../../../../../../../../../../../service/repository/Inscripcc";
import { ComponentModalPrincipalListtabs } from "../../../../../../../../../../../../service/morvius-service/components";
import { EditOutlined, FormOutlined } from "@ant-design/icons";
import InsertarPunto from "./components/insertarpunto/insertarpunto";
import EditarPunto from "./components/editartpunto/editarpunto";
import { PopModal } from "../../../../../../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";
// import { getlistinscripalum } from "../../../../../../../../../../../../service/repository/Inscripcc";
// import { actioninsertsesion } from "../../../../../../../../../../../../hooks/sesion.hooks";
// import { connect } from "react-redux";
// import { actiongetCicloCurso, storeCiclocurso, constumerfunction, objCiclo, actioninsertCicloCurso } from "../../../../../../../../../../../../hooks/sesion.hooks";
// import AlertNotifyProviderProvider from "../../../../../../../../../../../../service/morvius-service/component/complements/componentAlertNotify/componentAlertNotify.provider";

function MantenimPuntosClass(props){
    const [ismodalvisibleIN, setismodalvisibleIN] = useState(false);
    const {
        refid,
        // storedate,
        dataac,
        // onChangeSelect = (key) => {},
        propismodalvisible = ismodalvisibleIN,
        propsetismodalvisible = setismodalvisibleIN,
    } = props;

    // const [textnamepuntoclass, settextnamepuntoclass] = useState(item.nombre);
    // const dispatch = useNotification();
    const [index,setindex] = useState(0);

    // ------------------------------------------------------------------------------

    const listOpt = [
        {
            id: 0,
            label : "Insertar",
            icontab : FormOutlined
        },
        {
            id: 1,
            label : "Editar",
            icontab : EditOutlined
        }
    ];

    //<EditCurso onUpdate={onAction} dataact={dataact}/>, <ViewCicloCurso onUpdate={onAction} dataact={dataact} />
    const listview = [<InsertarPunto dataac={dataac}/>, <EditarPunto dataac={dataac}/>];

    const onChangeindex = (index,titletab) => {
        setindex(index);
    }


    return (
        <>
            <div ref={refid} onClick={()=>{
                let stade = !propismodalvisible;
                propsetismodalvisible(stade);
            }} />
            <PopModal colorBackgroud = {"#9686C3"} colorTitle = {"#fff"} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} namemodal={"Puntuar a alumno"}>
                {/* ------------------------------------- */}
                <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                {/* ------------------------------------- */}
                {listview[index]}
            </PopModal>
        </>
    );
}

export default MantenimPuntosClass;

// export default connect((state)=>{
//     return {
//         storedate: state 
//     };
// },{ actioninsertsesion })(MantenimPuntosClass);