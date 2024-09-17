import React, {useEffect, useState} from "react";
import {fetchUsers} from "../../services/api";
import './styles/styles.css';

function Users() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="users-container">
            <h1 className="users-title">Users</h1>
            <div className="search-box">
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users"
                    className="search-input"
                />
            </div>
            <div className="activity-card">
                <div className="table-scrollable">
                    <table className="users-table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Contact</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users
                            .filter((item) => search.toLowerCase() === '' ? item : item.username.toLowerCase().includes(search.toLowerCase()))
                            .map((item) => (
                                <tr key={item.id}>
                                    <td>{item.username}</td>
                                    <td>{item.phone_no}</td>
                                    <td>{item.user_type}</td>
                                    <td>{item.created_at}</td>
                                    <td>
                                        <button className="edit-btn">Edit</button>
                                        <button className="delete-btn">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
        ;
}

export default Users;
