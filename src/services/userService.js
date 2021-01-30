import http from "./httpservice";

const endPoint = "/users";

export async function register({username: email, password, name}) {
    return http.post(endPoint, {email, password, name});
}