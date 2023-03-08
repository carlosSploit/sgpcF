import { PictureOutlined,EyeOutlined,EyeInvisibleOutlined, LeftOutlined, RightOutlined, CloseOutlined, SendOutlined, CloseCircleOutlined } from "@ant-design/icons";
import React,{useState,useRef,useEffect} from "react";
// import ImageGalery from "../res/ImageGalery";
import { LisObjIcons } from "../res/resSvgtoJS/objListIcon.react";
import { FormModalSelectIcon } from "./complements/forminputSelectIcon/formModalSelectIcon";
import { ForminputSelectItem } from "./complements/forminputSelectItem/ForminputSelectItem";
import "./form_input.css";

/**
 * <input para form de tipo text>
 * @param   {<string>} key <Id del input>
 * @param   {<string>} valueInit <Palabra de inicio de cada input>
 * @param   {<string>} placeHolder <Mensaje de gia de cada input>
 * @param   {<string>} Limitchar <Limite de caracteres de un textinput>
 * @param   {<string>} onValitador <Metodo que te permite validar el texto de entrada, si retorna true, sale un error>
 * @param   {<string>} messValidator <Mensaje de error cuando se ejecute el onValitado>
 * @param   {<string>} onChangeinput <Metodo que tiene como parametro el texto escrito en el input>
 * @param   {<string>} onValidFilter <Metodo que te permite hacer filtros a el texto que entra de parametro>
 * @return  {<type>}        <description>
 */

export function Forminput(props){
    // encabezados
    const [statetextinput, changesettextinput] = useState("");
    let {
    refMant,
    textinput = statetextinput,
    isdisable = false,
    settextinput = changesettextinput,
    keyname="keyinputgeneric",
    onError=()=>{},
    valueInit= "",
    placeHolder = "name",
    Limitchar = 999,
    isVisibleErrorLabel = false,
    onValitador=(textinput)=>{
        if(textinput === "") onError();
        return (textinput === "");
    },
    messValidator="Error. La casilla esta vacia.",
    onChangeinput=(text)=>{
        //console.log(text);
    },
    onValidFilter=(text)=>{
        return text;
    }} = props;
    // estados del componentes
    //const [textinput, settextinput] = useState(valueInit);
    const [valuestade,setvaluestade] = useState(false);
    // const refInput = useRef();

    useEffect(()=>{
        settextinput(valueInit);
    },[]);

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_conteiner">
                <div className="form_input_conteiner"
                    style={{
                        borderColor:`${(isdisable)?"#cfcfcf":(!valuestade)?"#9686C3":"#f44336"}`
                        //borderColor:`${(isdisable)?"#cfcfcf":((!valuestade)?"#375D81":"#375D81")}`
                    }}
                >
                    <input
                        className="form_input_text"
                        type="text"
                        style={(isdisable)?{pointerEvents: "none"}:{}}
                        ref={refMant}
                        id={`${keyname}`}
                        name={`${keyname}`}
                        key={`${keyname}`}
                        value={`${textinput}`}
                        // ref={refInput}
                        placeholder={placeHolder}
                        onBlur={()=>{
                            setvaluestade(onValitador(textinput));
                        }}
                        onChange={(e)=>{
                            let listchar = onValidFilter(e.target.value);
                            listchar = (listchar.length >= (Limitchar + 1))? listchar.substring(0,(Limitchar + 1)-1):listchar;
                            //settextinput(listchar);
                            settextinput(listchar);
                            //refInput.current.value = listchar;
                            onChangeinput(e.target.value);
                        }}
                    />
                </div>
                <div style={{height: "10px"}}/>
                {(valuestade && isVisibleErrorLabel)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                {(valuestade && isVisibleErrorLabel)?<div style={{height: "5px"}}/>:<div></div>}
            </div>
        </>
    );
}

/**
 * <input para form de tipo text area>
 * @param   {<string>} key <Id del input>
 * @param   {<string>} valueInit <Palabra de inicio de cada input>
 * @param   {<string>} placeHolder <Mensaje de gia de cada input>
 * @param   {<string>} Limitchar <Limite de caracteres de un textinput>
 * @param   {<string>} onValitador <Metodo que te permite validar el texto de entrada, si retorna true, sale un error>
 * @param   {<string>} messValidator <Mensaje de error cuando se ejecute el onValitado>
 * @param   {<string>} onChangeinput <Metodo que tiene como parametro el texto escrito en el input>
 * @param   {<string>} onValidFilter <Metodo que te permite hacer filtros a el texto que entra de parametro>
 * @return  {<type>}        <description>
 */

export function ForminputArea(props){
    // encabezados
    const [statetextinput, changesettextinput] = useState("");
    const {
    keyname = "KeyinputArea",
    textinput = statetextinput,
    settextinput = changesettextinput,
    valueInit= "",
    placeHolder = "name",
    onError=()=>{},
    Limitchar = 999,
    onValitador=(textinput)=>{
        if(textinput === "") onError();
        return (textinput === "");
    },
    messValidator="Error. La casilla esta vacia.",
    onChangeinput=(text)=>{
        //console.log(text);
    },
    onValidFilter=(text)=>{
        return text;
    }} = props;
    // estados del componentes
    const [valuestade,setvaluestade] = useState(false);

    useEffect(()=>{
        settextinput(valueInit);
    },[]);

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_conteiner">
                <div className="form_input_conteiner"
                    style={{
                        borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                    }}
                >
                    <textarea
                        className="form_input_text_area"
                        type="text"
                        id={`${keyname}`}
                        name={`${keyname}`}
                        value={textinput}
                        placeholder={placeHolder}
                        onBlur={()=>{
                            setvaluestade(onValitador(textinput));
                        }}
                        onChange={(e)=>{
                            let listchar = onValidFilter(e.target.value);
                            listchar = (listchar.length >= (Limitchar + 1))? listchar.substring(0,(Limitchar + 1)-1):listchar;
                            settextinput(listchar);
                            onChangeinput(e.target.value);
                        }}
                    />
                </div>
                <div style={{height: "10px"}}/>
                {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
            </div>
        </>
    );
}

