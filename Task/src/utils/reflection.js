import axios from "axios";
import { baseUrl, token } from "./apiConfig";

export const getReflectionApi = (creator) => {
  console.log("creator",creator)
  let config = {
    method: "get",
    maxBodyLength: Infinity,

    url: `${baseUrl}get_reflection/${creator}/`,

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response.data) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};
export const createReflectionApi = (Payload) => {
  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,

    url: `${baseUrl}reflection/`,

    headers: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${token}`
    },
    data: data,
  };

  return axios
    .request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      if (error.response.data.message) {
        throw new Error(error.response.data.message);
      } else if (error.response.data) {
        throw new Error(error.response);
      } else if (error.request) {
        throw new Error(error.message);
      } else {
        throw new Error(error.message);
      }
    });
};
export const removeReflectionApi = (Reflection_id) => {
    
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
  
      url: `${baseUrl}task-reflections/${Reflection_id}`,
  
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      
    };
  
    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data) {
          throw new Error(error.response);
        } else if (error.request) {
          throw new Error(error.message);
        } else {
          throw new Error(error.message);
        }
      });
  };
  export const updateReflectionApi = (payload,Reflection_id) => {
    let data = JSON.stringify(payload);
    let config = {
      method: "put",
      maxBodyLength: Infinity,
  
      url: `${baseUrl}task-reflections/${Reflection_id}/`,
  
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      data:data
    };
  
    return axios
      .request(config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response.data.message) {
          throw new Error(error.response.data.message);
        } else if (error.response.data) {
          throw new Error(error.response);
        } else if (error.request) {
          throw new Error(error.message);
        } else {
          throw new Error(error.message);
        }
      });
  };