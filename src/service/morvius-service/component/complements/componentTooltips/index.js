import { useEffect, useRef, useState } from "react";
import './index.css';
// import useScreenSize from "../../../../hooks/resolution.hooks";

export function ComponentToolTips (props) {
    const {children, id='id', messege='generico', size= {
        w: 300,
        h: 90
    }, asling = 'rigth'} = props;
    const [isSelecteContent, setisSelecteContent] = useState(false);
    // const [itemMaster , setitemMaster] = useState({
    //     w: 10,
    //     h: 10
    // });
    const [itemSizeCont , setitemSizeContt] = useState(size);
    const [itemposition , setitemposition] = useState({
        x: 10,
        y: 10
    });
    // const sizeMirror = useScreenSize();
    const refContainer = useRef();
    // const refContaiTooltips = useRef();

    useEffect(()=>{
        // se captura la informaciond el tamano
        // const altoOriginal = refContainer.current.querySelectorAll('div')[0].clientHeight
        const anchoOriginal = refContainer.current.querySelectorAll('div')[0].clientWidth
        // se captura la posicion 
        const x = refContainer.current.querySelectorAll('div')[0].getBoundingClientRect().x
        const y = refContainer.current.querySelectorAll('div')[0].getBoundingClientRect().y
        // var altoOriginal2 = refContainer.current.clientHeight;
        // setitemMaster({
        //     h: refContainer.current.clientHeight,
        //     w: refContainer.current.clientWidth
        // })
        // calculo de la pocicion 
        let posx = 0
        switch (asling) {
            case 'rigth':
                posx = (x - (itemSizeCont.w - anchoOriginal))
            break;
            case 'center':
                posx = (x - ((itemSizeCont.w / 2) - (anchoOriginal / 2)))
            break;
            default:
                break;
        }
        // 12 hace referencia al padding que se le esta otorgando, 5 es un espacio entre el tooltip y el item 
        setitemposition({
            x: posx,
            y: y - itemSizeCont.h - 5 - (12)
        })
    },[])

    return (
        <>
            <div ref={refContainer} onMouseLeave = {(item)=>{
                setisSelecteContent(false);
            }} onMouseEnter = {(item)=>{
                setisSelecteContent(true);
            }} className="ComponentToolTips_container">
                {children}
                <div id={`tooltipInteaction${id}`} className="ComponentToolTips_container_tooltips" style={{display: `${(isSelecteContent)?'flex':'none'}`, width: `${itemSizeCont.w}px`, height:`${itemSizeCont.h}px`, top: `${itemposition.y}px`, left: `${itemposition.x}px`}}>
                    {messege}
                </div>
            </div>

        </>
    );
}