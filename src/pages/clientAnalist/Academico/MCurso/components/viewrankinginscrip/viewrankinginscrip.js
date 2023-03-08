import React, { useEffect, useRef, useState } from "react";
import "./style/conviewtarea.css";
import { ComponentModalPrincipalBody } from "../../../../../../service/morvius-service/components";
// import { getResulTarea } from "../../../../../../../../../../../../../../service/repository/ResulTarea";
import { Itemcontenrank } from "./components/itemcontenresul/itemcontenresul";
import { getRankpuntos } from "../../../../../../service/repository/ResulTarea";
import { ForminputComboBox } from "../../../../../../service/morvius-service/form";
import { getciclocurso_curso } from "../../../../../../service/repository/CicloCurso";
import { analiicas_ciclo_curso_sincrono_notas, analiicas_ciclo_curso_sincrono_puntos } from "../../../../../../service/repository/Analiticas";
import { Contentrankinginscrip } from "./components/contentrankinginscrip/contrankinginscrip";
// import { Forminput,
//     Forminputnumber, Forminputmail,
//     Forminputpassword,
//     ForminputImageCircle,ForminputBottonSubmit, ForminputRadioSlice, ForminputArea, FormListchipts, ForminputImageRectangle, ForminputDatetoDate} from "../../../../../../service/morvius-service/form";
// import { EditOutlined } from "@ant-design/icons";
// import {updateprofe} from "../../../../../../service/repository/Profesor";
// import { updatecurso } from "../../../../../../service/repository/Curso";
// import {uploudImage} from "../../../../../../service/repository/uploudimage";
// import { getprofesor } from "../../../../../../service/repository/Profesor";
// import { getTipoCurso } from "../../../../../../service/repository/TipoCurso";
// import { Carcurso } from "../car_curso/car_curso";
// import { EditCurso } from "../editcurso/editcurso";
// import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
// import { ViewContenCurso } from "../viewcontcurso/viewcurso";
// import { Viewlistinscripalm } from "../viewlistinscripalm/viewlistinscripalm";
// import { ViewCicloCurso } from "../viewciclocurso/viewciclocurso";

export function Viewrankinginscrip(props){
    let {
        // refaction,
        // onAction = () =>{},
        dataac={
        id_profesor: 0,
        photo:"https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        nombre:"",
        correo:"",
        telf:"",
        tipo_trabajador:"",
        pass:""
    }} = props;
    const [objdataciclocurso, setobjdataciclocurso] = useState(null);
    const [listciclocurso, setlistciclocurso] = useState(null);
    const [indexciclcur,setindexcilcur] = useState(0);

    const ciclo_cursoactive = (array = []) => {
        let listdata = array.filter((item)=>{
            return item.estado == 1;
        });
        if(listdata.length == 0) return array[(array.length - 1)];
        return listdata[0];
    }

    useEffect(()=>{
        (async()=>{
            // console.log(dataac);
            let data = await onlistciclocurso();
            // teniendo en cuenta el estado de los ciclo, rescato el ultimo ciclo o el primer ciclo como default
            const objintindex = ciclo_cursoactive(data);
            // console.log(objintindex);
            // console.log(objintindex);
            setindexcilcur(objintindex.id_ciclo_curso);
            setobjdataciclocurso({id_ciclo_curso: objintindex.id_ciclo_curso});
            // await onListResultTarea(objintindex.id_ciclo_curso);
        })();
    },[]);

    const onlistciclocurso = async () =>{
        
        let result = await getciclocurso_curso(dataac.id_curso);
        setlistciclocurso(null);
        if (result.length != 0){
            //result = result.sort();
            setlistciclocurso(result);
        }
        return result;
    }

    // const onListResultTarea = async (datains) => {
    //     // console.log(dataac);
    //     // let resultinfo = await idinfoinfo();
    //     let result = await analiicas_ciclo_curso_sincrono_notas(datains);
    //     // console.log(result);
    //     // console.log(resultinfo);
    //     let resultfilter = result;
    //     // console.log(resultfilter);
    //     setlistresulttarea(null);
    //     setTimeout(() => {
    //         setlistresulttarea(resultfilter);
    //     }, 500);
    // }

    const parsetieme = (date = "") =>{
        let objdate = new Date(date);
        return objdate.toISOString().slice(0, 10);
    }

    const onChangeinput = async(json)=>{
        setindexcilcur(json.value);
        setobjdataciclocurso(null);
        setTimeout(()=>{
            setobjdataciclocurso({id_ciclo_curso: json.value});
        },500);
    }

    return (
        <>
            <ComponentModalPrincipalBody>
                <div style={{height:"10px"}} />
                <div className="container_view_resulttar_contain_info_contain_title">
                    <div className="container_view_resulttar_contain_info_title">Ranking de puntos</div>
                    {(listciclocurso != null)?<ForminputComboBox valueInit={indexciclcur} onChangeinput = {onChangeinput} datacombo = {listciclocurso.map((item)=>{
                        return {
                            id: item.id_ciclo_curso,
                            label: `${parsetieme(item.fecha_init)}`
                        }
                    })}/>:<></>}
                </div>
                {/* <div style={{height: "10px"}} /> */}
                {(objdataciclocurso != null)?<Contentrankinginscrip dataac={objdataciclocurso} ></Contentrankinginscrip>:<></>}
                {/* {
                    (listresulttarea != null)?
                    listresulttarea.map((item)=>{
                        return <Itemcontenrank onClickActions={onListResultTarea} dataac={item} label={item.nombre} />
                    }):<></>
                } */}
            </ComponentModalPrincipalBody>
        </>
    );
}