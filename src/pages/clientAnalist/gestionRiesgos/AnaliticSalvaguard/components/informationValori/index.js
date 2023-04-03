import { useState } from "react";
import './style/index.css';
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { ContainerInformation } from "../../../../../../service/morvius-service/component/complements/componentInformation";

export function InformationValori(props){

    const [propismodalvisible,propsetismodalvisible ] = useState(false);
    const { // id de la amenaza que se decea enlazar
        ismodalvisible = propismodalvisible,
        setismodalvisible = propsetismodalvisible
    } = props;
    

    return (
        <ComponentModalFloting statemode={ismodalvisible} width = {'400px'} >
            <ComponentModalFlotingHeader title="Informacion de Valorizacion" colorTitle={'#183152'} onClosechange={()=>{setismodalvisible(false);}} />
            <ComponentModalFlotingBody descripccion={''}>
                <div style={{height: '10px'}}></div>
                <ContainerInformation Informa = {[
                    // informacion de la degradacion residual
                    {
                        type: 'title',
                        contenido: 'Degradación Residual'
                    },
                    {
                        type: 'descrip',
                        contenido: `Hace referencia al residuo que deja la eficacia al afectar a la degradacion de la amenaza. 
                        Esta eficacia es representada en formato de porcentaje, lo cual se tendra que normalizar o sacar su residuo 
                        por medio de la resta del 1 (que hace referencia al 100%) y el porcenje de la eficacia en formato decimal. 
                        Por otro lado para poder extraer la degradacion residual, se tendra que multiplicar la degradacion anterior 
                        por la eficacia. Esta formula se veria de la siguiente manera:`
                    },
                    {
                        type: 'image',
                        label: 'Formula de degradacion residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680051067/Captura8_jjousa.jpg',
                        width: '200px'
                    },
                    {
                        type: 'descrip',
                        contenido: `Teniendo en cuenta el calculo de la degradacion residual, se debe considerar que dicho resultado se debe 
                        identificar o interpretar por medio de un mapa de calor, lo cual dicha escala se veria de la siguiente manera:`
                    },
                    {
                        type: 'image',
                        label: 'Mapa de calor de degradacion residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680051784/Captura9_iegufs.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Por otro lado con respecto al mapa de calor, esto tendra que ser interpretado por medio de un mapa de likert que se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Escala de degradacion residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680056578/Captura91_fvglxl.jpg'
                    },
                    // informacion de la frecuencia residual
                    {
                        type: 'title',
                        contenido: 'Frecuencia Residual'
                    },
                    {
                        type: 'descrip',
                        contenido: `Hace referencia al residuo que deja la eficacia al afectar a la frecuencia de la amenaza. 
                        Se debe considerar que el residulo con respecto a la eficacia se calcula de la misma manera que la degradacion. 
                        Por otro lado para poder extraer la frecuencia residual, se tendra que multiplicar la frecuencia anterior 
                        por la eficacia. Esta formula se veria de la siguiente manera:`
                    },
                    {
                        type: 'image',
                        label: 'Formula de frecuencia residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680052380/Captura10_ox09lr.jpg',
                        width: '200px'
                    },
                    {
                        type: 'descrip',
                        contenido: `Teniendo en cuenta el calculo de la frecuencia residual, se debe considerar que dicho resultado se debe 
                        identificar o interpretar por medio de un mapa de calor, lo cual dicha escala se veria de la siguiente manera:`
                    },
                    {
                        type: 'image',
                        label: 'Mapa de calor de frecuencia residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680052506/Captura11_bmvgpn.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Por otro lado con respecto al mapa de calor, esto tendra que ser interpretado por medio de un mapa de likert que se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Escala de frecuencia residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680057400/Captura111_x1lnew.jpg'
                    },
                    // informacion de la impacto residual
                    {
                        type: 'title',
                        contenido: 'Impacto Residual'
                    },
                    {
                        type: 'descrip',
                        contenido: `El impacto residual es calculado por medio de una formula, que es la multiplicacion de la degradacion 
                        residual y el nivel de riesgo de la amenaza, teniendo en cuenta que antes de realizar esa multiplicacion, tiene que dace
                        una normalizacion de la degradacion residual para poder colocarlo en formato de porcentajes, esta dicha normalizacion consiste
                        en la multiplicacion de este por 10, luego se le da un redondeo y finalmente se multiplica con 10, teniendo en cuenta esto la 
                        formula se veria de la siguiente manera:`
                    },
                    {
                        type: 'image',
                        label: 'Formula del impacto residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680054368/Captura12_h9gg2r.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Teniendo en cuenta el calculo de la impacto residual, se debe considerar que dicho resultado se debe 
                        identificar o interpretar por medio de un mapa de calor, lo cual dicha escala se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Mapa de calor del impacto residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680062257/Captura14_vmlksr.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Por otro lado con respecto al mapa de calor, esto tendra que ser interpretado por medio de un mapa de likert que se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Escala de impacto residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680061973/Captura13_qizxco.jpg'
                    },
                    // informacion de la riesgo residual
                    {
                        type: 'title',
                        contenido: 'Riesgo Residual'
                    },
                    {
                        type: 'descrip',
                        contenido: `El riesgo residual es calculado por medio de una formula, que es la multiplicacion del impacto 
                        residual y la frecuencia residual, por esto la formula se veria de la siguiente manera:`
                    },
                    {
                        type: 'image',
                        label: 'Formula del riesgo residual',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680077736/Captura15_odsj94.jpg',
                        width: '200px'
                    },
                    {
                        type: 'descrip',
                        contenido: `Teniendo en cuenta el calculo de la riesgo residual, se debe considerar que dicho resultado se debe 
                        identificar o interpretar por medio de un mapa de calor, lo cual dicha escala se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Map de calor del riesgo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680078048/Captura16_almulo.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Por otro lado con respecto al mapa de calor, esto tendra que ser interpretado por medio de un mapa de likert que se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Escala del riesgo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1680078131/Captura17_oqw5c1.jpg'
                    },
                    {
                        type: 'redirec',
                        contenido: 'https://www.ccn-cert.cni.es/documentos-publicos/1789-magerit-libro-i-metodo/file.html'
                    }
                ]} />
                <div style={{height: '10px'}}></div>
            </ComponentModalFlotingBody>
        </ComponentModalFloting>
    );
}