/**
 * <input para form de tipo password, con ocultar o desocultar texto>
 * @param   {<string>} key <Id del input>
 * @param   {<string>} valueInit <Palabra de inicio de cada input>
 * @param   {<string>} placeHolder <Mensaje de gia de cada input>
 * @param   {<string>} Limitchar <Limite de caracteres de un textinput>
 * @param   {<string>} onValitador <Metodo que te permite validar el texto de entrada, si retorna true, sale un error>
 * @param   {<string>} messValidator <Mensaje de error cuando se ejecute el onValitado>
 * @param   {<string>} onChangeinput <Metodo que tiene como parametro el texto escrito en el input>
 * @param   {<string>} onValidFilter <Metodo que te permite hacer filtros a el texto que entra de parametro>
 * @return  {<type>}        <description>
 */

export function Forminputpassword(props){
    // encabezados
    const [statetextinput, changesettextinput] = useState("");
    const {
    keyname="keyinputpassword",
    textinput = statetextinput,
    settextinput = changesettextinput,
    valueInit= "",
    onError=()=>{},
    placeHolder = "password",
    Limitchar = 15,
    onValitador=(textinput)=>{
        if(textinput === "") onError();
        return (textinput === "");
    },
    messValidator="Error. La casilla esta vacia.",
    onChangeinput=(text)=>{
        //console.log(text);
    },
    onValidFilter=(text)=>{
        return text;
    }} = props;
    // estados del componentes
    const [valuestade,setvaluestade] = useState(false);
    const [visipass,setvisipass] = useState(false);

    useEffect(()=>{
        settextinput(valueInit);
    },[]);

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_conteiner">
                <div className= "form_input_conteiner"
                    style={{
                        borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                    }}
                >
                    <input
                        className="form_input_text"
                        type="text"
                        style={{
                            WebkitTextSecurity: `${(visipass)?'none':'disc'}`
                        }}
                        id={`${keyname}`}
                        name={`${keyname}`}
                        value={textinput}
                        placeholder={placeHolder}
                        onBlur={()=>{
                            setvaluestade(onValitador(textinput));
                        }}
                        onChange={(e)=>{
                            let listchar = onValidFilter(e.target.value);
                            listchar = (listchar.length >= (Limitchar + 1))? listchar.substring(0,(Limitchar + 1)-1):listchar;
                            settextinput(listchar);
                            onChangeinput(e.target.value);
                        }}
                    />
                    <div className="iconpass"
                        onClick={()=>{
                            setvisipass(!visipass);
                        }}
                    >{(visipass)?<EyeInvisibleOutlined />:<EyeOutlined />}</div>
                </div>
                <div style={{height: "10px"}}/>
                {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
            </div>
        </>
    );
}

/**
 * <input para form de tipo password, con ocultar o desocultar texto>
 * @param   {<string>} key <Id del input>
 * @param   {<string>} valueInit <Palabra de inicio de cada input>
 * @param   {<string>} placeHolder <Mensaje de gia de cada input>
 * @param   {<string>} Limitchar <Limite de caracteres de un textinput>
 * @param   {<string>} onValitador <Metodo que te permite validar el texto de entrada, si retorna true, sale un error>
 * @param   {<string>} messValidator <Mensaje de error cuando se ejecute el onValitado>
 * @param   {<string>} onChangeinput <Metodo que tiene como parametro el texto escrito en el input>
 * @return  {<type>}        <description>
 */

export function Forminputnumber(props){
    // encabezados
    const [statetextinput, changesettextinput] = useState("");
    let {
    keyname="keyinputnumber",
    valueInit= "",
    isdisable = false,
    textinput = statetextinput,
    settextinput = changesettextinput,
    placeHolder = "name",
    onError=()=>{},
    Limitchar = 10,
    onValitador=(textinput)=>{
        if(textinput === "") onError();
        return (textinput === "");
    },
    messValidator="Error. La casilla esta vacia.",
    onChangeinput=(text)=>{
        //console.log(text);
    },
    maxnumber = 999999999999,
    onValidFilter=(text)=>{
        text = (esNumber(text))?text:text.substring(0,text.length-1);
        return text;
    }} = props;
    // estados del componentes
    const [valuestade,setvaluestade] = useState(false);

    useEffect(()=>{
        settextinput(valueInit);
    },[]);

    const esNumber = (caracter) => {
        let ascii = caracter.toUpperCase().charCodeAt(caracter.length-1);
        let valider = ascii > 47 && ascii < 58 || ascii === 46
        valider = (caracter.split(".").length >= 3)? false : valider
        return valider;
    };

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_conteiner">
            <div className="form_input_conteiner"
                style={{
                    borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                }}
            >
                <input
                    className="form_input_text"
                    type="text"
                    id={`${keyname}`}
                    name={`${keyname}`}
                    value={textinput}
                    placeholder={placeHolder}
                    onBlur={()=>{
                        setvaluestade(onValitador(textinput));
                    }}
                    onChange={(e)=>{
                        if(!isdisable){
                            let listchar = onValidFilter(e.target.value);
                            listchar = (listchar.length >= (Limitchar + 1))? listchar.substring(0,(Limitchar + 1)-1):listchar;
                            // if(!(parseInt(listchar) <= maxnumber)){
                            //     // listchar = maxnumber.toString();
                            //     console.log(`${parseInt(listchar)} < ${maxnumber}`);
                            // }
                            settextinput(listchar);
                            onChangeinput(listchar);
                        }
                    }}
                />
            </div>
            <div style={{height: "10px"}}/>
            {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
            {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
        </div>
        </>
    );
}

export function Forminputmail(props){
    // encabezados
    const [statetextinput, changesettextinput] = useState("");
    let {
    keyname="keyinputmail",
    textinput = statetextinput,
    settextinput = changesettextinput,
    valueInit= "",
    placeHolder = "correo",
    onError=()=>{},
    Limitchar = 999,
    onValitador=(text)=>{
        if (!esMail(text) || text === "" ) onError();
        return (!esMail(text) || text === "" );
    },
    messValidator="El correo es incorrecto",
    onChangeinput=(text)=>{
        //console.log(text);
    },
    onValidFilter=(text)=>{
        return text;
    }} = props;
    // estados del componentes
    const [valuestade,setvaluestade] = useState(false);

    useEffect(()=>{
        settextinput(valueInit);
    },[]);

    const esMail = (caracter) => {
        let arraylist = caracter.split("@");
        if (arraylist.length === 1) return false;
        arraylist = arraylist[1].split(".");
        if (arraylist.length === 1) return false;
        return true;
    };

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_conteiner">
                <div
                    className="form_input_conteiner"
                    style={{
                        borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                    }}
                >
                    <input
                        className="form_input_text"
                        type="text"
                        id={`${keyname}`}
                        name={`${keyname}`}
                        value={textinput}
                        placeholder={placeHolder}
                        onBlur={()=>{
                            setvaluestade(onValitador(textinput));
                        }}
                        onChange={(e)=>{
                            let listchar = onValidFilter(e.target.value);
                            listchar = (listchar.length >= (Limitchar + 1))? listchar.substring(0,(Limitchar + 1)-1):listchar;
                            settextinput(listchar);
                            onChangeinput(e.target.value);
                        }}
                    />
                </div>
                <div style={{height: "10px"}}/>
                {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
            </div>
        </>
    );
}

export function ForminputRadioSlice(props){
    const [propstateradio,propsetstateradio] = useState(false);
    // encabezados
    let {
    keyname="inputRadioSlice",
    label="texto default",
    checkradio = propstateradio,
    setcheckradio = propsetstateradio,
    valueInit= false,
    onChangeinput=(stade)=>{
        //console.log(stade);
    }} = props;
    // estados del componentes
    // const [valuestade,setvaluestade] = useState(false);

    useEffect(()=>{
        setcheckradio(valueInit);
    },[]);

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_conteiner">
                <div
                    className="form_input_radioslice_conteiner"
                >
                    <input
                        style={{display: "none"}}
                        type="checkbox"
                        id={`${keyname}`}
                        name={`${keyname}`}
                        checked={checkradio}
                    />
                    <div onClick={()=>{
                            // console.log(!checkradio);
                            onChangeinput(!checkradio);
                            setcheckradio(!checkradio);
                        }} className={(checkradio)?"form_input_radioslice_activate":"form_input_radioslice"}><div className={(checkradio)?"form_input_radioslice_circle_activate":"form_input_radioslice_circle"}/></div>
                    <div style={{width:"8px"}}/>
                    <div className="form_input_radioslice_name">{label}</div>
                </div>
            </div>
        </>
    );
}

