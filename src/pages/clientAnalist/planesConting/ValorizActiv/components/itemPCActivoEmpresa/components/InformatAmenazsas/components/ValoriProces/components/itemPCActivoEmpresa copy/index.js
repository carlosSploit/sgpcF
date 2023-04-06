import React, { useEffect, useState } from "react";
import "./style/index.css"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
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

    const [DataNivelCrite,] = useState([
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

    const colorStadeActivCualiti = (ValCualiti) => {
        const listData = DataNivelCrite.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return '#9E9E9E'
        return listData[0].color
    }

    const LabelStadeActivCualiti = (ValCualiti) => {
        const listData = DataNivelCrite.filter((item)=>{
            const itemsRange = item.range.split(' - ');
            return (parseInt(itemsRange[0]) <= ValCualiti) && (ValCualiti <= parseInt(itemsRange[1]))
        })
        if (listData.length === 0) return 'D - Despresiable'
        return listData[0].code + ' - ' + listData[0].label
    }

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
                        <div className={`Container_ItemPCSalvaguarEmpresa_conten_secondary_information_dat`} style={{backgroundColor: `${colorStadeActivCualiti(valor)}`}} >
                            {valor}
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
                            {/* Extrategia */}
                            <ItemContainerInformation title={'Estrategia : '} >
                                <ItemContainerDescripccion content={dataGeneral.extrategia} />
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

function ItemContainerDescripccion (props) {
    const {content} = props;
    return (
        <div className="Container_ItemPCSalvaguarEmpresa_principal_body_subContainer_information_descrip" >
            {content}
        </div>
    );
}