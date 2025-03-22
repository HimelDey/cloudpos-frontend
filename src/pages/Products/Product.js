import React, { useState, useEffect } from 'react';
import HeaderForms from 'components/Headers/HeaderForms';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Col,
  Alert,
} from "reactstrap";

import AddNewProductModal from './components/products/AddNewProductModal';
import EditNewProductModal from './components/products/EditNewProductModal';
import { useGetProductQuery,useAddProductMutation,useEditProductMutation,useDeleteCuisineMutation } from 'services/ProductServices';

const Product = () => {
  const { data} = useGetProductQuery();
  const [addProductMutation] = useAddProductMutation();
  const [EditProductMutation] = useEditProductMutation();
  const [deleteProductMut] = useDeleteCuisineMutation();

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const toggle = () => {
    setNewProduct({});
    setModal(!modal)
  };
  const editToggle = () => setEditModal(!editModal);

  const [newProduct, setNewProduct] = useState({
    name:'',
    cuisineId:''
  });
  const [editProduct, setEditProduct] = useState({  });

  const handleAddProduct = async(e) => {
    e.preventDefault();
    const response = await addProductMutation( newProduct ).unwrap();
    setNewProduct({
      name:'',
      cuisineId:''
    }); // Clear the input field after adding the cuisine
    showAlert(response);
    toggle();
  }

  const handleEditProduct = async(e) => {
    e.preventDefault();
    const response = await EditProductMutation(editProduct).unwrap();      
    setEditProduct({}); 
    showAlert(response);
    editToggle();  
  }

  const editData = async (item) =>{
    await setEditProduct((prev) => ({
        ...prev,
        id: item.id,
        cuisineId : item.cuisineId,
        name: item.name,
        price:item.price,
        quantity:item.quantity
    }));
    editToggle();
  }


  const deleteData = async (id) =>{
     const response = await deleteProductMut( id ).unwrap();
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
          <Col className='d-flex justify-content-end'>
            <Button onClick={toggle}>New</Button>    
          </Col>
        
          { modal?<AddNewProductModal modal={modal} toggle={toggle} newProduct={newProduct} setNewProduct={setNewProduct} handleAddProduct={handleAddProduct}/>   :null} 
          { editModal?<EditNewProductModal editModal={editModal} editToggle={editToggle} editProduct={editProduct} setEditProduct={setEditProduct} handleEditProduct={handleEditProduct}/>:null}
       </Row>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Products</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Cusine</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {
                  data?.data?.map((item,key) =>(
                    <tr key={key}>
                        <td >{key+1}</td>
                        <td>{item.cuisine.name}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td> 
                          <Button onClick={()=>(editData(item))}>Edit</Button> 
                          <Button color='danger' onClick={()=>(deleteData(item.id))}>Delete</Button> 
                        </td>
                    </tr>
                  ))
                }
                  
                </tbody>
              </Table>
              <CardFooter className="py-4">
                
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
        
    
    </div>
  )
}

export default Product