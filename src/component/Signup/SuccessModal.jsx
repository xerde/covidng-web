import React from 'react';
import { Modal, Button } from "react-bootstrap";

const SuccessModal = props => {
  const { show, location } = props;
  console.log("I'm here");
  return (
    <div>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Signup completed</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => location.push("/")}>Back to Homepage</Button>
          <Button variant="primary" onClick={() => location.push("/login")}>Proceed to Login</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SuccessModal;
