import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getObjetivVersionAnalitic(idUsername = 0) {
  const url = `${domain_api}/objVersioAnalis/${idUsername}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addObjetivVersionAnalitic(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/objVersioAnalis/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function updateObjetivVersionAnalitic(id, jsondat = {}) {
  const id_negocio = id;
  const data = jsondat;
  const url = `${domain_api}/objVersioAnalis/${id_negocio}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function deleteObjetivVersionAnalitic({id_ObjetivVersionAnalitic}) {
  const url = `${domain_api}/objVersioAnalis/${id_ObjetivVersionAnalitic}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
