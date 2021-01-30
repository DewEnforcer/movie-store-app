import http from "./httpservice";

const endPoint = "/rentals";

const getRentals = () => http.get(endPoint);

export default {
    getRentals
}