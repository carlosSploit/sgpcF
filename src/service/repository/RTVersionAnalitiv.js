import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getVersionAnalitiv(idUsername = 0) {
  const url = `${domain_api}/versionanali/${idUsername}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addVersionAnalitiv(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/versionanali/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function deleteVersionAnalitiv({id_areasEmpresa}) {
  const url = `${domain_api}/versionanali/${id_areasEmpresa}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
