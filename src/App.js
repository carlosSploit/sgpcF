import './App.css';
// import {Administrador} from "./pages/Administrador/ClientAnalist";
// import {Profesor} from "./pages/Profesores/Profesores";
import {Login} from "./pages/Login/login";
// import { ConsuldataLog } from './service/repository/Usuarios';
// import { keyresolution, keyseccion } from './service/repository/variables';
import { useEffect, useState } from 'react';
import {} from 'react-dom';
// import { PageResolutionIncompatible } from './service/morvius-service/pagealert/page_notification';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { RouterController } from './service/router/routerscontroler';
import {routerLinks} from './service/router/routers'
// import { closeSesion, getKeysesion } from './service/repository/mithelworks';
import { ReconociLoginDat } from './service/router/routerscontroler';
import { RouterDesconocido } from './service/router/page/routerdesconocido/routerdesconocido';
import { RegisterCliente } from './pages/RegisterCliente/registerCliente';
import NotificationProvider from './service/Notifications/NotificationProvider';
// import socket from "./service/socket/socket";

function App() {
  // comprueba si esque ya se conoce que se esta trabajando en una resolucion baja
  // const [isresolutiocomp, setisresolutiocomp] = useState(false);
  const [routers, setrouters ] = useState(null);
  // comprobar si se esta ejecutando en un celular localStorage.setItem(keyresolution, "djfhjd");
  useEffect(()=>{
    // inicializacion de las rutas
    setrouters(routerLinks());
    // inicializacion del la rezolucion de la pantalla
    // let anchodepantalla = window.screen.width;
    // if(anchodepantalla <= 500){
    //   if (!localStorage.getItem(keyresolution)) {
    //     setisresolutiocomp(true);
    //   }else{
    //     setisresolutiocomp(false);
    //   }
    // }
  },[]);

  // const Onaccepterredirection = () => {
  //   if (!localStorage.getItem(keyresolution)) {
  //     localStorage.setItem(keyresolution, "djfkdslj");
  //     window.location.href = window.location.href;
  //   }
  // }

  // escucha si en algun momento se cierra la secion de un usuario y se comprueba si ese usuario somos nosotro o no
  // ya que en el navegador podemos tener muchas pestañas de nuestra secion
  // socket.on('usuario:clcerrarsesion',(result) => {
  //   console.log("Cerrara secion", result, " cierra secion aqui: ",(result == localStorage.getItem(keyseccion)) || (localStorage.getItem(keyseccion) == undefined))
  //   const isCerrarsecion = (result == localStorage.getItem(keyseccion)) || (localStorage.getItem(keyseccion) == undefined)
  //   if (isCerrarsecion){
  //       // localStorage.removeItem(keyseccion);
  //       window.location.reload(false);
  //       console.log("Cerrando secion...............")
  //   }
  // });

  // const onClose = () => {
  //   socket.emit('usuario:cerrarsesion',localStorage.getItem(keyseccion))
  //   // console.log('cerrando secion en este lado')´
  //   localStorage.removeItem(keyseccion);
  //   // window.location.reload(false);
  // }

  return (
    <>
    <NotificationProvider>
      <BrowserRouter basename='/'>
          {/* si ya se cargaron las rutas, se hacen uso de ellas, sino se ovia */}
          {(routers == null)?<></>:<Routes>
                {/* Routers de administrador */}
                {routers.admin.map((item)=>{
                  return <Route path={item.patch} exact element={(item.component)}/>
                })}
                <Route path="/cliAdmin" exact element={(routers.admin[0].component)}/>
                {/* Routers de profesor */}
                {/* {routers.profes.map((item)=>{
                  return <Route path={item.patch} exact element={(item.component)}/>
                })}
                <Route path="/prof" exact element={(routers.profes[0].component)}/> */}
                {/* rutas generales sin proteccion */}
                <Route path="/register" exact element={(<RegisterCliente />)}/>
                <Route path="/" exact element={(<ReconociLoginDat />)}/>
                <Route path="/login" exact element={(<Login/>)}/>
                <Route path="*" exact={true} element={(<RouterDesconocido />)}/>
            </Routes>}
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}

export default App;
