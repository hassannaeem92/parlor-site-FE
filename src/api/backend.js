import axios from "axios";

export const base_url = "http://localhost:7001/uploads";
// export const base_url = "https://be.beautyserviceathome.com/uploads";


export default axios.create({
  // baseURL: "https://be.beautyserviceathome.com/api",
  baseURL: "http://localhost:7001/api",
});
