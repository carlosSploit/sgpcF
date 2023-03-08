import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getApertasisten(id_ciclocurs = 0) {
  const url = `${domain_api}/asisten/list/aperture/${id_ciclocurs}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function getAsistenInscrip(id_apertirasis = 0) {
  const url = `${domain_api}/asisten/list/inscrip/${id_apertirasis}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addApertasisten(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/asisten/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function updateAsisteins(id, jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/asisten/${id}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function deleteAsisten(id) {
  const id_sesion = id;
  const url = `${domain_api}/asisten/${id_sesion}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