export function ForminputBotton(props){
    const {label="Submit", onChange=()=>{}, isInvertColor = false} = props;

    return (
    <>
        <div className="form_conteiner" >
            <div onClick={()=>{
                onChange();
            }} className="form_submit_botton_container">
                <div className={(isInvertColor)?"form_submit_botton_invert":"form_submit_botton"}>
                    {label}
                </div>
            </div>
        </div>
    </>
    );
}

export function ForminputBottonSubmit(props){
    const {label = "Registrar",isInvertColor = false} = props;
    const refbotton = useRef();

    return (
    <>
        <div style={{height: "5px"}}/>
        <div className="form_conteiner" >
            <button
                ref={refbotton}
                style={{display: "none"}}
                type="primary"
                htmlType="submit"
            >
                Registrar
            </button>
            <div onClick={()=>{
                refbotton.current.click();
            }} className="form_submit_botton_container">
                <div className={(isInvertColor)?"form_submit_botton_invert":"form_submit_botton"} style={{width: "100%"}}>
                    {label}
                </div>
            </div>
        </div>
    </>
    );
}

export function ForminputComboBox(props){
    // encabezados
    const [statecheckbox, changesetcheckbox] = useState("");

    let {
    keyname="KeyComboBox",
    checkbox = statecheckbox,
    setcheckbox = changesetcheckbox,
    isdefault= false,
    valueInit = 0,
    height = 0,
    keyvalue= "id",
    keylabel= "label",
    width = 0,
    datacombo=[{id:1,label:"tecnologia"},{id:2,label:"computer"},{id:3,label:"cultura"}],
    onChangeinput=(json)=>{}} = props;

    useEffect(()=>{
        if(isdefault){
            setcheckbox(0);
        }else{
            if(valueInit == 0){
                setcheckbox((datacombo[0])[keyvalue]);
            }else{
                setcheckbox(valueInit);
            }
        }
    },[]);
    // estados del componentes
    //const [checkbox, setcheckbox] = useState((isdefault)?"0":(valueInit === "")? (datacombo[0])[keyvalue] : valueInit);

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_conteiner" style={(width == 0)?{}:{width: `${width}%`}}>
                <div className="form_input_ComboBox_conteiner" style={(height == 0)?{}:{height: `${height}px`, padding: "0px"}}>
                    <select className="form_input_ComboBox" style={(height == 0)?{}:{height: `${height}px`, padding: "0px 10px 0px 10px"}} name={`${keyname}`} id={`${keyname}`} value={checkbox} onChange={(e)=>{
                        setcheckbox(e.target.value);
                        // si la opccion de default esta activada
                        if(isdefault && e.target.value == "0"){
                            let json = {value:"0",label:"Default"};
                            onChangeinput(json);
                            return;
                        }else{
                            let nameitem = datacombo.filter((item)=>{
                                return item[keyvalue] == e.target.value;
                            });
                            let json = {value:(nameitem[0])[keyvalue],label:(nameitem[0])[keylabel]};
                            onChangeinput(json);
                        }
                        //---------------------------------------
                    }} >
                        {(isdefault)?<option value={"0"}>Default</option>:<></>}
                        {datacombo.map((item)=>{
                            return <option value={`${item[keyvalue]}`}>{item[keylabel]}</option>;
                        })}
                    </select>
                </div>
            </div>
        </>
    );
}

export function ForminputImageCircle(props){
    const {keyname="keyimagecircle",oncallbackchange=(file)=>{
        //console.log(file);
    },urlphoto="https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg"} = props;
    const [urlImage, seturlImage] = useState(urlphoto);

    const refimage = useRef();

    const onclickuploud = () =>{
        refimage.current.click();
    }

    const onchange = (evt) =>{
        let file = evt.target.files[evt.target.files.length - 1];
        seturlImage(URL.createObjectURL(file));
        oncallbackchange(file);
    }

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_image_circle_conteiner_pather">
                <div className="form-image-circle-conteiner">
                    <div className="form-image-circle"
                        style={{
                            backgroundImage: `url('${urlImage}')`
                        }}
                    >
                    </div>
                    <div className="form-image-circle-botton" onClick={onclickuploud}>
                    <div className="form-image-circle-botton-container">
                            <PictureOutlined className="form-image-rectangle-botton-icon" />
                        </div>
                    </div>
                    <input type="file"
                        onChange={onchange}
                        ref={refimage}
                        id={`${keyname}`}
                        name={`${keyname}`}
                        accept="image/png, image/jpeg, image/jpg" />
                </div>
            </div>
        </>
    );
}

