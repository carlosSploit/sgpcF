import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getTipoContSesion() {
  const url = `${domain_api}/tipcontses`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

// export async function readadmin(id) {
//   const id_admin = id;
//   const url = `${domain_api}/admi/read/${id_admin}`;
//   const result = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//     },
//   });
//   return result.data;
// }

// export async function addTipoCurso(jsondat = {}) {
//   const data = jsondat;
//   const url = `${domain_api}/tipocur/`;
//   const result = await axios.post(url, data, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });
//   return result.data;
// }

// export async function loggin(jsondat = {}) {
//   const data = jsondat;
//   const url = `${domain_api}/user/log`;
//   const result = await axios.post(url, data, {
//     headers: {
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });
//   return result.data;
// }

// export async function updatTipoCurso(id, jsondat = {}) {
//   const data = jsondat;
//   const url = `${domain_api}/tipocur/${id}`;
//   const result = await axios.put(url, data, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });
//   return result.data;
// }

// export async function deleteTipoCurso(id) {
//   const id_admin = id;
//   const url = `${domain_api}/tipocur/${id_admin}`;
//   const result = await axios.delete(url, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//     },
//   });
//   return result.data;
// }
