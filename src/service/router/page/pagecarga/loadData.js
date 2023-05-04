import './loadData.css'

export function LoadData(props){
    return(<div className="load_data_Container">
        <div className="load_data_Container_subcontent">
            <div className="load_data_Container_subcontent_foto"></div>
            <div className='lds-ring'>
                <div></div>
            </div>
        </div>
    </div>);
}


export function CargarInformation(props){
    const {
        height = 80, width = 80, color = '#375D81', borderwidth = 8
    } = props;

    return (<div className='lds-ring' style={{ width: `${width}px`, height: `${height}px` }} >
        <div style={{ width: `${(width - (width * 0.2))}px`, height: `${(height - (height * 0.2))}px`, border: `${borderwidth}px solid ${color}`, borderColor: `${color} transparent transparent transparent` }}></div>
    </div>);
}