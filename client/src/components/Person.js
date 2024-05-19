import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Alert, Container, Row, Col, Button } from 'react-bootstrap';

const Person = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [person, setPerson] = useState(null);

    useEffect(() => {
        const fetchPerson = async () => {
            const response = await axios.get(`http://localhost:3001/api/v1/person/${id}`);
            setPerson(response.data.data);
        };
        fetchPerson();
    }, [id]);

    const handleUpdate = () => {
       navigate(`update`);
    };

    const handleDelete = () => {
        navigate(`delete`);
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Person</h1>
                    {person && (
                        <Card>
                            <Card.Body>
                                <Card.Title>{person.name}</Card.Title>
                                <Card.Text>
                                    <p>Email: {person.email}</p>
                                    <p>Phone Number: {person.phoneNumber}</p>
                                    <p>Date of Birth: {person.dateOfBirth}</p>
                                </Card.Text>
                                <Button variant="primary" onClick={handleUpdate}>Update</Button>
                                <Button variant="danger" onClick={handleDelete} className="ml-3">Delete</Button>
                            </Card.Body>
                        </Card>
                    )}
                    {!person && <Alert variant="info">Loading...</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default Person;