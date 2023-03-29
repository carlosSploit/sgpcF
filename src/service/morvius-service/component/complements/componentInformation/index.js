import { useEffect, useRef, useState } from 'react';
import { ComponentModalFlotingBody, PopModal } from '../componentModal/componentModal';
import './index.css'
import { ForminputBotton } from '../../../form';
import { AiOutlineExpandAlt } from 'react-icons/ai';


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
                case 'image': return <ContainerInformationImage url={item.contenido} label={item.label} width={(item.width == undefined)?'calc(100% - 20px)': item.width} /> 
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
        <div style={{height: '15px'}}></div>
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
    const {url = `https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg`, label='Image', width= 'calc(100% - 20px)' } = props;
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [isSelecteContent, setisSelecteContent] = useState(false);
    const [itemSizeCont , setitemSizeContt] = useState({
        w: 10,
        h: 10
    });
    // const [promedHigth, setpromedHigth] = useState('10');
    const refImage = useRef();
    const refContainImage = useRef();
    const refContainImage2 = useRef();

    useEffect(()=>{
        var containImage = refContainImage.current.offsetWidth;
        var altoOriginal = refImage.current.naturalHeight;
        var anchoOriginal = refImage.current.naturalWidth;
        var promed = ((altoOriginal * 100)/ anchoOriginal) / 100;
        refContainImage.current.style.height = `${(containImage * promed)}px` 
        setitemSizeContt({
            h: `${(containImage * promed)}px`,
            w: `${(containImage)}px`
        });
    },[])

    return <>
        <div className='Informat_Container_Image_master'
            onMouseLeave = {(item)=>{
                setisSelecteContent(false);
            }} onMouseEnter = {(item)=>{
                setisSelecteContent(true);
            }} onClick={()=>{
                setismodalvisible(!ismodalvisible)
            }}>
            <div ref={refContainImage} className="Informat_Container_Image" style={{width: `${width}` ,backgroundImage: `url('${url}')`}}  />
            {(isSelecteContent)?<div ref={refContainImage2} className="Informat_Container_Image_shadow" style={{width: `${itemSizeCont.w}`, height: `${itemSizeCont.h}`}} >
                <AiOutlineExpandAlt style={{fontSize: `50px`, color: 'white'}} />
            </div>:<></>}
        </div>
        <img ref={refImage} src={url} style={{display: 'none'}} />
        {(ismodalvisible)?<ContainerInformationRedirecModel url={url} label={label} propismodalvisible = {ismodalvisible} propsetismodalvisible = {setismodalvisible} />:<></>}
    </> 
}

function ContainerInformationRedirec(props){
    const {url = `https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg` } = props;

    return <>
        <div style={{height: '10px'}} />
        <ForminputBotton label={'Mas Informacion'} onChange={()=>{
            window.open(url, '_blank');
        }}  />
    </>
}

function ContainerInformationRedirecModel(props){
    const [ismodalvisible, setismodalvisible] = useState(false);
    const {propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, url = `https://res.cloudinary.com/canvarith/image/upload/v1679375704/Captura_pbcxlc.jpg`, label='Image' } = props;
    const refImage = useRef();
    const refContainImage = useRef();

    useEffect(()=>{
        var containImage = refContainImage.current.offsetWidth;
        var altoOriginal = refImage.current.naturalHeight;
        var anchoOriginal = refImage.current.naturalWidth;
        var promed = ((altoOriginal * 100)/ anchoOriginal) / 100;
        refContainImage.current.style.height = `${(containImage * promed)}px` 
    },[])

    return (<PopModal colorTitle={'#183152'} width={'800px'} propismodalvisible = {propismodalvisible} propsetismodalvisible = {propsetismodalvisible} namemodal={label}>
        <ComponentModalFlotingBody>
            <div ref={refContainImage} className='Informat_Container_Image_modal' style={{backgroundImage: `url('${url}')`}} ></div>
            <img ref={refImage} src={url} style={{display: 'none'}} />
       </ComponentModalFlotingBody>
    </PopModal>);
}