import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import './style/index.css';
import { ItemMDInsidensAmenas } from "./components/itemInsidencias";
import { ItemPCSalvaguarEmpresa } from "./components/itemPCActivoEmpresa copy";

export function EditarValorActivCuantiImformation(props){

    const [propinformationDataGeneral, ] = useState({
        "id_afectaActiv": 20,
        "id_activProsVerAnali": 37,
        "valoriActivCuanti": 2000,
        "valoriActivCualiti": 6,
        "id_valorAfectAmen": 3,
        "id_Frecuencia": 1,
        "valorFrecuenCuali": 5,
        "valorFrecuenCuanti": 100,
        "nameFrecuencia": "Muy frecuente",
        "valDegradCualit": 90,
        "id_DegradCualit": 1,
        "valImpacCualit": 5,
        "valImpacCuanti": 1800,
        "valRiesgoCualit": 27,
        "valRiesgoCuanti": 180000,
        "id_amenaza": 39,
        "esenario": "Cuando a el navegador web le injectan un virus por descargar archivos maliciososos.",
        "abrebamen": "A.8",
        "nombreAmena": "Difusión de software dañino",
        "descripc": "propagación intencionada de virus",
        "id_tipoActiv": 4,
        "abreb": "A",
        "nombreTipoActiv": "Ataques intencionados",
        "insidenAline": [],
        "salvagAfect": [
          {
            "id_salvAfectAct": 9,
            "id_afectaActiv": 20,
            "id_salvaguarda": 2,
            "id_activProsVerAnali": 37,
            "id_escalEficDegr": 0,
            "valEficDegr": 0,
            "id_escalEficFrec": 0,
            "valEficFrec": 0,
            "id_escalEficImpac": 0,
            "valEficImpac": 0,
            "valDegraResidCuali": null,
            "id_escalDegradResidCuali": null,
            "valEscalFrecuenResidCuanti": 0,
            "valEscalFrecuenResidCuali": null,
            "id_escalFrecuenResid": null,
            "valImpactResidCuanti": 0,
            "valRiesgResidCuanti": 0,
            "id_empresa": 1,
            "abrebsalv": "H.IA",
            "descripc": "Identificación y autenticación",
            "id_control": 12,
            "codeDepende": "6.2",
            "DescripccionControl": "Dispositivos para movilidad y teletrabajo",
            "extrategia": "cdfsfdsfsdfsdfsd",
            "responSalvagu": [],
            "recursSalvagu": []
          },
          {
            "id_salvAfectAct": 17,
            "id_afectaActiv": 20,
            "id_salvaguarda": 11,
            "id_activProsVerAnali": 37,
            "id_escalEficDegr": 1,
            "valEficDegr": 90,
            "id_escalEficFrec": 3,
            "valEficFrec": 40,
            "id_escalEficImpac": 1,
            "valEficImpac": 40,
            "valDegraResidCuali": 0.07,
            "id_escalDegradResidCuali": 5,
            "valEscalFrecuenResidCuanti": 6,
            "valEscalFrecuenResidCuali": 2.4,
            "id_escalFrecuenResid": 3,
            "valImpactResidCuanti": 1080,
            "valRiesgResidCuanti": 6480,
            "id_empresa": 1,
            "abrebsalv": "H.tools.TM",
            "descripc": "Herramienta de monitorización de tráfico",
            "id_control": 12,
            "codeDepende": "6.2",
            "DescripccionControl": "Dispositivos para movilidad y teletrabajo",
            "extrategia": "ghhsga dhsgjdas dhasgdasd ashdgas hgdhg   hgjhg hjsgd hgash dgasdas h dsahdas hdgashd sghdg ashdgash",
            "valImpactResidCuali": 0.4,
            "valRiesgResidCuali": 2,
            "responSalvagu": [
              {
                "id_responSalvAfectAct": 5,
                "id_salvAfectAct": 17,
                "id_trabajador": 3,
                "nombre_apellido": "Luis enrique morocho",
                "cargo": "Jefa de recursos humanos",
                "codTrabajo": "cod-23674382647"
              },
              {
                "id_responSalvAfectAct": 6,
                "id_salvAfectAct": 17,
                "id_trabajador": 2,
                "nombre_apellido": "Carlos Arturo Guevara Ernandes guerrero",
                "cargo": "Jefe Contable",
                "codTrabajo": "cod-23674382647"
              }
            ],
            "recursSalvagu": [
              {
                "id_recurSalvAfectAct": 9,
                "id_salvAfectAct": 17,
                "nombreRecurSalvAfect": "Pc de escritorio",
                "descripc": "sadkjaskldjsaklds aksajd klasj dkasldj askld jaskldj kslajdklas dklsaj dklasjd klsad askldj askld jaskldj skldj asklj daslkdj skladj klasjdakl",
                "presioRecurSalvAfect": 2000,
                "estade": 1
              },
              {
                "id_recurSalvAfectAct": 10,
                "id_salvAfectAct": 17,
                "nombreRecurSalvAfect": "monden  de movistar",
                "descripc": "shadjkashdjk asjdh asjkdh jaskhd asjkhd jkasdh jaskdh asjkdh asjkhdash dsjkah dasjh dkashdjas dhkajsdh jkash dsjka dhasjk",
                "presioRecurSalvAfect": 3000,
                "estade": 1
              }
            ]
          },
          {
            "id_salvAfectAct": 18,
            "id_afectaActiv": 20,
            "id_salvaguarda": 4,
            "id_activProsVerAnali": 37,
            "id_escalEficDegr": 0,
            "valEficDegr": 0,
            "id_escalEficFrec": 0,
            "valEficFrec": 0,
            "id_escalEficImpac": 0,
            "valEficImpac": 0,
            "valDegraResidCuali": null,
            "id_escalDegradResidCuali": null,
            "valEscalFrecuenResidCuanti": 0,
            "valEscalFrecuenResidCuali": null,
            "id_escalFrecuenResid": null,
            "valImpactResidCuanti": 0,
            "valRiesgResidCuanti": 0,
            "id_empresa": 1,
            "abrebsalv": "H.ST",
            "descripc": "Segregación de tareas",
            "id_control": 12,
            "codeDepende": "6.2",
            "DescripccionControl": "Dispositivos para movilidad y teletrabajo",
            "extrategia": "Ser uno de los mejores",
            "responSalvagu": [],
            "recursSalvagu": []
          }
        ]
      });
    const {onAction, informationDataGeneral = propinformationDataGeneral} = props;
    const [DataFrecuend ,] = useState([
        {
            key : 1,
            code: 'MB',
            label: 'Muy poco frecuente',
            valor : 1,
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'PP',
            label: 'Poco frecuente',
            valor : 2,
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'P',
            label: 'Posible',
            valor : 3,
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'F',
            label: 'Frecuente',
            valor : 4,
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MF',
            label: 'Muy frecuente',
            valor : 5,
            color: '#FF5252'
        }
    ]);

    const [DataImpacto,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '1 - 2',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '3 - 5',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '6 - 8',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '9 - 10',
            color: '#FF5252'
        }
    ]);

    const [DataRiesgo,] = useState([
        {
            key : 1,
            code: 'C',
            label: 'Controlable',
            range: '0 - 0',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'A',
            label: 'Aceptable',
            range: '1 - 5',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'T',
            label: 'Tolerable',
            range: '6 - 16',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'I',
            label: 'Intolerable',
            range: '17 - 30',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'E',
            label: 'Extremo',
            range: '31 - 50',
            color: '#FF5252'
        }
    ]);

    useEffect(()=>{
        (async () => {
            console.log(informationDataGeneral)
        })();
    },[]);

    const labelStadeFrecuenCualiti = (idFrecuen) => {
        if (idFrecuen == '??') return idFrecuen
        const listData = DataFrecuend.filter((item)=>{
            return parseInt(item.valor) === parseInt(idFrecuen)
        })
        if (listData.length === 0) return 'MB'
        return listData[0].code + ' - ' + listData[0].label
    }

    const labelStadeImpactCualiti = (ValCualiti) => {
        if (ValCualiti == '??') return ValCualiti
        const listData = DataImpacto.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

    const labelStadeRiesgCualiti = (ValCualiti) => {
        if (ValCualiti == '??') return ValCualiti
        const listData = DataRiesgo.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return 'C'
        return listData[0].code + ' - ' + listData[0].label
    }

    const colorStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgo.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    return (
        <div className="Container_MDinformAmeanzg_principal_body_subContainer_information">
            <div style={{height: '10px'}} />
            <ContainerInformation title={'Descripccion : '} >
                <ContainerDescripccion content={informationDataGeneral.descripc} />
            </ContainerInformation>
            {/* <div style={{height: '5px'}} /> */}
            <ContainerInformation title={'Escenario : '} >
                <ContainerDescripccion content={(informationDataGeneral.esenario == '')?'Escenario Desconocido':informationDataGeneral.esenario} />
            </ContainerInformation>
            <ContainerInformation title={'Insidencias Alineadas : '} >
                <div style={{height: '8px'}} />
                {(informationDataGeneral.insidenAline.length != 0)?informationDataGeneral.insidenAline.map((item)=>{
                    return (
                    <ItemMDInsidensAmenas
                        keyitem = {item.id_afectaActivInsid} 
                        title = {item.nombroInsid} 
                        subtitle = {item.nombreTipoActiv} 
                        descrip = {item.descrpInsid}
                    >
                    </ItemMDInsidensAmenas>);
                }):<ContainerDescripccion content={'No se encontro ninguna insidencia alineada a esta amenaza.'} />}
                <div style={{height: '8px'}} />
            </ContainerInformation>
            <ContainerInformationChip value={(informationDataGeneral.valRiesgoCualit == null)? '??' : informationDataGeneral.valRiesgoCualit} color={colorStadeRiesgCualiti(informationDataGeneral.valRiesgoCualit)} title={'Valorizacion : '}  >
                <div style={{height: '8px'}} />
                <CotainerValorInform dataInfo = {{
                    title: 'Valorizacion de la Degradacion (D)',
                    opccion: [
                        {
                            labelInfo : 'Valor Cualit. : ',
                            valor: `${(informationDataGeneral.valDegradCualit == null)? '??' : informationDataGeneral.valDegradCualit}%`
                        }
                    ]
                }} />
                <div style={{height: '8px'}} />
                <CotainerValorInform dataInfo = {{
                    title: 'Valorizacion de la Frecuencia (F)',
                    opccion: [
                        {
                            labelInfo : 'Nivel de Frec. : ',
                            valor: `${labelStadeFrecuenCualiti((informationDataGeneral.valorFrecuenCuali == null)? '??' : informationDataGeneral.valorFrecuenCuali)}`
                        },
                        {
                            labelInfo : 'Valor Cualit. : ',
                            valor: `${(informationDataGeneral.valorFrecuenCuali == null)? '??' : informationDataGeneral.valorFrecuenCuali}`
                        },
                        {
                            labelInfo : 'Valor Cuanti. : ',
                            valor: `${(informationDataGeneral.valorFrecuenCuanti == null)? '??' : informationDataGeneral.valorFrecuenCuanti}`
                        }
                    ]
                }} />
                <div style={{height: '8px'}} />
                <CotainerValorInform dataInfo = {{
                    title: 'Valorizacion del Impacto (I)',
                    opccion: [
                        {
                            labelInfo : 'Nivel de Frec. : ',
                            valor: `${labelStadeImpactCualiti((informationDataGeneral.valImpacCualit == null)? '??' : informationDataGeneral.valImpacCualit)}`
                        },
                        {
                            labelInfo : 'Valor Cualit. : ',
                            valor: `${(informationDataGeneral.valImpacCualit == null)? '??' : informationDataGeneral.valImpacCualit}`
                        },
                        {
                            labelInfo : 'Valor Cuanti. : ',
                            valor: `${(informationDataGeneral.valImpacCuanti == null)? '??' : informationDataGeneral.valImpacCuanti}`
                        }
                    ]
                }} />
                <div style={{height: '8px'}} />
                <CotainerValorInform dataInfo = {{
                    title: 'Valorizacion del Riesgo (R)',
                    opccion: [
                        {
                            labelInfo : 'Nivel de Riesg. : ',
                            valor: `${labelStadeRiesgCualiti((informationDataGeneral.valRiesgoCualit == null)? '??' : informationDataGeneral.valRiesgoCualit)}`
                        },
                        {
                            labelInfo : 'Valor Cualit. : ',
                            valor: `${(informationDataGeneral.valRiesgoCualit == null)? '??' : informationDataGeneral.valRiesgoCualit}`
                        },
                        {
                            labelInfo : 'Valor Cuanti. : ',
                            valor: `${(informationDataGeneral.valRiesgoCuanti == null)? '??' : informationDataGeneral.valRiesgoCuanti}`
                        }
                    ]
                }} />
                <div style={{height: '8px'}} />
            </ContainerInformationChip>
            <ContainerInformation title={'Salvaguardas : '} >
                <div style={{height: '8px'}} />
                {(informationDataGeneral.salvagAfect.length != 0)?informationDataGeneral.salvagAfect.map((item)=>{
                    return (
                    <ItemPCSalvaguarEmpresa
                        keyitem = {item.id_salvAfectAct} 
                        title = {item.descripc} 
                        subtitle = {item.abrebsalv} 
                        dataGeneral = {item}
                        // descrip = {item.descrpInsid}
                        valor = {item.valRiesgResidCuali}
                    >
                    </ItemPCSalvaguarEmpresa>);
                }):<ContainerDescripccion content={'No se encontrado ninguna salvaguarda enlazada a esta amenaza.'} />}
                <div style={{height: '8px'}} />
            </ContainerInformation>
            <div style={{height: '10px'}} />
        </div>
    );
}

