import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getInsideProces(idProces = 0) {
  const url = `${domain_api}/insidencias/${idProces}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addInsideProces(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/insidencias/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function updateInsideProces(id, jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/insidencias/${id}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function deleteInsideProces({id_Insiden}) {
  const url = `${domain_api}/insidencias/${id_Insiden}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
