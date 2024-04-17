import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { PencilFill } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';

const EditModal = ({ note, onHide }) => {

    const [loading, setLoading] = useState(false);
    // Toast states
    // const [showToast, setShowToast] = useState(false);
    // const [toastMsg, setToastMsg] = useState('');
    // const [toastStatus, setToastStatus] = useState('');

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string().trim().required("Title is required").max(100, "Title length must not be less than 100 chracters long"),
        details: Yup.string().trim().required("Details is required"),
    });

    // Initialize Formik form with initial values, validation, and submission logic
    const formik = useFormik({
        initialValues: {
            title: "",
            details: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            // try {
            //     setLoading(true);

            //     const response = await axios.post('http://localhost:3500/api/notes/add', values);

            //     if (response.data.statusCode === 201) {
            //         setShowToast(true);
            //         setToastStatus("Success");
            //         setToastMsg(response.data.msg);
            //     }
            //     else {
            //         setShowToast(true);
            //         setToastStatus("Error");
            //         setToastMsg(response.data.msg);
            //     }

            //     setLoading(false);
            // } catch (error) {
            //     setLoading(false);

            //     if (error.code === "ERR_BAD_REQUEST") {
            //         setShowToast(true);
            //         setToastStatus("Error");
            //         setToastMsg("Invalid input values!");
            //     }
            //     else {
            //         setShowToast(true);
            //         setToastStatus("Error");
            //         setToastMsg("Internal server error!");
            //     }
            // }
        },
    });

    const { values, touched, errors, handleChange, handleSubmit } = formik;
    const { title, details } = values;

    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Note
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="col">
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label className='fw-bold text-muted'>Note Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={note ?? note.title}
                                    onChange={handleChange}
                                    placeholder="Enter Note Title"
                                    isInvalid={touched.title && !!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col">
                            <Form.Group className="mb-3" controlId="formBasicDetails">
                                <Form.Label className='fw-bold text-muted'>Note Details</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="details"
                                    value={note ?? note.details}
                                    onChange={handleChange}
                                    placeholder="Enter Note Details"
                                    isInvalid={touched.details && !!errors.details}
                                    rows={5}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.details}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col">
                            <Form.Group className="mb-3" controlId="formBasicNoteId">
                                <Form.Control
                                    type="hidden"
                                    name="id"
                                    value={note ?? note._id}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Button variant="primary" type="submit">
                        {loading ? <Spinner size="sm" animation="border" /> : <PencilFill />} Update Note
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditModal;