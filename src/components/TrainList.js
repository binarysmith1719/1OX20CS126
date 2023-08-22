import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';


function TrainList() {

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
            console.log("abcdabcd", data);
            data.json().then(result => {
                console.log("result", result.access_token);
                setToken(result.access_token);
            }
            )
        })

    }
    const myToken = token;

    // console.log("mytoken xx ", myToken);
    useEffect(() => {
        const headers = { 'Authorization': `Bearer ${myToken}` };
        fetch('http://20.244.56.144/train/trains', { headers }).then((data) => {
            console.log("data", data);
            console.log("2nd call token", myToken);

            data.json().then(result => {
                console.log("result", result);
                console.log("result", result[0].trainName);
                console.log("result", result[0].trainNumber);
                setTrain(result);
            })
        })
    }, [])


    return (
        <div>
            <Table striped bordered hover style={{border:'2px solid green' }}>
                <thead >
                    <tr>
                        <th style={{border:'1px solid purple' }}>Serial No.</th>
                        <th style={{border:'1px solid purple' }}>Train Number</th>
                        <th style={{border:'1px solid purple' }}>Train Name</th>
                        <th style={{border:'1px solid purple' }}>Departure Time</th>
                        <th style={{border:'1px solid purple' }}>Sleeper Seats</th>
                        <th style={{border:'1px solid purple' }}>Sleeper Price</th>
                        <th style={{border:'1px solid purple' }}>AC Seats</th>
                        <th style={{border:'1px solid purple' }}>AC Price</th>
                        <th style={{border:'1px solid purple' }}>Delayed by</th>
                    </tr>
                </thead>
              
                <tbody >
                {
                    Object.entries(train).map(([item, index]) =>
                        <tr key={index} >
                            <td>{item}</td>
                            <td>{train[item].trainNumber}</td>
                            <td><a href="">{train[item].trainName}</a></td>
                            <td>{train[item].departureTime.Hours}:{train[item].departureTime.Minutes}</td>
                            <td>{train[item].seatsAvailable.sleeper}</td>
                            <td>{train[item].price.sleeper}</td>
                            <td>{train[item].seatsAvailable.AC}</td>
                            <td>{train[item].price.AC}</td>
                            <td>{train[item].delayedBy}</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default TrainList;
