import logo from '../../logo.svg';
import './App.css';
import {Component, useEffect, useRef, useState} from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Navbar from "../Navbar/navbar";
import Books from "../Books/BookList/Books";
import EditBook from "../Books/BookEdit/editBook";
import AddBook from "../Books/BookAdd/addBook";
import ELibService from "../../repository/ElibraryRepository";
import Categories from "../Categories/categories";
function App() {
    const [categories, setCats] = useState(["NOVEL", "THRILLER", "HISTORY", "FANTASY", "BIOGRAPHY", "CLASSICS", "DRAMA"]);
    const [books, setBooks] = useState([]);
    const[authors, setAuthors] = useState([]);
    const[totalBooks, setTotalBooks] = useState(0);
    const[totalPages, setTotalPages] = useState(0);
    const findAuthors = async (name, surname) => {
        const ats = await ELibService.findAuthorsByNameOrSurname(name, surname).then((data) => {
            return data.data;
        }).catch(err => {console.log(err)});
        setAuthors(ats);
    }
    const updateBooksLocally = (updatedBooks) => {
        setBooks(updatedBooks);
    }
    const fetchBooksPageable = (pg,sz,srt) => {
        ELibService.fetchBooksPageable(pg, sz, srt).then(res => {
            setBooks(res.data.content)
            setTotalBooks(res.data.totalElements)
            setTotalPages(res.data.totalPages)
        })
    }

    const addBook = (name, category, author, availableCopies) => {
        const bkNew = ELibService.addBook(name, category, author, availableCopies).then(res => {
            fetchBooksPageable(0,500);
        })
            .catch( error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }
    const editBook = (id, name, category, author, availableCopies) => {
        ELibService.editBook(id, name, category, author.id,availableCopies).then(res => {
            setBooks(books.map(book => ( book.id === id ? {name: name, category: category, author: author, availableCopies:availableCopies} : book)))
        }).catch(err => {console.log(err)})
    }
    const ref = useRef();
    return (
      <Router>
    <div className="App" ref={ref}>
        <Navbar/>
        <div className="Content">
        <Switch>
            <Route path={"/books"} exact render={ () =>
                (<Books books={books} updateBooksLocally={updateBooksLocally} totalPages={totalPages} totalBooks={totalBooks} fetchPageable={fetchBooksPageable} handleBookPage={fetchBooksPageable}/>)}/>
            <Route path={"/categories"} render= {() => <Categories categories={categories} books={books}/>}/>
            <Route path={"/books/add"} render= {() => <AddBook onAddBook={addBook} categories={categories} findAuthors={findAuthors} authors={authors}/>}/>
            <Route path={"/books/edit"} render={() => <EditBook editBook={editBook} categories={categories} findAuthors={findAuthors} authors={authors}/>
            }/>
            <Redirect to={"/books"}/>
        </Switch>
        </div>
    </div>
      </Router>
    );
}

export default App;
