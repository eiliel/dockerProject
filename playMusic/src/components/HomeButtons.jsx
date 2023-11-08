import React from 'react'
import { Link } from 'react-router-dom'

function HomeButtons() {
    return (
        <>
        <Link to="/addArtist"><button className='mainButton'>Add Artist</button></Link>
        <Link to="/addSong"><button className='mainButton'>Add Song</button></Link>
        <Link to="/playMusic"><button className='mainButton'>Play Songs</button></Link>
        </>
    )
}

export default HomeButtons