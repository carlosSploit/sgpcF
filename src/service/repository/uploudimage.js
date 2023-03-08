import axios from "axios";
import {gettoken} from './mithelworks';
import { domain_api } from "./variables";


export async function uploudImage(file){
    const multipar = new FormData()
    multipar.append('photo', file)
    const url = `${domain_api}/ftpclodyn/insert`;
    const result = await axios.post(url,multipar,{
        headers:{
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${await gettoken()}`
        }
    });
    return result.data
}
