import React from 'react'

export default function CurrentUser({username}) {
    return (
        <span className="navbar-text">
            Logged in as: {username}
        </span>
    )
}
