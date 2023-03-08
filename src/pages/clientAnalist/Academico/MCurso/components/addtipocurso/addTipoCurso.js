import React, { useEffect,  useState } from "react";
import "./style/addTipoCursoA.css";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import { addprofesor } from "../../../../../../service/repository/Profesor";
import { addTipoCurso, getTipoCurso, deleteTipoCurso, updatTipoCurso } from "../../../../../../service/repository/TipoCurso";
import { DeleteOutlined } from "@ant-design/icons";
import { ComponentModalFloting,
         ComponentModalFlotingHeader,
         ComponentModalFlotingBody } from "../../../../../../service/morvius-service/components";
import { Forminput,FormListchipts,ForminputBottonSubmit,ForminputBotton} from "../../../../../../service/morvius-service/form";
import { handleNewNotification, useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function AddTipoCurso(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const { onInsert=()=>{}, onUpdate=()=>{}, onDelete=()=>{}, prodismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible  } = props;
    const [itemselet, setitemselet] = useState(null);
    const [listTipoCurso, setlistTipoCurso] = useState(null);
    // controladores de contenido inputs
    let [textTipoCurso, settextTipoCurso] = useState("");
    const dispatch = useNotification();
    // let validator = [false,false,false,false,false];

    useEffect(()=>{
        (async()=>{
            await listarTipoCurso();
        })();
    },[]);

    const onDelect = async (index) => {
        let result = await deleteTipoCurso(index);
        handleNewNotification(dispatch,result.messege, result.status);
        setTimeout(() => {
                (async()=>{
                    await listarTipoCurso();
                    await onDelete();
                })();
        }, 500);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(itemselet == null){
            let data = {
                "name" : event.target.tipcurso.value
            };
            let resul = await addTipoCurso(data);
            // await onInsert();
            // console.log(resul);
            // limpiarcastillas();
            // await listarTipoCurso();
            // onAction();
            handleNewNotification(dispatch,resul.messege, resul.status);
            setTimeout(() => {
                    (async()=>{
                        await onInsert();
                        console.log(resul);
                        limpiarcastillas();
                        await listarTipoCurso();
                    })();
            }, 500);
        }else{
            let data = {
                "name" : event.target.tipcurso.value
            };
            let resul = await updatTipoCurso(itemselet.id_tipocurso,data);
            handleNewNotification(dispatch,resul.messege, resul.status);
            setTimeout(() => {
                    (async()=>{
                        await onUpdate();
                        console.log(resul);
                        limpiarcastillas();
                        await listarTipoCurso();
                    })();
            }, 500);
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
           {/* <div className="container_addTipoCurso">
                <ComponentBotton isInvertColor={true} label={"T. curso"} onChange={()=>{setismodalvisible(true);}} />
           </div> */}
           <ComponentModalFloting statemode={prodismodalvisible} onClosechange={()=>{propsetismodalvisible(false);limpiarcastillas();}}>
               <ComponentModalFlotingHeader title="Mantenimiento de Tipo de curso" onClosechange={()=>{propsetismodalvisible(false);limpiarcastillas();}} />
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
                </form>
               </ComponentModalFlotingBody>
           </ComponentModalFloting>
        </>
    );
}