import React, { useEffect, useRef, useState } from "react";
import "./style/contmantcurse.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
// import { Forminput,
//     Forminputnumber, Forminputmail,
//     Forminputpassword,
//     ForminputImageCircle,ForminputBottonSubmit, ForminputRadioSlice, ForminputArea, FormListchipts, ForminputImageRectangle, ForminputDatetoDate} from "../../../../../../service/morvius-service/form";
// import { EditOutlined } from "@ant-design/icons";
// import {updateprofe} from "../../../../../../service/repository/Profesor";
// import { updatecurso } from "../../../../../../service/repository/Curso";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import { getprofesor } from "../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
// import { Carcurso } from "../car_curso/car_curso";
import { EditCurso } from "../editcurso/editcurso";
// import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";
import { ViewCicloCurso } from "../viewciclocurso/viewciclocurso";
import { Viewlistinscripalm } from "../viewlistinscripalm/viewlistinscripalm";
import { Viewlistcontent } from "../viewlistcontent/viewlistcontent";
import { Viewrankinginscrip } from "../viewrankinginscrip/viewrankinginscrip";
import { AreaChartOutlined, EditOutlined, FormOutlined, PieChartOutlined, ReloadOutlined, TeamOutlined } from "@ant-design/icons";
import { Viewcursoanaliticas } from "../viewcursoanaliticas/viewcursoanaliticas";
import { useParameterRouters } from "../../../../../../service/router/router.hook";
import { routerLinks } from "../../../../../../service/router/routers";
import { useNavigate } from "react-router";

export function Contmantcurse(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    let {
        propismodalvisible = ismodalvisible, 
        propsetismodalvisible = setismodalvisible,
        onClose = () => {},
        onAction = () =>{},
        dataact={
        id_profesor: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    const [index,setindex] = useState(0);
    const urlRedirect = useNavigate();
    const [listview, setlistview] = useState([]);
    const listOpt = [
        {
            id: 0,
            label : "Editar",
            icontab : EditOutlined
        },
        {
            id: 1,
            label : "Ciclos",
            icontab: ReloadOutlined
        },
        {
            id: 2,
            label : "Contenidos",
            icontab: FormOutlined
        },
        {
            id: 3,
            label : "Inscritos",
            icontab: TeamOutlined
        },
        {
            id: 4,
            label : "Ranking",
            icontab: AreaChartOutlined
        },
        {
            id: 5,
            label : "Analiticas",
            icontab: PieChartOutlined
        }
    ];

    // hook del router de opcciones
    useParameterRouters({paramsVal:['prof_acad_options'] , onParems: (dataParems) => {
        // se comprueva si el contenido ingresa esta dentro de la lista  de opcciones y lo filtra
        let id_option = listOpt.filter((item)=>{
            return item['label'].toLowerCase() == dataParems['prof_acad_options'].toLowerCase();
        });
        if (id_option.length > 0){
            // si es la opccion se substrae su key para realizar la redireccion.
            let data = id_option[0];
            setindex(parseInt(data.id));
            return;
        }
    }});

    useEffect(()=>{
        // console.log("holandas")
        setlistview([<EditCurso onUpdate={onAction} dataact={dataact} isvisiblemodal = {propismodalvisible}/>, <ViewCicloCurso onUpdate={onAction} dataact={dataact} />, <Viewlistcontent  onUpdate={onAction} dataact={dataact} />, <Viewlistinscripalm onUpdate={onAction} dataact={dataact} />, <Viewrankinginscrip dataac={dataact} />, <Viewcursoanaliticas onUpdate={onAction} dataact={dataact} />]);
    },[]);

    const onChangeindex = (index,titletab) => {
        setindex(index);
        // console.log(titletab)
        let listRoutes = routerLinks();
        let pathRedirect =  listRoutes.admin[5].patch.replace(':id_curso',dataact['id_curso']).replace(':prof_acad_options',titletab.toLowerCase());
        urlRedirect(pathRedirect);
    }

    const closeModal = () => {
        let listRoutes = routerLinks();
        let pathRedirect =  listRoutes.admin[3].patch;
        urlRedirect(pathRedirect);
        propsetismodalvisible(false);
        onClose();
    }

    return (
        <>
            <ComponentModalPrincipal  statemode={propismodalvisible} onClosechange={closeModal}>
            <ComponentModalPrincipalHeader title="Mantenimiento del curso" onClosechange={closeModal} />
            <ComponentModalPrincipalListtabs
                listOptions = {listOpt}
                onChangeindex = {onChangeindex}
                chaindexselect = {index}
                chasetindexselect = {setindex}
                indexinitial = {listOpt[0].id}
            ></ComponentModalPrincipalListtabs>
                {/* si el modal es invisible, no recargara ninguna informacion, pero si lo es, dara paso a las actualizaciones */}
                {(propismodalvisible && (listview.length != 0))?listview[index]:<></>}
            </ComponentModalPrincipal>
        </>
    );
}