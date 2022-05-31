import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ManageUsers.css';

function ManageUsers() {
    const [items, setItems] = useState([])
    const [searchTerm, updateSearchTerm] = useState("")
    const searchContent = useRef(null)
    const ip = process.env.REACT_APP_IP
    const app = process.env.REACT_APP_API

    useEffect(() => {
        fetch(ip+app+"Users")
            .then(res => res.json())
            .then(result => setItems(result))
    }, []);

    // eslint-disable-next-line
    const filteredItems = items.filter((data) => {
        if (searchTerm === "")
            return data
        else if (data.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || data.lastname.toLowerCase().includes(searchTerm.toLowerCase()) || data.username.toLowerCase().includes(searchTerm.toLowerCase()))
            return data
    }).map(data => {
        return (
            <div>
                <ul>
                    <li>
                        <Link className="item" to={{pathname:"/updateUser", state: { firstName: data.firstname, lastName: data.lastname, userName: data.username }}}> {data.firstname} {data.lastname}, Username: {data.username} </Link>
                    </li>
                </ul>
            </div>
        )
    })

    return (
        <div className="UserManagement">
            <input ref={searchContent} type="text" placeholder="Search For User" />
            <button onClick={() => updateSearchTerm(searchContent.current.value)}>Search</button>
            {filteredItems}
        </div>
    );
}

export default ManageUsers;