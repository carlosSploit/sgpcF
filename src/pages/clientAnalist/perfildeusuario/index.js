import { useEffect, useState } from "react";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
import { EditOutlined } from "@ant-design/icons";
import './index.css';
import { EditarUsuario } from "./components/Editar";
import { getKeysesion } from "../../../service/repository/mithelworks";
import { ConsuldataLog } from "../../../service/repository/RTUsuarios";
import { readclientAnalist } from "../../../service/repository/RTclientAnalist";
import { EditarUsuarioSecion } from "./components/EditarSeccion";

export function PerfildeUsuario(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const {
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible,
        onAction = ()=>{}} = props;
    const [index,setindex] = useState(0);
    // const [informationDataGeneral, setinformationDataGeneral] = useState({
    //     id_usuario: 2,
    //     usaio: "@pedrna155",
    //     pass: "perrito55",
    //     tip_user: "C",
    //     id_cliente: 2,
    //     nombre: "Pedro Rodrigues",
    //     apellidos: "Guevara Castillo",
    //     telefono: "985796307",
    //     correo: "pedrna155@gmail.com",
    //     photo: "https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png"
    // });
    const [listview,setlistview] = useState([<></>]);

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        let seskey = await getKeysesion();
        let dataRed = await ConsuldataLog({seccionkey: seskey});
        let result = await readclientAnalist(dataRed.id_inform);
        // setinformationDataGeneral(result);
        setlistview([<EditarUsuario onAction={async () => {
            await actualizeData();
        }} onUpdate={onAction} informationDataGeneral={result}/>,<EditarUsuarioSecion onAction={async () => {
            await actualizeData();
        }} onUpdate={onAction} informationDataGeneral={result}/>])
    }

    const listOpt = [
        {
            id: 0,
            label : "Editar",
            icontab : EditOutlined
        },
        {
            id: 1,
            label : "Editar Informacion",
            icontab : EditOutlined
        }
    ];

    const onChangeindex = (index,titletab) => {
        setindex(index);
        // let listRoutes = routerLinks();
        // let pathRedirect =  listRoutes.profes[2].patch.replace(':id_curso_edt',dataact['id_ciclo_curso']).replace(':prof_acad_options',titletab.toLowerCase());
        // urlRedirect(pathRedirect);
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Editar a un usaurio" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                <div className="LinerSeparator"></div>
                <div style={{height: '20px'}}></div>
                {listview[index]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}