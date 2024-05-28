import React from 'react';


export default function AuthButtons ({ handleLogin, handleLogout }) {
    return (
        <>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}