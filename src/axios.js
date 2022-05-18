import axios from "axios";
 
const instance = axios.create({
    baseURL: 'http://localhost:5001/click-n-pick-a7b0e/us-central1/api' ///THE API(cloud function) URL
});

export default instance;
 