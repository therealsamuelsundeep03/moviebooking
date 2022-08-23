import axios from "axios";

const BaseURL = "https://bookmimovie.herokuapp.com"

export default axios.create({
    baseURL : BaseURL
})

// axios private will call inceptors which in turn will call jwt when the access 
// token is forbidden by calling for refresh token
export const axiosPrivate =  axios.create({
    baseURL : BaseURL,
    withCredentials : true
})