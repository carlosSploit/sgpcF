import { useState } from "react";
import { useNotification } from "../../../../service/Notifications/NotificationProvider";
import { handleNewNotification } from "../../../../service/Notifications/useNotificacion";
import { ForminputBottonSubmit, ForminputmailEdit, ForminputpasswordEdit } from "../../../../service/morvius-service/form_input/form_input";
import { updateClientAnalistInforSecion } from "../../../../service/repository/RTclientAnalist";

export function EditarUsuarioSecion(props){

    const [propinformationDataGeneral, propsetinformationDataGeneral] = useState({
        id_usuario: 2,
        usaio: "@pedrna155",
        pass: "perrito55",
        tip_user: "C",
        id_cliente: 2,
        nombre: "Pedro Rodrigues",
        apellidos: "Guevara Castillo",
        telefono: "985796307",
        correo: "pedrna155@gmail.com",
        photo: "https://nyrevconnect.com/wp-content/uploads/2017/06/Placeholder_staff_photo-e1505825573317.png"
    });
    const {onAction, informationDataGeneral = propinformationDataGeneral, setinformationDataGeneral = propsetinformationDataGeneral} = props;
    const dispatch = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(event.target[`passC${informationDataGeneral.id_cliente}`].value != ''){
            if(event.target[`passC${informationDataGeneral.id_cliente}`].value != event.target[`pass${informationDataGeneral.id_cliente}`].value){
                handleNewNotification(dispatch,'Error. La contrasena que intenta cambiar no esta confirmada, porfavor verificar', '404');
                return
            }
        }

        let data = {
            correo : event.target[`correo${informationDataGeneral.id_cliente}`].value,
            pass : event.target[`pass${informationDataGeneral.id_cliente}`].value
        };
        let resul = await updateClientAnalistInforSecion(informationDataGeneral.id_cliente, data);
        handleNewNotification(dispatch,resul.messege, resul.status);
        setTimeout(() => {
                (async ()=>{
                    console.log(resul);
                    await onAction();
                })();
        }, 500);
    }

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
        <ForminputmailEdit valueInit={informationDataGeneral.correo} placeHolder="Correo" keyname ={`correo${informationDataGeneral.id_cliente}`}/>
        <ForminputpasswordEdit valueInit={informationDataGeneral.pass} placeHolder="Contrasena" keyname ={`pass${informationDataGeneral.id_cliente}`} keynameC ={`passC${informationDataGeneral.id_cliente}`}/>
        <div style={{height: '20px'}}></div>
        <ForminputBottonSubmit label = {'Editar'} />
        {/* <ForminputBotton label = {"Cancelar"} isInvertColor = {true} /> */}
    </form>);
}