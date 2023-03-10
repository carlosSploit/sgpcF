import { useEffect, useState } from "react";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";

// import { uploudImage } from "../../../../service/repository/uploudimage";
// import { updateclientAnalist } from "../../../../service/repository/clientAnalist";
import { ForminputAreatEdit, ForminputBottonSubmit, ForminputComboBoxEdit, ForminputEdit, ForminputmailEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { updateEmpresa } from "../../../../../../../../service/repository/RTEmpresas";
import { updateTrabajEmpresa } from "../../../../../../../../service/repository/RTTrabajEmpresas";
import { getGerarcProces } from "../../../../../../../../service/repository/RTGerarcProces";

export function EditarProcesEmpresaInformation(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "id_proceso": 2,
        "nombreProce": "Proceso de dictado de cursos.",
        "descripccion": "Proceso donde un procesor dicta el cursos en un sistema E-learning a un alumnos.",
        "id_gerarProc": 3,
        "nombre": "SubProceso",
        "id_tipProce": 2,
        "nombreTip": "Procesos de apoyo",
        "isDepProcPadre": 1,
        "id_DepentProc": 1
      });
    const {onAction, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    const [textGerarProc, settexGerarProc] = useState(0);
    // const [textGerarProcMemoryInit, settextGerarProcMemoryInit] = useState(0);
    const [listGerarProc, setlistGerarProc] = useState([]);
    // const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    useEffect(()=>{
        // console.log(informationDataGeneral)
        (async()=>{
            // inicializar el tipo de proceso
            // let result = await getTipoProces();
            // setlistTipoProc(result);
            // if(result.length != 0){
            //     settextTipoProc(result[0].id_tipProce)
            //     settextTipoProcMemoryInit(result[0].id_tipProce)
            // }
            // inicializar la gerarquia de proceso
            let resultger = await getGerarcProces();
            setlistGerarProc(resultger);
            if(resultger.length != 0){
                settexGerarProc(resultger[0].id_gerarProc)
            }
            // inicializar los procesoso
            // let resultproc = await getProcesEmpresa(informacionGeneral);
            
            // console.log(resultproc)
            // if(resultproc.length != 0){
            //     let data = resultproc.map((item)=>{
            //         return {
            //             id: item.id_proceso,
            //             name: item.nombreProce
            //         }
            //     })
            //     setlistProcEmpre(data);
            //     // settexProcEmpre(resultproc[0].id_proceso)
            //     // settextProcEmpreMemoryInit(resultproc[0].id_proceso)
            // }
        })();
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        // let urlimage = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";

        // if(filephoto == null){
        //     urlimage = (isurl(informationDataGeneral.photo))? informationDataGeneral.photo : urlimage;
        // }

        // if(filephoto != null){
        //     urlimage = await uploudImage(filephoto);
        //     urlimage = urlimage.data;
        //     urlimage = urlimage[0].url;
        // }

        // console.log(urlimage)

        let data = {
            "nombre": event.target[`nombrEmp${informationDataGeneral.Id_trabajador}`].value,
            "cargo" :  event.target[`carg${informationDataGeneral.Id_trabajador}`].value,
            "descripc": event.target[`descr${informationDataGeneral.Id_trabajador}`].value,
            "telefono" : event.target[`telf${informationDataGeneral.Id_trabajador}`].value,
            "correo" : event.target[`correo${informationDataGeneral.Id_trabajador}`].value,
            "codTrabajo": event.target[`codig${informationDataGeneral.Id_trabajador}`].value
            // "photo": urlimage
        };
        let resul = await updateTrabajEmpresa(informationDataGeneral.Id_trabajador, data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    await onAction();
                })();
        }, 500);
    }

    // const oncallbackchange = (file) => {
    //     setfilephoto(file);
    // }

    return (<form
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
        
        {/* apace cuando no se a seleccionado nada */}
        {/* <ForminputImageCircle oncallbackchange={oncallbackchange} urlphoto={informationDataGeneral.photo} keyname ={`photo${informationDataGeneral.id_usuario}`}/> */}
        {/* <div style={{height:"20px"}}></div> */}
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.nombreProce} placeHolder="Nombre" keyname ={`nombrEmp${informationDataGeneral.id_proceso}`}/>
        <div style={{height:'5px'}} />
        <ForminputAreatEdit valueInit={informationDataGeneral.descripccion} placeHolder="Descripccion" keyname ={`descr${informationDataGeneral.id_proceso}`}/>
        <div style={{height:'5px'}} />
        {(listGerarProc.length != 0)?<ForminputComboBoxEdit 
            setpropdatacombo = {setlistGerarProc}
            indexinput = {textGerarProc}
            setindexinput = {settexGerarProc}
            valueInit={informationDataGeneral.id_gerarProc}  
            keyname={`gerproc${informationDataGeneral.id_proceso}`} 
            isInvert={true} 
            width={100} 
            height={28} 
            keyvalue={'id_gerarProc'} 
            keylabel={'nombre'} 
            datacombo={listGerarProc} 
            placeHolder = {'Gerarquia del proceso'}
            onChangeinput = {(jsonval)=>{ settexGerarProc(jsonval.value)}} />:<></>}
        
        
        {/* <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.cargo} placeHolder="Cargo" keyname ={`carg${informationDataGeneral.Id_trabajador}`}/>
        
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.telefono} placeHolder="Telefono" keyname ={`telf${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height:'5px'}} />
        <ForminputmailEdit valueInit={informationDataGeneral.correo} placeHolder="Correo" keyname ={`correo${informationDataGeneral.Id_trabajador}`}/>
        <div style={{height:'5px'}} />
        <ForminputEdit valueInit={informationDataGeneral.codTrabajo} placeHolder="Codigo Empresa" keyname ={`codig${informationDataGeneral.Id_trabajador}`}/> */}
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}