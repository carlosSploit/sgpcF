import React, { useEffect, useState } from "react";
import "./style/index.css"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { ItemPCResponSalvaguard } from "./components/itemPCResponSalvaguard";
import { ItemPCRecursoSalvaguard } from "./components/itemPCRecursoSalvaguard";
// import { ItemPCAmenazsas } from "./components/itemPCAmenazsas";
// import { InformationAmenaz } from "./components/InformatAmenazsas";
// import {EditAdmin} from "../editEmpresas/editAdmin"
// import { useNotification } from "../../../../../../service/Notifications/useNotificacion";

export function ItemPCSalvaguarEmpresa(props){
    const {
        onChange = (id_options) => {},
        // onSelecteItem = (id_options, stade) => {},
        keyitem,
        title,
        subtitle,
        dataGeneral = {
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
        // children,
        valor = 0
    } = props;
    // const [informacionAfectActiv, setinformacionAfectActiv] = useState(0);
    const [isSeleteItem, setisSeleteItem] = useState(false);
    // const [ismodalvisible, setismodalvisible] = useState(false);

    useEffect(()=>{
        // console.log(itemdate);
    },[]);

    const [DataDegradResid ,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0.14',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '0.15 - 0.32',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '0.35 - 0.64',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '0.7 - 0.81',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '0.9 - 1',
            color: '#FF5252'
        }
    ]);

    const [DataFrecuenResid ,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0.4',
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '0.5 - 1.4',
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '1.5 - 2.4',
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '2.5 - 3.4',
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '3.5 - 5',
            color: '#FF5252'
        }
    ]);

    const [DataImpactResid ,] = useState([
        {
            key : 1,
            code: 'D',
            label: 'Despresiable',
            range: '0 - 0.4',
            value: 1,
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'B',
            label: 'Bajo',
            range: '0.5 - 1.4',
            value: 2,
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'M',
            label: 'Medio',
            range: '1.5 - 2.4',
            value: 3,
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'A',
            label: 'Alto',
            range: '2.5 - 3.4',
            value: 4,
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'MA',
            label: 'Muy Alto',
            range: '3.5 - 5',
            value: 5,
            color: '#FF5252'
        }
    ])
    
    const [DataRiesgoResid ,] = useState([
        {
            key : 1,
            code: 'C',
            label: 'Controlable',
            range: '1 - 5',
            valor: 1,
            color: '#9E9E9E'
        },
        {
            key : 2,
            code: 'A',
            label: 'Aceptable',
            range: '6 - 10',
            valor: 2,
            color: '#8BC34A'
        },
        {
            key : 3,
            code: 'T',
            label: 'Tolerable',
            range: '11 - 15',
            valor: 3,
            color: '#FFA000'
        },
        {
            key : 4,
            code: 'I',
            label: 'Intolerable',
            range: '16 - 20',
            valor: 4,
            color: '#FF5722'
        },
        {
            key : 5,
            code: 'E',
            label: 'Extremo',
            range: '21 - 25',
            valor: 5,
            color: '#FF5252'
        }
    ]);

    const LabelInStadeDegradCualiti = (ValCualiti) => {
        const listData = DataDegradResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

    const presSalvaguar = () => {
        const listResult = [ ...dataGeneral.recursSalvagu ]
        const resultPress = listResult.reduce((prev, curren)=>{
            const curt = curren.presioRecurSalvAfect
            const presfinal =  curt + prev
            return presfinal
        }, 0)
        return resultPress
    }

    // const labelStadeDegradCualiti = (ValCualiti) => {
    //     return (Math.round(ValCualiti * 10) * 10)
    // }

    // const colorStadeFrecunCualiti = (ValCualiti) => {
    //     const listData = DataFrecuenResid.filter((item)=>{
    //         const itemsRange = item.range.split(' - ');
    //         return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
    //     })
    //     if (listData.length === 0) return '#9E9E9E'
    //     return listData[0].color
    // }

    const labelStadeFrecunCualiti = (ValCualiti) => {
        if (ValCualiti == '??') return ValCualiti
        const listData = DataFrecuenResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

    // const colorStadeImpactCualiti = (ValCualiti) => {
    //     const listData = DataImpactResid.filter((item)=>{
    //         const itemsRange = item.range.split(' - ');
    //         return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
    //     })
    //     if (listData.length === 0) return '#9E9E9E'
    //     return listData[0].color
    // }

    const labelStadeImpactCualiti = (ValCualiti) => {
        const listData = DataImpactResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

    const colorStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgoResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const ValorStadeRiesgCualiti = (ValCualiti) => {
        const listData = DataRiesgoResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return '??'
        return listData[0].valor
    }

    const labelStadeRiesgCualiti = (ValCualiti) => {
        if (ValCualiti == '??') return ValCualiti
        const listData = DataRiesgoResid.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseFloat(parseFloat(itemsRange[0]).toFixed(1)) <= ValCualiti) && (ValCualiti <= parseFloat(parseFloat(itemsRange[1]).toFixed(1)))
        })
        if (listData.length === 0) return 'C - Controlable'
        return listData[0].code + ' - ' + listData[0].label
    }

    // const LabelStadeActivCualiti = (ValCualiti) => {
    //     const listData = DataNivelCrite.filter((item)=>{
    //         const itemsRange = item.range.split(' - ');
    //         return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
    //     })
    //     if (listData.length === 0) return 'D - Despresiable'
    //     return listData[0].code + ' - ' + listData[0].label
    // }

    return (
    <>
        <div className="Container_ItemPCSalvaguarEmpresa_conten_Pri">
            <div className="Container_ItemPCSalvaguarEmpresa_conten_secondary">
                <div className="Container_ItemPCSalvaguarEmpresa_conten_secondary_conte">
                    <div className="Container_ItemPCSalvaguarEmpresa_conten_secondary_seleccion_conten_information" onClick={()=>{
                        onChange(keyitem);
                    }}>
                        <div className="Container_ItemPCSalvaguarEmpresa_conten_secondary_seleccion_Infor">
                            <div className="Container_ItemPCSalvaguarEmpresa_conten_InfoData_primary" >{title}</div>
                            <div style={{height: '1px'}} />
                            <div className="Container_ItemPCSalvaguarEmpresa_conten_InfoData_secundary" >{subtitle}</div>
                        </div>
                        {/* <div className="Container_ItemPCSalvaguarEmpresa_conten_secondary_seleccion_suInfor">
                            
                        </div> */}
                    </div>
                    <div className="Container_ItemPCSalvaguarEmpresa_conten_secondary_information">
                        <div className={`Container_ItemPCSalvaguarEmpresa_conten_secondary_information_dat`} style={{backgroundColor: `${colorStadeRiesgCualiti(valor)}`}} >
                            {ValorStadeRiesgCualiti(valor)}
                        </div>
                    </div>
                    <div className="Container_ItemPCSalvaguarEmpresa_conten_secondary_seleccion">
                        <div onClick={()=>{
                            // onSelecteItem(keyitem,!isSeleteItem);
                            setisSeleteItem(!isSeleteItem);
                        }} className={`Container_ItemPCSalvaguarEmpresa_conten_secondary_seleccion_radio`}>
                            {(isSeleteItem)?
                                <AiOutlineUp className="Container_ItemPCSalvaguarEmpresa_conten_secondary_seleccion_radio_icon"  />:
                                <AiOutlineDown className="Container_ItemPCSalvaguarEmpresa_conten_secondary_seleccion_radio_icon" />
                            }
                        </div>
                    </div>
                </div>
                {
                    (isSeleteItem) ?
                    <>
                        {/* <div className="Container_ItemPCSalvaguarEmpresa_liner" /> */}
                        <div className="Container_ItemPCSalvaguarEmpresa_body_container">
                            {/* Control alineado a la salvaguarda */}
                            <ItemContainerInformation title={'Control 27002 Alineado : '} >
                                <div style={{height: '10px'}} />
                                {/* {informaData.respoProces} */}
                                {<ItemPCResponSalvaguard 
                                    keyitem = {dataGeneral.id_control} 
                                    title = {dataGeneral.DescripccionControl} 
                                    subtitle = {dataGeneral.codeDepende} 
                                    // descrip = {dataGeneral.descripc} 
                                />}
                            </ItemContainerInformation>
                            {/* Extrategia */}
                            <ItemContainerInformation title={'Estrategia : '} >
                                <ItemContainerDescripccion content={dataGeneral.extrategia} />
                            </ItemContainerInformation>
                            {/* Responsables de la salvaguarda */}
                            <ItemContainerInformation title={'Responsables : '} >
                                <div style={{height: '10px'}} />
                                {/* {informaData.respoProces} */}
                                {(dataGeneral.responSalvagu.length != 0)?dataGeneral.responSalvagu.map((item)=>{
                                    return (
                                    <ItemPCResponSalvaguard 
                                        keyitem = {item.id_responSalvAfectAct} 
                                        title = {item.nombre_apellido} 
                                        subtitle = {item.cargo} 
                                        descrip = {item.descripc} 
                                    />);
                                }):<ItemContainerDescripccion content={'No se encontro responsables enlazados a esta salvaguarda.'} />}
                            </ItemContainerInformation>
                            {/* Recurso de la salvaguarda */}
                            <ItemContainerInformationChip title={'Recursos: '} value = {`S/. ${presSalvaguar()}`} >
                                <div style={{height: '10px'}} />
                                {/* {informaData.respoProces} */}
                                {(dataGeneral.recursSalvagu.length != 0)?dataGeneral.recursSalvagu.map((item)=>{
                                    return (
                                    <ItemPCRecursoSalvaguard 
                                        keyitem = {item.id_responSalvAfectAct} 
                                        title = {item.nombreRecurSalvAfect} 
                                        subtitle = {`S/. ${item.presioRecurSalvAfect}`} 
                                        descrip = {item.descripc} 
                                    />);
                                }):<ItemContainerDescripccion content={'No se encontro recursos enlazados a esta salvaguarda.'} />}
                            </ItemContainerInformationChip>
                            {/* Recurso de la salvaguarda */}
                            <ItemContainerInformation title={'Valorizacion : '} >
                                <div style={{height: '10px'}} />
                                <ItemCotainerValorInform dataInfo = {{
                                    title: 'Valorizacion de la Eficacia',
                                    opccion: [
                                        {
                                            labelInfo : 'Eficacia Degrad : ',
                                            valor: `${(dataGeneral.valEficDegr == null)? '??' : dataGeneral.valEficDegr} %`
                                        },
                                        {
                                            labelInfo : 'Eficacia Frecue : ',
                                            valor: `${(dataGeneral.valEficFrec == null)? '??' : dataGeneral.valEficFrec} %`
                                        },
                                        {
                                            labelInfo : 'Eficacia Impact : ',
                                            valor: `${(dataGeneral.valEficImpac == null)? '??' : dataGeneral.valEficImpac} %`
                                        }
                                    ]
                                }} />
                                <div style={{height: '5px'}} />
                                <ItemCotainerValorInform dataInfo = {{
                                    title: 'Degradacion Residual (DR)',
                                    opccion: [
                                        {
                                            labelInfo : 'Nivel DR : ',
                                            valor: `${LabelInStadeDegradCualiti((dataGeneral.valDegraResidCuali == null)? '??' : dataGeneral.valDegraResidCuali)}`
                                        },
                                        {
                                            labelInfo : 'Valorizacion Cualit : ',
                                            valor: `${(dataGeneral.valDegraResidCuali == null)? '??' : (Math.round(dataGeneral.valDegraResidCuali * 10) * 10 )} %`
                                        }
                                    ]
                                }} />
                                <div style={{height: '5px'}} />
                                <ItemCotainerValorInform dataInfo = {{
                                    title: 'Frecuencia Residual (FR)',
                                    opccion: [
                                        {
                                            labelInfo : 'Nivel FR : ',
                                            valor: `${labelStadeFrecunCualiti((dataGeneral.valEscalFrecuenResidCuali == null)? '??' : dataGeneral.valEscalFrecuenResidCuali)}`
                                        },
                                        {
                                            labelInfo : 'Valorizacion Cualit : ',
                                            valor: `${(dataGeneral.valEscalFrecuenResidCuali == null)? '??' : (dataGeneral.valEscalFrecuenResidCuali)}`
                                        },
                                        {
                                            labelInfo : 'Valorizacion Cuanti : ',
                                            valor: `${(dataGeneral.valEscalFrecuenResidCuanti == null)? '??' : (dataGeneral.valEscalFrecuenResidCuanti)}`
                                        }
                                    ]
                                }} />
                                <div style={{height: '5px'}} />
                                <ItemCotainerValorInform dataInfo = {{
                                    title: 'Impacto Residual (IR)',
                                    opccion: [
                                        {
                                            labelInfo : 'Nivel IR : ',
                                            valor: `${labelStadeImpactCualiti((dataGeneral.valImpactResidCuali == null)? '??' : dataGeneral.valImpactResidCuali)}`
                                        },
                                        {
                                            labelInfo : 'Valorizacion Cualit : ',
                                            valor: `${(dataGeneral.valImpactResidCuali == null)? '??' : (dataGeneral.valImpactResidCuali)}`
                                        },
                                        {
                                            labelInfo : 'Valorizacion Cuanti : ',
                                            valor: `S/. ${(dataGeneral.valImpactResidCuanti == null)? '??' : (dataGeneral.valImpactResidCuanti)}`
                                        }
                                    ]
                                }} />
                                <div style={{height: '5px'}} />
                                <ItemCotainerValorInform dataInfo = {{
                                    title: 'Riesgo Residual (RR)',
                                    opccion: [
                                        {
                                            labelInfo : 'Nivel RR : ',
                                            valor: `${labelStadeRiesgCualiti((dataGeneral.valRiesgResidCuali == null)? '??' : dataGeneral.valRiesgResidCuali)}`
                                        },
                                        {
                                            labelInfo : 'Valorizacion Cualit : ',
                                            valor: `${(dataGeneral.valRiesgResidCuali == null)? '??' : (dataGeneral.valRiesgResidCuali)}`
                                        },
                                        {
                                            labelInfo : 'Valorizacion Cuanti : ',
                                            valor: `S/. ${(dataGeneral.valRiesgResidCuanti == null)? '??' : (dataGeneral.valRiesgResidCuanti)}`
                                        }
                                    ]
                                }} />
                            </ItemContainerInformation>
                            {/* valorizacion */}
                            {/* <ItemContainerInformation title={'Valorizacion : '} >
                                <div style={{height: '10px'}} ></div>
                                    <div className="Container_ItemPCSalvaguarEmpresa_body_container_valor">
                                    <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_cont">
                                        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_label">
                                            {'Presio o Valor del Activo :'}
                                        </div>
                                        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_valor">
                                            {`S/. ${dataGeneral.valorActivCuanti}`}
                                        </div>
                                    </div>
                                    <div style={{height: '5px'}} ></div>
                                    <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_cont">
                                        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_label">
                                            {'Valor de criticidad :'}
                                        </div>
                                        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_valor">
                                            {`${dataGeneral.valorActivCuali}`}
                                        </div>
                                    </div>
                                    <div style={{height: '5px'}} ></div>
                                    <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_cont">
                                        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_label">
                                            {'Nivel de criticidad :'}
                                        </div>
                                        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_valor">
                                            {`${LabelStadeActivCualiti(dataGeneral.valorActivCuali)}`}
                                        </div>
                                    </div>
                                </div>
                            </ItemContainerInformation> */}
                            {/* Amenazas */}
                            {/* <ItemContainerInformation title={'Amenazas : '} >
                                {dataGeneral.amenasDetect.map((item)=>{
                                    return (
                                    <ItemPCAmenazsas
                                        keyitem = {item.id_afectaActiv} 
                                        title = {item.nombreAmena} 
                                        subtitle = {item.nombreTipoActiv} 
                                        valor = {(item.valRiesgoCualit == null)?'??':item.valRiesgoCualit} 
                                        onChange = {(key) => {
                                            setinformacionAfectActiv(key);
                                            setismodalvisible(true);
                                        }}
                                    >
                                    </ItemPCAmenazsas>);
                                })}
                            </ItemContainerInformation> */}
                            <div style={{height: '10px'}} />
                        </div>
                    </>
                    :<></>
                }
            </div>
        </div>
        {/* {(ismodalvisible)?
            <InformationAmenaz informacionAfectActiv={informacionAfectActiv} informacionActivProsVerAnali = {dataGeneral.id_activProsVerAnali} ismodalvisible = {ismodalvisible} setismodalvisible = {setismodalvisible } />
            :<></>
        } */}
    </>
    );
}

