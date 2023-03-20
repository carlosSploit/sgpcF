import { useEffect, useState } from "react";
import './index.css';
import { ForminputComboBox, ForminputRadioSlice } from "../../../../../../../../../../service/morvius-service/form";
// import { ForminputSelectItemFilter } from "../../../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemFilter/ForminputSelectItem";
// import { getTipocritervalor } from "../../../../../../../../../../service/repository/RTTipoEscaleVal";
// import { getcriteriosValori } from "../../../../../../../../../../service/repository/RTTEscaleVal";
import { InfoOutlined } from "@ant-design/icons";
// import { ForminputComboBoxEdit } from "../../../../../../../../../../service/morvius-service/form_input/form_input";

export function FormDimension (props){
    const [propinformationData,setpropinformationData] = useState({
        "id_dimension" : 1,
        "labeDimension" : 'Disponibilidad',
        "descripccio": '',
        "valorDegrad" : -1
    });
    // encabezados
    let {
        keyname = 'selectdimen',
        valueInit = {
            "id_dimension" : 1,
            "labeDimension" : 'Disponibilidad',
            "descripccio": '',
            "valorDegrad" : -1
        }
    } = props;
    const [textTipoProc, settextTipoProc] = useState(0)
    const [listTipoProc, setlistTipoProc] = useState([
        {id_nivelCrit:1, labelCrit:'Despresiable - 0'},
        {id_nivelCrit:2, labelCrit:'Bajo - 10'},
        {id_nivelCrit:3, labelCrit:'Bajo - 20'},
        {id_nivelCrit:4, labelCrit:'Medio - 30'},
        {id_nivelCrit:5, labelCrit:'Medio - 40'},
        {id_nivelCrit:6, labelCrit:'Medio - 50'},
        {id_nivelCrit:7, labelCrit:'Alto - 60'},
        {id_nivelCrit:8, labelCrit:'Alto - 70'},
        {id_nivelCrit:8, labelCrit:'Alto - 80'},
        {id_nivelCrit:9, labelCrit:'Muy Alto - 90'},
        {id_nivelCrit:10, labelCrit:'Muy Alto - 100'},
    ]);
    const [textinformationData,settextinformationData] = useState('');
    const [valuestadeInformation,setvaluestadeInformation] = useState(false);
    const [valuestade,setvaluestade] = useState(false);
    // const [valuestadeOptions,setvaluestadeOptios] = useState(false);

    useEffect(()=>{
        (async()=>{
            setpropinformationData(valueInit);
            settextinformationData(JSON.stringify(valueInit));
            console.log(valueInit)
            if((parseInt(valueInit.valorDegrad) !== -1)) {
                // inicializa los datos de interaccion
                setvaluestade((parseInt(valueInit.valorDegrad) !== -1))
                // inicializa los datos de interaccion de los selectores
                const listItemPares  = listTipoProc.filter((item)=>{
                    const listdataInfo = item.labelCrit.split(' - ')
                    return (parseInt(listdataInfo[listdataInfo.length - 1]) === parseInt(valueInit.valorDegrad))
                })
                settextTipoProc(listItemPares[0].id_nivelCrit)
            }
        })();
    },[]);

    return (
        <>
            {/* <div style={{height: "5px"}}/> */}
            <div className="form_dimenicon_conteiner">
                <div className="form_dimenicon_subconteiner">
                    <div className="form_dimenicon_subconteiner_header">
                        <ForminputRadioSlice keyname={'jkaksjd'} valueInit={valuestade} checkradio = {valuestade} setcheckradio = {setvaluestade} label={propinformationData.labeDimension} onChangeinput={(stade)=>{
                            setvaluestade(stade)
                            setpropinformationData(valueInit)
                            settextinformationData(JSON.stringify(valueInit))
                        }} />
                        <div className="form_dimenicon_subconteiner_header_value">
                            {(propinformationData.valorDegrad === -1)?'0':propinformationData.valorDegrad}
                        </div>
                        <div className="form_dimenicon_subconteiner_header_Information" onClick={()=>{
                            setvaluestadeInformation(!valuestadeInformation)
                        }}>
                            <InfoOutlined className="form_dimenicon_subconteiner_header_Information_icon" />
                        </div>
                    </div>
                    {(valuestadeInformation)?
                    <>
                        <div className="form_dimenicon_subconteiner_lainer"></div>
                        <div style={{height: '5px'}}/>
                        <div className="form_dimenicon_subconteiner_body">
                            <div className="form_dimenicon_subconteiner_body_title">Preguntas de la Dimension</div>
                            <div className="form_dimenicon_subconteiner_body_subtitle">{propinformationData.descripccio}</div>
                        </div>
                        <div style={{height: '5px'}}/>
                    </>:
                    <></>}
                    {(valuestade)?
                    <>
                        <div className="form_dimenicon_subconteiner_lainer"></div>
                        <div style={{height: '5px'}}/>
                        <div className="form_dimenicon_subconteiner_body">
                            <div className="form_dimenicon_subconteiner_body_opccion">
                                {(listTipoProc.length != 0)?<ForminputComboBox
                                    setpropdatacombo = {setlistTipoProc}
                                    indexinput = {textTipoProc}
                                    setindexinput = {settextTipoProc} 
                                    keyname={`tipros${propinformationData.id_dimension}`} 
                                    isInvert={true} 
                                    isdefault={true}
                                    valueInit={textTipoProc}
                                    width={100} 
                                    height={28}
                                    keyvalue={'id_nivelCrit'} 
                                    keylabel={'labelCrit'} 
                                    datacombo={listTipoProc} 
                                    placeHolder = {'Escala de Valorizacion'}
                                    onChangeinput = {(json) => {
                                        let dataObj = {...propinformationData}
                                        dataObj['valorDegrad'] = parseInt(json.label.split(' - ')[1]);
                                        setpropinformationData(dataObj)
                                        settextinformationData(JSON.stringify(dataObj))
                                    }}
                                // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
                                />:<></>}
                            </div>
                        </div>
                        <div style={{height: '5px'}}/>
                    </>:
                    <></>}
                </div>
            </div>
            <input
                style={{display: "none"}}
                type="text"
                id={`${keyname}`}
                name={`${keyname}`}
                value={`${textinformationData}`}
            />
        </>
    );
}