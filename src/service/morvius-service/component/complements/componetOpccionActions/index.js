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
    ], sise = 28 } = props;

    const [isPressOptions,setisPressOptions] = useState(false);

    return (
        <div className="Content_Empresas_principal_opccion" style={{width: `${sise}px`, height: `${sise}px`}}>
            <div className='Content_Empresas_principal_opccion_Botton_Config' style={{width: `${sise}px`, height: `${sise}px`}} onClick={()=>{setisPressOptions(!isPressOptions);}}>
                <SettingOutlined style={{color:'white', fontSize: `${sise/2}px`}} />
            </div>
            {(isPressOptions) ? 
            <>
                {opccionSistem.map((item)=>{
                    return (<OpccionActionsItems sise={sise} Icons = {item.icon} change = {item.onChange} />);
                })}
            </>
            :<></>}
        </div>
    )
}

export function OpccionActionsItems(props){

    const {sise, Icons = {CloseCircleOutlined}, change = ()=>{} } = props;

    return (
        <div className='Content_Empresas_principal_opccion_Botton_Actions' style={{width: `${sise}px`, height: `${sise}px`}} onClick={change}>
            <Icons className='Content_Empresas_principal_opccion_Botton_Config_icon' style={{fontSize: `${sise/2}px`}} />
        </div>
    )
}