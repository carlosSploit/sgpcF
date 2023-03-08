import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function analiicas_ciclo_curso_sincrono(id_curso = 0) {
  const url = `${domain_api}/anli/cicl/sincrono/${id_curso}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function analiicas_ciclo_curso_sincrono_puntos(id_curso = 0) {
  const url = `${domain_api}/anli/cicl/sincrono/puntos/${id_curso}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}

export async function analiicas_ciclo_curso_sincrono_notas(id=0) {
  const url = `${domain_api}/tarinsc/pointrank/${id}`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}