import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const CreatePerson = () => {
    const [status, setStatus] = useState(null);

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/person', values);
            console.log(response.data.data)
            setStatus(response.data.data.message);
        } catch (error) {
            setStatus(error.response.data.message);
        }
    };

    return (
        <div>
            <h1>Create Person</h1>
            <Formik
                initialValues={{ name: '', email: '', phoneNumber: '', dateOfBirth: '' }}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field type="text" name="name" placeholder="Name" />
                    <ErrorMessage name="name" component="div" />

                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />

                    <Field type="text" name="phoneNumber" placeholder="Phone Number" />
                    <ErrorMessage name="phoneNumber" component="div" />

                    <Field type="date" name="dateOfBirth" />
                    <ErrorMessage name="dateOfBirth" component="div" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            {status && <div>{status}</div>}
        </div>
    );
};

export default CreatePerson;
