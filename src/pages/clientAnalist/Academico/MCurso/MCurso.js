import React, { useEffect, useState } from "react";
import "./styles/mcursoA.css";
import { Componentfilter, ComponentItemSecionSelector, ComponentItemSecionSelectorItem,  Componentsearchanimation } from "../../../../service/morvius-service/component/components";
import { AddCurso } from "./components/addCurso/addCurso";
// import { getprofesor } from '../../../../service/repository/Profesor';
import { AddTipoCurso } from "./components/addtipocurso/addTipoCurso";
import { getTipoCurso } from "../../../../service/repository/TipoCurso";
import { getcurso } from "../../../../service/repository/Curso";
import { Carcurso } from "./components/car_curso/car_curso";
import { CheckCircleOutlined, FilterOutlined } from "@ant-design/icons";

export function MCurso(props){
    //tipocurso
    const [ismodalvisibleAddtipocurso, setismodalvisibleAddtipocurso] = useState(false);
    const [ismodalvisibleAddcurso, setismodalvisibleAddcurso] = useState(false);
    const [isfilterdata, setisfilterdata] = useState(false);
    const [listTipoCurso,setlistTipoCurso] = useState(null);
    // listart los cuesos y filtrarlos
    const [listcurso, setlistcurso] = useState(null);
    // captura de datos de filtros
    const [isnamecourse, setisnamecourse] = useState("");
    const [id_tipo_course, setid_tipo_course] = useState(0);
    
    useEffect(()=>{
        // ------------------------------------------------------------------ inicializacion de variables
        (async()=>{
            let resultc = await getcurso(isnamecourse);
            setlistcurso(resultc);
            // let result = await getprofesor();
            // setlistdata(result);
            let resulttipo = await getTipoCurso();
            setlistTipoCurso(resulttipo);
        })();
    },[]);

    const onActionCursoAct = async (namecuorse = "",id_tip_corse=0) => {
        let resulttipo = await getcurso(namecuorse);
        if(id_tip_corse != 0){
            let resul = resulttipo.filter((item)=>{
                return id_tip_corse == item.id_tipo_curso;
            });
            setlistcurso(resul);
            return;
        }
        setlistcurso(resulttipo);
    }

    const onActionCurso = async (namecuorse = "",id_tip_corse=0) => {
        let resulttipo = await getcurso(namecuorse);
        setlistcurso(null);
        setTimeout(() => {
            if(id_tip_corse != 0){
                let resul = resulttipo.filter((item)=>{
                    return id_tip_corse == item.id_tipo_curso;
                });
                setlistcurso(resul);
                return;
            }
            setlistcurso(resulttipo);
        }, 1000);
    }

    const onAction = async () => {
        let resulttipo = await getTipoCurso();
        setlistTipoCurso(null);
        setTimeout(() => {
            setlistTipoCurso(resulttipo);
        }, 1000);
    }

    return (
        <div className="Container_mcursoa_principal">
            <div className="Container_mcursoa_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_mcursoa_principal_header">
                    <div className="Container_mcursoa_principal_header_subcontent_title">
                        <div className="Container_mcursoa_principal_header_content_title">Lista de Cursos</div>
                    </div>
                    <div className="Container_mcursoa_principal_header_subcontent_search">
                        <div className="Container_mcursoa_principal_header_subcontent_search_cont">
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
                        <div className="Container_mcursoa_principal_header_subcontent_search_opt">
                            <div className={(!isfilterdata)?"Container_mcursoa_principal_header_container_optinon_active":"Container_mcursoa_principal_header_container_optinon"}>
                                <div onClick={async ()=>{
                                    let isstade = !isfilterdata;
                                    setisfilterdata(isstade);
                                    setid_tipo_course((isstade)?1:0);
                                    if(!isstade){
                                        await onActionCurso(isnamecourse,0);
                                    }
                                    // 
                                }} className={"Container_mcursoa_principal_header_container_optinon_icon"}>
                                    <FilterOutlined />
                                </div>
                            </div>
                            <div className="Container_mcursoa_principal_header_container_optinon">
                                <ComponentItemSecionSelector SiseIcon={"30"} colorIon = {"white"}>
                                    <ComponentItemSecionSelectorItem labelOption={"Agrega un Curso"} onClickActions={async () => {
                                        setismodalvisibleAddcurso(true);
                                    }} Icont={CheckCircleOutlined} />
                                    <ComponentItemSecionSelectorItem labelOption={"Agrega un Tipo de Curso"} onClickActions={async () => {
                                        setismodalvisibleAddtipocurso(true);
                                    }} Icont={CheckCircleOutlined} />
                                </ComponentItemSecionSelector>
                            </div>
                        </div>
                    </div>
                </div>
                {(isfilterdata)?<div className="Container_mcursoa_principal_header">
                    <Componentfilter datacombo={listTipoCurso} keyvalue={"id_tipocurso"} keylabel={"name"} onChangeseach = {async (jsonfilter) =>{
        //                 setisnamecourse(search);
                        setid_tipo_course(jsonfilter.value);
                        await onActionCurso(isnamecourse,jsonfilter.value);
                    }} ></Componentfilter>
                </div>:<></>}
                {/* Curpo */}
                <div className="Container_mcursoa_principal_body">
                    <div style={{height:"15px"}}></div>
                    <div className="Container_mcursoa_principal_body_subContainer">
                        <div className="Container_mcursoa_principal_scroller">
                            <div className="Container_mcursoa_principa_contain">
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
            <AddCurso onInsert={onActionCurso} prodismodalvisible = {ismodalvisibleAddcurso} propsetismodalvisible = {setismodalvisibleAddcurso} />
            <AddTipoCurso onUpdate={async () => {
                // await socket.emit('tipocurso:actualdata','')
                await onAction()
            }} onInsert={async () => {
                // await socket.emit('tipocurso:insertdata','')
                await onAction()
            }} onDelete={async () => {
                // await socket.emit('tipocurso:delectedata','')
                await onAction()
            }}prodismodalvisible = {ismodalvisibleAddtipocurso} propsetismodalvisible = {setismodalvisibleAddtipocurso}/>
        </div>
    );
}