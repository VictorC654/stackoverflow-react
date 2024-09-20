import axios from "axios";

const getLocalStorage = (key : any) => {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
}

export function createAxiosClient() {
    const client = axios.create({
        baseURL: 'https://localhost:44388',
       
        headers: {
         'Content-Type': 'application/json',
        }
    });
    client.interceptors.request.use(
      (config) => {
        
          console.log("CONFIG!!!!!!!!!!!!!!!!!!!!!! ::::;",config);
          const token = getLocalStorage("jwttoken")?.token;
          if(!token)
          {
            return config;
          }
          if(!config.headers)
          {
            return config;
          }
          if (token) {
            config.headers.Authorization = token;
          }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  
   return client;
  
  }