function ContainerInformation (props) {
    const {title, children} = props;
    return (<>
        <div style={{height: '10px'}} />
        <div className="Container_MDinformAmeanz_principal_body_subContainer_information_subtitle" >
            {title} 
        </div>
        <div className="Container_MDinformAmeanz_principal_body_subContainer_information_liner" />
        {/* <div style={{height: '5px'}} /> */}
        {children}
    </>);
}

function ContainerInformationChip (props) {
    const {title, value, children, color = '#9E9E9E'} = props;
    return (<>
        <div style={{height: '10px'}} />
        <div className="Container_MDinformAmeanz_principal_body_subContainer_information_subtitle" >
            <div className="Container_MDinformAmeanz_principal_body_subContainer_information_subtitle_text">{title}</div>
            <div className="Container_MDinformAmeanz_principal_body_subContainer_information_subtitle_chip" style={{backgroundColor: color}}>{value}</div> 
        </div>
        <div className="Container_MDinformAmeanz_principal_body_subContainer_information_liner" />
        {/* <div style={{height: '5px'}} /> */}
        {children}
    </>);
}

function ContainerDescripccion (props) {
    const {content} = props;
    return (
        <div className="Container_MDinformAmeanz_principal_body_subContainer_information_descrip" >
            {content}
        </div>
    );
}

