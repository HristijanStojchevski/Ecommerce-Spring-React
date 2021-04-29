import axios from "../custom-axios/axios";
import qs from 'qs'

const ELibService = {
    fetchBooks: () => {
        return axios.get("/books")
    },
    fetchBooksPageable: (pg, sz, srt) => {
        const data = {
            page: pg,
            size: sz,
            sort: srt
        }
        const params = qs.stringify(data);
        return axios.get(`/books/pagination?${params}`)
    },
    addBook: ( name, category, authorId, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        })
    },
    editBook: (id, name, category, authorId, availableCopies) => {
        return axios.put(`/books/edit/${id}`,{
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        })
    },
    markBookRented: (id) => {
        return axios.put(`/books/rent/${id}`)
    },
    addCopy: (id) => {
        return axios.put(`/books/addCopy/${id}`)
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`)
    },
    findAuthorsByNameOrSurname: (nm, sm) => {
        if( nm == null) nm = "";
        if( sm == null) sm = "";
        if( nm === "" && sm === "") return axios.get(`/authors`)
        const data = {
            name: nm,
            surname: sm
        }
        const params = qs.stringify(data);
        return axios.get(`/authors?${params}`)
    },
    addAuthor: (name, surname, countryId) => {
        return axios.post("/authors/add", {
            "name": name,
            "surname": surname,
            "countryId": countryId
        })
    },
    findCountry: (name) => {

    }
}

export default ELibService;