import {
    withStyles,
    makeStyles,
    TablePagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableFooter,
    TableRow,
    Paper,
    useTheme, Button, Icon, TextField, Box
} from '@material-ui/core';
import React, {useState, useEffect} from "react";
import BookTerm from "../BookTerm/bookTerm";

import Grid from "@material-ui/core/Grid";
import {Link, useHistory} from "react-router-dom";

const useTableStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(3),
        }
    },
    rootPaper: {
        backgroundColor: "#bad5ff"
    },
    button: {
        backgroundColor: "primary",
        fontSize: 16
    },
    headCells: {
        fontSize: 20,
        fontVariant: "bold"
    },
    paginationWrapper: {
        margin: theme.spacing(0),
        backgroundColor: "#3a4aa359"
    },
    table: {
        minWidth: 700,
    }
}));

function Books({books, handleBookPage, totalBooks, totalPages, updateBooksLocally}){
    const classes = useTableStyles();
    const history = useHistory();
    const [frontendBooks,setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [backendPage, setBackendPage] = useState(0);
    const [backendRowsPerPage, setBackendRows] = useState(500);
    let offset = rowsPerPage * page;
    let nextPageOffset = offset + rowsPerPage;
    let pageCount = Math.ceil(books.length / rowsPerPage);
    let backendOffset = (backendRowsPerPage * backendPage);
    let nextBackendOffset = backendOffset + backendRowsPerPage;
    useEffect(() => {setLoading(true); handleBookPage(backendPage, backendRowsPerPage)}, [backendPage, backendRowsPerPage]);
    useEffect(() => {
        if( history.location.state !== undefined){
            console.log(" Entered and category is : %s", history.location.state.category);
            setBooks(books.filter(book => book.category === history.location.state.category));
            console.log(books);
        }
        else setBooks(books);
        setLoading(false);
    }, [books]);
    const handleChangePage = (event, newPage) => {
        if(offset >= nextBackendOffset){
            if(backendPage < totalPages - 1){
                setBackendPage(backendPage + 1);
            }
        }
        if(offset < backendOffset){
            if(backendPage > 0){
                setBackendPage(backendPage - 1);
            }
        }
        console.log(newPage)
        setPage(newPage);
        offset = rowsPerPage * newPage;
        console.log(offset);
        backendOffset = (backendRowsPerPage * backendPage);
        nextBackendOffset = backendOffset + backendRowsPerPage;
        if(offset >= nextBackendOffset){
            if(backendPage < 7){
                setBackendPage(backendPage + 1);
            }
        }
        if(offset < backendOffset){
            if(backendPage > 0){
                setBackendPage(backendPage - 1);
            }
        }
        nextPageOffset = offset + rowsPerPage;
        console.log(nextPageOffset)
        pageCount = Math.ceil(books.length / rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const rowsPage = parseInt(event.target.value, 10)
        setRowsPerPage(rowsPage);
        offset = rowsPage * page;
        nextPageOffset = offset + rowsPage;
        pageCount = Math.ceil(books.length / rowsPage);
        let book = books[0];
        // calculate on which page would the first book show up then set the page to that page
        setPage(0); // Currently it will take the user to page 0
    };
    const updateBook = (id, func, availableCopies) => {
        if (func === "rent") {
            // -1 copy
            // Array.from(books)
            let updatedBooks = [...books]
            updatedBooks.find(book => book.id === id).availableCopies = availableCopies - 1
            updateBooksLocally(updatedBooks)
        }
        else if (func === "add"){
            // +1 copy
            let updatedBooks = [...books]
            updatedBooks.find(book => book.id === id).availableCopies = availableCopies + 1
            updateBooksLocally(updatedBooks)
        }
        else if (func === "delete"){
            // delete entity
            updateBooksLocally(books.filter(book => book.id !== id))
        }
    }
    const getBooks = (offset, nextPageOffset) => {
        return frontendBooks.map((term, index) => {
            return (<BookTerm updateBook={updateBook} book={term} key={index}/>);
        })
            .filter((book, index) => {
                return index >= offset - backendOffset && index < nextPageOffset - backendOffset;
            })
    }

    const bookTerms = getBooks(offset, nextPageOffset);


    return (
        // Dropdown for size selection
        <Box className={classes.root}>
            <TableContainer component={Paper} className={classes.rootPaper} elevation={0}>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHead component={Paper} elevation={0} className={classes.paginationWrapper}>
                        <TableRow>
                            <TableCell />
                            <TableCell className={classes.headCells} align="center">Title</TableCell>
                            <TableCell className={classes.headCells} align="center">Category</TableCell>
                            <TableCell className={classes.headCells} align="center">Author</TableCell>
                            {/*<TableCell className={classes.headCells} align="right">Carbs&nbsp;(g)</TableCclell>*/}
                            {/*<TableCell className={classes.headCells} align="right">Protein&nbsp;(g)</TableCell>*/}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { loading ? <TableRow><TableCell/> <TableCell>Loading...</TableCell></TableRow> : bookTerms}
                    </TableBody>
                    <TableFooter component={Paper} elevation={0} className={classes.paginationWrapper}>
                        <TableRow>
                            <TableCell/>
                            <TableCell>
                                <Button component={Link} to={"/books/add"} startIcon={<Icon>book</Icon>} endIcon={<Icon>book</Icon>} variant={"contained"} color={"primary"} className={classes.button}>ADD BOOK</Button>
                            </TableCell>
                            <TableCell>
                            <TablePagination
                                className={classes.paginationWrapper}
                                rowsPerPageOptions={[2,5, 10, 25]}
                                component={Paper}
                                elevation={7}
                                count={totalBooks}
                                page={page}
                                onChangePage={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                            </TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Books;