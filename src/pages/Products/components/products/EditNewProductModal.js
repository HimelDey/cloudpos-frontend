import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Input, Label, CardBody } from 'reactstrap';
import { useGetProductCategoryQuery } from 'services/ProductCategories';


const EditNewProductModal = (props) => {
  const {data} = useGetProductCategoryQuery();
  console.log(props.editProduct)
  return (
   <>
   <Modal isOpen={props.editModal} toggle={props.editToggle} >
          <Form onSubmit={props.handleEditProduct}>
              <ModalHeader toggle={props.editToggle}>Edit Product</ModalHeader>
                  <ModalBody>
                      <FormGroup>
                        <Label for="exampleEmail">
                          Product Name
                        </Label>
                        <Input
                          id="cuisineName"
                          name="cuisineName"
                          value={props?.editProduct?.name}
                          onChange={(e) => props.setEditProduct((prev)=>({
                            ...prev,
                            name: e.target.value
                          }))}
                          required
                          type="text"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="exampleEmail">
                          Cuisine
                        </Label>

                        <Input
                          id="cuisine"
                          name="cuisine"
                          type="select"
                          value={props?.editProduct?.cuisineId}
                          onChange={(e) =>
                            props.setEditProduct((prev) => ({
                              ...prev,
                              cuisineId: e.target.value,
                            }))
                          }
                          required
                        >
                          <option value="">Select Category</option>
                          {
                            data?.data?.map((item,key) => (
                              <option value={item.id} key={key}>{item.name}</option>
                            
                              )
                            )
                          }  
                        </Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="exampleEmail">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          name="quantity"
                          value={props?.editProduct?.quantity}
                          onChange={(e) => props.setEditProduct((prev)=>({
                            ...prev,
                            quantity: e.target.value
                          }))}
                          required
                          type="text"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="exampleEmail">
                          Price
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          value={props?.editProduct?.price}
                          onChange={(e) => props.setEditProduct((prev)=>({
                            ...prev,
                            price: e.target.value
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

export default EditNewProductModal