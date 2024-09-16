'use client';

import { useState, useEffect } from "react"
import { map } from "zod"

interface Form {
    id: number,
    name: string,
    content: string,
    urgency: string,
    priority: string,
    date_creation: string
}



const GetForm = () => {
const [form, setForm] = useState([])


useEffect(() => {
    const fetchForm = async () => {
        try {
            const response = await fetch('http://192.168.7.114/glpi/apirest.php/Ticket', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'App-Token': 'mU597Gm8DDr3FskLzvMeZ5oLb7BnNVefIe2F9dXz',
                    'Session-Token': 'edkp6afaqdvmgjmicolf7asucg'
                }
            })
            const data = await response.json()
            setForm(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    };
    fetchForm()
}, [])

    return (
        <div>
            <h1>Form</h1>    
            {form.map((form : Form) => (
                <div key={form.id}>
                    <p>Name: {form.name}</p>
                    <p>Content: {form.content}</p>
                    <p>Urgency: {form.urgency}</p>
                    <p>Priority: {form.priority}</p>
                    <p>Date_creation: {form.date_creation}</p>
                </div>
            ))}           
        </div>
    )
}



export default GetForm