import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function VideoModal(props) {

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe title="video" class="embed-responsive-item" src={props.vidLink} allowfullscreen></iframe>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
