import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CreateForm from "./createForm";

const CreateRoomPage = ({ history }) => {

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid>
            <CreateForm history={history} />
        </Grid>
    );
};

CreateRoomPage.propTypes = {}

export default CreateRoomPage
