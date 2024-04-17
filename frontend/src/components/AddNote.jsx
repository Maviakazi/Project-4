import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { PlusLg } from "react-bootstrap-icons";
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ToastMsg from "../components/ToastMsg";

const AddNote = ({ refetchNotes }) => {
    const [loading, setLoading] = useState(false);
    // Toast states
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastStatus, setToastStatus] = useState('');

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
            try {
                setLoading(true);

                const response = await axios.post('http://localhost:3500/api/notes/add', values);

                if (response.data.statusCode === 201) {
                    setShowToast(true);
                    setToastStatus("Success");
                    setToastMsg(response.data.msg);

                    // Reset the form fields after submission
                    formik.resetForm();
                    // Call refetch function after successfully adding a new note
                    refetchNotes(); // <-- Call refetchNotes
                }
                else {
                    setShowToast(true);
                    setToastStatus("Error");
                    setToastMsg(response.data.msg);
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);

                if (error.code === "ERR_BAD_REQUEST") {
                    setShowToast(true);
                    setToastStatus("Error");
                    setToastMsg("Invalid input values!");
                }
                else if (error.response.data.statusCode === 400) {
                    setShowToast(true);
                    setToastStatus("Error");
                    setToastMsg(error.response.data.msg);
                }
                else {
                    setShowToast(true);
                    setToastStatus("Error");
                    setToastMsg("Internal server error!");
                }
            }
        },
    });

    const { values, touched, errors, handleChange, handleSubmit } = formik;
    const { title, details } = values;

    return (
        <Card className='p-4'>
            <h1 className='text-center pb-4 fs-3'>Add New Note</h1>

            <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <div className="col">
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label className='fw-bold text-muted'>Note Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
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
                                as="textarea" // Change to textarea
                                name="details"
                                value={details}
                                onChange={handleChange}
                                placeholder="Enter Note Details"
                                isInvalid={touched.details && !!errors.details}
                                rows={5} // You can adjust the number of rows as needed
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.details}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                </div>

                <Button variant="primary" type="submit">
                    {loading ? <Spinner size="sm" animation="border" /> : <PlusLg />} Add Note
                </Button>
            </Form>

            {/* Toast messages */}
            <ToastMsg
                show={showToast}
                setShow={setShowToast}
                msg={toastMsg}
                status={toastStatus}
            />
        </Card>
    )
}

export default AddNote;