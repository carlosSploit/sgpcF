import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

// export async function getadlumno(name = "") {
//   const url = `${domain_api}/alumn/${(name == "")?"%20":name}`;
//   const result = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//     },
//   });
//   return result.data;
// }

export async function readclientAnalist(id) {
  const id_clientAnalist = id;
  const url = `${domain_api}/clientAnalit/read/${id_clientAnalist}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addclientAnalist(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/clientAnalit/`;
  const result = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function updateclientAnalist(id, jsondat = {}) {
  const id_negocio = id;
  const data = jsondat;
  const url = `${domain_api}/clientAnalit/${id_negocio}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

// export async function deletealumno(id) {
//   const id_admin = id;
//   const url = `${domain_api}/alumn/${id_admin}`;
//   const result = await axios.delete(url, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//     },
//   });
//   return result.data;
// }
