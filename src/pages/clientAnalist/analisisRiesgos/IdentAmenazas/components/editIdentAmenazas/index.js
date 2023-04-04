import { useEffect, useState } from "react";
// import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../service/morvius-service/components";
// import { AimOutlined, BulbOutlined, TeamOutlined } from "@ant-design/icons";
import './style/index.css';
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader, ComponentModalPrincipalListtabs } from "../../../../../../service/morvius-service/components";
import { getAfectaAtiv } from "../../../../../../service/repository/RTAfectaActiv";
import { InsidensAmenaza } from "./components/insidencias";
import { BulbOutlined, TeamOutlined } from "@ant-design/icons";
import { EditarEcenarioAmenaza } from "./components/ValoriProces";

export function EditaValotCuantitativo(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const [propiskeyDatos, ] = useState(0);
    const {
        informationActivAnali, // informacion del activo seleccionado
        iskeyDatos = propiskeyDatos, // informacion del amenaza del activo
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    const [index,setindex] = useState(0);
    const [stadeValoriActiv,setstadeValoriActiv] = useState(0);
    const [listview,setlistview] = useState([<></>]);
    // const dispatch = useNotification();
    

    useEffect(()=>{
        (async () => {
            await actualizeData();
        })();
    },[]);

    const actualizeData = async () => {
        const ListAmenasActivTotal = await getAfectaAtiv(informationActivAnali)
        // comprueba la existencia de una valorizacion cuantitativa
        const stade = (parseInt(ListAmenasActivTotal.length) === 0)
        setstadeValoriActiv(stade)
        if(stade) return
        const ListAmenasActiv = ListAmenasActivTotal.filter((item)=>{
            return parseInt(item.id_afectaActiv) === iskeyDatos
        });
        setlistview([<EditarEcenarioAmenaza informationDataGeneral={ListAmenasActiv[0]} />,<InsidensAmenaza informationDataGeneral={ListAmenasActiv[0]} informationActivAnali={informationActivAnali}/>])
    }

    const listOpt = [
        {
            id: 0,
            label : "Ecenario Predeterminado",
            icontab : TeamOutlined
        },{
            id: 1,
            label : "Incidencias Alienadas",
            icontab : BulbOutlined
        }
    ];

    const onChangeindex = (index,titletab) => {
        setindex(index);
    }

    return (<ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Ecenario de la Amenaza" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <>
                    <ComponentModalPrincipalListtabs
                        listOptions = {listOpt}
                        onChangeindex = {onChangeindex}
                        chaindexselect = {index}
                        chasetindexselect = {setindex}
                        indexinitial = {listOpt[0].id}
                    ></ComponentModalPrincipalListtabs>
                    <div className="LinerSeparator"></div>
                    <div style={{height: '5px'}}></div>
                    {listview[index]}
                </>
                </ComponentModalFlotingBody>
            </ComponentModalFloting>);
}