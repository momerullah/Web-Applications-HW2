import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

export default function UserBar() {
    return (
        <div>
            <Login />
            <Logout />
            <Register />
        </div>
    );
}
