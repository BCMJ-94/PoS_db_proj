import React from "react";

export default function Button({onClick, type, name, id}) {
    return (
        <>{id} <button onClick = {onClick} type={type}  key = {id} className="p-2 rounded-md bg-[#5eb5f3a6] text-[rgb(255,255,255)] font-bold text-xl">{name}</button>
        </>
    )
}
