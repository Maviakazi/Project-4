import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/Nav';
import AddNote from '../components/AddNote';
import NoteCard from '../components/NoteCard';
import ToastMsg from '../components/ToastMsg';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
    // Toast states
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [toastStatus, setToastStatus] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {

            const response = await fetch('http://localhost:3500/api/notes');
            const data = await response.json();
            return data.data;

        } catch (error) {
            setShowToast(true);
            setToastStatus("Error");
            setToastMsg("Failed to fetch notes!");
        }
    }

    const deleteNote = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3500/api/notes/${id}`);

            if (response.data.statusCode === 200) {
                setShowToast(true);
                setToastStatus("Success");
                setToastMsg(response.data.msg);

                // refetching updated data
                refetch();
            } else {
                setShowToast(true);
                setToastStatus("Error");
                setToastMsg(response.data.msg);
            }

        } catch (error) {
            if (error.response.data.statusCode === 400) {
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
    }

    const { data, isLoading, error, refetch } = useQuery(
        ['noteData'],
        () => fetchNotes(),
        {
            refetchOnWindowFocus: false,
            cacheTime: 0,
        }
    );

    if (isLoading) {
        return <div className='spinner-container d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <Spinner animation="grow" variant="primary" />
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Ensure data is an array before mapping over it
    if (!Array.isArray(data)) {
        return <div>Data is not in the expected format.</div>;
    }

    return (
        <div style={{ overflowX: 'hidden' }}>
            <Nav />
            <div className="row p-4">
                <div className="col col-md-4">
                    {/* Pass refetch function to AddNote component */}
                    <AddNote refetchNotes={refetch} />
                </div>

                <div className="col col-md-8">
                    <div className="text-end fw-bold">
                        Total notes:  {data.length}
                    </div>

                    {data.length === 0 ? (
                        <p className='text-center mt-4'>No note available.</p>
                    ) : (
                        data.map((note) => (
                            <NoteCard note={note} deleteNote={deleteNote} />
                        ))
                    )}

                    {/* Toast messages */}
                    <ToastMsg
                        show={showToast}
                        setShow={setShowToast}
                        msg={toastMsg}
                        status={toastStatus}
                    />

                </div >
            </div >
        </div >
    );
};

export default Home;
