import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { TextField, Button, ButtonGroup, Grid, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

import { RoomContext } from "/src/components/context/roomContext"

const RoomPage = ({ match, history }) => {

    const { setRoomCode } = useContext(RoomContext)

    const [isHost, setIsHost] = useState(false)
    const [guestCanPause, setGuestCanPause] = useState(false)
    const [votesToSkip, setVotesToSkip] = useState(2)

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const roomCode = match?.params?.roomCode

    useEffect(() => {
        fetch(`/api/get-room?code=${roomCode}`)
            .then(res => {
                if (!res.ok) {
                    history.push("/")
                    setRoomCode(null)
                }
                return res.json()
            })
            .then(
                ({ guest_can_pause, is_host, votes_to_skip }) => {
                    setIsLoaded(true)

                    setIsHost(is_host)
                    setGuestCanPause(guest_can_pause)
                    setVotesToSkip(votes_to_skip)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])

    const leaveRoom = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api/leave-room', requestOptions)
            .then((_res) => {
                setRoomCode(null)
                history.push("/")
            })
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Room: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    guestCanPause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    votesToSkip: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={leaveRoom}>
                    Leave Room
                </Button>
            </Grid>
        </Grid >
    )
}

RoomPage.propTypes = {

}

export default RoomPage