function ItemContainerInformation (props) {
    const {title, children} = props;
    return (<>
        <div style={{height: '10px'}} />
        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_subtitle" >
            {title} 
        </div>
        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_liner" />
        <div style={{height: '5px'}} />
        {children}
    </>);
}

function ItemContainerInformationChip (props) {
    const {title, value = 0, children, color = '#9E9E9E'} = props;
    return (<>
        <div style={{height: '10px'}} />
        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_subtitle" >
            <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_subtitle_text">{title}</div>
            <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_subtitle_chip" style={{backgroundColor: color}}>{value}</div> 
        </div>
        <div style={{height: '5px'}} />
        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_liner" />
        {/* <div style={{height: '5px'}} /> */}
        {children}
    </>);
}

function ItemContainerDescripccion (props) {
    const {content} = props;
    return (
        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_descrip" >
            {content}
        </div>
    );
}

function ItemCotainerValorInform (props) {
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
        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info" >
            <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_conten">
                <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_header">
                    <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_title">
                        {dataInfo.title}
                    </div>
                    <div onClick={()=>{
                        // onSelecteItem(keyitem,!isSeleteItem);
                        setisVisibleInformat(!isVisibleInformat);
                    }} className={`Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_visible`}>
                        {(isVisibleInformat)?
                            <AiOutlineUp className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_visible_icon"  />:
                            <AiOutlineDown className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_visible_icon" />
                        }
                    </div>
                </div>
                {
                    (isVisibleInformat)?<>
                        <div style={{height: '10px'}} />
                        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_liner" />
                        <div style={{height: '5px'}} />
                        {dataInfo.opccion.map((item) => {
                            return (
                                <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_cont">
                                    <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_label">
                                        {item.labelInfo}
                                    </div>
                                    <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_valor_info_valor">
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