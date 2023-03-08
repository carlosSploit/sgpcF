import React, { useEffect, useRef, useState } from "react";
import "./style/addTipoCurso.css";
import {uploudImage} from "../../../../../../service/repository/uploudimage";
import { addprofesor } from "../../../../../../service/repository/Profesor";
import { addTipoCurso, getTipoCurso, deleteTipoCurso, updatTipoCurso } from "../../../../../../service/repository/TipoCurso";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { ComponentBotton,
         ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../service/morvius-service/components";
import { Forminput,FormListchipts,ForminputBottonSubmit,ForminputBotton} from "../../../../../../service/morvius-service/form";

export function AddTipoCurso(props){
    const { onInsert=()=>{}, onAction=()=>{} } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [itemselet, setitemselet] = useState(null);
    const [listTipoCurso, setlistTipoCurso] = useState(null);
    // controladores de contenido inputs
    let [textTipoCurso, settextTipoCurso] = useState("");
    let validator = [false,false,false,false,false];

    useEffect(()=>{
        (async()=>{
            await listarTipoCurso();
        })();
    },[]);

    const onDelect = async (index) => {
        let result = await deleteTipoCurso(index);
        await listarTipoCurso();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(itemselet == null){
            let data = {
                "name" : event.target.tipcurso.value
            };
            let resul = await addTipoCurso(data);
            await onInsert();
            console.log(resul);
            limpiarcastillas();
            await listarTipoCurso();
            onAction();
        }else{
            let data = {
                "name" : event.target.tipcurso.value
            };
            let resul = await updatTipoCurso(itemselet.id_tipocurso,data);
            await onInsert();
            console.log(resul);
            limpiarcastillas();
            await listarTipoCurso();
            onAction();
        }
        
    }

    const limpiarcastillas = ()=>{
        //userefTipoC.current.value = "";
        //setitemselet(null);
        setitemselet(null);
        //setlistTipoCurso(null);
        settextTipoCurso("");
    }

    const listarTipoCurso = async ()=>{
        // recargar datos
        let result = await getTipoCurso();
        setlistTipoCurso(null);
        setTimeout(()=>{
            setlistTipoCurso(result);
        },1000);
    }

    // detecta si se a seleccionado algo y lo tiene en consideracion
    const onChangeItems = (item) => {
        // setfilephoto(file);
        console.log(item);
        setitemselet(null);       
        setTimeout(()=>{
            setitemselet(item);
            settextTipoCurso(item.name);
        },500);
    }

    const onChangeBotton = async () => {
        limpiarcastillas();
        await listarTipoCurso();
    }

    return (
        <>
           <div className="container_addTipoCurso">
                <ComponentBotton isInvertColor={true} label={"T. curso"} onChange={()=>{setismodalvisible(true);}} />
           </div>
           <ComponentModalFloting statemode={ismodalvisible} onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}}>
               <ComponentModalFlotingHeader title="Insertar el profesor" onClosechange={()=>{setismodalvisible(false);limpiarcastillas();}} />
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
                    {(listTipoCurso != null)?
                    <FormListchipts  keyitem={"id_tipocurso"} keytitle={"name"} listdatos={listTipoCurso} actionChips={[{
                        icon: DeleteOutlined,
                        onAction: onDelect
                    }]} initvalue={(itemselet == null)?0:itemselet.id_tipocurso} isActionChips = {true} onChangeItems={onChangeItems}/>:
                    <></>}
                    <div style={{height:"5px"}}></div>
                    {/* apace cuando no se a seleccionado nada */}
                    <Forminput textinput={textTipoCurso} settextinput={settextTipoCurso} placeHolder="Tipo de Curso" keyname ={"tipcurso"}/>
                    {/* {(itemselet == null)?
                    
                    <></>} */}
                    {/* aparece cuando se a seleccionado un iten */}
                    {/* {(itemselet != null)?
                    <Forminput valueInit={itemselet.name} placeHolder="Tipo de Curso" keyname ={"tipcurso"}/>:
                    <></>} */}
                    {(itemselet == null)?
                    <ForminputBottonSubmit />:
                    <div className="container_addTipoCurso_opccions">
                        <div className="container_addTipoCurso_buttons_opccion">
                            <ForminputBottonSubmit label={"Actualizar"} />
                            <ForminputBotton label={"Cancelar"} onChange={onChangeBotton} />
                        </div>
                    </div>}
                    {/* <Forminputmail placeHolder="correo" keyname ={"cor"}/>
                    <Forminputnumber placeHolder="telf" keyname ={"teld"} Limitchar={9}/>
                    <Forminput placeHolder="estudios" keyname ={"estudios"}/>
                    <Forminputpassword keyname ={"pass"}/> */}

                    {/* <ForminputDate keyname ={"keynamber2"}/>
                    <ForminputRadioSlice keyname ={"keynamber3"}/>
                    <ForminputComboBox keyname ={"keynamber4"}/>
                    <ForminputArea keyname ={"keynamber5"}/>
                    
                    
                    <Forminputpassword keyname ={"keynamber8"}/>
                    <ForminputImageCircle keyname ={"keynamber10"}/>
                    <ForminputImageRectangle keyname ={"keynamber11"}/>
                    <FormListchipts keyname ={"keynamber12"}/>
                    <ForminputDatetoDate keyname ={"keynamber13"}/> */}
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}