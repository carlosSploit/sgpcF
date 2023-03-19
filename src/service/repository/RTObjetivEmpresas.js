import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getObjetivEmpresa(idUsername = 0) {
  const url = `${domain_api}/objEmpresa/${idUsername}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addObjetivEmpresa(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/objEmpresa/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function updateObjetivEmpresa(id, jsondat = {}) {
  const id_negocio = id;
  const data = jsondat;
  const url = `${domain_api}/objEmpresa/${id_negocio}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function deleteObjetivEmpresa({id_ObjetivEmpresa}) {
  const url = `${domain_api}/objEmpresa/${id_ObjetivEmpresa}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
