import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getRolrespono(idProces = 0) {
  const url = `${domain_api}/rolrespon/`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

// export async function readprofesor(id) {
//   const id_admin = id;
//   const url = `${domain_api}/profe/read/${id_admin}`;
//   const result = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//     },
//   });
//   return result.data;
// }

export async function addActivosProceso(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/activproc/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

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

// export async function updateActivosProceso(id, jsondat = {}) {
//   const id_negocio = id;
//   const data = jsondat;
//   const url = `${domain_api}/activproc/${id_negocio}`;
//   const result = await axios.put(url, data, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });
//   return result.data;
// }

export async function deleteActivosProceso({id_areasEmpresa}) {
  const url = `${domain_api}/activproc/${id_areasEmpresa}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
