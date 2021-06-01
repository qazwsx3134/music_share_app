import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { RoomContext } from "/src/components/context/roomContext"

import CreateRoom from "/src/components/createRoomPage"
import JoinRoomPage from "/src/components/joinRoomPage"
import Room from "/src/components/room"
import Home from "./home"

const HomePage = () => {
    const { roomCode, setRoomCode } = useContext(RoomContext)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch("/api/user-in-room")
                .then((res) => res.json())
                .then((data) => {
                    setRoomCode(data.room_code)
                })
        };

        fetchData()
    }, [])

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {roomCode ? <Redirect to={`/room/${roomCode}`} /> : <Home />}
                </Route>
                <Route path="/join" component={JoinRoomPage} />
                <Route path="/create" component={CreateRoom} />
                <Route
                    path="/room/:roomCode"
                    render={(props) => <Room {...props} />}
                />
            </Switch>
        </Router>

    )
}

HomePage.propTypes = {

}

export default HomePage
