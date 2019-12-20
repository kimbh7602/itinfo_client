import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.100.41:5000/",
    // baseURL: "http://localhost:5000/report",
    headers: {
        "Content-type": "application/json",
    }
})