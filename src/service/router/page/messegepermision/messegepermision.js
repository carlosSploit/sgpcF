import { ComponentBotton } from '../../../morvius-service/components';
import './messegepermision.css'

export function MessegePermision(props){
    return(<div className="messe_permi_Container">
        <div className="messe_permi_Container_subcontent">
            <div className='messe_permi_Container_subcontent_title'>Oops !</div>
            <div style={{height: '5px'}} />
            <div className='messe_permi_Container_subcontent_subtitle'>AUTHENTICATION ERROR</div>
            <div style={{height: '5px'}} />
            <div className="messe_permi_Container_subcontent_text">No tienes permisos de acceso, o tu cuenta no es de esta clase, o no has iniciado secion</div>
            <div style={{height: '25px'}} />
            <ComponentBotton label="Regresar a la pagina principal" onChange = {() => {
                // window.location.href = window.location.origin;
                window.history.back();
            }} />
        </div>
    </div>);
}