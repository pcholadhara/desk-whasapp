import axios from "axios";

export const httpRequest = (ipcMain) => {
      ipcMain.handle("http-request", async (event, req)=>{
          try {
              if(req.method === "GET"){
                  const response = await axios.get(req.url);
                  console.log("get request");
                  return response.data;
              }else{
                  console.log("post request");
                  const header = {'Content-Type': 'text/xml'}
                  const response = await axios.post(req.url, req.body, {headers: header});
                  return response.data;
              }
          }catch (error){
              return error.error || "Unknown Error";
          }
      });
}
