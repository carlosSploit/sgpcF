import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
import { BulbOutlined, EditOutlined, PartitionOutlined } from "@ant-design/icons";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import './style/index.css';
import { getEmpresas } from "../../../../../../service/repository/RTEmpresas";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";
import { EditarEmpresaInformation } from "./components/EditarInformacion/Editar";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
import { getKeysesion } from "../../../../../../service/repository/mithelworks";
import { ConsuldataLogm } from "../../../../../../service/repository/mithelworks";
import { AreasEmpresas } from "./components/AreasEmpresa";
import { ObjetivEmpresas } from "./components/ObjetivosEmpresa";
import { AnalistEmpresa } from "./components/AnalistaEmpresa";

export function EditarEmpresa(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos,propsetiskeyDatos ] = useState(0);
    const {
        iskeyDatos = propiskeyDatos,
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible,
        onAction = ()=>{}} = props;
    const [index,setindex] = useState(0);
    const [listOpccion,setlistOpccion] = useState([
        {
            id: 0,
            label : "Editar",
            icontab : EditOutlined
        },
        {
            id: 1,
            label : "Analistas",
            icontab : AiOutlineUsergroupAdd
        },
        {
            id: 2,
            label : "Areas Empresa",
            icontab : PartitionOutlined
        },
        {
            id: 3,
            label : "Objetivo Empresa",
            icontab : BulbOutlined
        }
    ]);
    const dispatch = useNotification();
    const [listview,setlistview] = useState([<></>]);

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        let seskey = await getKeysesion();
        let dataRed = await ConsuldataLogm({seccionkey: seskey});
        let result = await getEmpresas(dataRed.id_inform);
        // console.log(result)
        // console.log(iskeyDatos)
        let ListdataUser = result.filter((item)=>{return item.id_empresa == iskeyDatos })
        if (ListdataUser.length == 0){
            handleNewNotification(dispatch,'Error al cargar la informacion.',404);
            setTimeout(() => {
                window.location.href = window.location.href;
                return;
            }, 500);
            
        }

        if (ListdataUser[0].permis == 'C'){
            setlistOpccion([
                {
                    id: 0,
                    label : "View",
                    icontab : EditOutlined
                }
            ]);
            setlistview([
                <EditarEmpresaInformation onAction={async () => {
                    await actualizeData();
                    await onAction();
                }} onUpdate={onAction} informationDataGeneral={ListdataUser[0]}/>
            ])
            return;
        }

        setlistview([
            <EditarEmpresaInformation onAction={async () => {
                await actualizeData();
                await onAction();
            }} onUpdate={onAction} informationDataGeneral={ListdataUser[0]}/>
            ,<AnalistEmpresa informationDataGeneral={ListdataUser[0]}/>
            ,<AreasEmpresas informationDataGeneral={ListdataUser[0]}/>
            ,<ObjetivEmpresas informationDataGeneral={ListdataUser[0]}/>
        ])
    }

    const onChangeindex = (index,titletab) => {
        setindex(index);
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Mantenimiento de Empresa" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                <ComponentModalPrincipalListtabs
                    listOptions = {listOpccion}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpccion[0].id}
                ></ComponentModalPrincipalListtabs>
                <div className="LinerSeparator"></div>
                <div style={{height: '5px'}}></div>
                {listview[index]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}