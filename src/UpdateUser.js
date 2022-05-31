import React, { useRef, useState } from 'react'

const UpdateUser = props => {
    var { firstName, lastName, userName } = (props.location && props.location.state) || {};
    const [first, updateFirst] = useState(firstName)
    const [last, updateLast] = useState(lastName)
    const [user, updateUser] = useState(userName)
    const newUsername = useRef(null);
    const newPassword = useRef(null);
    const newFirstName = useRef(null);
    const newLastName = useRef(null);
    const newAttributes = useRef(null);
    const newInterests = useRef(null);
    const ip = process.env.REACT_APP_IP
    const app = process.env.REACT_APP_API
    const updateMission = async (newUsername, newPassword, newFirstName, newLastName, newAttributes, newInterests) => {
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({ "OldUserName": userName, "NewUserName": newUsername, "firstname": newFirstName, "lastname": newLastName, "attributes": newAttributes, "interests": newInterests, "password": newPassword })
        };
        await fetch(ip+app+"UpdateUser", requestOptions)
        updateFirst(newFirstName)
        updateLast(newLastName)
        updateUser(newUsername)
    };

    return (
        <div className="UserUpdate">
            <div> User Management </div>
            <div> First Name: {first} </div>
            <div> Last Name: {last}</div>
            <div> Username: {user} </div>
            <div className="ChangeMission">
                <input ref={newUsername} type="text" placeholder="Enter new username" />
                <input ref={newPassword} type="text" placeholder="Enter new password" />
                <input ref={newFirstName} type="text" placeholder="Enter new first name" />
                <input ref={newLastName} type="text" placeholder="Enter new last name" />
                <input ref={newAttributes} type="text" placeholder="Enter new attributes" />
                <input ref={newInterests} type="text" placeholder="Enter new interests" />
                <button onClick={() => updateMission(newUsername.current.value, newPassword.current.value, newFirstName.current.value, newLastName.current.value, newAttributes.current.value, newInterests.current.value)}>Update User</button>
            </div>
        </div>
    );
}

export default UpdateUser;