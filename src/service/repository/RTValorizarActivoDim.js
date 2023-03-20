import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getValoriActivDim(id_valorActi = 0) {
  const url = `${domain_api}/valorActivDim/${id_valorActi}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function getValoriActivDimAfect(id_valorActi = 0) {
  const url = `${domain_api}/valorActivDim/listDimension/${id_valorActi}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function insertValoriActivDim( jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/valorActivDim/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}