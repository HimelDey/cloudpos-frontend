import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Input, Label, CardBody } from 'reactstrap';



const AddNewProductCategoryModal = (props) => {
  return (
    <>
        <Modal isOpen={props.modal} toggle={props.toggle} >
        <Form onSubmit={props.handleAddCuisine}>
            <ModalHeader toggle={props.toggle}>Add Cuisine</ModalHeader>
                <ModalBody>
              
                    <FormGroup>
                      <Label for="exampleEmail">
                        Cusine Name
                      </Label>
                      <Input
                        id="cuisineName"
                        name="cuisineName"
                        placeholder="cuisine"
                        value={props.newCuisine}
                        onChange={(e) => props.setNewCuisine(e.target.value)}
                        required
                        type="text"
                      />
                    </FormGroup>
                 
                </ModalBody>
                <ModalFooter>
                <Button color="primary" type="submit">
                    Submit
                </Button>{' '}
                <Button color="secondary" onClick={props.toggle}>
                    Cancel
                </Button>
                </ModalFooter>
                </Form>
        </Modal>
    </>
  )
}

export default AddNewProductCategoryModal