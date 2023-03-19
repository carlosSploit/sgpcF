import axios from "axios";
import { gettoken } from "./mithelworks";
import { domain_api } from "./variables";

export async function getcriteriosValori() {
  const url = `${domain_api}/criteriosValori/`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${await gettoken()}`,
    },
  });
  return result.data;
}