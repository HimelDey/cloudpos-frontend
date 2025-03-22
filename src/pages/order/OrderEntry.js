import React, { useState, useEffect } from 'react';
import HeaderForms from 'components/Headers/HeaderForms';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  Col,
  Alert,
  Form, FormGroup, Input, Label,
  CardBody,
  CardFooter,
  Badge,
  Table
} from "reactstrap";
import { useGetProductQuery } from 'services/ProductServices';
import { useGetUsersQuery } from 'services/Authentication';
import { useAddOrderMutation } from 'services/OrderServices';

const OrderEntry = () => {

  const {data} = useGetProductQuery();
  const { data: usersData} = useGetUsersQuery();
  const [addOrderMutation] = useAddOrderMutation();
  const [addtoCart, setAddtoCart] = useState({
    user :'',
    products:[

    ]
  });


  const handleRemoveProduct = (valueToRemove) => {
    // Filter out the product with the given value
    setAddtoCart((prevState) => ({
      ...prevState,
      products: prevState.products.filter(product => product.value !== valueToRemove),
    }));
  };


  const addQuantity = (item) => {
    // Filter out the product with the given value
    setAddtoCart((prevState) => ({
      ...prevState,
      products: prevState.products.map((product) =>
        product.value == item ? {...product, quantity:product.quantity+1} : product
      )
    }));
  };

  const removeQuantity = (item) => {
    // Filter out the product with the given value
    setAddtoCart((prevState) => ({
      ...prevState,
      products: prevState.products.map((product) =>
        product.value == item ? {...product, quantity:product.quantity-1} : product
      )
    }));
  };


  const handleSubmitProduct = async(e) => {
    e.preventDefault();
    const orderAmount = addtoCart?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const jsonData = {
      "amount" : orderAmount,
      "user" : {"id" : addtoCart?.user},
      "orderDetails" : addtoCart?.products?.map((value,key) =>({
        "product"  : {"id" : value.value},
        "quantity" : value.quantity
      })
      )
    }

    const response = await addOrderMutation( jsonData ).unwrap();
    await setAddtoCart({
      user :'',
      products:[
  
      ]
    }); // Clear the input field after adding the cuisine
    showAlert(response);
  }

  
 const showAlert = (response) =>{
    if(response.HttpStatus == 200){
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);  // Hide the alert
      }, 5000);
    }
    else{
      setDangerSuccessAlert(true); 
      setTimeout(() => {
        setDangerSuccessAlert(false) // Hide the alert
      }, 5000);
      
    }
  }
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);  // Initially show the alert
  const [showDangerAlert, setDangerSuccessAlert] = useState(false);  // Initially show the alert




  return (
    <div>
      <HeaderForms/>
      <Container className="mt--7" fluid>
      {showSuccessAlert && <Alert>Success</Alert>}
      {showDangerAlert && <Alert color='danger'>Something is wrong</Alert>}

        <Row className="mb-3"> {/* mt-3 adds margin-top and justify-content-end aligns the content to the right */}
          
         
       </Row>

             
        <Row>
          <div className="col">
          
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Order Entry</h3>
              </CardHeader>
              <CardBody>
              <Form onSubmit={handleSubmitProduct}> 
                <Row>
                 
                    <Col xl="8">
                      <Container fluid>
                        <Card>
                          <CardHeader className="border-0">
                            <h3 className="mb-0">Cart</h3>
                          </CardHeader>
                          <CardBody>
                        
                              <Row>
                                <Col  sm="12" md="6">
                                    <FormGroup>
                                    <Label for="exampleEmail">
                                      Customer Name
                                    </Label>
                                    <Input
                                      id="user"
                                      name="user"
                                      placeholder="User"
                                      type="select"
                                      value={addtoCart.user}
                                      onChange={(e) =>
                                        setAddtoCart((prev) => ({
                                          ...prev,
                                          user : e.target.value
                                        }))
                                      }
                                      required

                                      
                                    >
                                      <option value="">Select User</option>

                                      { usersData?.data?.map((item,key) =>(
                                        <option value={item.id} key={key}>{item.name}</option>
                                      ))}

                                    </Input>

                                  </FormGroup>
                                </Col>
                                <Col  sm="12" md="6">
                                  <FormGroup>
                                    <Label for="exampleEmail">
                                      Product
                                    </Label>
                                    <Input
                                      id="product"
                                      name="product"
                                      type="select"
                                      value=''
                                      onChange={(e) =>
                                        setAddtoCart((prev) => ({
                                          ...prev,
                                          products: [
                                            ...prev.products,
                                            {name:e.target.selectedOptions[0].text,value: e.target.value, price:e.target.selectedOptions[0].getAttribute("price"), quantity:1}
                                          ]
                                        }))
                                      }
                                      
                                    >
                                      <option value="">Select Product</option>

                                      { data?.data?.map((item,key) =>(
                                        <option value={item.id} price={item.price} key={key}>{item.name}</option>
                                      ))}
                                      
                                  
                                    </Input>
                                  </FormGroup>
                                </Col>

                              </Row>

                              { 
                                addtoCart?.products?.map((item,key)=>(
                                    <Row key={key}>
                                      <Col  sm="12" md="3">
                                        <FormGroup>
                                          <Label for="exampleEmail">
                                            Product Name
                                          </Label>
                                          <Input
                                            
                                            placeholder="Customer Name"
                                            value={item.name}
                                            type="text"
                                            disabled
                                          />
                                        </FormGroup>
                                      </Col>

                                      <Col sm="12" md="3" >
                                        <FormGroup>
                                          <Label for="exampleEmail">
                                            Price
                                          </Label>
                                          <Input
                                           
                                            placeholder="Customer Name"
                                            value={"$"+item.price}
                                            type="text"
                                            disabled
                                          />
                                        </FormGroup>
                                      </Col>

                                      <Col sm="12" md="3" >
                                        <FormGroup>
                                          <Label for="exampleEmail">
                                            Quantity
                                          </Label>
                                          
                                          <Input
                                         
                                            placeholder="Customer Name"
                                            value={item.quantity}
                                            type="text"
                                            disabled
                                          />
                                          <Badge color="primary mr-2 mt-2" style={{width:40}} onClick={()=> addQuantity(item.value)}>+</Badge>
                                          <Badge color="warning ml-2 mt-2" onClick={()=> removeQuantity(item.value)}>-</Badge>
                                        </FormGroup>
                                      </Col>
                                      <Col sm="12" md="3" >
                                        <FormGroup>
                                        <Label for="delete" className="invisible">
                                            Product Name
                                          </Label>
                                          <Button onClick={()=> handleRemoveProduct(item.value)} className="btn-danger" name="delete">X</Button>
                                        
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  )
                                )
                              }
                              
                            
                        
                            

                          </CardBody>
                          
                        </Card>

                      </Container>
                      
                    </Col>
                    <Col xl="4">
                    <Card>
                      <CardHeader className="border-0">
                        <h3 className="mb-0">Total</h3>
                      </CardHeader>
                      <CardBody>
                        <Table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th>price</th>

                            </tr>
                            
                          </thead>
                          <tbody>
                            { 
                            addtoCart?.products?.map((item,key)=>(                        
                              <tr key={key}>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.price}</td>
                                  
                              </tr>                  
                                
                              ))
                            }
                            <tr>
                              <td colSpan="2">Total</td>
                              <td>{addtoCart?.products?.reduce((sum, item) => sum + item.price * item.quantity, 0)}</td>
                            </tr>

                          </tbody>
                      
                      
                        </Table>
                            
                      </CardBody>

                      <CardFooter>
                              <Button color="primary" type="submit">
                                      Collect Cash
                              </Button>{' '}
                              <Button color="warning">
                                  Cancel
                              </Button>
                      </CardFooter>

                    </Card>
                    </Col>
                 
                </Row>
                </Form>

              </CardBody>
             
             
            </Card>
          </div>
        </Row>
      </Container>
        
    
    </div>
  )
}

export default OrderEntry