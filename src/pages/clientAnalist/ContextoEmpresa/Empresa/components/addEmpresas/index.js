import React, { useState } from "react";
import "./style/addAlumnos.css";
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { NoExisteEmpresa } from "./components/noExisteEmpresa";

export function AddEmpresas(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible } = props;
    const [index,setindex] = useState(0);
    const [listview, ] = useState([
        <NoExisteEmpresa  onInsert = {onInsert} />
        // , <ExisteEmpresa onInsert = {onInsert} />
    ]);

    // const listOpt = [
    //     {
    //         id: 0,
    //         label : "No Existe",
    //         icontab : EditOutlined
    //     },{
    //         id: 1,
    //         label : "Existe",
    //         icontab : EditOutlined
    //     }
    // ];

    // const onChangeindex = (index,titletab) => {
    //     setindex(index);
    // }

    return (
        <>
           <ComponentModalFloting statemode={propismodalvisible} width = {'400px'} >
                <ComponentModalFlotingHeader title="Insertar una Empresa" colorTitle={'#183152'} onClosechange={()=>{propsetismodalvisible(false);}} />
                <ComponentModalFlotingBody descripccion={""}>
                <div style={{height: '10px'}}></div>
                {/* <ComponentModalPrincipalListtabs
                    listOptions = {listOpt}
                    onChangeindex = {onChangeindex}
                    chaindexselect = {index}
                    chasetindexselect = {setindex}
                    indexinitial = {listOpt[0].id}
                ></ComponentModalPrincipalListtabs>
                <div className="LinerSeparator"></div>
                <div style={{height: '20px'}}></div> */}
                {listview[index]}
                </ComponentModalFlotingBody>
            </ComponentModalFloting>
        </>
    );
}