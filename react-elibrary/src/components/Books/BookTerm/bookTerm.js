import {
    TableCell,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Box,
    Button,
    Collapse,
    IconButton,
    makeStyles, Grid, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Dialog
} from "@material-ui/core";
import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ELibService from "../../../repository/ElibraryRepository";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Link} from "react-router-dom";
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    actionButtons: {
        width: 200,
        marginLeft: 45,
        marginRight: 30
    }
});

function BookTerm({book, index, updateBook}) {

    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const classes = useRowStyles();

    const handleClose = () => {
        setDialogOpen(false);
    }
    const addCopy = () => {
        ELibService.addCopy(book.id).then(res => {
            updateBook(book.id, "add", book.availableCopies)
        })
            .catch(err => { console.log(err)})
    }
    const rentBook = () => {
        ELibService.markBookRented(book.id).then(res => {
            updateBook(book.id, "rent", book.availableCopies)
        }).catch(err => {console.log(err)})

    }
    const deleteBook = () => {
        ELibService.deleteBook(book.id).then(res => {
            updateBook(book.id, "delete", book.availableCopies)
        }).catch(err => {console.log(err)})

    }
    return <React.Fragment>
        <TableRow className={classes.root} key={index}>
            <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" align="right" scope="row">
                {book.name}
            </TableCell>
            <TableCell align="center">{book.category}</TableCell>
            <TableCell align="center">{book.author.name + " " + book.author.surname}</TableCell>
            {/*<TableCell align="right">{row.carbs}</TableCell>*/}
            {/*<TableCell align="right">{row.protein}</TableCell>*/}
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <Grid container spacing={5} alignItems={"center"}>
                        <Grid item xs={4} style={{textAlign: "center"}}>
                                   <Typography variant="h5" gutterBottom component="span">
                                        {book.availableCopies} available
                                    </Typography>
                        </Grid>
                        <Grid item container xs={8} justify={"flex-end"} alignItems={"stretch"} >
                                    <Button onClick={rentBook} variant={"contained"} color={"primary"} disabled={book.availableCopies < 1} className={classes.actionButtons}>Rent</Button>
                                    <Button component={Link} to={{pathname:`/books/edit`, state: {entity: book}}} variant={"contained"} color={"primary"} className={classes.actionButtons}>Edit</Button>
                                    <Button onClick={addCopy} variant={"contained"} color={"primary"} className={classes.actionButtons}>Add copy</Button>
                                    <Button onClick={() => {setDialogOpen(true)}} variant={"contained"} color={"secondary"} className={classes.actionButtons}>Delete</Button>
                        </Grid>
                    </Grid>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
        <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="dialog-delete">
            <DialogTitle id="dialog-delete">Are you sure you want to delete this book ?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    After you press delete, this book will be permanently deleted from the library collection.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteBook} color="secondary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
}
export default BookTerm
