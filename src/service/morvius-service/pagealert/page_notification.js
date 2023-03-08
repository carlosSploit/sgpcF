import { WarningOutlined } from "@ant-design/icons";
import React from "react";
// import { Abtngeneric } from "../../../pages/home/components/btn_generic/btn_genetic";
import "./page_notification.css";

export function Pagelistbacia(props){
    return <div className="page_alert_containt" >
        <div className="page_alet_list_bacia_alert">
            <div className="page_alet_list_bacia_alert_title">La lista esta bacia</div>
            <div style={{height: "20px"}}></div>
            <div className="page_alert_image_referent" style={{
                backgroundImage: `url('${require("../../../res/img/nohaytiempo.png")}')`
            }}></div>
            <div style={{height: "20px"}}></div>
            <div className="page_alet_list_bacia_alert_descrip">Parece ser que no se a ingresado nada o no a recargado los datos.</div>
            <div style={{height: "20px"}}></div>
            <Abtngeneric redirect={window.location.href} label={"Recargar"} />
        </div>
    </div>;

    function Abtngeneric(props){
        const {label, redirect} = props;
        return (
            <a href={redirect} className="botn">{label}</a>
        );
    }
}

export function PageMantenimiento(props){
    return <div className="page_alert_containt" >
        <div className="page_alet_mant_page">
            <div className="page_alet_list_bacia_alert_title">Pagina no accedida</div>
            <div style={{height: "20px"}}></div>
            <div className="page_alert_image_referent" style={{
                backgroundImage: `url('${require("../../../res/img/super-ada.ico")}')`
            }}></div>
            <div style={{height: "20px"}}></div>
            <div className="page_alet_list_bacia_alert_descrip">Esta Pagina no se puede acceder, ya que se encuentra en mantenimiento.</div>
            <div style={{height: "20px"}}></div>
            <Abtngeneric redirect={window.location.href.replace("/Super-ada","")} label={"Redireccionar"} />
        </div>
    </div>;

    function Abtngeneric(props){
        const {label, redirect} = props;
        return (
            <a href={redirect} className="botn">{label}</a>
        );
    }
}

export function PageResolutionIncompatible(props){

    const {Onredirect} = props;

    return(<>
        <div className="page_alert_containt_total">
            <div className="page_alert_central_container" >
                <div className="page_alert_containt" >
                    <div className="page_alet_mant_page">
                        <div style={{height: "20px"}}></div>
                        <div className="page_alet_list_bacia_alert_title">Pagina no compatible</div>
                        <div style={{height: "20px"}}></div>
                        <div className="page_alert_image_logo" style={{
                            backgroundImage: `url('${require("../../../res/img/canvaritech.png")}')`
                        }}></div>
                        <div style={{height: "20px"}}></div>
                        <div className="page_alet_list_bacia_alert_descrip">En estos momentos la pagina no es totalmente compatible con la resoluciones de celular o tablet, esta seguro de ingresar.</div>
                        <div style={{height: "20px"}}></div>
                        <Abtngeneric Onredirect={Onredirect} label={"Ingresar"} />
                        <div style={{height: "20px"}}></div>
                    </div>
                </div>
            </div>
        </div>
     </>);

    function Abtngeneric(props){
        const {label, Onredirect} = props;
        return (
            <a onClick={Onredirect} className="botn">{label}</a>
        );
    }
}

