import { message } from "antd";
import { http } from "./wareHouseHttp";



let url: any = "http://localhost:8081/api/apparel";



let wareHouseAxiosApi = {
    getList(){
      return Method.dataPost(null, url)
    }
}



const Method = {
  async dataPost(body: any, url: any){
    return await new Promise((resolve, reject) => {
      http.post(url, {
          query:body,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'access-control-allow-origin': '*'
            }
          }).then((result: any) => {
            if (result.status === 200) {
              return resolve({
                status: 1,
                result: result,
              });
            }else if (result.status == 212) {
              return resolve({
                status: 4,
                result: result,
              });
            } else {
              if (result) {
                return reject({
                  status: 3,
                  error: "Something went wrong.",
                });
              } else {
                return reject({
                  status: 4,
                  error: "Something went wrong.",
                });
              }
            }
          }).catch((err: any) => {
            if (err.response) {
              if (
                err.response.status !== null &&
                err.response.status !== undefined
              ) {
                if (err.response.status == 401) {
                  let unauthorizedStatus = err.response.status;
                  if (unauthorizedStatus == 401) {
                    message.error("401 unauthorized");
                  }
                } else {
                  return reject({
                    status: 5,
                    error: err,
                  });
                }
              }
            } else {
              return reject({
                status: 5,
                error: err,
              });
            }
          });
      });
  }
}



export {wareHouseAxiosApi};