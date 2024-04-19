import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { PencilFill } from "react-bootstrap-icons";
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ToastMsg from "../components/ToastMsg";
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { useNavigate } from 'react-router-dom';

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [fetchedNoteId, setFetchedNoteId] = useState('');
    // Toast states
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastStatus, setToastStatus] = useState('');

    const fetchNote = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3500/api/notes/${id}`);

            const note = response.data.data;
            setFetchedNoteId(note._id);

            formik.setValues({
                title: note.title,
                details: note.details,
                color: note.color,
            });

        } catch (error) {
            setShowToast(true);
            setToastStatus("Error");
            setToastMsg("Error fetching note data!");
        }
    }

    useEffect(() => {
        fetchNote(id);
    }, []);

    // Define validation schema using Yup
    const validationSchema = Yup.object({
        title: Yup.string().trim().required("Title is required").max(100, "Title length must not be less than 100 chracters long"),
        details: Yup.string().trim().required("Details is required"),
        color: Yup.string().trim().required("Color is required"),
    });

    // Initialize Formik form with initial values, validation, and submission logic
    const formik = useFormik({
        initialValues: {
            title: "",
            details: "",
            color: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);

                const response = await axios.patch(`http://localhost:3500/api/notes/update/${fetchedNoteId}`, values);

                if (response.data.statusCode === 200) {
                    setShowToast(true);
                    setToastStatus("Success");
                    setToastMsg(response.data.msg);
                    setTimeout(()=>{
                        navigate('/');
                        }, 2000);
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
    const { title, details, color } = values;

    return (
        <div>
            <Nav />

            <Card className='update-note-card'>
                <h1 className='text-center pb-4 fs-3'>Edit Note</h1>

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
                                    rows={3} // You can adjust the number of rows as needed
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.details}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="col">
                            <Form.Group className="mb-3" controlId="formBasicColor">
                                <Form.Label className='fw-bold text-muted'>Pick a Color</Form.Label>
                                <Form.Control
                                    type="color" // Change to textarea
                                    name="color"
                                    value={color}
                                    onChange={handleChange}
                                    isInvalid={touched.color && !!errors.color}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.color}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    </div>

                    <Button variant="primary" type="submit">
                        {loading ? <Spinner size="sm" animation="border" /> : <PencilFill />} Update Note
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
        </div>
    )
}

export default EditNote;