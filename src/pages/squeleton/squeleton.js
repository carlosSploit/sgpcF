import React, { useEffect, useState } from "react";
import { ComponentMenuBar } from "../../service/morvius-service/component/components";
import { ComponentMenuSling } from "../../service/morvius-service/components"
import NotificationProvider from "../../service/Notifications/NotificationProvider";
import "./styles/squeleton.css";

export function BasicSqueleton(props){

    const [iskeyoptions, setiskeyoptions] = useState(0);
    const [propisocultmenu,propsetisocultmenu] = useState(false);
    const {children, 
        propiskeyoptions = iskeyoptions,
        propsetiskeyoptions = setiskeyoptions,
        onchageoption, 
        databasic, 
        iskeyinit = 0} = props;
    useEffect(()=>{
        setiskeyoptions(iskeyinit);
    },[]);

    const onOcultMenu = () => {
        console.log(propisocultmenu);
        propsetisocultmenu(!propisocultmenu);
    }

    return (
        <NotificationProvider>
            <div className="Container_Squeleton">
                <ComponentMenuBar onOcultMenu = {onOcultMenu} isocultmenu = {propisocultmenu} setisocultmenu = {propsetisocultmenu} propiskeyoptions = {propiskeyoptions} propsetiskeyoptions = {propsetiskeyoptions} onchangeoption={onchageoption}  databasic={databasic} />
                <div className="Container_Squeleton_body_content"> 
                    <ComponentMenuSling collapesemenu = {propisocultmenu} setcollapsemenu = {propsetisocultmenu} propiskeyoptions = {propiskeyoptions} propsetiskeyoptions = {propsetiskeyoptions} iskeyinit = {iskeyinit} onchangeoption={onchageoption}  databasic={databasic} />
                    <div className="Container_Squeleton_body">
                        {children}
                    </div>
                </div>
            </div>
        </NotificationProvider>
    );
}