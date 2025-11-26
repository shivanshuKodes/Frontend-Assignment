import { useState, useEffect, type ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import type { User } from '../types';

interface EditModalProps {
  userData: User | null;
  show: boolean;
  setShow: (show: boolean) => void;
  updateUserData: (user: User) => void;
}

function EditModal({ userData, show, setShow, updateUserData }: EditModalProps) {

  const [newUserData, setNewUserData] = useState<Partial<User>>(userData || {});

  // Update local state when userData prop changes
  useEffect(() => {
    setNewUserData(userData || {});
  }, [userData]);

  const handleClose = () => setShow(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={newUserData.name || ''}
                onChange={handleInputChange}
                autoFocus
              />

              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                value={newUserData.email || ''}
                onChange={handleInputChange}
              />

              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                placeholder="Role"
                value={newUserData.role || ''}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateUserData(newUserData as User)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;