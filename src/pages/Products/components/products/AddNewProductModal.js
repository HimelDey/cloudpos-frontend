import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,  Form, FormGroup, Input, Label } from 'reactstrap';
import { useGetProductCategoryQuery } from 'services/ProductCategories';

const AddNewProductModal = (props) => {
  const {data} = useGetProductCategoryQuery();
  // const { data: cuisineData, isLoading, error, isFetching } = useGetProductCategoryQuery();
  // console.log({ cuisineData, isLoading, isFetching, error }); 

  return (
   <>
    <Modal isOpen={props.modal} toggle={props.toggle} >
        <Form onSubmit={props.handleAddProduct}>
            <ModalHeader toggle={props.toggle}>Add Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                      <Label for="exampleEmail">
                        Product Name
                      </Label>
                      <Input
                        id="productName"
                        name="productName"
                        placeholder="Product"
                        onChange={(e) => props.setNewProduct((prev) =>({
                            ...prev,
                            name: e.target.value
                          }
                        ))}
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
                        onChange={(e) =>
                          props.setNewProduct((prev) => ({
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
                        placeholder="Quantity"
                        onChange={(e) => props.setNewProduct((prev) =>({
                            ...prev,
                            quantity: e.target.value
                          }
                        ))}
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
                        placeholder="Price"
                        onChange={(e) => props.setNewProduct((prev) =>({
                            ...prev,
                            price: e.target.value
                          }
                        ))}
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

export default AddNewProductModal