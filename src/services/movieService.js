import http from "./httpservice";
const endPoint = "/movies"

  function createIdUrl(id) {
    return `${endPoint}/${id}`;
  }

  export function getMovies() {
    return http.get(endPoint);
  }
  
  export function getMovie(id) {
    return http.get(createIdUrl(id));
  }
  
  export function saveMovie(movie) {
    if (movie.id) {
        const body = {...movie};
        delete body.id;
        return http.put(createIdUrl(movie.id), body) 
    }
    return http.post(endPoint, movie);
  }
  
  export async function deleteMovie(id) {
    return http.delete(createIdUrl(id))
  }