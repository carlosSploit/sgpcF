import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getValorizarAmenazDim(idUsername = 0) {
  const url = `${domain_api}/valorafectamenDim/${idUsername}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function getValoriAmenazDimAfect(id_valorActi = 0) {
  const url = `${domain_api}/valorafectamenDim/listDimension/${id_valorActi}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}


export async function addValorizarAmenazDim(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/valorafectamenDim/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

// export async function updateValorizarAmenaz(id, jsondat = {}) {
//   const id_negocio = id;
//   const data = jsondat;
//   const url = `${domain_api}/valorafectamen/${id_negocio}`;
//   const result = await axios.put(url, data, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });
//   return result.data;
// }