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
                    {
                        type: 'title',
                        contenido: 'Degradación'
                    },
                    {
                        type: 'descrip',
                        contenido: `Pérdida de valor de un activo como consecuencia de la materialización de una amenaza.`
                    },
                    {
                        type: 'image',
                        label: 'Escala de degradacion',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679378601/Captura2_n5fxmn.jpg'
                    },
                    {
                        type: 'title',
                        contenido: 'Frecuencia'
                    },
                    {
                        type: 'descrip',
                        contenido: `Hace referencia a cuán probable o improbable es que se materialice la amenaza. 
                                    Haciendo referencia a que tan probable es que la amenaza pueda suceder a un activo 
                                    en un tema de tiempo.`
                    },
                    {
                        type: 'image',
                        label: 'Escala de frecuencia',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679379118/Captura3_ud8uwr.jpg'
                    },
                    {
                        type: 'title',
                        contenido: 'Impacto'
                    },
                    {
                        type: 'descrip',
                        contenido: `Es la medida del daño sobre el activo derivado de la materialización de una 
                        amenaza. Conociendo el valor de los activos (en varias dimensiones) y la degradación que causan 
                        las amenazas, es directo derivar el impacto que estas tendrían sobre el sistema. Esto se veria de 
                        la siguiente manera.`
                    },
                    {
                        type: 'image',
                        label: 'Formula del impacto',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679379544/Captura4_lqagqn.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Por otro lado este tipo de valorizacion funciona bien cuando es cuantitativo, pero cuando
                        se refiere a un enfoque cualitativo se tendra que usar una especie de mapa de calor. Por otro lado la
                        metodologia que se usa es Magerit, lo cual este no brinda un modelo de impacto compatible con nuestra 
                        valorizacion por lo cual se tuvo que proponer uno, este modelo se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Mapa de calor del impacto',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679379832/Captura5_xspb7p.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Por otro lado con respecto al mapa de calor, esto tendra que ser interpretado por medio de un mapa de likert que se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Escala del impacto',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679380732/Captura51_ayw29d.jpg'
                    },
                    {
                        type: 'title',
                        contenido: 'Riesgo'
                    },
                    {
                        type: 'descrip',
                        contenido: `Se denomina riesgo a la medida del daño probable sobre un sistema. Conociendo el impacto de 
                        las amenazas sobre los activos, es directo derivar el riesgo sin más que tener en cuenta la probabilidad 
                        de ocurrencia.`
                    },
                    {
                        type: 'image',
                        label: 'Formula del riesgo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679380231/Captura6_deayo3.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Al igual que el calculo de impacto, el tipo de valorizacion funciona bien cuando es cuantitativo, pero cuando
                        se refiere a un enfoque cualitativo se tendra que usar una especie de mapa de calor. Por otro lado la
                        metodologia que se usa es Magerit, lo cual este no brinda un modelo de riesgo compatible con nuestra 
                        valorizacion por lo cual se tuvo que proponer uno, este modelo se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Map de calor del riesgo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679380406/Captura7_abqfk9.jpg'
                    },
                    {
                        type: 'descrip',
                        contenido: `Por otro lado con respecto al mapa de calor, esto tendra que ser interpretado por medio de un mapa de likert que se veria de la siguiente manera: `
                    },
                    {
                        type: 'image',
                        label: 'Escala del riesgo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679380941/Captura61_ujvig8.jpg'
                    },
                    {
                        type: 'redirec',
                        contenido: 'https://www.ccn-cert.cni.es/documentos-publicos/1789-magerit-libro-i-metodo/file.html'
                    }
                ]} />
            </ComponentModalFlotingBody>
        </ComponentModalFloting>
    );
}