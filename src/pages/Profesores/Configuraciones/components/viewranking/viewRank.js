import React, { useEffect, useState } from "react";
import "./style/viewpuntosclass.css";
import { ComponentModalPrincipalBody, ComponentRanking } from "../../../../../service/morvius-service/components";
import { AddpuntoClass } from "./components/addpuntoclass/addpuntoclass";
import { getpuntclasstoprof } from "../../../../../service/repository/puntosclass";
import {Editpuntoclass} from "./components/editpuntoclass/editpuntoclass";
import { FormListchipts } from "../../../../../service/morvius-service/form";

export function ViewRank(props){

    let {dataact = {
        id_profesor: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    const [listdatapuntclass, setlistdatapuntclass] = useState([]);
    const [idselectfilter, setidselectfilter] = useState(0);
    const [filterlistdatapuntclass, setfilterlistdatapuntclass] = useState([]);
    const listTipoCurso = [{id:0, name:"Default"},{id:1, name:"Puntos positivos"},{id:2, name:"Puntos negativos"}]

    useEffect(()=>{
        (async()=>{
            await getpuntclass();
        })();
    },[]);

    const getpuntclass = async () => {
        //console.log(dataact);
        //console.log("Insertr datos");
        let resul = await getpuntclasstoprof(dataact.id_profesor);
        setlistdatapuntclass([]);
        setfilterlistdatapuntclass([]);
        setTimeout(()=>{
            setlistdatapuntclass(resul);
            setfilterlistdatapuntclass(onChangeFilter(resul,idselectfilter));
            // console.log(resul);
        },500);
    }

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
    
    return (
        <ComponentModalPrincipalBody>
            <div style={{height: "10px"}}/>
            <div className="container_view_puntoclass_container_title">
                <div className="container_view_puntoclass_subtitle_text">Puntos de Clase</div>
                {/* <AddpuntoClass onInsert={getpuntclass} dataact={dataact}/> */}
            </div>
            <div style={{height: "5px"}}/>
            <ComponentRanking />
            {/* <FormListchipts listdatos={listTipoCurso} initvalue={0} onChangeItems={onChangeItems}/> */}
            {/* <div style={{height: "5px"}}/>
            <div className="container_view_puntoclass_body">
                {(filterlistdatapuntclass != null)? filterlistdatapuntclass.map((item)=>{
                    return (<Editpuntoclass item={item} onEdit={getpuntclass} />);
                }):<></>}
            </div> */}

        </ComponentModalPrincipalBody>
    );
}