function CotainerValorInform (props) {
    const {dataInfo = {
        title: 'Valor 1',
        opccion: [
            {
                labelInfo : 'lavel 1',
                valor: 'Valor que es relativo'
            }
        ]
    }} = props;
    const [isVisibleInformat, setisVisibleInformat] = useState(false);
    return (
        <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info" >
            <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_conten">
                <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_header">
                    <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_title">
                        {dataInfo.title}
                    </div>
                    <div onClick={()=>{
                        // onSelecteItem(keyitem,!isSeleteItem);
                        setisVisibleInformat(!isVisibleInformat);
                    }} className={`Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_visible`}>
                        {(isVisibleInformat)?
                            <AiOutlineUp className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_visible_icon"  />:
                            <AiOutlineDown className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_visible_icon" />
                        }
                    </div>
                </div>
                {
                    (isVisibleInformat)?<>
                        <div style={{height: '10px'}} />
                        <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_liner" />
                        <div style={{height: '5px'}} />
                        {dataInfo.opccion.map((item) => {
                            return (
                                <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_cont">
                                    <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_label">
                                        {item.labelInfo}
                                    </div>
                                    <div className="Container_MDinformAmeanz_principal_body_subContainer_information_valor_info_valor">
                                        {item.valor}
                                    </div>
                                </div>
                            );
                        })}
                    </>:<></>
                }
            </div>
        </div>
    );
}