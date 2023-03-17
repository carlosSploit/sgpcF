import { CloseOutlined, DownOutlined, FileExclamationOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import './index.css';

// component FilterBar
export function ComponentFilterBar(props){
    const [iskeyoptions, setiskeyoptions] = useState([]);
    const [propcollapeseFilterBar, propsetcollapseFilterBar] = useState(false);
    const {
    onchangeoption=(objJson)=>{},
    onselectetoption=(objJson)=>{},
    collapeseFilterBar = propcollapeseFilterBar,
    setcollapseFilterBar = propsetcollapseFilterBar,
    propiskeyoptions = iskeyoptions,
    propsetiskeyoptions = setiskeyoptions,
    databasic = [
        {
            label: "options1",
            keyFilter: 'id_filter',
            Icon: FileExclamationOutlined,
            key: -1,
            options:[
                {
                    label: "options",
                    key: 1
                },
                {
                    label: "options",
                    key: 2
                },
                {
                    label: "options",
                    key: 3
                }
            ]
        },
        {
            label: "options2",
            keyFilter: 'id_filter2',
            Icon: FileExclamationOutlined,
            key: -1,
            options:[
                {
                    label: "options",
                    key: 1
                },
                {
                    label: "options",
                    key: 2
                },
                {
                    label: "options",
                    key: 3
                }
            ]
        },{
            label: "options3",
            keyFilter: 'id_filter3',
            Icon: FileExclamationOutlined,
            key: -1,
            options:[
                {
                    label: "options",
                    key: 1
                },
                {
                    label: "options",
                    key: 2
                },
                {
                    label: "options",
                    key: 3
                }
            ]
        }
    ],iskeyinit = [] } = props;
    // ver de forma importante
    const [memoricollapse,setmemoricollapse] = useState([]); // lista de los componentes con su historial de collapso

    const CompruExistenciaOppccionSeletc = (objData) => {
        let listFilterData = [...propiskeyoptions];
        // comprueba si hay algo parecido a el
        let CompruExistenciaItems = listFilterData.filter((item)=>{
            return (item.keyFilter == objData.keyFilter);
        })
        if(CompruExistenciaItems.length != 0) {
            if (CompruExistenciaItems[0].keyvalue == objData.keyvalue) return {stade: true, data: [CompruExistenciaItems[0]]}
            return {stade: true, data: []}
        }
        return {stade: false, data: []}
    }

    const onChangeClick = (objData) =>{
        let listFilterData = [...propiskeyoptions];
        // se comprueba si ya se selecciono una opccion y si esta opccion presenta el mismo key o no
        let compruebeKey = CompruExistenciaOppccionSeletc(objData)
        // ya hay una opccion seleccionada y es la misma que la del key
        if (compruebeKey.stade && compruebeKey.data.length != 0) return
        // ya hay una opccion seleccionada
        if (compruebeKey.stade && compruebeKey.data.length == 0) {
            // comprueba si hay algo parecido a el
            let CompruExistenciaItems = listFilterData.filter((item)=>{
                return (item.keyFilter != objData.keyFilter);
            })
            onselectetoption(objData)
            CompruExistenciaItems.push(objData)
            propsetiskeyoptions(CompruExistenciaItems);
            return
        }
        onselectetoption(objData);
        listFilterData.push(objData)
        propsetiskeyoptions(listFilterData);
    }
    // se inicializa los primeros datos

    useEffect(()=>{
        propsetiskeyoptions(iskeyinit);
        setmemoricollapse(databasic.map((item,index)=>{
            return {key: index, stadecolap: false};
        }));
    },[])
    
    const HistoryCollapse = (index) => {
        let auxdata = memoricollapse.filter((item)=>{
            return item.key == index; 
        });
        return (auxdata.length != 0)?auxdata[0].stadecolap:false;
    }
    // guarcar la informacion del colapso de un item
    const onCollapset = (index, stade) => {
        setmemoricollapse(memoricollapse.map((item)=>{
            if(index == item.key){
                // console.log(`${index},${item.key}`);
                return {key: index, stadecolap: stade};
            }else{
                return item;
            }
        }));
    }

    return (
        <div className={(collapeseFilterBar)?"container_FilterBar_collapset":"container_FilterBar"}>
            <div className="container_FilterBar_heard">
                <div className="container_FilterBar_heard_title">Filtra tus resultados</div>
                {(propiskeyoptions.length != 0)?<div className="container_FilterBar_heard_tabFilter">
                    {propiskeyoptions.map((item) => {
                        return (<ChipstFilter objJson={item} listdatos={propiskeyoptions} itemSelect = {-1} actionChips = {[{
                            icon: CloseOutlined,
                            onAction: (objJson)=>{
                                // console.log(objJson)
                                // console.log(propiskeyoptions)
                                let listFilterData = [...propiskeyoptions];
                                let CompruExistenciaItems = listFilterData.filter((item)=>{
                                    // console.log(`${(item.keyFilter != objJson.keyFilter)} && ${(item.keyvalue != objJson.keyvalue)} = ${(item.keyFilter != objJson.keyFilter) && (item.keyvalue != objJson.keyvalue)}`)
                                    return (item.keyFilter != objJson.keyFilter);
                                })
                                // console.log(CompruExistenciaItems)
                                propsetiskeyoptions(CompruExistenciaItems);
                            }
                        }]} isChipsAction={true} />)
                    })}
                </div>:<></>}
                {(propiskeyoptions.length != 0)?<div className="container_FilterBar_heard_bottonFilter" onClick={async ()=>{
                    const objJsonData = propiskeyoptions.map(element => {
                        return {
                            key: element.keyFilter,
                            value: element.keyvalue
                        }
                    });
                    await onchangeoption(objJsonData)
                }} >Filtrar</div>:<></>}
            </div>
            <div style={{height:'5px'}}></div>
            <div className="container_FilterBar_collapset_liner" />
            <div style={{height:'15px'}}></div>
            <div className="container_FilterBar_body">
                {databasic.map((item,index)=>{
                    return (<ComponentFilterBarSlingItem
                                indexkey = {index}
                                ishistoricollapset = {HistoryCollapse(index)}
                                onCollapset = {onCollapset}
                                InfoItem = {item}
                                Listkeystade={propiskeyoptions} 
                                onChangeClick={onChangeClick} 
                                iscollapset={collapeseFilterBar}/>);
                })}
            </div>
        </div>
    );
}

const ChipstFilter = (props) =>{
    const {listdatos, isInterationsUltime = false, itemSelect=0, objJson = {
        keyFilter: '',
        label: '',
        keyvalue: 0
    } ,onclickcall=(item)=>{ }, actionChips = [{
        icon: CloseOutlined,
        onAction: (objJson)=>{
            console.log(objJson);
        }
    }],isChipsAction=false} = props;
    const {statechip, setstatechip} = useState(false);

    const isUltimo = () => {
        // let dataInfoUltimate = listdatos[listdatos.length - 1];
        return false
    }

    return (
        <div className={"form-itemFilter-chips"} >
            {/* {(isphoto)?<div className="form-itemFilter-chips-photo" style={{backgroundImage:`url('${photo}')`}}/>:<div></div>} */}
            <div className={"form-itemFilter-chips-label"} onClick={()=>{onclickcall(objJson);}}>{objJson.label}</div>
            {(isChipsAction)?<div style={{width:"10px"}}/>:<></>}
            {/* imprime todas las acciones */}
            {(isChipsAction)?((isInterationsUltime)?((isUltimo())?(actionChips.map(item=>{
                return <div onClick={()=>{item.onAction(objJson);}} className="form-itemFilter-chips-action">
                    <item.icon className={"form-itemFilter-chips-action-icon"} ></item.icon>
                </div>;
            })):<></>):(actionChips.map(item=>{
                return <div onClick={()=>{item.onAction(objJson);}} className="form-itemFilter-chips-action">
                    <item.icon className={"form-itemFilter-chips-action-icon"} ></item.icon>
                </div>;
            }))):<></>}
            {/* // {(isChipsAction)?:<></>} */}
        </div>
    );
}

export function ComponentFilterBarSlingItem(props){
    const { iscollapset = false,
            indexkey,
            ishistoricollapset = false,
            onCollapset=(id,stade)=>{},
            onChangeClick=(id)=>{},
            InfoItem={
                label: "options",
                Icon: FileExclamationOutlined,
                keyFilter: 'id_filter',
                key: 0,
                options:[
                    {
                        label: "options",
                        key: 1
                    }
                ]
            }, 
            Listkeystade = []} = props;
    const [iscollapsetitem,setiscollapsetitem ] = useState(ishistoricollapset);

    const comprobKeySelectet= () =>{
        let listFilterData = [...Listkeystade];
        let CompruExistenciaItems = listFilterData.filter((item)=>{
            return (item.keyFilter == InfoItem.keyFilter);
        })
        return CompruExistenciaItems.length;
    }

    const comprobKeySelectetKey = ({id_key}) =>{
        let listFilterData = [...Listkeystade];
        // console.log(InfoItem.keyFilter)
        // console.log(id_key)
        let CompruExistenciaItems = listFilterData.filter((item)=>{
            return (item.keyFilter == InfoItem.keyFilter) && (item.keyvalue == id_key);
        })
        // console.log(CompruExistenciaItems)
        return CompruExistenciaItems.length == 0;
    }

    const ClassnameHearder=()=>{
        // Si presenta una lista de items.
        if(InfoItem.options.length !== 0){
            return (comprobKeySelectet() == 0)?"container_FilterBar_body_item_header_content_bar":"container_FilterBar_body_item_header_content_bar_activate";
        }
        return "container_FilterBar_body_item_header_content_bar";
    }

    const ClassnameItem=(id)=>{
        if(InfoItem.options.length !== 0){
            // console.log(comprobKeySelectetKey({id_key: id}))
            return (comprobKeySelectetKey({id_key: id}))?"container_FilterBar_body_item_body_item":"container_FilterBar_body_item_body_item_activate";
        }
        return "container_FilterBar_body_item_body_item";
    }

    return (
        <div className="container_FilterBar_body_item">
            {/* Encavesado principal ClassnameHearder() container_FilterBar_body_item_header */}
            <div className="container_FilterBar_body_item_header_content">
                <div className={ClassnameHearder()} />
                <div className={"container_FilterBar_body_item_header_subcontent"}>
                    {/* {(iscollapset)?<div className="container_FilterBar_body_item_header_icon"><InfoItem.Icon className={"container_FilterBar_body_item_header_color"} /></div>:<></>} */}
                    {<div className="container_FilterBar_body_item_header_title container_FilterBar_body_item_header_color">{InfoItem.label}</div>}
                    {/* si la opccion esta colapsada o cerrada, se oculta la opccion de despliegue, sino se mostrara si esque tambien presenta sub opccion
                        . Si no presenta subOpcciones no mostrara nada, pero en caso que haya, mostrar un icono si esta activado y otro si esque no*/}
                    {((InfoItem.options.length === 0)?<></>:<div className="container_FilterBar_body_item_header_icon" onClick={()=>{
                        if(InfoItem.options.length !== 0) {
                            onCollapset(indexkey,!iscollapsetitem);
                            setiscollapsetitem(!iscollapsetitem);
                        } 
                    }}>{((iscollapsetitem)?<UpOutlined className="container_FilterBar_body_item_header_color" />:<DownOutlined className="container_FilterBar_body_item_header_color" />)}</div>) }
                </div>
            </div>
            
            {/* imprecion de cada opccion dentro del componente */}
            {(iscollapsetitem && !iscollapset)?
            <div className="container_FilterBar_body_item_body">
                {InfoItem.options.map((item)=>{
                    return (
                    <div className="container_FilterBar_body_item_body_item_content">
                        <div onClick={()=>{
                            if(InfoItem.options.length !== 0) onChangeClick({
                                keyFilter: InfoItem.keyFilter,
                                label: item.label,
                                keyvalue: item.key
                            });
                        }} className={ClassnameItem(item.key)}>
                            {/* <div className="container_FilterBar_body_item_body_item_icon"><InfoItem.Icon /></div> */}
                            <div className="container_FilterBar_body_item_body_item_label">{item.label}</div>
                            <div className={`container_FilterBar_body_item_body_item_label_selecter${!comprobKeySelectetKey({id_key: item.key})?' active':''}`}><div></div></div>
                        </div>
                    </div>
                    );
                })}
            </div>:<></>}
            {/* imprecion de cada opccion dentro del componente de forma flotante*/}
            {/* {(iscollapsetitem && iscollapset)?
            <div className="container_FilterBar_body_item_body_floting">
                <div className="container_FilterBar_body_item_title_floting"> {InfoItem.label} </div>
                {InfoItem.options.map((item)=>{
                    return (<div onClick={()=>{
                        if(InfoItem.options.length !== 0) onChangeClick(item.key);
                    }} className={ClassnameItemFloating(item.key)}>{item.label}</div>);
                })}
            </div>:<></>} */}
        </div>
    );
}