import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import Swal from 'sweetalert2'; // Import SweetAlert2
import {format} from 'date-fns';

const NoteCard = ({ note, deleteNote }) => {
    const Navigate = useNavigate();

    const handleDelete = (noteId) => {
        // Use SweetAlert2 for confirmation
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this note!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNote(noteId);
            }
        });
    };

    return (
        <Card className='note-card' key={note._id} style={{ backgroundColor: `${note.color}` }}>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                    {note.details}
                </Card.Text>
                <div className="bottom">
                    <div className="col">
                        <div className="date">{format(new Date(note.createdAt), 'yyyy-MM-dd')}</div>
                    </div>

                    <div className="buttons-col">
                        <Button className='button edit' onClick={() => Navigate(`/edit/${note._id}`)}><PencilFill /></Button>
                        <Button className='button delete' variant="danger" onClick={() => handleDelete(note._id)}><TrashFill /></Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;