export function ForminputImageRectangle(props){
    const {
        keyname="keyimagerectangle",
        urlphoto = "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg",
        oncallbackchange=(file)=>{
            //console.log(file);
        }
    } = props;
    const [urlImage, seturlImage] = useState(urlphoto);
    const refimage = useRef();

    const onclickuploud = () =>{
        refimage.current.click();
    }

    const onchange = (evt) =>{
        let file = evt.target.files[evt.target.files.length - 1];
        seturlImage(URL.createObjectURL(file));
        oncallbackchange(file);
    }

    return (
        <>
            <div style={{height: "5px"}}/>
            <div className="form_image_rectangle_conteiner_pather">
                <div className="form-image-rectangle-conteiner">
                    <div className="form-image-rectangle"
                        style={{
                            backgroundImage: `url('${urlImage}')`
                        }}
                    >
                    </div>
                    <div className="form-image-rectangle-botton" onClick={onclickuploud}>
                        <div className="form-image-rectangle-botton-container">
                            <PictureOutlined className="form-image-rectangle-botton-icon" />
                        </div>
                    </div>
                    <input type="file"
                        onChange={onchange}
                        ref={refimage}
                        id={`${keyname}`}
                        name={`${keyname}`}
                        accept="image/png, image/jpeg, image/jpg" />
                </div>
            </div>
        </>
    );
}

/**
 * <input para form de tipo password, con ocultar o desocultar texto>
 * @param   {<string>} keylistchip <Id del input>
 * @param   {<string>} listdatos <Lista de datos que va a tener una id, un nombre y una imagen>
 * @param   {<string>} keytitle <La key del Json de la lista de objetos, que sera de nombre>
 * @param   {<string>} key <La key del Json de la lista de objetos, que sera la id de cada chips>
 * @param   {<string>} keyimage <La key del Json de la lista de objetos, que sera la url del la imagen>
 * @param   {<string>} isimage <Validador si se desea colocar una imagen, por predeterminado es falso>
 * @param   {<string>} onChangeItems <Es el metodo que reaciona al precionar un chip, y tiene como parametro su id>
 * @param   {<string>} initvalue <Es el indice de inicio>
 * @return  {<type>}        <description>
 */

