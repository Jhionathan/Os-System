'use client';
import { useState, useEffect } from "react";

interface Data {
    id: number,
    name: string,
}

export default function Clientes() {
    const [clientes, setClientes] = useState<Data[]>([]);

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await fetch(
                '/api/wholesale/v1/customer/list?pageSize=100&page=1',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSM1NVUFBMWSIsIm5iZiI6MTcyNjUwODY3MywiaXNzIjoiV1RBIiwiZXhwIjoxNzI2NTIzMDczLCJpYXQiOjE3MjY1MDg2NzMsImp0aSI6IjY3ZWM1ZmU0LTkyODItNDA1Yi1iZGQyLTdhYTg0MDJmZTRiNCJ9.ypet2LE5ausZtaIovesWTjLe0w-o9Q5BObRlIEsPGGk'
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const customers = await response.json();
            setClientes(customers.items);
            console.log(customers);
            
            // if (!Array.isArray(customers)) {
            //     throw new Error('No data was returned');
            // }

        };

        fetchClientes();
    }, []);

    return (
        <div>
            <h1>Clientes</h1>
            <div>
                {clientes.map((cliente) => (
                    <div key={cliente.id}>
                        <p>{cliente.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

