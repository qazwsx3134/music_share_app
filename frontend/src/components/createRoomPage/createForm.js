import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"

import GuestCanPause from "./guestCanPause"
import VotesToSkip from "./votesToSkip"

import { toSnakeCase } from "/src/utils/request";

const CreateForm = ({ history }) => {
    const [guestCanPause, setGuestCanPause] = useState(true)
    const [votesToSkip, setVotesToSkip] = useState(2)

    const handleVotesToSkip = (e) => setVotesToSkip(e.target.value)

    const handleGuestCanPause = (e) => setGuestCanPause(e.target.value)

    const handleSubmitFrom = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "guest_can_pause": guestCanPause,
                    "votes_to_skip": votesToSkip
                }),
        }
        fetch("/api/create-room", requestOptions)
            .then((res) => res.json())
            .then((data) => history.push(`/room/${data?.room_code}`))
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <FormControl components="fieldset">
                    <GuestCanPause
                        guestCanPause={guestCanPause}
                        handleGuestCanPause={handleGuestCanPause}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl components="fieldset">
                    <VotesToSkip
                        votesToSkip={votesToSkip}
                        handleVotesToSkip={handleVotesToSkip}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center" onClick={handleSubmitFrom}>
                <Button color="primary" variant="contained">
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" component={Link} to="/">
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}

CreateForm.propTypes = {}

export default CreateForm
