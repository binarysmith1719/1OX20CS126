import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table';


function SingleTrain() {
    const [train, setTrain] = useState([]);
    const [token, setToken] = useState("");

    const myTokenfunc = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "companyName": "Train Central",
                    "clientID": "d0d98df8-baf4-47be-ba42-2f52021d338b",
                    "clientSecret": "pjrlwiuIbjJbgkIx",
                    "ownerName": "Subham",
                    "ownerEmail": "subhamkumarcse2024@gmail.com",
                    "rollNo": "126"
                }
            )
        };

        await fetch('http://20.244.56.144/train/auth', requestOptions).then((data) => {
            data.json().then(result => {
                setToken(result.access_token);
            }
            )
        })

    }
    const myToken = token;

    useEffect(() => {
        const headers = { 'Authorization': `Bearer ${myToken}` }
        fetch('http://20.244.56.144/train/trains/2344', { headers }).then((data) => {
            data.json().then(result => {
                setTrain(result);
            })
        })
    }, [])


    return (
        <div>
            <Table striped bordered hover style={{border:'1px solid purple' }}>
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Train Number</th>
                        <th>Train Name</th>
                        <th>Departure Time</th>
                        <th>Sleeper Seats</th>
                        <th>Sleeper Price</th>
                        <th>AC Seats</th>
                        <th>AC Price</th>
                        <th>Delayed by</th>
                    </tr>
                </thead>
                {
                    Object.entries(train).map(([item, index]) =>
                        <tr key={index}>
                            <td style={{border:'1px solid blue' }}>{item}</td>
                            <td style={{border:'1px solid blue' }}>{train.trainNumber}</td>
                            <td style={{border:'1px solid blue' }} >{train.trainName}</td>
                            <td style={{border:'1px solid blue' }}>{train.departureTime.Hours}:{train.departureTime.Minutes}:{train.departureTime.Seconds}</td>
                            <td style={{border:'1px solid blue' }}>{train.seatsAvailable.sleeper}</td>
                            <td style={{border:'1px solid blue' }}>{train.price.sleeper}</td>
                            <td style={{border:'1px solid blue' }}>{train.seatsAvailable.AC}</td>
                            <td style={{border:'1px solid blue' }}>{train.price.AC}</td>
                            <td style={{border:'1px solid blue' }}>{train.delayedBy}</td>

                        </tr>
                    )
                }
                <tbody>

                </tbody>
            </Table>
        </div>
    )
}

export default SingleTrain
