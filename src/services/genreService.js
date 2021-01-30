import http from "./httpservice";

const endPoint = "/genres";

export function getGenres() {
    return http.get(endPoint);
}