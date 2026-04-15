import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'

const WebLayout = () => {
    return (
        <>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    )
}

export default WebLayout
