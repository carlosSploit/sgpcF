import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getciclocurso_listcursos(name = "") {
  const url = `${domain_api}/cicurs/listcurso/${(name == "")?"%20":name}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function getciclocurso_curso(id_curso) {
  const url = `${domain_api}/cicurs/listciclocurso/${id_curso}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function readalumno(id) {
  const id_admin = id;
  const url = `${domain_api}/alumn/read/${id_admin}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function addciclocurso(jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/cicurs/`;
  const result = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function updateciclocurso(id, jsondat = {}) {
  const data = jsondat;
  const url = `${domain_api}/cicurs/${id}`;
  const result = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  return result.data;
}

export async function deleteciclocurso(id) {
  const url = `${domain_api}/cicurs/${id}`;
  const result = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}
