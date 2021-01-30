import http from "./httpservice";
import jwtDecode from "jwt-decode";
import {APIEndpoint} from "../config.json";
const endPoint = `/auth`
const jwtKey = "JWT_TOKEN";

http.setJwt(getJWT());

export async function login({username: email, password}) {
    const {data: jwt} = await http.post(endPoint, {email, password});
    saveJWT(jwt);
}

export async function loginJWT(jwt) {
    saveJWT(jwt);
}

export function getCurrentUser () {
    try {
        const jwt = getJWT();
        return jwtDecode(jwt);
        
    } catch (error) {return null}
}

export function logout() {
    localStorage.removeItem(jwtKey);
}

export function saveJWT(jwt) {
    localStorage.setItem(jwtKey, jwt);
}

export function getJWT() {
    return localStorage.getItem(jwtKey);
}

export default {
    login, logout, getCurrentUser, loginJWT
}