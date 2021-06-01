import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { TextField, Button, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

const JoinPage = ({ history }) => {
    const [roomCode, setRoomCode] = useState('')
    const [error, setError] = useState('')

    const handleTextFieldChange = (e) => setRoomCode(e.target.value)

    const handleSubmitFrom = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "code": roomCode,
                }),
        }
        fetch("/api/join-room", requestOptions)
            .then((res) => {
                //ok 代表狀態碼在範圍 200-299
                if (res.ok) {
                    history.push(`/room/${roomCode}`)
                } else {
                    setError('Oops, Room not found')
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <TextField
                    error={error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitFrom}
                >
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}

JoinPage.propTypes = {}

export default JoinPage
