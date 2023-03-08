import React, { useState } from "react";
import { ComponentBotton, ComponentModalFlotingBody } from "../../../../../../../service/morvius-service/components";
import { Forminput, ForminputBottonSubmit, ForminputComboBox, ForminputSelectIcon } from "../../../../../../../service/morvius-service/form";
import { addpuntclass } from "../../../../../../../service/repository/puntosclass";
import { handleNewNotification, useNotification } from "../../../../../../../service/Notifications/useNotificacion";
import { PopModal } from "../../../../../../../service/morvius-service/component/complements/componentModal/componentModal";

export function AddpuntoClass(props){

    const {onInsert = async () => {}, dataact = {}} = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [textnamepuntoclass, settextnamepuntoclass] = useState("");
    // const [stateSelectIcon,changeSelectIcon] = useState(0);
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();
        

        let data = {
            "name": event.target.keynamepunt.value,
            "valpoint": event.target.keypuntoclass.value,
            "photo": event.target.keyiconselect.value,
            "id_prof": dataact.id_profesor
        }

        let resutl = await addpuntclass(data);

        handleNewNotification(dispatch,resutl.messege, resutl.status);
        setTimeout(() => {
                (async()=>{
                    await onInsert();
                })();
        }, 500);
    }
    
    const onAddPointclass = () => {
        let ismodvisible = !ismodalvisible;
        setismodalvisible(ismodvisible);
    }

    const limpiarcastillas = () => {
        settextnamepuntoclass("");
    }

    const datacombopuntos = [{id:-2, label:"-2"},{id:-1, label:"-1"},{id:1, label:"1"},{id:2, label:"2"}]

    return (
        <>
            <ComponentBotton isInvertColor={true} label={"Agregar"} onChange={onAddPointclass} />
            <PopModal propismodalvisible = {ismodalvisible} propsetismodalvisible = {setismodalvisible} namemodal={"Agregar un Punto de Clase"}>
                <ComponentModalFlotingBody>
                    <form
                        style={{
                            margin: "0",
                            padding: "0",
                            width: "100%"
                        }}
                        layout="vertical"
                        onSubmit={handleSubmit}
                        onFinich
                        autoComplete="off"
                    >
                        <div style={{height:"20px"}}></div>
                        {/**/}
                        <ForminputSelectIcon keyname={"keyiconselect"} />
                        <div style={{height:"5px"}}></div>
                        <Forminput textinput={textnamepuntoclass} settextinput={settextnamepuntoclass} placeHolder="Tipo de Curso" keyname ={"keynamepunt"}/>
                        <div style={{height:"5px"}}></div>
                        <ForminputComboBox  datacombo={datacombopuntos} keyname={"keypuntoclass"} isdefault={true} />
                        <div style={{height:"5px"}}></div>
                        <ForminputBottonSubmit />
                    </form>
               </ComponentModalFlotingBody>
            </PopModal>
            {/* <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}}>
               <ComponentModalFlotingHeader title="Agregar un Punto de Clase" onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}} />
               <ComponentModalFlotingBody>
               <form
                    style={{
                        margin: "0",
                        padding: "0",
                        width: "100%"
                    }}
                    layout="vertical"
                    onSubmit={handleSubmit}
                    onFinich
                    autoComplete="off"
                >
                    <div style={{height:"20px"}}></div>
                    <ForminputSelectIcon keyname={"keyiconselect"} />
                    <div style={{height:"5px"}}></div>
                    <Forminput textinput={textnamepuntoclass} settextinput={settextnamepuntoclass} placeHolder="Tipo de Curso" keyname ={"keynamepunt"}/>
                    <div style={{height:"5px"}}></div>
                    <ForminputComboBox  datacombo={datacombopuntos} keyname={"keypuntoclass"} isdefault={true} />
                    <div style={{height:"5px"}}></div>
                    <ForminputBottonSubmit />
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting> */}
        </>
    );
}