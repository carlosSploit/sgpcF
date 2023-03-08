import axios from "axios";
// import { gettoken } from "./mithelworks";
import {ConsuldataLogm, iniciarSesion } from "./mithelworks"
import { domain_api, keyseccion } from "./variables";

export async function ConsulLog(jsondat={
  usser : "arturo14212000@gmail.com",
  pass  : "univerlucia"
}) {
  const data = jsondat;
    const url = `${domain_api}/usuar/loginUser`;
    const result = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
  });

  return result.data
}

export async function ConsuldataLog(jsondat={
  seccionkey: "sdfjdhskfjsdhfjkdshfkjdshfjksd"
}) {
  let result = await ConsuldataLogm(jsondat);
  return result;
}

export async function InsertLog(sesionkey = 'asjdksahdsjkadhkasjhdasjk'){
  // si la key ya existe solo se consulta, si no existe de inserta
  if (!localStorage.getItem(keyseccion)){
    await iniciarSesion({keysec: sesionkey});
    return sesionkey;
  }else{
    return localStorage.getItem(keyseccion);
  }
}