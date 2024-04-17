import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PencilFill, TrashFill } from "react-bootstrap-icons";

const NoteCard = ({ note, deleteNote }) => {
    const Navigate = useNavigate();

    const handleDelete = (noteId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this note?");
        if (isConfirmed) {
            deleteNote(noteId);
        }
    };

    return (
        <Card className='mt-3' key={note._id}>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                    {note.details}
                </Card.Text>
                <Button variant="primary" size="sm" onClick={() => Navigate(`/edit/${note._id}`) }><PencilFill /> Edit</Button>
                <Button className='mx-3' variant="danger" size="sm" onClick={() => handleDelete(note._id)}><TrashFill /> Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;