import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import JoinPage from "./joinPage"

const JoinRoomPage = ({ history }) => {

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Join A Room
                </Typography>
            </Grid>
            <JoinPage history={history} />
        </Grid>
    );
};

JoinRoomPage.propTypes = {}

export default JoinRoomPage
