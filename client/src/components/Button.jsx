import React from "react";

export default function Button({type, name}) {
    return (
        <button type={type}>{name}</button>
    )
}