import api from "@/api/http-common.js";

import axios from 'axios';

const patchData = async (url) => {
  try {
    let token = localStorage.getItem("APPKEY_token");
    if(token != null && typeof token === "string") {
      console.log("token:" + token.replace(/["]/g, ''));
      token = token.replace(/["]/g, '')
    };
    const response = await axios.patch(url, {
      // Dados que você deseja enviar
    },   {headers: {
      "Content-type": "application/json", "Authorization": token
    }});

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};


export async function validarAgricultor(id) {
  return await patchData(`/api/agricultor/validar/${id}`);
}
//ver com o back como funciona esse validar