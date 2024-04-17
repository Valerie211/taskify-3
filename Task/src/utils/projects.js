import axios from "axios";
import { baseUrl, token } from "./apiConfig";

export const getProjectApi = (Payload) => {
  let data = JSON.stringify(Payload);
  let config = {
    method: "get",
    maxBodyLength: Infinity,

    url: `${baseUrl}create_project/`,

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
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
export const createProjectApi = (Payload) => {
  let data = JSON.stringify(Payload);
  let config = {
    method: "post",
    maxBodyLength: Infinity,

    url: `${baseUrl}create_project/`,

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
export const removeTProjectApi = (project_id,user_id) => {
    
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
  
      url: `${baseUrl}remove_project/${project_id}/${user_id}/`,
  
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
        if (error.response.data.error) {
          throw new Error(error.response.data.error);
        } else if (error.response.data) {
          throw new Error(error.response);
        } else if (error.request) {
          throw new Error(error.message);
        } else {
          throw new Error(error.message);
        }
      });
  };
  export const updateProjectApi = (project_id,newStatus) => {
    const payload = {newStatus}
    const data = JSON.stringify(payload)
    let config = {
      method: "put",
      maxBodyLength: Infinity,
  
      url: `${baseUrl}update_progress_status/${project_id}/`,
  
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}`
      },
      data: data
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