export function FormListchipts(props){

    const [changeidstate, setchangeidstate] = useState(0);
    const { keyname="keylistchip",
            isdisable = false,
            listdatos = [{id:0,name:"hola",imgUrl:"data:image/png;base64,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"},
                        {id:1,name:"hola",imgUrl:"data:image/png;base64,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"},
                        {id:2,name:"hola",imgUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAATlBMVEX///+ampqXl5eTk5ORkZGenp7x8fG8vLzT09Ompqabm5vX19f7+/vj4+P5+fmysrLJycnq6uq5ubnc3Nyvr6/Ozs7ExMTr6+ukpKTk5OTQNfNrAAAGOUlEQVR4nO2dC5aqMBBEJVEUP+ioOLr/jT4QmRFFB5PuVIXHXQF1kvQv3WEyGRkZGRmJhXSz2p3m+/1+fipWlxT9ObLkh1NmrDW/WJscd5s1+sNkSIusFJc8Uco0x1WO/jxvVsdy6Z7l/arcbtCf6MXOdK1eW6RdLtCf6czuzeq1RCZxajwk/fRV2Fl8ezU92t76rhq3kRnWxZ/n72mrmgP6oz/hwwWsmc7Rn92bdPnpAt6W8RyJd9y46askmi/0x/dh4bJDG2wENrXwEVgeRnp7U0y9BPJLXPgKLDcqtcSD3xa9SSQ2N18SAkuTSpse585u4kHhDK3kFZmQwsRs0VK6OUkJLI/iCi2mi43MIbxJJDyK66WgwMRkaD3P7OX2aIWlS/uFHMWdRLY8YyYskM6eeiUU3Uy5QhvZQ3iFy9jsFBRS5YprDYFUi6iyhOUiXtDCflDRVy7iES2sYSVvSGtoYrezksDEnNDSar61lrCUiNZWM9exMxUkNRs9gYnZo8VViOaFj1i0ugrhtOlBIcM21RSYGIL7KPHEsM0SrU8tYmsgcPpiJcRuDL6aoSuQwF8oH8Mkgde/C+U1xFekVL3hVSE6SVTLKxpMgRWoU79oKQT7/FTb0MATfdWwuwYc1SzUd2lisA1vyjFbBdhdKOb3Pwq/oQq3ARRiS9/KcfdVITYJztQFJgZ7py9+bdihEJs/iV7e/7cKsYHpqFBCIXaXhrA0WFs6fG8RwuNjY5oQURu26yRE5I2tCQfIngw2e1oFUAgVGKKKAS4JD78SNfxqon5Qg64IT47qVX30Pbe6QwQXokLcPaHng9XdBfz+UNtdoJ3FRP+WG9+8p92pgJ8PUjamcFOqfvtE0H+p3IzB0M2uqhAelVao9ioQGBplU0PQ1qac5hMYGt2ohiCiqdDs80YnhzWKNVMCf1+h6PMpjqHmQaSZI1W7YqPwhhVqHhHeW9og8qJJBzwjllpFUxJfUaHkLyhCthqlwI1mk5bbVOUgEm1SpW1KY0krNKwpSdTdoLCG8AuLNoLvCzWQxKQN8rGp2aE1PSBeGKayMxXStgY/s/aE8GUwUTzTIPt0BE1meI9olki4hLKLSFHqfkbwJNIZ0ho5c0rnCxvEOk8IhvC7kQps4IOxr9mJSCQ1MzUisRu8v+QdEvuU+RnhiYRTtEy1iy58q8OEEfcjfkeRpwj8hpmHRN5XoO/JPSSC+/L7kjsHqNSe8B7nshRxMNPGvciP/vK+uDaCReApbuSuCvFvQvXFcZeSx2v3OBpTeNN6fxwnS2kT32fckv0oIrYbbteJlDXSFzgqjMZZOCuMJWab/A8K3XLEmHapW+s32cX9WxxjmjP6u3vjHJeiP7w3rhN7lFdqnbg+QxBPbuH64Ek0QY174TuSQpTHaDBVr94bfC700d/eC5/pboKZ2L/x+wkiyQjJWzyvupf0lQzvu6czucS59/2hmVFHNk5/HH+ErHX2nvws025iWdtpvoxUP43lDN9E+9rOhIfR38a0JBqiH+ddWYt3QU+5wpuL2BH8xWZEnvGkMxWUsOzUVO0BF8uxUwurOOlMYFO/fNpneoA2OOlW/1XBJTCIS+eKG/QXm4Fuv7/3QfSVGHsM32izXmWh9NUas7Cj+Ydgy3cn0swDucd8tbXh9V01Wn2R68vpbBUCtE9EHgu1YtXXLjOYxWuLvKq8SMes+WJroIvXplRps9NBLN5JdxmRuh9KmbP5wf+mIy+yKZ+6BmOmWeG1lJstwcn7g3Ipd64iF2d+fVccA4Ii0X+NXAxjk9OHR3JBaFveY+z8A42HZWz6Kow99XSTuUhxHoHp1+ywim6D3mGzv+2qftquivlr+C1VrrsE4P2tR4D/VehjZq+NquzTDzCMeXUYByKw5IXEwxT9YXJ0SlT/iXhITPLs/P0aYejomN4QuoSn4elaR+G1LjAPg2KDOoQ32mPT6n+BB9B6BGYxwCVsP+QzuEN45W5GJcAv8CBM02Ev4d0oVYC/3INoBm+HaEhrbr3xl0Ea0pp6lmo/2E3aBDYDFlh3/w+icvGSagQ+wB9vgVTbNMDfw4FU2xT9DcrMBq/QpkNXaBaDV7gdusIkGRXGz6gwfkaF8TMqjJ9RYfz8A582eCrCj5PNAAAAAElFTkSuQmCC"},
                        {id:3,name:"hola",imgUrl:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADgCAMAAADCMfHtAAAATlBMVEX///+ampqXl5eTk5ORkZGenp7x8fG8vLzT09Ompqabm5vX19f7+/vj4+P5+fmysrLJycnq6uq5ubnc3Nyvr6/Ozs7ExMTr6+ukpKTk5OTQNfNrAAAGOUlEQVR4nO2dC5aqMBBEJVEUP+ioOLr/jT4QmRFFB5PuVIXHXQF1kvQv3WEyGRkZGRmJhXSz2p3m+/1+fipWlxT9ObLkh1NmrDW/WJscd5s1+sNkSIusFJc8Uco0x1WO/jxvVsdy6Z7l/arcbtCf6MXOdK1eW6RdLtCf6czuzeq1RCZxajwk/fRV2Fl8ezU92t76rhq3kRnWxZ/n72mrmgP6oz/hwwWsmc7Rn92bdPnpAt6W8RyJd9y46askmi/0x/dh4bJDG2wENrXwEVgeRnp7U0y9BPJLXPgKLDcqtcSD3xa9SSQ2N18SAkuTSpse585u4kHhDK3kFZmQwsRs0VK6OUkJLI/iCi2mi43MIbxJJDyK66WgwMRkaD3P7OX2aIWlS/uFHMWdRLY8YyYskM6eeiUU3Uy5QhvZQ3iFy9jsFBRS5YprDYFUi6iyhOUiXtDCflDRVy7iES2sYSVvSGtoYrezksDEnNDSar61lrCUiNZWM9exMxUkNRs9gYnZo8VViOaFj1i0ugrhtOlBIcM21RSYGIL7KPHEsM0SrU8tYmsgcPpiJcRuDL6aoSuQwF8oH8Mkgde/C+U1xFekVL3hVSE6SVTLKxpMgRWoU79oKQT7/FTb0MATfdWwuwYc1SzUd2lisA1vyjFbBdhdKOb3Pwq/oQq3ARRiS9/KcfdVITYJztQFJgZ7py9+bdihEJs/iV7e/7cKsYHpqFBCIXaXhrA0WFs6fG8RwuNjY5oQURu26yRE5I2tCQfIngw2e1oFUAgVGKKKAS4JD78SNfxqon5Qg64IT47qVX30Pbe6QwQXokLcPaHng9XdBfz+UNtdoJ3FRP+WG9+8p92pgJ8PUjamcFOqfvtE0H+p3IzB0M2uqhAelVao9ioQGBplU0PQ1qac5hMYGt2ohiCiqdDs80YnhzWKNVMCf1+h6PMpjqHmQaSZI1W7YqPwhhVqHhHeW9og8qJJBzwjllpFUxJfUaHkLyhCthqlwI1mk5bbVOUgEm1SpW1KY0krNKwpSdTdoLCG8AuLNoLvCzWQxKQN8rGp2aE1PSBeGKayMxXStgY/s/aE8GUwUTzTIPt0BE1meI9olki4hLKLSFHqfkbwJNIZ0ho5c0rnCxvEOk8IhvC7kQps4IOxr9mJSCQ1MzUisRu8v+QdEvuU+RnhiYRTtEy1iy58q8OEEfcjfkeRpwj8hpmHRN5XoO/JPSSC+/L7kjsHqNSe8B7nshRxMNPGvciP/vK+uDaCReApbuSuCvFvQvXFcZeSx2v3OBpTeNN6fxwnS2kT32fckv0oIrYbbteJlDXSFzgqjMZZOCuMJWab/A8K3XLEmHapW+s32cX9WxxjmjP6u3vjHJeiP7w3rhN7lFdqnbg+QxBPbuH64Ek0QY174TuSQpTHaDBVr94bfC700d/eC5/pboKZ2L/x+wkiyQjJWzyvupf0lQzvu6czucS59/2hmVFHNk5/HH+ErHX2nvws025iWdtpvoxUP43lDN9E+9rOhIfR38a0JBqiH+ddWYt3QU+5wpuL2BH8xWZEnvGkMxWUsOzUVO0BF8uxUwurOOlMYFO/fNpneoA2OOlW/1XBJTCIS+eKG/QXm4Fuv7/3QfSVGHsM32izXmWh9NUas7Cj+Ydgy3cn0swDucd8tbXh9V01Wn2R68vpbBUCtE9EHgu1YtXXLjOYxWuLvKq8SMes+WJroIvXplRps9NBLN5JdxmRuh9KmbP5wf+mIy+yKZ+6BmOmWeG1lJstwcn7g3Ipd64iF2d+fVccA4Ii0X+NXAxjk9OHR3JBaFveY+z8A42HZWz6Kow99XSTuUhxHoHp1+ywim6D3mGzv+2qftquivlr+C1VrrsE4P2tR4D/VehjZq+NquzTDzCMeXUYByKw5IXEwxT9YXJ0SlT/iXhITPLs/P0aYejomN4QuoSn4elaR+G1LjAPg2KDOoQ32mPT6n+BB9B6BGYxwCVsP+QzuEN45W5GJcAv8CBM02Ev4d0oVYC/3INoBm+HaEhrbr3xl0Ea0pp6lmo/2E3aBDYDFlh3/w+icvGSagQ+wB9vgVTbNMDfw4FU2xT9DcrMBq/QpkNXaBaDV7gdusIkGRXGz6gwfkaF8TMqjJ9RYfz8A582eCrCj5PNAAAAAElFTkSuQmCC"},
                        {id:4,name:"hola",imgUrl:"data:image/png;base64,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"},
                        {id:5,name:"hola",imgUrl:"data:image/png;base64,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"},
                        {id:6,name:"hola",imgUrl:"data:image/png;base64,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"},
                        {id:7,name:"hola",imgUrl:"data:image/png;base64,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"},
                        {id:8,name:"hola",imgUrl:"data:image/png;base64,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"},
                        {id:9,name:"hola",imgUrl:"data:image/png;base64,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"}],
            keytitle="name",
            keyitem="id",
            keyimage="imgUrl",
            isimage=false,
            isActionChips = false,
            idstate = changeidstate,
            setidstate = setchangeidstate,
            actionChips=[
                {
                    icon: CloseOutlined,
                    onAction: (id)=>{
                        // console.log(id);
                    }
                }
            ],
            onChangeItems=(item)=>{},
            initvalue=0} = props;
    //const [idstate, setidstate] = useState(initvalue);
    const [currentScrollPossition, _] = useState(0);
    const [statecontainer, setstatecontainer] = useState(true);
    const [stadebackbutton, setstadebackbutton] = useState("none");
    const [stadesigbutton, setstadesigbutton] = useState("flex");

    const scrollref = useRef();

    // let contentitems = useRef()
    // const scrollcontent = useRef()

    useEffect(()=>{
        //valida_estado_scroll();
        setidstate(initvalue);
        setstatecontainer((scrollref.current.scrollLeft < (scrollref.current.scrollWidth - scrollref.current.clientWidth)));
    },[])

    const Chipst = (props) =>{
        const {name,iditem=0,itemSelect=0,onclickcall=(item)=>{
            console.log(item);
        },photo,isphoto=false, actionChips = [{
            icon: CloseOutlined,
            onAction: (id)=>{
                console.log(id);
            }
        }],isChipsAction=false} = props;
        const {statechip, setstatechip} = useState(false);

        return (
            <div className={(iditem === itemSelect)?"form-item-chips-activate":"form-item-chips"} >
                {(isphoto)?<div className="form-item-chips-photo" style={{backgroundImage:`url('${photo}')`}}/>:<div></div>}
                <div className={(iditem === itemSelect)?"form-item-chips-label-active":"form-item-chips-label"} onClick={()=>{
                    onclickcall(iditem);
                }}>{name}</div>
                {(isChipsAction)?<div style={{width:"10px"}}/>:<></>}
                {/* imprime todas las acciones */}
                {(isChipsAction)?actionChips.map(item=>{
                    return <div onClick={()=>{item.onAction(iditem);}} className="form-item-chips-action">
                        <item.icon className={(iditem === itemSelect)?"form-item-chips-action-icon-activate":"form-item-chips-action-icon"} ></item.icon>
                    </div>;
                }):<></>}
            </div>
        );
    }


    function valida_estado_scroll(){
        var maxScrollLeft = scrollref.current.scrollWidth - scrollref.current.clientWidth;
        //console.log(`${scrollref.current.scrollLeft} < ${maxScrollLeft}`);
        // comprovamos si el escrol esta en la posicion 0 o no
        if(scrollref.current.scrollLeft !== 0){
        setstadebackbutton("flex");
        }else{
        setstadebackbutton("none");
        }
        // comprovamos si el escrol esta en la posicion maxima o no
        if(scrollref.current.scrollLeft < maxScrollLeft){
        setstadesigbutton("flex");
        }else{
        setstadesigbutton("none");
        }
    }

    function scrollHorizontall(vall) {
        let scrollAmount = 0;
        var selider = setInterval(()=>{
            scrollAmount += 10
            scrollref.current.scrollLeft += vall;
            valida_estado_scroll();

            // console.log(scrollref.current.scrollLeft)
            if(scrollAmount >= 100){
            window.clearInterval(selider);
            }
        },25)
        //scrollcont.style.left = currentScrollPossition + "px";
        // console.log(currentScrollPossition + "px");
    }



    return (
        <>
        <input type="text" value={idstate} id={keyname} name={keyname} style={{display:"none"}} />
        <div className="form-content-principal-list-chip">
            {/* <div className="subtitlecategori">Seleccione a categoria a consultar o votar:</div> */}
            <div ref={scrollref} id="listarchispt" onScroll={()=>{
            valida_estado_scroll();
            }} className="form-content-list-chips">
            <div className="sig-content noselect" style={{
                    display:  stadebackbutton
                }} onClick={()=>{
                    scrollHorizontall(-10);
                }}
            >
                <div className="btn-option-sig-back">
                    <LeftOutlined className="form-icon-list-chips" />
                </div>
            </div>
            <div style={{
                    display:stadesigbutton
                }} className="bac-content"  onClick={()=>{
                    scrollHorizontall(10);
                }}
            >
                <div className="btn-option-sig-back">
                    <RightOutlined className="form-icon-list-chips" />
                </div>
            </div>
            <div id="containerchipst" className="form-list-container-item-chips noselect" style={{justifyContent: `${statecontainer?"start":"center"}`}}>
                {listdatos.map((item)=>{
                    //console.log(item[keyitem]);
                    return (<Chipst actionChips = {actionChips} isChipsAction={isActionChips}  isphoto={isimage} onclickcall={(id)=>{
                        if(!isdisable){
                            setidstate(id);
                            //console.log(id);
                            onChangeItems(item);
                        }
                    }} name ={item[keytitle]} iditem={item[keyitem]} photo={(isimage)?item[keyimage]:""} itemSelect={idstate}/>);
                })}
            </div>
            </div>
        </div>
        </>
    );
}

export function ForminputDate(props){
    const dateactual = new Date();
    // dateactual.toISOString().slice(0, 10)
    const {
        keyname="keyinputDate",
        valueInit= dateactual.toISOString().slice(0, 10),
        min = `${dateactual.getFullYear()}-01-01`,
        max = `${dateactual.getFullYear()}-12-31`,
        messValidator="Error. La casilla esta vacia.",
        onChangeDate = (date) => {
            //console.log(date);
        },
        modeinput = false,
        iserror= false
    } = props;
    // estados del componentes
    const [dateinput, setdateinput] = useState(valueInit);
    const [valuestade,setvaluestade] = useState(iserror);

        return (
            <>
                <div style={{height: "5px"}}/>
                <div className="form_conteiner">
                    <div className="form_input_date_conteiner"
                        style={{
                            backgroundColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                        }}
                    >
                        <input
                            className="form_input_date"
                            type="date"
                            id={`${keyname}`}
                            name={`${keyname}`}
                            value={(modeinput)?valueInit:dateinput}
                            onChange={(e)=>{
                                setdateinput(e.target.value);
                                onChangeDate(e.target.value);
                            }}
                            min={min}
                            max={max}/>
                    </div>
                </div>
            </>
        );
}

export function ForminputDatetoDate(props){
    const dateactual = new Date();
    // dateactual.toISOString().slice(0, 10)
    // esta funcion lo que hace es sumar un dias, segun la fecha que se le pase, y la cnatidad de dias a sumar
    const adddateunday = (data,cantday=1) =>{
        let fechafinalactu = new Date(data);
        let secondfechalatu = fechafinalactu.getTime() + (cantday*86400000);
        let datesum = new Date(secondfechalatu);
        return datesum.toISOString().slice(0, 10);
    }
    // esta funcion lo que hace es resta un dias, segun la fecha que se le pase, y la cnatidad de dias a sumar
    const delectdateunday = (data,cantday=1) =>{
        let fechafinalactu = new Date(data);
        let secondfechalatu = fechafinalactu.getTime() - (cantday*86400000);
        let datesum = new Date(secondfechalatu);
        return datesum.toISOString().slice(0, 10);
    }
    // props de componente
    let {
        keyname="keyinputdatetodate",
        valueInitInicial = dateactual.toISOString().slice(0, 10),
        valueInitFinal = adddateunday(dateactual.toISOString().slice(0, 10)),
        messValidator="Error. Con la seleccion de fechas.",
        onChangeDate = (date) => {
            //console.log(date);
        }
    } = props;
    // inicializar valiable
    // estados del componentes
    const [dateinputInitian, setdateinputInitian] = useState(valueInitInicial);
    const [dateinputFinal, setdateinputFinalt] = useState(valueInitFinal);
    // validaciones de error
    //const [statedateinputInitian,setstatedateinputInitian] = useState(false);
    //const [statedateinputFinal,setstatedateinputFinal] = useState(false);
    const [valuestade,setvaluestade] = useState(false);


        return (
            <>
                <div style={{height: "5px"}}/>
                <div className="form_conteiner">
                    <div className="form_input_date_to_date_conteiner">
                        <div className="form-date-input-item">
                            <ForminputDate
                                min = {(valueInitInicial !== dateactual.toISOString().slice(0, 10))? valueInitInicial : dateactual.toISOString().slice(0, 10)}
                                modeinput = {true}
                                //iserror = {statedateinputInitian}
                                onChangeDate={
                                (data)=>{
                                    let fechainit = new Date(data);
                                    let fechafinal = new Date(dateinputFinal);
                                    //setvaluestade((fechainit.getTime() > fechafinal.getTime()));
                                    //setstatedateinputInitian(!(fechainit.getTime() > fechafinal.getTime()));
                                    setdateinputInitian(data);
                                    // sumar un dia mas a la fecha
                                    if ((fechainit.getTime() > fechafinal.getTime())){
                                        setdateinputFinalt(adddateunday(data));
                                    }
                                }}
                                valueInit={dateinputInitian}
                                keyname={`init_${keyname}`} />
                        </div>
                        <div className="form-date-input-item-text">
                            <h6>a</h6>
                        </div>
                        <div className="form-date-input-item">
                            <ForminputDate
                                modeinput = {true}
                                //iserror = {statedateinputFinal}
                                min = {dateinputInitian}
                                onChangeDate={
                                (data)=>{
                                    let fechainit = new Date(dateinputInitian);
                                    let fechafinal = new Date(data);
                                    //setvaluestade((fechainit.getTime() > fechafinal.getTime()));
                                    //setstatedateinputFinal(!(fechainit.getTime() > fechafinal.getTime()));
                                    setdateinputFinalt(data);
                                    if ((fechainit.getTime() > fechafinal.getTime())){
                                        setdateinputInitian(delectdateunday(data));
                                    }
                                }}
                                valueInit={dateinputFinal}
                                keyname={`fina_${keyname}`}/>
                        </div>
                    </div>
                    <div style={{height: "10px"}}/>
                    {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                    {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
                </div>
            </>
        );
}

export function ForminputSelectIcon(props){

    const [stateSelectIcon, changeSelectIcon] = useState("");
    let {
        keyname="KeySelectIcon",
        checkbox = stateSelectIcon,
        setcheckbox = changeSelectIcon,
        // isdefault= false,
        valueInit = 0,
        onChangeinput=(json)=>{}
    } = props;
    const messValidator = "No se a seleccionado a un icono";
    const [ismodalvisible, setismodalvisible] = useState(false);
    const [valuestade, changevaluestade] = useState(false);
    const [itemIcon, setitemIcon] = useState({
        id: 0,
        name: "",
        iconObjs: 0
    });

    useEffect(()=>{
        setcheckbox(valueInit);
        if (valueInit != 0){
            let listIcons = new LisObjIcons();
            setitemIcon(listIcons.getIcon(valueInit));
        }
    },[]);

    const onchange = ()=>{
        // console.log("holanda");
        let state = !ismodalvisible;
        setismodalvisible(state);
    }

    const onChangeSelect = (key) => {
        setcheckbox(key);
        let listIcons = new LisObjIcons();
        let jsondata = listIcons.getIcon(key);
        setitemIcon(jsondata);
        onChangeinput(jsondata);
        // console.log(jsondata);
    }

    return (
        <>
            <div className="form_conteiner_selectIcon">
                <div className="form_selectIcon_conteiner">
                    <div
                        className="form_selectIcon_input_conteiner"
                        style={{
                            borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
                        }}
                    >
                        {(checkbox == 0)?
                            <div className="form_selectIcon_conteiner_itemScelecciont">
                                <div>Selecciona Icono</div>
                            </div>:
                            <div className="form_selectIcon_conteiner_itemScelecciont">
                                <div className="container_selectIcon_icon" >{itemIcon.iconObjs}</div>
                                <div style={{height:"10px"}}/>
                                <div className="container_selectIcon_text" style={{color:`${(!valuestade)?"#9686C3":"#f44336"}`}}>{itemIcon.name}</div>
                            </div>
                        }
                        <div className="form_selectIcon_conteiner_buttton" onClick={onchange} >
                            <SendOutlined style={{color: "white"}} />
                        </div>
                    </div>
                </div>
                <input
                    type="text"
                    style={{display: "none"}}
                    id={`${keyname}`}
                    name={`${keyname}`}
                    value={checkbox}
                    onChange={(e)=>{
                        // let listchar = onValidFilter(e.target.value);
                        // listchar = (listchar.length >= (Limitchar + 1))? listchar.substring(0,(Limitchar + 1)-1):listchar;
                        // changeSelectIcon(e.target.value);
                        // onChangeinput(e.target.value);
                    }}
                />
                <FormModalSelectIcon propismodalvisible={ismodalvisible} propsetismodalvisible={setismodalvisible} onChangeSelect={onChangeSelect} />
                <div style={{height: "10px"}}/>
                {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
                {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
            </div>
        </>
    );

}
// formulario de seleccion de items
export {ForminputSelectItem};
// export function ForminputSelectItem(props){
//     const [stateSelectItem, changestateSelectItem] = useState("");
//     let {
//         nameTitle = "Selecciona el item",
//         keyname = "KeySelectIcon",
//         checkbox = stateSelectItem,
//         setcheckbox = changestateSelectItem,
//         listaObj = [
//             {
//                 id: 1,
//                 name: "basic1",
//                 photo: "https://idisl.info/wp-content/uploads/2015/07/generic-avatar.png"
//             },
//             {
//                 id: 2,
//                 name: "basic2",
//                 photo: "https://idisl.info/wp-content/uploads/2015/07/generic-avatar.png"
//             }
//         ],
//         valueInit = 0,
//         onChangeinput=(json)=>{}
//     } = props;
//     const messValidator = "No se a seleccionado a un icono";
//     const [ismodalvisible, setismodalvisible] = useState(false);
//     const [valuestade, changevaluestade] = useState(false);
//     const [itemIcon, setitemIcon] = useState({
//         id: 0,
//         name: "",
//         photo: ""
//     });

//     useEffect(()=>{
//         setcheckbox(valueInit);
//         if (valueInit != 0){
//             let listjsondata = listaObj.filter((item)=>{
//                 return item.id == valueInit;
//             });
//             let jsondata = (listjsondata.length != 0)? listjsondata[0]: {}
//             setitemIcon(jsondata);
//         }
//     },[]);

//     const onchange = ()=>{
//         // console.log("holanda");
//         let state = !ismodalvisible;
//         setismodalvisible(state);
//     }

//     const onChangeSelect = (key) => {
//         setcheckbox(key);
//         let jsondata = listaObj.filter((item)=>{
//             return item.id == key;
//         });
//         if (jsondata.length != 0){
//             setitemIcon(jsondata[0]);
//             onChangeinput(jsondata[0]);
//         }
//         // console.log(jsondata);
//     }

//     return (
//         <>
//             <div className="form_conteiner_seletItem">
//                 <div className="form_seletItem_conteiner">
//                     <div
//                         className="form_seletItem_input_conteiner"
//                         style={{
//                             borderColor:`${(!valuestade)?"#9686C3":"#f44336"}`
//                         }}
//                     >
//                         {(checkbox <= 0)?
//                             <div className="form_seletItem_conteiner_itemScelecciont" style={{alignItems: "center"}}>
//                                 <div className="form_seletItem_conteiner_itemScelecciont_textdefault">{nameTitle}</div>
//                             </div>:
//                             <div className="form_seletItem_conteiner_itemScelecciont">
//                                 <div className="container_item_selectItem_subcont">
//                                     <div className="container_item_selectItem_contentItem">
//                                         <div className="container_item_selectItem_subcontaion_photo" style={{backgroundImage: `url('${itemIcon.photo}')`}} ></div>
//                                         <div style={{width:"10px"}}/>
//                                         <div className="container_item_selectItem_subcontaion_nametext"> {itemIcon.name}</div>
//                                         <div style={{width:"10px"}}/>
//                                         <div onClick={()=>{setcheckbox(0); }}>
//                                             <CloseCircleOutlined style={{color: "white"}} />
//                                         </div>
//                                         <div style={{width:"5px"}}/>
//                                     </div>

//                                 </div>
//                             </div>
//                         }
//                     </div>
//                     <div className="form_seletItem_conteiner_buttton" onClick={onchange} >
//                         <SendOutlined style={{color: "white"}} />
//                     </div>
//                 </div>
//                 <input
//                     type="text"
//                     style={{display: "none"}}
//                     id={`${keyname}`}
//                     name={`${keyname}`}
//                     value={checkbox}
//                 />
//                 <FormModalSelectItem nameTitle={nameTitle} listaObj={listaObj} propismodalvisible={ismodalvisible} propsetismodalvisible={setismodalvisible} onChangeSelect={onChangeSelect} />
//                 <div style={{height: "10px"}}/>
//                 {(valuestade)?<div className="form_input_validator">{messValidator}</div>:<div></div>}
//                 {(valuestade)?<div style={{height: "5px"}}/>:<div></div>}
//             </div>
//         </>
//     );

// }