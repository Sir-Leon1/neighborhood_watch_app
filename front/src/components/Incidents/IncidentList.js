import React, { useEffect, useState } from'react';
import {fetchIncidents} from "../../services/api";

function IncidentList()
{
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        fetchIncidents()
            .then(data => setIncidents(data))
            .catch(error => console.error('Error fetching incidents:', error));
    }, [])
    return(
        <div>
            <h1>Incident List</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>{incident.description}</li>
                ))}
            </ul>
        </div>
    )
}

export default IncidentList;
