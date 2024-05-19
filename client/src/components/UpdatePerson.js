import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form as BootstrapForm, Button, Alert, Container, Row, Col } from 'react-bootstrap';

const UpdatePerson = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const fetchPerson = async () => {
            const response = await axios.get(`http://localhost:3001/api/v1/person/${id}`);
            setPerson(response.data);
        };
        fetchPerson();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            const response = await axios.patch(`http://localhost:3001/api/v1/person/${id}`, values);
            setStatus({ type: 'success', message: response.data.message });
        } catch (error) {
            setStatus({ type: 'danger', message: error.response.data.message });
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>Update Person</h1>
                    {person && (
                        <Formik
                            initialValues={person}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <BootstrapForm.Group controlId="formName">
                                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                                    <Field type="text" name="name" placeholder="Name" as={BootstrapForm.Control} />
                                    <ErrorMessage name="name" component="div" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group controlId="formEmail">
                                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                                    <Field type="email" name="email" placeholder="Email" as={BootstrapForm.Control} />
                                    <ErrorMessage name="email" component="div" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group controlId="formPhoneNumber">
                                    <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
                                    <Field type="text" name="phoneNumber" placeholder="Phone Number" as={BootstrapForm.Control} />
                                    <ErrorMessage name="phoneNumber" component="div" />
                                </BootstrapForm.Group>

                                <BootstrapForm.Group controlId="formDateOfBirth">
                                    <BootstrapForm.Label>Date of Birth</BootstrapForm.Label>
                                    <Field type="date" name="dateOfBirth" as={BootstrapForm.Control} />
                                    <ErrorMessage name="dateOfBirth" component="div" />
                                </BootstrapForm.Group>

                                <Button type="submit" variant="primary">Submit</Button>
                            </Form>
                        </Formik>
                    )}
                    {status && <Alert variant={status.type} className="mt-3">{status.message}</Alert>}
                </Col>
            </Row>
        </Container>
    );
};

export default UpdatePerson;