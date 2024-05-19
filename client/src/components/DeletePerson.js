import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Alert, Container } from 'react-bootstrap';

const DeletePerson = () => {
    const { id } = useParams();
    const [status, setStatus] = useState(null);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/person/${id}`);
            setStatus({ type: 'success', message: response.data.message });
        } catch (error) {
            setStatus({ type: 'danger', message: error.response.data.message });
        }
    };

    return (
        <Container className="mt-5">
            <h1>Delete Person</h1>
            <br/>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
            {status && <Alert variant={status.type} className="mt-3">{status.message}</Alert>}
        </Container>
    );
};

export default DeletePerson;
