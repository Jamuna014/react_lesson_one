import axios from "axios";

export const API_SEVICES = {
 
  GetRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any
  ) => {
    // const Token = getLocalStorageItem('token')
    axios
      .get(`${EndPoint}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        // timeout: 5000,
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  PostRequest: (
    EndPoint: string,
    sucessCallback: any,
    errorCallback: any,
    values: any,
    contentType?: string,
    token?: any
  ) => {
    token = localStorage.getItem("token");   
    axios
      .post(EndPoint, values, {
    
        headers: {
          authorization: ` ${token}`,
          "Content-Type": contentType || "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },

  PostRequestAsync: (
    EndPoint: string,
    payload: any,
    token?: any
    // contentType?: string
  ) => {
    return new Promise((resolve, reject) => {
      token = localStorage.getItem("token");
      axios
        .post(EndPoint, payload, {
          headers: {
            authorization: ` ${token}`,
            // "Content-Type": contentType || "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  DeleteRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any,
    values: any
  ) => {
    const Token = localStorage.getItem("token");
    axios
      .delete(`${EndPoint}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: { ...values },

        // timeout: 5000,
      })
      .then((resp) => {
        // console.log("resp", resp);
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        errorCallback && errorCallback(err);
      });
  },
  PutRequest: (
    EndPoint: string,
    // Token: string,
    sucessCallback: any,
    errorCallback: any,
    values: any
  ) => {
    const Token = localStorage.getItem("token");

    axios
      .put(`${EndPoint}`, values, {
        headers: {
          authorization: ` ${Token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((resp) => {
        sucessCallback && sucessCallback(resp);
      })
      .catch((err) => {
        // console.log("error",err);
        errorCallback && errorCallback(err);
      });
  }}