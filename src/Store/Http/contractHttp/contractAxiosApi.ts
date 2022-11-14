import { message } from "antd";
import { http } from "./contractHttp";

let url: any = "http://127.0.0.1:5000";

let contractAxiosApi = {

    getDetails(action: any){
        const headers={
            'Content-Type': 'application/json',
            'opnfor': 'C00555',
            'activity': action.activity,
            'where': action.where
          }
          return Method.dataGet(headers, url)
    },

    updateContract(action: any){
      console.log("updateContract",action)
      const headers={
          'Content-Type': 'application/json',
          'opnfor': 'C00555',
          'fieldArray': action.key+'= "'+action.value+'"',
          'activity': action.activity,
          'transaction': action.table,
          'where': action.where
        }
        console.log("updateContract headers",headers)
        return Method.dataGet(headers, url)
    },

    

    getMatrixCol(action:any){
      const headers={
          'Content-Type': 'application/json',
          'opnfor': 'C00555',
          'activity': 'A-COLT',
          'where': action.where
        }
        return Method.dataGet(headers, url)
    },
    getMatrixRow(action:any){
      const headers={
          'Content-Type': 'application/json',
          'opnfor': 'C00555',
          'activity': 'A-ROWV',
          'where': action.where
        }
        return Method.dataGet(headers, url)
    },
}


const Method = {
    async dataGet(headers: any, url: any){
      return await new Promise((resolve, reject) => {
        http.get(url,  {
              headers: headers
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
  
  
  
  export {contractAxiosApi};