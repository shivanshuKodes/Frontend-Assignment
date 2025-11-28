import { useState, useEffect, type ChangeEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import type { User } from '../types';
import { UserRole, getUserRoles, getRoleDisplayName } from '../types';

interface EditModalProps {
  userData: User | null;
  show: boolean;
  setShow: (show: boolean) => void;
  updateUserData: (user: User) => void;
}

interface ValidationErrors {
  name?: string;
  email?: string;
}

function EditModal({ userData, show, setShow, updateUserData }: EditModalProps) {

  const [newUserData, setNewUserData] = useState<Partial<User>>(userData || {});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean }>({});

  // Update local state when userData prop changes
  useEffect(() => {
    setNewUserData(userData || {});
    setErrors({});
    setTouched({});
  }, [userData]);

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name || name.trim().length === 0) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return 'Name can only contain letters and spaces';
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email || email.trim().length === 0) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const handleClose = () => {
    setShow(false);
    setErrors({});
    setTouched({});
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target || {};
    if (!name) return;
    setNewUserData({ ...newUserData, [name]: value });

    // Validate on change if field has been touched
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e?.target || {};
    if (!name) return;
    setNewUserData({ ...newUserData, [name]: value as UserRole });
  };

  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true });
    const fieldValue = newUserData?.[fieldName as keyof User];
    validateField(fieldName, fieldValue ?? '');
  };

  const validateField = (fieldName: string, value: string | undefined) => {
    let error: string | undefined;
    const safeValue = value ?? '';

    if (fieldName === 'name') {
      error = validateName(safeValue);
    } else if (fieldName === 'email') {
      error = validateEmail(safeValue);
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const isFormValid = (): boolean => {
    const nameError = validateName(newUserData.name || '');
    const emailError = validateEmail(newUserData.email || '');
    return !nameError && !emailError;
  };

  const handleSave = () => {
    // Validate all fields before saving
    const nameError = validateName(newUserData?.name || '');
    const emailError = validateEmail(newUserData?.email || '');

    if (nameError || emailError) {
      setErrors({ name: nameError, email: emailError });
      setTouched({ name: true, email: true });
      return;
    }

    // Ensure all required fields exist before saving
    if (!newUserData?.id || !newUserData?.name || !newUserData?.email || !newUserData?.role) {
      console.error('Cannot save user: missing required fields');
      return;
    }

    updateUserData(newUserData as User);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editForm.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={newUserData?.name || ''}
                onChange={handleInputChange}
                onBlur={() => handleBlur('name')}
                isInvalid={touched.name && !!errors.name}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="editForm.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                value={newUserData?.email || ''}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="editForm.role">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={newUserData?.role || UserRole.MEMBER}
                onChange={handleSelectChange}
              >
                {getUserRoles().map((role) => (
                  <option key={role} value={role}>
                    {getRoleDisplayName(role)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!isFormValid()}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;