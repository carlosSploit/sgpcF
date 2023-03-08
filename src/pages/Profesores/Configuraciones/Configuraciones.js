import React, { useState ,useEffect } from "react";
import "./style/configuracion.css";
import { ComponentModalPrincipal,ComponentModalPrincipalHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
import { EditOutlined, FormOutlined } from "@ant-design/icons";
import { ViewEditProf } from "./components/viewEditProf/viewEditProf";
import { ViewPuntoClass } from "./components/viewpuntosclass/viewpuntosclass";
import { useParameterRouters } from "../../../service/router/router.hook";
import { routerLinks } from "../../../service/router/routers";
import { useNavigate } from "react-router";
// import { ViewRank } from "./components/viewranking/viewRank";

export function Edprof(props){
    let {
        onClosechange = () => {},
        isstade = false,
        onUpdate = () => {},
        dataact = {
            id_profesor: 0,
            photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
            nombre:"",
            correo:"",
            telf:"",
            tipo_trabajador:"",
            pass:""
        }
    } = props;
    
    const urlRedirect = useNavigate();
    const [index,setindex] = useState(0); // INDEX DE LAS OPCCION
    // hook del router de opcciones
    useParameterRouters({paramsVal:['prof_edit_options'] , onParems: (dataParems) => {
        // se comprueva si el contenido ingresa esta dentro de la lista  de opcciones y lo filtra
        let id_option = listOpt.filter((item)=>{
            return item['label'].toLowerCase() == dataParems['prof_edit_options'].toLowerCase();
        });
        console.log(id_option)
        if (id_option.length > 0){
            // si es la opccion se substrae su key para realizar la redireccion.
            let data = id_option[0];
            console.log(data)
            console.log('si existe la opccion: ', parseInt(data.id));
            setindex(parseInt(data.id));
            return;
        }
    }});

    /** OPCCION LIST ACCION */

    const listOpt = [
        {
            id: 0,
            label : "Editar",
            icontab : EditOutlined
        },
        {
            id: 1,
            label : "Puntos",
            icontab: FormOutlined
        }
    ];

    const listview = [<ViewEditProf onUpdate={onUpdate} dataact={dataact} />, <ViewPuntoClass dataact={dataact} />];

    const onChangeindex = (index,titletab) => {
        setindex(index);
        let listRoutes = routerLinks();
        let pathRedirect =  listRoutes.profes[4].patch.replace(':prof_edit_options',titletab.toLowerCase());
        urlRedirect(pathRedirect);
    }

    return (
        <>
           <ComponentModalPrincipal  statemode={isstade} onClosechange={onClosechange}>
               <ComponentModalPrincipalHeader title="Configuracion" onClosechange={onClosechange} />
               <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                {listview[index]}
           </ComponentModalPrincipal>
        </>
    );
}