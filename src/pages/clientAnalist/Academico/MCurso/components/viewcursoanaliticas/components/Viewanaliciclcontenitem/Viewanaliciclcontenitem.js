import { Componentcolapset, ComponentcolapsetHeader,ComponentItemSecionActions } from "../../../../../../../../service/morvius-service/components";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import { deleteSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentcolapsetBody, ComponentItemSecion } from "../../../../../../../../service/morvius-service/component/components";
import { useEffect, useRef, useState } from "react";
// import { Editarciclocurso } from "../editarsesion/editarciclocurso";
import { deleteciclocurso } from "../../../../../../../../service/repository/CicloCurso";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import "./style/Viewanaliciclcontenitem.css";
import { Viewciclosession } from "../viewciclosession/viewciclosession";

export function Viewanaliciclcontenitem(props){
    const {
        label = "default",
        dataac = {id_sesion: 0},
        onClickActions = () => {},
        onclickActionbasic = () => {}
    } = props;
    const [iscollapset, setiscollapse] = useState(false);
    // const refeditseccion = useRef();
    // const refviewcontent = useRef();
    // const dispatch = useNotification();

    // const eliminaritem = async () => {
    //     let result = await deleteciclocurso(dataac.id_ciclo_curso);
    //     console.log(result);
    //     handleNewNotification(dispatch,result.messege, result.status);
    // }

    useEffect((()=>{
        // console.log(dataac);
    }),[]);

    return (
        <>
            {/* <ComponentItemSecion onClikchange={()=>{
                refviewcontent.current.click();
            }} label={label}>
                {(dataac.estado == 1)?<>
                    <ComponentItemSecionActions onClickActions={async () => {
                        refeditseccion.current.click();
                    }} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async () => {
                        await eliminaritem();
                        setTimeout(() => {
                            (async()=>{
                                await onClickActions();
                            })();
                        }, 500);
                    }} Icont={DeleteOutlined}/>
                    <div style={{width:"5px"}} />
                </> :<></>}
            </ComponentItemSecion> */}

            <Componentcolapset>
                <ComponentcolapsetHeader oncollapset={(stade)=>{
                    setiscollapse(stade);
                    console.log(stade);
                }} label={label} >
                    {/* <ComponentItemSecionActions onClickActions={async () => {
                        refeditseccion.current.click();
                    }} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async () => {
                        await eliminaritem();
                        setTimeout(() => {
                            (async ()=>{
                                await onClickActions();
                            })();
                        }, 500);
                    }} Icont={DeleteOutlined}/>
                     */}
                    <div className="conten_data_analic_tapitem">{dataac.analitliker}</div>
                    <div style={{width:"5px"}} />
                </ComponentcolapsetHeader>
                <ComponentcolapsetBody stateOcult={iscollapset}>
                    <div className="conten_data_analitic_info">
                        <div className="conten_data_item">
                            <div className="conten_data_item">Cantidad de Inscritos :</div>
                            <div className="conten_data_item_numb">{dataac.cantinscrip}</div>
                        </div>
                        <div className="conten_data_item">
                            <div className="conten_data_item">Ganancia del curso :</div>
                            <div className="conten_data_item_numb">{`S/.${dataac.ganacia}`}</div>
                        </div>
                        <div className="conten_data_item">
                            <div className="conten_data_item">Promedio de asistencias :</div>
                            <div className="conten_data_item_numb">{(dataac.promedioasis != null)?`${dataac.promedioasis} %`: "DESCONOCIDO"}</div>
                        </div>
                        <div className="conten_data_item">
                            <div className="conten_data_item">Analisis del Promedio :</div>
                            <div className="conten_data_item_numb">{dataac.analitliker}</div>
                        </div>
                    </div>
                    {/* {
                        (listcontsess != null)?
                        listcontsess.map((item)=>{
                            return <ItemContentsescion label={item.nombre_conte} onUpdate={onlistcontsesionbasic} onDelect={onlistcontsesion} dataac={item} />;
                        })
                        :<></>
                    }
                    {
                        (listtarea != null)?
                        listtarea.map((item)=>{
                            return <ItemContenttarea label={item.nombre} onUpdate={onlistconttareabasic} onDelect={onlistconttarea} dataac={item} />;
                        })
                        :<></>
                    }
                    <div style={{height:"10px"}}/>
                    <div className="componet-colapse-footer">
                        <div className="componet-colapse-footer-bott"
                            onClick={()=>{refaddcont.current.click();}}
                        >
                            Agregar contenido
                        </div>
                        <div className="componet-colapse-footer-bott-inv"
                            onClick={()=>{refaddtare.current.click();}}
                        >
                            Agregar tarea
                        </div>
                    </div> */}
                </ComponentcolapsetBody>
            </Componentcolapset>
            <div style={{height:"2px"}}></div>

            {/* <Componentcolapset>
                <ComponentcolapsetHeader oncollapset={(stade)=>{
                    setiscollapse(stade);
                }} label={label} >
                    <ComponentItemSecionActions onClickActions={async () => {
                        refeditseccion.current.click();
                    }} Icont={EditOutlined} />
                    <ComponentItemSecionActions onClickActions={async () => {
                        await eliminaritem();
                        await onClickActions();
                    }} Icont={DeleteOutlined}/>
                    <div style={{width:"5px"}} />
                </ComponentcolapsetHeader>
                <ComponentcolapsetBody stateOcult={iscollapset}>
                </ComponentcolapsetBody>
            </Componentcolapset> */}
            {/* <Viewciclosession dataac={dataac} refid={refviewcontent}></Viewciclosession> */}
        </>
    );
}