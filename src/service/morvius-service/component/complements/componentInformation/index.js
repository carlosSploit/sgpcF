import { useState } from 'react';
import { ComponentModalFlotingBody, PopModal } from '../componentModal/componentModal';
import './index.css'
import { ForminputBotton } from '../../../form';


export function ContainerInformation(props){
    const {Informa = [
        {
            type: 'title',
            contenido: 'El valor de los activos'
        },{
            type: 'descrip',
            contenido: `Cada activo, en cada dimensión, recibe un valor de la escala V. Los activos reciben una valoración en cada una de las dimensiones de seguridad. 
            Esta valorizacion se puede dar por dos tipos de valorizacion, una valorizacion por nivel de criticida y otro por una escala de valor.`
        },{
            type: 'image',
            label: 'El valor de los activos',
            contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg'
        },{
            type: 'redirec',
            contenido: 'https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg'
        }
    ]} = props;

    return <>
        {Informa.map((item) => {
            switch (item.type) {
                case 'title': return <ContainerInformationTitle label={item.contenido} /> 
                case 'descrip': return <ContainerInformationDescrip label={item.contenido} />
                case 'image': return <ContainerInformationImage url={item.contenido} label={item.label} /> 
                case 'redirec': return <ContainerInformationRedirec url={item.contenido} /> 
                default:
                break;
            }
        })}
    </>;
}

function ContainerInformationTitle(props){
    const {label = 'El valor de los activos' } = props;

    return <>
        <div className="Informat_Container_Tile">{label}</div>
        <ContainerInformationLiner />
    </>;
}

function ContainerInformationLiner(props){
    return <div className="Informat_Container_lainer"/>;
}

function ContainerInformationDescrip(props){
    const {label = `Cada activo, en cada dimensión, recibe un valor de la escala V. Los activos reciben una valoración en cada una de las dimensiones de seguridad. 
    Esta valorizacion se puede dar por dos tipos de valorizacion, una valorizacion por nivel de criticida y otro por una escala de valor.` } = props;

    return <div className="Informat_Container_Descrip">{label}</div>;
}

function ContainerInformationImage(props){
    const {url = `https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg`, label='Image' } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);

    return <>
        <div className="Informat_Container_Image" style={{backgroundImage: `url('${url}')`}} onClick={()=>{
            setismodalvisible(!ismodalvisible)
        }} />
         <ContainerInformationRedirecModel url={url} label={label} propismodalvisible = {ismodalvisible} propsetismodalvisible = {setismodalvisible} />
    </> 
}

function ContainerInformationRedirec(props){
    const {url = `https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg` } = props;

    return <>
        <ForminputBotton label={'Mas Informacion'} onChange={()=>{
            window.open(url, '_blank');
        }}  />
    </>
}

function ContainerInformationRedirecModel(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const {propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, url = `https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg`, label='Image' } = props;
    

    return (<PopModal colorTitle={'#183152'} width={'600px'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} namemodal={label}>
        <ComponentModalFlotingBody>
            <div className='Informat_Container_Image_modal' style={{backgroundImage: `url('${url}')`}} ></div>
       </ComponentModalFlotingBody>
    </PopModal>);
}