import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Input, Label, CardBody } from 'reactstrap';



const EditProductCategoryModal = (props) => {
  return (
    <>
        <Modal isOpen={props.editModal} toggle={props.editToggle} >
          <Form onSubmit={props.handleEditCuisine}>
              <ModalHeader toggle={props.editToggle}>Add Cuisine</ModalHeader>
                  <ModalBody>
                
                      <FormGroup>
                        <Label for="exampleEmail">
                          Cusine Name
                        </Label>
                        <Input
                          id="cuisineName"
                          name="cuisineName"
                          value={props.editCuisine.name}
                          onChange={(e) => props.setEditCuisine((prev)=>({
                            ...prev,
                            name: e.target.value
                          }))}
                          required
                          type="text"
                        />
                      </FormGroup>
                  
                  </ModalBody>
                  <ModalFooter>
                  <Button color="primary" type="submit">
                      Submit
                  </Button>{' '}
                  <Button color="secondary" onClick={ ()=> props.editToggle()}>
                      Cancel
                  </Button>
                  </ModalFooter>
          </Form>
        </Modal>
    </>
  )
}

export default EditProductCategoryModal