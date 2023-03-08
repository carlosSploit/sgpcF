import React, { useEffect, useState } from "react";
import "./styles/PICurso.css"
// import {Componentsearch} from "../../../../service/morvius-service/component/components";
// import { AddAdmin } from "./components/addAlumnos/addAdmin";
import { ItemPreInscr } from './components/ItemPreInscr/ItemPreInscr';
// import { getadmins } from '../../../../service/repository/Admin';
import { getpreinscripc } from "../../../../service/repository/Inscripcc";
import { Componentsearchanimation, ComponentTable, ComponentTableHead } from "../../../../service/morvius-service/components";
// import { useParams } from "react-router-dom";

export function PICurso(props){
    const [listdata,setlistdata] = useState(null);
    const [listdatafilter,setlistdatafilter] = useState(null);
    // let { id } = useParams(); 
    
    useEffect(()=>{
        // console.log(id);
        (async()=>{
            await onUpdate();
        })();
    },[]);

    const onUpdate = async () => {
        let result = await getpreinscripc();
        setlistdata(null);
        setTimeout(() => {
            setlistdata(result);
            setlistdatafilter(result);
        }, 1000);
    }

    const onFilterData = (search) =>{
        if (search == ""){
            setlistdatafilter(listdata);
        }
        let datafilter = listdata.filter((item)=>{
            console.log(item)
            return item.namecurso.toUpperCase().indexOf(search.toUpperCase()) != -1;
        });
        setlistdatafilter(datafilter);
    }

    return (
        <div className="Container_PICurso_principal">
            <div className="Container_PICurso_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_PICurso_principal_header">
                    <div className="Container_PICurso_principal_header_subcontent_title">
                        <div className="Container_PICurso_principal_header_content_title">Lista de Preinscripcciones</div>
                    </div>
                    <div className="Container_PICurso_principal_header_subcontent_search">
                        <div className="Container_PICurso_principal_header_subcontent_search_cont">
                            <Componentsearchanimation onChangekey={(search)=>{
                                if(search == ""){
                                    setlistdatafilter(listdata);
                                }
                            }} onChangeseach={onFilterData}/>
                        </div>
                    </div>
                </div>
                {/* Curpo */}
                <div className="Container_PICurso_principal_body">
                    <div className="Container_PICurso_principal_body_subContainer">
                        <ComponentTable>
                            <ComponentTableHead headers={[
                                {
                                    label: "#",
                                    asling: "cent",
                                    isOcult: false,
                                    width: "10%"
                                },
                                {
                                    label: "Nombre",
                                    asling: "lef",
                                    isOcult: false,
                                    width: ""
                                },
                                {
                                    label: "Nombre del Curso",
                                    asling: "lef",
                                    isOcult: true,
                                    width: ""
                                },
                                {
                                    label: "Accciones",
                                    asling: "cent",
                                    isOcult: false,
                                    width: "100px"
                                }
                            ]} />
                            <tbody>
                                {
                                    (listdatafilter != null)?
                                        listdatafilter.map((item)=>{
                                            return <ItemPreInscr onUpdate={onUpdate} itemdate ={item}/>;
                                        }
                                    ):<></>
                                }
                            </tbody>
                        </ComponentTable>
                    </div>
                </div>
            </div>
            {/* <AddAdmin onInsert={onInsert} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} /> */}
            {/* <div className="Container_admin_principal_header">
                
                <div className="Container_admin_principal_header_content">
                <div className="Container_admin_principal_header_content_title">Mantenimiento de Administrador</div>
                    <div style={{height:"30px"}}></div>
                    <Componentsearch onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                </div>
            </div>
            <div className="Container_admin_principal_subbody">
                <div className="Container_admin_principal_subbody_title">
                    Ingresa un nuevo usuario administrador
                </div>
                <div className="Container_admin_principal_subbody_botton">
                    
                </div>
            </div>
            <div className="Container_admin_principal_body">
                <div className="Container_admin_principal_scroller">
                    <div className="Container_admin_principa_contain">
                        {
                            (listdata != null)?
                            listdata.map((item)=>{
                                return <ItemAdmin onUpdate={onUpdate} onDelectPerson={onDelectPerson} itemdate ={item}/>;
                            }):<></>
                        }
                    </div>
                </div>
            </div> */}
        </div>
    );
}