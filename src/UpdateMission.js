import React, { useState, useEffect, useRef } from 'react'
import './UpdateMission.css'

// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

const UpdateMission = props => {
    var { missionName, missionCap, missionCode, startTime, endTime } = (props.location && props.location.state) || {};
    const [missionQRLink, setMissionQR] = useState("unchanged")
    const [change, updateChange] = useState(false)
    const [userList, updateUserList] = useState([])
    const [missionUserList, updateMissionUserList] = useState([])
    const [searchTerm, updateSearchTerm] = useState("")
    const [name, updateName] = useState(missionName)
    const [capacity, updateCapacity] = useState(missionCap)
    const [startingTime, updateStartTime] = useState(startTime)
    const [endingTime, updateEndTime] = useState(endTime)
    const searchContent = useRef(null)
    const newMissionName = useRef(null);
    const newMissionCap = useRef(null);
    const newMissionStart = useRef(null);
    const newMissionEnd = useRef(null);
    const ip = process.env.REACT_APP_IP
    const app = process.env.REACT_APP_API

    useEffect(() => {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ "missionName": missionName })
        };
        fetch(ip+app+"GetUsersOfAMission", requestOptions)
            .then(res => res.json())
            .then(result => updateMissionUserList(result))

        fetch(ip+app+"Users")
            .then(res => res.json())
            .then(result => updateUserList(result))

        fetch(ip+app+"MissionQRCode?missionCode=" + missionCode)
            .then(res => res.blob())
            .then(result => {
                const QRURL = URL.createObjectURL(result);
                setMissionQR(QRURL)
            })
    }, [change, missionCode, missionName]);

    const updateMission = async (newMissionName, newMissionCap, newMissionStart, newMissionEnd) => {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ "OldMissionName": missionName, "NewMissionName": newMissionName, "capacity": newMissionCap, "startTime": newMissionStart, "endTime": newMissionEnd })
        };
        await fetch(ip+app+"UpdateMission", requestOptions)
        updateName(newMissionName)
        updateCapacity(newMissionCap)
        updateStartTime(newMissionStart)
        updateEndTime(newMissionEnd)
        updateChange(!change)
    };

    const deleteUser = async (username) => {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ "missionName": missionName, "userName": username })
        };
        await fetch(ip+app+"DeleteUserFromMission", requestOptions)
        updateChange(!change)
    }

    const addUser = async (username) => {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ "missionName": missionName, "userName": username })
        };
        await fetch(ip+app+"AddUserToMission", requestOptions)
        updateChange(!change)
    }

    // eslint-disable-next-line
    const filteredItems = userList.filter((data) => {
        if (searchTerm === "")
            return data
        else if (data.username.toLowerCase().includes(searchTerm.toLowerCase()))
            return data
    }).map(data => {
        return (
            <div>
                <ul>
                    <li>
                        {data.username}
                        &nbsp;&nbsp;
                        {missionUserList.some(item => item.username === data.username) ? (
                            <button onClick={() => deleteUser(data.username)}>Delete User From This Mission</button>
                        ) : (
                            <button onClick={() => addUser(data.username)}>Add User To This Mission</button>
                        )}
                    </li>
                </ul>
            </div>
        )
    })

    return (
        <div className="MissionUpdate" style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="ColumnOne">
                <div> {name} Mission Management </div>
                <div> Mission Name: {name} </div>
                <div> Mission Capacity: {capacity}</div>
                <div> Mission Code: {missionCode} </div>
                <div> Start Time: {startingTime} </div>
                <div> End Time: {endingTime} </div>
                <div> Mission QR: </div>
                <img className="MissionQRCode" src={missionQRLink} alt={"QR Code Still Loading"} />
                <div className="ChangeMission">
                    <input ref={newMissionName} type="text" placeholder="New Mission Name" />
                    <input ref={newMissionCap} type="number"  placeholder="New Mission Capacity" />
                    <br />
                    <input ref={newMissionStart} type="text" placeholder="New Mission Start Time" />
                    <input ref={newMissionEnd} type="text" placeholder="New Mission End Time" /><br />
                    <button onClick={() => updateMission(newMissionName.current.value, newMissionCap.current.value, newMissionStart.current.value, newMissionEnd.current.value)}>Update Mission</button>
                </div>
            </div>
            <div className="ColumnTwo">
                Current Users In Mission
                <ul>
                    {missionUserList.map(user => (
                        <li>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="SpaceColumn">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className="ColumnThree">
                <input ref={searchContent} type="text" placeholder="Search For User" />
                <button onClick={() => updateSearchTerm(searchContent.current.value)}>Search</button>
                {filteredItems}
            </div>
        </div>
    );
}

export default UpdateMission;