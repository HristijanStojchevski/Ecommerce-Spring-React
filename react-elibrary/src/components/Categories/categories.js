import React from 'react';
import {Box, Paper, makeStyles, Grid, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
const useCategoryStyles = makeStyles((theme) => ({
    rootBox: {
        marginTop: theme.spacing(10),
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5)
    },
    catPaper: {
        width:400,
        height: 200
    }
}))
function Categories({categories}){
    const classes = useCategoryStyles()

    return <Box className={classes.rootBox}>
        <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {categories.map(category => (<Grid item xs><Button component={Link} to={{pathname:"/books", state: { category: category}}} variant={"contained"} color={"primary"} className={classes.catPaper}>
            <div> {category} </div>
        </Button> </Grid>))}
        </Grid>
    </Box>
}

export default Categories