import React, { Component } from 'react'
import { render } from 'react-dom'
import { RoomProvider } from './context/roomContext'
import HomePage from "./homePage"

import styles from "./app.css"

export const App = () => (
    <div className={styles.center}>
        <RoomProvider>
            <HomePage />
        </RoomProvider>
    </div>
)

const root = document.getElementById('app')
render(<App />, root)