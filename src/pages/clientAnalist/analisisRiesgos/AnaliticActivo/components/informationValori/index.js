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
                        contenido: 'Valorizacion del Activo'
                    },
                    {
                        type: 'descrip',
                        contenido: `Cada activo, en cada dimensión, recibe un valor de la escala V. Los activos reciben una valoración en cada una de las dimensiones de seguridad. `
                    },
                    {
                        type: 'image',
                        label: 'Nivel de critisidad de un activo',
                        contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg'
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