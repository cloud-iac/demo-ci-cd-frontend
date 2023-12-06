import axios from "axios";
export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    try{
      const res = await axios(`${this.baseURL}${url}`,{
        ...options,
        headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      }});
      return res.json()
    }catch(error){
      console.error(error);
      return error.response
        ? {
            status: error.response.status,
            message: error.response.data.message,
            url: error.config.url,
          }
        : { error: error.message };
    }
  }
}