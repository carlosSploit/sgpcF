import { useEffect, useState } from "react";
// import { useNotification } from "../../../../service/Notifications/NotificationProvider";
// import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";

// import { uploudImage } from "../../../../service/repository/uploudimage";
// import { updateclientAnalist } from "../../../../service/repository/clientAnalist";
import { ForminputAreatEdit, ForminputBottonSubmit, ForminputEdit } from "../../../../../../../../service/morvius-service/form_input/form_input";
import { handleNewNotification, useNotification } from "../../../../../../../../service/Notifications/useNotificacion";
import { updateEmpresa } from "../../../../../../../../service/repository/Empresas";

export function EditarEmpresaInformation(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        "id_empresa": 2,
        "nombreempresa": "La empresa la tuya",
        "ruc": "9867827827",
        "descripc": "Esta enpresa es la mera verga",
        "telefono": "985796307",
        "rubroEmpresa": "El rubro de la empresa es administracion",
        "mision": "sjadklasjkldjaskldjaskljkldas",
        "vision": "kasldkas;ldkasl;kdasl;kd"
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    
    // const [filephoto, setfilephoto] = useState(null);
    const dispatch = useNotification();

    // const isurl = (url="") =>{
    //     let arraysplit = url.split("://");
    //     if (arraysplit.length === 1) return false;
    //     if (arraysplit[0] !== "https") return false;
    //     return true;
    // }

    useEffect(()=>{
        (async () => {
            console.log(informationDataGeneral)
        })();
    },[]);

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
            "nombreempresa": event.target[`nombrEmp${informationDataGeneral.id_empresa}`].value,
            "ruc" :  event.target[`ruc${informationDataGeneral.id_empresa}`].value,
            "telefono": event.target[`telf${informationDataGeneral.id_empresa}`].value,
            "descripc" : event.target[`descr${informationDataGeneral.id_empresa}`].value,
            "rubroempresa" : event.target[`rubemp${informationDataGeneral.id_empresa}`].value,
            "misio": event.target[`mision${informationDataGeneral.id_empresa}`].value,
            "vision": event.target[`vision${informationDataGeneral.id_empresa}`].value
            // "photo": urlimage
        };
        let resul = await updateEmpresa(informationDataGeneral.id_empresa, data);
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
        <ForminputEdit valueInit={informationDataGeneral.nombreempresa} placeHolder="Nombre de la Empresa" keyname ={`nombrEmp${informationDataGeneral.id_empresa}`}/>
        <ForminputEdit valueInit={informationDataGeneral.ruc} placeHolder="RUC" keyname ={`ruc${informationDataGeneral.id_empresa}`}/>
        <ForminputAreatEdit valueInit={informationDataGeneral.descripc} placeHolder="Descripccion" keyname ={`descr${informationDataGeneral.id_empresa}`}/>
        <ForminputEdit valueInit={informationDataGeneral.telefono} placeHolder="Telefono" keyname ={`telf${informationDataGeneral.id_empresa}`}/>
        <ForminputEdit valueInit={informationDataGeneral.rubroEmpresa} placeHolder="Rubro de la empresa" keyname ={`rubemp${informationDataGeneral.id_empresa}`}/>
        <ForminputAreatEdit valueInit={informationDataGeneral.mision} placeHolder="Mision" keyname ={`mision${informationDataGeneral.id_empresa}`}/>
        <ForminputAreatEdit valueInit={informationDataGeneral.vision} placeHolder="Vision" keyname ={`vision${informationDataGeneral.id_empresa}`}/>
        {/* <ForminputEdit valueInit={'Seciones 1'} placeHolder="sesion" keyname ={"sesion"}/> */}
        {/* {(itemselet == null)?
        
        <></>} */}
        {/* aparece cuando se a seleccionado un iten */}
        {/* {(itemselet != null)?
        <Forminput valueInit={itemselet.name} placeHolder="Tipo de Curso" keyname ={"tipcurso"}/>:
        <></>} */}
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}