import React, { useEffect, useState } from "react";
import "./styles/index.css"
import { Componentsearchanimation} from "../../../../service/morvius-service/component/components";
import { AddEmpresas } from "./components/addEmpresas";
import { ItemEmpresa } from './components/itemEmpresa/index';
import { getadmins } from '../../../../service/repository/Admin';
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { OpccionActions } from "./components/opccionActions";
import { getEmpresas } from "../../../../service/repository/Empresas";
import { ConsuldataLogm, getKeysesion } from "../../../../service/repository/mithelworks";

export function Empresas(props){
    const [listdata,setlistdata] = useState([]);
    const [listdataHistory,setlistdataHistory] = useState([]);
    const [ismodeladd,setismodeladd] = useState(false);
    const [textsearch,settextsearch] = useState("");
    
    useEffect(()=>{
        (async()=>{
            await LoadDataEmpresa();
        })();
    },[]);

    const LoadDataEmpresa = async () => {
        let secionkey = await getKeysesion();
        let dataUser = await ConsuldataLogm({seccionkey: secionkey});
        console.log(dataUser);
        let result = await getEmpresas(dataUser.id_inform);
        setlistdata([]);
        setlistdataHistory([]);
        setTimeout(() => {
            setlistdata(result);
            setlistdataHistory(result);
        }, 500);
    }

    // const onDelectPerson = async () => {
    //     let result = await getadmins(textsearch);
    //     setlistdata(null);
    //     setTimeout(() => {
    //         setlistdata(result);
    //     }, 1000);
    // }

    // const onUpdate = async () => {
    //     let result = await getadmins(textsearch);
    //     setlistdata(result);
    // }

    // const onInsert = async () =>{
    //     let result = await getadmins(textsearch);
    //     setlistdata(result);
    // }

    // ------------------------------------------------------------ Actions del Buscador
    const onChangeseach = async (search) => {
        settextsearch(search);
        let result = await getadmins(search);
        setlistdata(result);
    }

    const onChangekey = async (seach) =>{
        if(seach == ""){
            settextsearch("");
            let result = await getadmins();
            setlistdata(result);
        }
    }

    const opccionSistem = [
        {
            label: "Agregar",
            icon: PlusOutlined,
            onChange: () => {
                setismodeladd(true);
            }
        },
        {
            label: "Eliminar",
            icon: DeleteOutlined,
            onChange: () => {}
        }
    ]

    return (
        <div className="Container_Empresas_principal">
            <div className="Container_Empresas_principal_subConteiner">
                {/* Encabezado */}
                <div className="Container_Empresas_principal_header">
                    <div className="Container_Empresas_principal_header_subcontent_title">
                        <div className="Container_Empresas_principal_header_content_title">Lista de Empresas</div>
                    </div>
                    <div className="Container_Empresas_principal_header_subcontent_search">
                        <div className="Container_Empresas_principal_header_subcontent_search_cont">
                            <Componentsearchanimation onChangekey={onChangekey} onChangeseach={onChangeseach}/>
                        </div>
                    </div>
                </div>
                {/* Curpo */}
                <div className="Container_Empresas_principal_body">
                    <OpccionActions opccionSistem={opccionSistem} />
                    <div className="Container_Empresas_principal_body_subContainer">
                        {listdata.map((item)=>{
                            return (<ItemEmpresa keyitem = {item.id_empresa} title = {item.nombreempresa} subtitle = {item.ruc} descrip = {item.descripc}></ItemEmpresa>)
                        })}
                    </div>
                </div>
            </div>
            <AddEmpresas onInsert={async ()=>{
                await LoadDataEmpresa();
            }} propismodalvisible = {ismodeladd} propsetismodalvisible = {setismodeladd} />
        </div>
    );
}