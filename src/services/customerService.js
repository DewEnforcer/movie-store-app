import http from "./httpservice";

const endPoint = "/customers";

const getCustomers = () => http.get(endPoint);

export default {
    getCustomers
}