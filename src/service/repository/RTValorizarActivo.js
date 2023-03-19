import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getValoriActiv(idUsername = 0) {
  const url = `${domain_api}/valorActiv/read/${idUsername}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function updateValoriActiv(id, jsondat = {}) {
  const id_negocio = id;
  const data = jsondat;
  const url = `${domain_api}/valorActiv/${id_negocio}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}