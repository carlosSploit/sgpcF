import React, { useEffect, useState } from "react";
import "./styles/MPCurso.css"
import { Componentfilter, ComponentItemSecionSelector, ComponentItemSecionSelectorItem, Componentsearchanimation, ComponentsearchConbofilter } from "../../../../service/morvius-service/component/components";
// import { AddProfesor } from "./components/addCurso/addCurso";
import { getprofesor } from '../../../../service/repository/Profesor';
// import { AddTipoCurso } from "./components/addtipocurso/addTipoCurso";
import { getTipoCurso } from "../../../../service/repository/TipoCurso";
// import { getcurso } from "../../../../service/repository/Curso";
// import { EditCurso } from "./components/editcurso/editcurso";
import {Carcurso} from "./components/car_curso/car_curso";
import { keyseccion } from "../../../../service/repository/variables";
import { ConsuldataLog } from "../../../../service/repository/Usuarios";
import { getciclocurso_listcursos } from "../../../../service/repository/CicloCurso";
import { CheckCircleOutlined, FilterOutlined } from "@ant-design/icons";

export function MPCurso(props){
    const {id_infos = 0} = props;
    const [ismodalvisibleAddtipocurso, setismodalvisibleAddtipocurso] = useState(false);
    const [isfilterdata, setisfilterdata] = useState(false);
    const [datacourse, setdatacourse] = useState({});
    const [listdata,setlistdata] = useState(null);
    const [listTipoCurso,setlistTipoCurso] = useState(null);
    const [listcurso, setlistcurso] = useState(null);
    const [isnamecourse, setisnamecourse] = useState("");
    const [id_tipo_course, setid_tipo_course] = useState(0);
    // const [isAction, setisAction] = useState(true); // derecta si hay una accion de actualizacion, eliminacion o algo
    // const [listItem, setlistItem] = useState([]);

    useEffect(()=>{
        (async()=>{
            let resultinfo = await idinfoinfo();
            setdatacourse(resultinfo);
            let resultc = await getciclocurso_listcursos(isnamecourse);
            setlistcurso(onInfoFilterProduct(resultc,resultinfo.id_info));
            let result = await getprofesor();
            setlistdata(result);
            let resulttipo = await getTipoCurso();
            setlistTipoCurso(resulttipo);
        })();
    },[]);

    // captura la id del info del usuario
    const idinfoinfo = async() =>{
        let resuldata = {};
        // si ya se realizo un logeo
        if(localStorage.getItem(keyseccion)){
            // valida los datos del usuario a ingresar su id y su tipo
            let data = {
            seccionkey: localStorage.getItem(keyseccion)
            };
            resuldata = await ConsuldataLog(data);
            return resuldata;
        }
    }

    // filtra la informacion
    const onInfoFilterProduct = (listdata = [], id_info = 0) => {
        let listaux = listdata.filter((item)=>{
            return ((id_info != 0)?id_info:datacourse.id_info) == item.id_profesor;
        });
        return listaux;
    }

    const onActionCursoAct = async (namecuorse = "",id_tip_corse=0) => {
        let resulttipo = await getciclocurso_listcursos(namecuorse);
        if(id_tip_corse != 0){
            let resul = resulttipo.filter((item)=>{
                return id_tip_corse == item.id_tipo_curso;
            });
            setlistcurso(onInfoFilterProduct(resul));
            return;
        }
        setlistcurso(onInfoFilterProduct(resulttipo));
    }

    const onActionCurso = async (namecuorse = "",id_tip_corse=0) => {
        let resulttipo = await getciclocurso_listcursos(namecuorse);
        setlistcurso(null);
        setTimeout(() => {
            if(id_tip_corse != 0){
                let resul = resulttipo.filter((item)=>{
                    return id_tip_corse == item.id_tipo_curso;
                });
                setlistcurso(onInfoFilterProduct(resul));
                return;
            }
            setlistcurso(onInfoFilterProduct(resulttipo));
        }, 1000);
    }

    return (
        <div className="Container_MPCurso_principal">
            <div className="Container_MPCurso_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_MPCurso_principal_header">
                    <div className="Container_MPCurso_principal_header_subcontent_title">
                        <div className="Container_MPCurso_principal_header_content_title">Lista de Cursos</div>
                    </div>
                    <div className="Container_MPCurso_principal_header_subcontent_search">
                        <div className="Container_MPCurso_principal_header_subcontent_search_cont">
                            {/* onChangekey={onChangekey} onChangeseach={onChangeseach} */}
                            <Componentsearchanimation onChangekey={async(seach)=>{
                                if(seach == ""){
                                    setisnamecourse("");
                                    await onActionCurso();
                                }
                            }} onChangeseach = {async (search) =>{
                                setisnamecourse(search)
                                await onActionCurso(search,id_tipo_course);
                            }} />
                        </div>
                        <div className="Container_MPCurso_principal_header_subcontent_search_opt">
                            <div className={(!isfilterdata)?"Container_MPCurso_principal_header_container_optinon_active":"Container_MPCurso_principal_header_container_optinon"}>
                                <div onClick={async ()=>{
                                    let isstade = !isfilterdata;
                                    setisfilterdata(isstade);
                                    setid_tipo_course((isstade)?1:0);
                                    if(!isstade){
                                        await onActionCurso(isnamecourse,0);
                                    }
                                }} className={"Container_MPCurso_principal_header_container_optinon_icon"}>
                                    <FilterOutlined />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(isfilterdata)?<div className="Container_MPCurso_principal_header">
                    <Componentfilter datacombo={listTipoCurso} keyvalue={"id_tipocurso"} keylabel={"name"} onChangeseach = {async (jsonfilter) =>{
                        setid_tipo_course(jsonfilter.value);
                        await onActionCurso(isnamecourse,jsonfilter.value);
                    }} ></Componentfilter>
                </div>:<></>}
                {/* Curpo */}
                <div className="Container_MPCurso_principal_body">
                    <div style={{height:"15px"}}></div>
                    <div className="Container_MPCurso_principal_body_subContainer">
                        <div className="Container_MPCurso_principal_scroller">
                            <div className="Container_MPCurso_principa_contain">
                                {
                                    (listcurso != null)?
                                    listcurso.map((item)=>{
                                        return <Carcurso 
                                        onUpdate={async()=>{
                                            await onActionCursoAct(isnamecourse,id_tipo_course);
                                        }}  dataact={item} onDelect={async()=>{
                                            await onActionCurso(isnamecourse,id_tipo_course);
                                        }} />;
                                    }):<></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <AddProfesor onInsert={onActionCurso} prodismodalvisible = {ismodalvisibleAddcurso} propsetismodalvisible = {setismodalvisibleAddcurso} /> */}
            {/* <AddTipoCurso onAction={onAction} onInsert={onAction} prodismodalvisible = {ismodalvisibleAddtipocurso} propsetismodalvisible = {setismodalvisibleAddtipocurso}/> */}
            {/* <AddMPCurso onInsert={onInsert} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} /> */}
        </div>
        // <div className="Container_MPCurso_principal">
        //     <div className="Container_MPCurso_principal_header">
        //         <div className="Container_MPCurso_principal_header_content">
        //         <div className="Container_MPCurso_principal_header_content_title">Mantenimiento de Cursos</div>
        //             <div style={{height:"30px"}}></div>
        //             <ComponentsearchConbofilter oonChangekey={async(seach)=>{
        //                 if(seach == ""){
        //                     setisnamecourse("");
        //                     setid_tipo_course(0);
        //                     await onActionCurso();
        //                 }
        //             }} onChangeseach = {async (search,jsonfilter) =>{
        //                 setisnamecourse(search);
        //                 setid_tipo_course(jsonfilter.value);
        //                 await onActionCurso(search,jsonfilter.value);
        //             }} keyvalue={"id_tipocurso"} keylabel={"name"} datacombo={listTipoCurso} />
        //         </div>
        //     </div>
        //     <div className="Container_MPCurso_principal_body">
        //         <div className="Container_MPCurso_principal_scroller">
        //             <div className="Container_MPCurso_principa_contain">
        //                 {
        //                     (listcurso != null)?
        //                     listcurso.map((item)=>{
        //                         return <Carcurso 
        //                         onUpdate={async()=>{
        //                             await onActionCursoAct(isnamecourse,id_tipo_course);
        //                         }}  dataact={item} onDelect={async()=>{
        //                             await onActionCurso(isnamecourse,id_tipo_course);
        //                         }} />;
        //                     }):<></>
        //                 }
        //             </div>
        //     </div>
        //     </div>
        // </div>
    );
}

// const BodyListcontent = (props) => {
//     const {listdata, onReloadData=()=>{}} = props;

//     return (
        
//     );
// }