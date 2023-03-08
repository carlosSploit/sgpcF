import { useState } from "react";
import { PopModal } from "../componentModal/componentModal";
import "./componetMostInfoItem.css";


export const ComponentInfoitem = (props) =>{
    const [ismodalvisible, setismodalvisible] = useState(true);
    const {propismodalvisible = ismodalvisible, propsetismodalvisible = setismodalvisible, informatData = {
        id_info: 454645,
        photo: "djasdjaslkdjsakjkjl",
        name: "hjdhsakjdhsakjd",
        infoOption:[{
            label: "Informacion del Usuario",
            option: [
                {
                    labelOption: "Nombre",
                    valueOption: "Carlos Arturo Guerrero Castillo"
                },
                {
                    labelOption: "Telefono",
                    valueOption: "969280255"
                },
                {
                    labelOption: "Correo",
                    valueOption: "caguerrerog@ucvvirtual.edu.pe"
                }
            ]
        }]
    }} = props;
    const [colorbackgroud, setcolorbackgroud] = useState("#FFFFF");
    const [colortext, setcolortext] = useState("#856FC5");

    return (
        <PopModal  colorBackgroud = {colorbackgroud} colorTitle={colortext} propismodalvisible={propismodalvisible} propsetismodalvisible={propsetismodalvisible} namemodal={informatData.name} >
            <div className="component_InfoItem_general" style={{backgroundColor: `${colorbackgroud}`}}>
                <div className="component_InfoItem_general_subcontent">
                    {/* <div className="component_InfoItem_general_subcontent_name">{informatData.name}</div> */}
                    <div className="component_InfoItem_general_subcontent_code">Nº {informatData.id_info}</div>
                    <div style={{height:"20px"}} />
                    <div className="component_InfoItem_general_subcontent_photo" style={{backgroundImage: `url('${informatData.photo}')`}}></div>
                </div>
            </div>
            <div className="component_InfoItem_general_body">
                {
                    informatData.infoOption.map((item,ind)=>{
                        return (<>
                            <div className="component_InfoItem_general_body_options">
                                <div className="component_InfoItem_general_body_options_text" >{item.label}</div>
                                {item.option.map((opi)=>{
                                    return (<div className="component_InfoItem_general_body_options_text_info">
                                    <div className="component_InfoItem_general_body_options_text_info_label">{opi.labelOption}:</div>
                                    <div className="component_InfoItem_general_body_options_text_info_value">{opi.valueOption}</div>
                                </div>);
                                })}
                            </div>
                            {(ind == (informatData.infoOption.length - 1))?<></>:<div class="component_InfoItem_general_body_options_separator" />}
                        </>);
                    })
                }
            </div>
        </PopModal>
    );
}