import { useState } from "react";
import './style/index.css';
import { ComponentModalFloting, ComponentModalFlotingBody, ComponentModalFlotingHeader } from "../../../../../../service/morvius-service/components";
import { ContainerInformation } from "../../../../../../service/morvius-service/component/complements/componentInformation";

export function InformationProcesCriti(props){

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
                        contenido: 'Criticidad de un Proceso'
                    },
                    {
                        type: 'descrip',
                        contenido: `En este caso, para poder calcular la criticidad de un proceso se debe entender que en realidad no es un calculo como tal, sino que a partir de la valorizacion de las amenazas se tomara la mayor valorizacion. A partir de hay se repetira el mimsmo proceso con respecto que la maxima valorizacion de una amenaza de un activo se traduce a la criticidad de este, igualmente con la version de analisis donde la mayor criticidad de un activo es la criticidad maxima de la version. Posteriormente se debe tener en cuenta tambien que esta cricidad de la version es la criticidad del procesos, teniendo en consideracion que dicha criticidad esta basado en la escala de nivel de riesgo de la valorizacion  de una amenaza. Por otro lado, con respecto a la escala, es la siguiente:`
                    },
                    {
                        type: 'image',
                        label: 'Map de calor del riesgo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679380406/Captura7_abqfk9.jpg'
                    },
                    {
                        type: 'image',
                        label: 'Escala del riesgo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679380941/Captura61_ujvig8.jpg'
                    }
                ]} />
            </ComponentModalFlotingBody>
        </ComponentModalFloting>
    );
}