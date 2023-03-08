// import { Componentcolapset, ComponentcolapsetHeader,ComponentItemSecionActions } from "../../../../../../../../../../service/morvius-service/components";
// import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
// import { deleteSesion } from "../../../../../../../../service/repository/Sesion";
import { ComponentInfoitem, ComponentItemSecion } from "../../../../../../../../../../service/morvius-service/component/components";
// import { useRef, useState } from "react";
// import { Editarciclocurso } from "../editarsesion/editarciclocurso";
// import { deleteciclocurso } from "../../../../../../../../../../service/repository/CicloCurso";
// import { handleNewNotification, useNotification } from "../../../../../../../../../../service/Notifications/useNotificacion";
import { useEffect, useState } from "react";
import { readalumno } from "../../../../../../../../../../service/repository/CicloCurso";
import { handlerAlertNotify, PopAlertNotify } from "../../../../../../../../../../service/morvius-service/component/complements/componentAlertNotify/componentAlertNotify";
// import { useAlertNotify } from "../../../../../../../../../../service/morvius-service/component/complements/componentAlertNotify/componentAlertNotify.provider";
// import { handleNewAlertComponent, useAlertNotify } from "../../../../../../../../../../service/morvius-service/component/complements/componentAlertNotify/componentAlertNotify.hooks";

export function Viewcontenitem(props){
    const {
        label = "default",
        dataac = {id_sesion: 0},
        // onClickActions = () => {},
        // onclickActionbasic = () => {}
    } = props;
    // const dispatch = useAlertNotify();
    const [propismodalvisible, propsetismodalvisible] = useState(false);
    const [propismodalAletr, propsetismodalAletr] = useState(false);
    const [isNoExisteAlumn, setisNoExisteAlumn] = useState(false);
    const [dataobjAlumn, setdataobjAlumn] = useState(null);
    // const refeditseccion = useRef();
    // const dispatch = useNotification();
    useEffect(()=>{
        // id_alumno
        (async ()=>{
            console.log(dataac);
            let dataalumn = await readalumno(dataac["id_alumno"]);
            let arraykeys = Object.keys(dataalumn);
            // si existe un estado que puede llegar hacer de error
            let value = (arraykeys.indexOf("status") != -1)
            value = value && ((value)?dataalumn["status"] == 404: false)
            setisNoExisteAlumn(value);
            // si la peticion de forma correcta y no hay ningun usuario eliminado en el curso
            // si el alumno existe dentro de la lista
            if (dataobjAlumn == null && !value){
                setdataobjAlumn({
                    id_info: dataalumn["id_alumno"],
                    photo: dataalumn["photo"],
                    name: dataalumn["nombre"],
                    infoOption:(dataalumn["edad"] < 18)?[{
                        label: "Informacion del Usuario",
                        option: [
                            {
                                labelOption: "Edad",
                                valueOption: dataalumn["edad"]
                            },
                            {
                                labelOption: "Correo",
                                valueOption: dataalumn["correo"]
                            }
                        ]
                    },{
                        label: "Informacion del Tutor",
                        option: [
                            {
                                labelOption: "Nombre",
                                valueOption: dataalumn["name_tutor"]
                            },
                            {
                                labelOption: "Correo",
                                valueOption: dataalumn["corr_tutor"]
                            },
                            {
                                labelOption: "Telf",
                                valueOption: dataalumn["telf_tutor"]
                            }
                        ]
                    }]:[{
                        label: "Informacion del Usuario",
                        option: [
                            {
                                labelOption: "Edad",
                                valueOption: dataalumn["edad"]
                            },
                            {
                                labelOption: "Telefono",
                                valueOption: dataalumn["telf"]
                            },
                            {
                                labelOption: "Correo",
                                valueOption: dataalumn["correo"]
                            }
                        ]
                    }]
                });
            }
        })();
    },[]);

    // const eliminaritem = async () => {
    //     let result = await deleteciclocurso(dataac.id_ciclo_curso);
    //     console.log(result);
    //     handleNewNotification(dispatch,result.messege, result.status);
    // }

    return (
        <>
            <div onClick={()=>{
                // si existe el alumno
                if (!isNoExisteAlumn){
                    propsetismodalvisible(true);
                } else {
                    propsetismodalAletr(true);
                    // handlerAlertNotify({title: "Informacion del alumno", descripccion: "El usuario o Alumno no existe"})
                    // console.log("El usuario o Alumno no existe");
                }
            }}>
                <ComponentItemSecion label={label}></ComponentItemSecion>
            </div>
            {/* si el alumno existe dentro de la lista y en ningun momento a sido eliminado, se mostrara los datos */}
            {
                (dataobjAlumn != null)?<ComponentInfoitem propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} informatData={dataobjAlumn} />:<></>
            }
            {/* si no se mostrata un mensaje de error que el usuario ya no existe en memoria */}
            {
                (isNoExisteAlumn) ? <PopAlertNotify namemodal = {"Informacion del Usuario"} descripccion = {"Parece ser que el usuario fue eliminado o bloqueado del sistema, consulte al administrador para poder consultar su informacion."}  propismodalvisible = {propismodalAletr} propsetismodalvisible = {propsetismodalAletr} ></PopAlertNotify> : <></>
            }
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
            {/* {(dataac.estado == 1)?<>
                <Editarciclocurso onAction={onclickActionbasic} dataac={dataac} refid={refeditseccion}></Editarciclocurso>
            </> :<></>} */}
            
        </>
    );
}