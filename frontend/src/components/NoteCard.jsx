import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { PencilFill, TrashFill } from "react-bootstrap-icons";

const NoteCard = ({ note, fetchNote, deleteNote }) => {
    return (
        <Card className='mt-3'>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>
                    {note.details}
                </Card.Text>
                <Button variant="primary" size="sm" onClick={() => fetchNote(note._id)}><PencilFill /> Edit</Button>
                <Button className='mx-3' variant="danger" size="sm" onClick={() => deleteNote(note._id)}><TrashFill /> Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default NoteCard;