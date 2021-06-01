import React from 'react'
import PropTypes from 'prop-types'

import { TextField, Button, ButtonGroup, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

const Home = props => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">
                    Music Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup variant="contained" color="primary">
                    <Button color="primary" to='/join' component={Link} >
                        Join A Room
                    </Button>
                    <Button color="secondary" to='/create' component={Link} >
                        Create A Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}

Home.propTypes = {

}

export default Home
