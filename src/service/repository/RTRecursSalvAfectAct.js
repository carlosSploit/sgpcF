import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getRecursSalvAfectAct(idUsername = 0) {
  const url = `${domain_api}/recurSalvAfectAct/${idUsername}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addRecursSalvAfectAct(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/recurSalvAfectAct/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function updateRecursSalvAfectAct(id, jsondat = {}) {
  const id_negocio = id;
  const data = jsondat;
  const url = `${domain_api}/recurSalvAfectAct/${id_negocio}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function deleteRecursSalvAfectAct({id_areasEmpresa}) {
  const url = `${domain_api}/recurSalvAfectAct/${id_areasEmpresa}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
