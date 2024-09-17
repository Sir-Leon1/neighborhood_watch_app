import React from 'react';
import { useNavigate } from "react-router-dom";

function QuickActionsBtn({id, path, icon: Icon, label}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    }

    return (
        <button key={id} className="quick-action-btn" onClick={handleClick}>
            <Icon size={32}/>
            <span>{label}</span>
        </button>
    )
}

export default QuickActionsBtn;