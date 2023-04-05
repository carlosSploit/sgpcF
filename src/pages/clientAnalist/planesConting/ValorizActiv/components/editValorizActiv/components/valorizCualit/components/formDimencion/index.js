import { useEffect, useState } from "react";
import './index.css';
import { ForminputComboBox, ForminputRadioSlice } from "../../../../../../../../../../service/morvius-service/form";
import { ForminputSelectItemFilter } from "../../../../../../../../../../service/morvius-service/form_input/complements/forminputSelectItemFilter/ForminputSelectItem";
import { getTipocritervalor } from "../../../../../../../../../../service/repository/RTTipoEscaleVal";
import { getcriteriosValori } from "../../../../../../../../../../service/repository/RTTEscaleVal";
import { InfoOutlined } from "@ant-design/icons";
// import { ForminputComboBoxEdit } from "../../../../../../../../../../service/morvius-service/form_input/form_input";

export function FormDimension (props){
    const [propinformationData,setpropinformationData] = useState({
        "id_dimension" : 1,
        "labeDimension" : 'Disponibilidad',
        "descripccio": '',
        "valorAcivCualit" : -1,
        "id_varlotActivCualit" : -1,
        "tipValoActivDimen" : "N"
    });
    // encabezados
    let {
        keyname = 'selectdimen',
        valueInit = {
            "id_dimension" : 1,
            "labeDimension" : 'Disponibilidad',
            "descripccio": '',
            "valorAcivCualit" : -1,
            "id_varlotActivCualit" : -1,
            "tipValoActivDimen" : "N"
        }
    } = props;
    // lista de la escala de valorizacion
    const [textvaloriOpccion, settvaloriOpccion] = useState(0)
    const [listtvaloriOpccion, setlisttvaloriOpccion] = useState([]);
    const [listtvaloriOpccionFilter, setlisttvaloriOpccionFilter] = useState([]);
    // estados del componentes
    const [textTipoProc, settextTipoProc] = useState(0)
    const [listTipoProc, setlistTipoProc] = useState([
        {id_nivelCrit:1, labelCrit:'Despresiable - 0'},
        {id_nivelCrit:2, labelCrit:'Bajo - 1'},
        {id_nivelCrit:3, labelCrit:'Bajo - 2'},
        {id_nivelCrit:4, labelCrit:'Medio - 3'},
        {id_nivelCrit:5, labelCrit:'Medio - 4'},
        {id_nivelCrit:6, labelCrit:'Medio - 5'},
        {id_nivelCrit:7, labelCrit:'Alto - 6'},
        {id_nivelCrit:8, labelCrit:'Alto - 7'},
        {id_nivelCrit:8, labelCrit:'Alto - 8'},
        {id_nivelCrit:9, labelCrit:'Muy Alto - 9'},
        {id_nivelCrit:10, labelCrit:'Muy Alto - 10'},
    ]);
    const [textinformationData,settextinformationData] = useState('');
    const [valuestadeInformation,setvaluestadeInformation] = useState(false);
    const [valuestade,setvaluestade] = useState(false);
    const [valuestadeOptions,setvaluestadeOptios] = useState(false);

    useEffect(()=>{
        (async()=>{
            setpropinformationData(valueInit);
            settextinformationData(JSON.stringify(valueInit));
            if((parseInt(valueInit.id_varlotActivCualit) !== -1) && (parseInt(valueInit.valorAcivCualit) !== -1)) {
                // inicializa los datos de interaccion
                setvaluestade((parseInt(valueInit.valorAcivCualit) !== -1))
                setvaluestadeOptios(((valueInit.tipValoActivDimen + '') !== 'N'))
                // inicializa los datos de interaccion de los selectores
                if ((valueInit.tipValoActivDimen + '') !== 'N') {
                    console.log(valueInit.id_varlotActivCualit)
                    settvaloriOpccion(valueInit.id_varlotActivCualit)
                } else {
                    const listItemPares  = listTipoProc.filter((item)=>{
                        const listdataInfo = item.labelCrit.split(' - ')
                        return (parseInt(listdataInfo[listdataInfo.length - 1]) === parseInt(valueInit.valorAcivCualit))
                    })
                    settextTipoProc(listItemPares[0].id_nivelCrit)
                }
            }
            // inicializar los tipos de escalas de activos
            const Listresult = await getTipocritervalor();
            const lisMapResulTipCrit = Listresult.map((item)=>{
                return {
                    id: item.id_tipoCriterValor,
                    name: item.nombreTipCrit
                }
            })
            lisMapResulTipCrit.unshift({
                id: 0,
                name: 'Todo'
            })
            setlisttvaloriOpccionFilter(lisMapResulTipCrit)
            // inicializar los de escalas de activos
            const Listresultesc = await getcriteriosValori();
            const lisMapResulEsc = Listresultesc.map((item)=>{
                return {
                    id: item.id_criteriosValor,
                    name: item.descripcCriterio,
                    descr: item.valori,
                    keyfilter: item.id_tipoCriterValor
                }
            })
            setlisttvaloriOpccion(lisMapResulEsc)
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
                            {(propinformationData.valorAcivCualit === -1)?'0':propinformationData.valorAcivCualit}
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
                        <div className="form_dimenicon_subconteiner_body">
                            <div className="form_dimenicon_subconteiner_body_title">Preguntas de la Dimension</div>
                            <div className="form_dimenicon_subconteiner_body_subtitle">{propinformationData.descripccio}</div>
                        </div>
                    </>:
                    <></>}
                    {(valuestade)?
                    <>
                        <div className="form_dimenicon_subconteiner_lainer"></div>
                        <div className="form_dimenicon_subconteiner_body">
                            <ForminputRadioSlice keyname={'asjdklasj'} valueInit={valuestadeOptions} checkradio = {valuestadeOptions} setcheckradio = {setvaluestadeOptios} label={'La valorizacion se ara con escala'} onChangeinput={(stade)=>{
                                setvaluestadeOptios(stade)
                                let dataObj = {...propinformationData}
                                dataObj['id_varlotActivCualit'] = 0;
                                dataObj['tipValoActivDimen'] = (stade)?'C':'N';
                                setpropinformationData(dataObj)
                                settextinformationData(JSON.stringify(dataObj))
                            }} />
                            {(valuestadeOptions)?
                            <div className="form_dimenicon_subconteiner_body_opccion">
                                {/*  */}
                                {(parseInt(listtvaloriOpccion.length) !== 0)?
                                <ForminputSelectItemFilter onChangeinput={(item)=>{
                                        let dataObj = {...propinformationData}
                                        dataObj['valorAcivCualit'] = item.descr;
                                        dataObj['id_varlotActivCualit'] = item.id;
                                        dataObj['tipValoActivDimen'] = 'C';
                                        setpropinformationData(dataObj)
                                        settextinformationData(JSON.stringify(dataObj))
                                        settvaloriOpccion(item.id)
                                    }} 
                                    valueInit = {textvaloriOpccion}
                                    isVisibleDescri={true} 
                                    checkbox={textvaloriOpccion} 
                                    setcheckbox={settvaloriOpccion} 
                                    listaObj={listtvaloriOpccion} 
                                    setlistaObj={setlisttvaloriOpccion} 
                                    listFilter={listtvaloriOpccionFilter} 
                                    setlistFilter={setlisttvaloriOpccionFilter} >    
                                </ForminputSelectItemFilter>:<></>}
                            </div>:
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
                                        dataObj['valorAcivCualit'] = parseInt(json.label.split(' - ')[1]);
                                        dataObj['id_varlotActivCualit'] = 0;
                                        dataObj['tipValoActivDimen'] = 'N';
                                        setpropinformationData(dataObj)
                                        settextinformationData(JSON.stringify(dataObj))
                                    }}
                                // onChangeinput = {(jsonval)=>{ settextTipoProc(jsonval.value)}} 
                                />:<></>}
                            </div>
                            }
                        </div>
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