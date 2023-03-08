import axios from "axios";
import {domain_api, keyseccion, keyapikey, keyDataUser, keypage} from "./variables";
// import cookie from 'js-cookie';
// import Cookies from "universal-cookie";

export function isExistKeyApi() { 
    // const cookie = new Cookies();
    return ((localStorage.getItem(keyapikey) != undefined) && (localStorage.getItem(keyapikey) != null)); 
}

export function isExistDataLog() { 
    // const cookie = new Cookies();
    return ((localStorage.getItem(keyDataUser) != undefined) && (localStorage.getItem(keyDataUser) != null));
}

export async function gettoken(){
    // const cookie = new Cookies();
    if (localStorage.getItem(keyapikey) == undefined || localStorage.getItem(keyapikey) == 'undefined'){
    // if (cookie.get(keyapikey) == undefined || cookie.get(keyapikey) == 'undefined'){
        let data = {
            seccionkey : localStorage.getItem(keyseccion)
        };
        const url = `${domain_api}/usuar/keyApiSession`;
        const result = await axios.post(url, data, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
        });
        console.log(result)
        // cookie.set(keyapikey, result.data.api_key, { path: '' })
        localStorage.setItem(keyapikey, result.data.apikey)
        return result.data.apikey;
    }
    // return cookie.get(keyapikey);
    return localStorage.getItem(keyapikey)
}

export async function ConsuldataLogm(jsondat={
    seccionkey: "sdfjdhskfjsdhfjkdshfkjdshfjksd"
  }) {
    // const cookie = new Cookies();
    if (localStorage.getItem(keyDataUser) == undefined || localStorage.getItem(keyDataUser) == 'undefined'){
    // if (cookie.get(keyDataUser) == undefined || cookie.get(keyapikey) == 'undefined'){
        const url = `${domain_api}/usuar/compDatalog`;
        const result = await axios.post(url, jsondat, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
        });
        // cookie.set(keyDataUser, JSON.stringify(result.data), { path: '' })
        localStorage.setItem(keyDataUser, JSON.stringify(result.data))
        return result.data
    }
    // console.log('---------------------------------------------', cookie.get(keyDataUser))
    // return JSON.parse(cookie.get(keyDataUser))
    return JSON.parse(localStorage.getItem(keyDataUser))
}

export async function iniciarSesion({keysec=''}){
    localStorage.setItem(keyseccion,keysec);
    await gettoken();
    await ConsuldataLogm({seccionkey: keysec});
}

export async function closeSesion(){
    // cookie.remove(keyDataUser);
    // cookie.remove(keyapikey);
    localStorage.removeItem(keyDataUser);
    localStorage.removeItem(keyapikey);
    localStorage.removeItem(keyseccion);
    localStorage.removeItem(keypage);
    setTimeout(()=>{
        window.location.href = window.location.origin;
    },500);
}

export async function getKeysesion(){
    return localStorage.getItem(keyseccion);
}

export function setkeypage(idpage = 0) {
    localStorage.setItem(keypage,idpage);
}

export function getkeypage() {
    return localStorage.getItem(keypage);
}