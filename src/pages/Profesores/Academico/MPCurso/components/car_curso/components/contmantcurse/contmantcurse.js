import React, { useEffect, useRef, useState } from "react";
import "./style/contmantcurse.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader,ComponentModalPrincipalBody, ComponentModalPrincipalListtabs, ComponentChipst } from "../../../../../../../../service/morvius-service/components";
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
// import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { ViewContenCurso } from "../viewcontcurso/viewcontcurso";
import { Viewlistinscripalm } from "../viewlistinscripalm/viewlistinscripalm";
import { Viewrankinginscrip } from "../viewrankinginscrip/viewrankinginscrip";
import { Viewasistencia } from "../viewasistencia/viewasistencia";
import { AreaChartOutlined, EditOutlined, FormOutlined, SolutionOutlined, TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { ViewInteracion } from "../viewInsteraccion/viewInsteraccion";
import { useParameterRouters } from "../../../../../../../../service/router/router.hook";
import { useNavigate } from "react-router";
import { routerLinks } from "../../../../../../../../service/router/routers";
// import { RedirectLink, valueRouteActual } from "../../../../../../../../service/router/routerscontroler";
// import { routerLinks } from "../../../../../../../../service/router/routers";
// import { ViewCicloCurso } from "../viewciclocurso/viewciclocurso";

export function Contmantcurse(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    let {
        refAction,
        propismodalvisible = ismodalvisible,
        propsetismodalvisible = setismodalvisible,
        onAction = () =>{},
        onCloseSesion = ()=>{},
        dataact={
        id_profesor: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    // se inicializa con el primer patch
    // const [urlredirect, seturlredirect] = useState('');
    const [index,setindex] = useState(0);
    const urlRedirect = useNavigate();
    
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

    const listOpt = [
        {
            id: 0,
            label : "Editar",
            icontab : EditOutlined
        },
        {
            id: 1,
            label : "Contenidos",
            icontab: FormOutlined
        },
        {
            id: 2,
            label : "Interaccion",
            icontab: FormOutlined
        },
        {
            id: 3,
            label : "Inscritos",
            icontab: TeamOutlined
        },
        {
            id: 4,
            label : "Asistencia",
            icontab: SolutionOutlined
        },{
            id: 5,
            label : "Ranking",
            icontab: AreaChartOutlined
        }
    ];

    //<EditCurso onUpdate={onAction} dataact={dataact}/>, <ViewCicloCurso onUpdate={onAction} dataact={dataact} />
    const listview = [<EditCurso onUpdate={onAction} dataact={dataact}/>, <ViewContenCurso onUpdate={onAction} dataact={dataact}/>, <ViewInteracion onUpdate={onAction} dataact={dataact}/>, <Viewlistinscripalm  onUpdate={onAction} dataact={dataact}/>, <Viewasistencia dataac={dataact} />, <Viewrankinginscrip dataac={dataact} />];

    const onChangeindex = (index,titletab) => {
        setindex(index);
        let listRoutes = routerLinks();
        let pathRedirect =  listRoutes.profes[2].patch.replace(':id_curso_edt',dataact['id_ciclo_curso']).replace(':prof_acad_options',titletab.toLowerCase());
        urlRedirect(pathRedirect);
    }

    const onCloseModal = () => {
        onCloseSesion();
        let listRoutes = routerLinks();
        urlRedirect(listRoutes.profes[0].patch);
    }

    return (
        <>
            <ComponentModalPrincipal  statemode={propismodalvisible} onClosechange={()=>{
                onCloseModal();
            }}>
                <ComponentModalPrincipalHeader title={`${dataact.nombre}`} onClosechange={()=>{
                    onCloseModal();
                }} >
                    <div className="container_view-curso-component-header">
                        {/* chip  profesor */}
                        <ComponentChipst colorchip = {"#d6cdee"} name = {dataact.nameprof} photo={dataact.photo} isphoto={true} />
                        <div style={{width:"10px"}} />
                        {/* chip de tipo de curso */}
                        <ComponentChipst colorchip = {"#d6cdee"} iditem={dataact.id_tipo_curso} name = {dataact.nametipocu} />
                    </div>
                    <div style={{height: "10px"}} />
                </ComponentModalPrincipalHeader>
                {/* <ComponentModalPrincipalHeader title="Mantenimiento del taller" onClosechange={()=>{setismodalvisible(false)}} /> */}
                <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                {listview[index]}
            </ComponentModalPrincipal>
            {/*  */}
        </>
    );
}