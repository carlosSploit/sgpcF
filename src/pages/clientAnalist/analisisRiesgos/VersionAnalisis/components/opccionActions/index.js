import { useState } from 'react';
import './style/index.css';
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';

export function OpccionActions(props){

    const {opccionSistem = [
        {
            label: "options",
            icon: CloseCircleOutlined,
            onChange: () => {}
        },
        {
            label: "options",
            icon: CloseCircleOutlined,
            onChange: () => {}
        },
        {
            label: "options",
            icon: CloseCircleOutlined,
            onChange: () => {}
        }
    ]} = props;

    const [isPressOptions,setisPressOptions] = useState(false);

    return (
        <div className="Content_Empresas_principal_opccion">
            <div className='Content_Empresas_principal_opccion_Botton_Config' onClick={()=>{setisPressOptions(!isPressOptions);}}>
                <SettingOutlined style={{color:'white'}} />
            </div>
            {(isPressOptions) ? 
            <>
                {opccionSistem.map((item)=>{
                    return (<OpccionActionsItems Icons = {item.icon} change = {item.onChange} />);
                })}
            </>
            :<></>}
        </div>
    )
}

export function OpccionActionsItems(props){

    const {label, Icons = {CloseCircleOutlined}, change = ()=>{} } = props;

    return (
        <div className='Content_Empresas_principal_opccion_Botton_Actions' onClick={change}>
            <Icons className='Content_Empresas_principal_opccion_Botton_Config_icon' />
        </div>
    )
}