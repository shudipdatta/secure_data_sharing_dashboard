import { useEffect, useState } from 'react'
import battlefield from './battlefield.jpg'

const ip = process.env.REACT_APP_IP
const app = process.env.REACT_APP_API

function Home() {
    const [numUsers, setNumUsers] = useState("")
    const [numMissions, setNumMissions] = useState("")
    console.log(process.env)

    useEffect(() => {
        fetch(ip+app+"Users")
            .then(response => response.json())
            .then(data => setNumUsers(Object.keys(data).length));

        fetch(ip+app+"Missions")
            .then(response => response.json())
            .then(data => setNumMissions(Object.keys(data).length));
    }, []);

    return (
        <div className="Home">
            <img src={battlefield} className="BattlePic" alt="Battlefield" height={550} width={1100} /> <br />
            Welcome to the Central Authority Demo! <br />
            Number of Users: {numUsers} <br />
            Number of Missions: {numMissions}
        </div>
    );
}

export default Home;
