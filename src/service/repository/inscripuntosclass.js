import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getInscripPointoSesion(id_sesion = 0,id_inscrip = "") {
  const url = `${domain_api}/inspuntclas/S/${id_sesion}/${(id_inscrip == "")?"%20":id_inscrip}`;
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

export async function addinscripPuntosClass(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/inspuntclas/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function ConsultinscripPuntosClass(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/inspuntclas/valit`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function DeleteinscripPuntosClass(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/inspuntclas/delet`;
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

// export async function updatepuntclass(id_punto, jsondat = {}) {
//   const data = jsondat;
//   const url = `${domain_api}/pointcl/${id_punto}`;
//   const result = await axios.put(url, data, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//   });
//   return result.data;
// }

// export async function deletepuntclass(id_punt=0) {
//   const url = `${domain_api}/pointcl/${id_punt}`;
//   const result = await axios.delete(url, {
//     headers: {
//       Authorization: `Bearer ${await gettoken()}`,
//     },
//   });
//   return result.data;
// }
