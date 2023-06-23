import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Agents from '../components/cards/Agents';

export default function Agent() {
    const [agent, setagent] = useState();
    useEffect(() => {
        ShowAgents();
    }, []);


    const ShowAgents = async () => {
        try {
            const { data } = await axios.get(`/agentsList`);
            console.log("-------agent data--", data);
            setagent(data.result);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container">
            <div className="row">
                {agent?.map((agent) => (
                    <Agents agent={agent}/>
                ))}
            </div>
        </div>
    )
}
