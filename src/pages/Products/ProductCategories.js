import React, { useState, useEffect } from 'react';
import Header from "components/Headers/Header.js";
import UserHeader from 'components/Headers/UserHeader';
import HeaderForms from 'components/Headers/HeaderForms';
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Col,
  Alert,
} from "reactstrap";
import { useGetProductCategoryQuery,useAddCuisineMutation,useEditCuisineMutation,useDeleteCuisineMutation } from 'services/ProductCategories';
import AddNewProductCategoryModal from './components/AddNewProductCategoryModal';
import EditProductCategoryModal from './components/EditProductCategoryModal';
const ProductCategories = () => {
  const { data} = useGetProductCategoryQuery()

  const [addCuisineMut] = useAddCuisineMutation();
  const [editCuisineMut] = useEditCuisineMutation();
  const [deleteCuisineMut] = useDeleteCuisineMutation();
  

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const toggle = () => setModal(!modal);
  const editToggle = () => setEditModal(!editModal);

  const [newCuisine, setNewCuisine] = useState('');
  const [editCuisine, setEditCuisine] = useState({  });
  const handleAddCuisine = async(e) => {
    e.preventDefault();
    const response = await addCuisineMut({ name: newCuisine, status:'Active' }).unwrap();
    setNewCuisine(''); // Clear the input field after adding the cuisine
    showAlert(response);
    toggle();
  }

  const handleEditCuisine = async(e) => {
    e.preventDefault();
    const response = await editCuisineMut({ id:editCuisine.id, name: editCuisine.name, status:'Active' }).unwrap();      
    setEditCuisine({}); 
    showAlert(response);
    editToggle();  
  }

  const editData = async (name, id) =>{
    await setEditCuisine((prev) => ({
        ...prev,
        id: id,
        name: name
    }));
    editToggle();
  }


  const deleteData = async (id) =>{
    const response = await deleteCuisineMut( id ).unwrap();
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
        
          <AddNewProductCategoryModal modal={modal} toggle={toggle} newCuisine={newCuisine} setNewCuisine={setNewCuisine} handleAddCuisine={handleAddCuisine}/>
          <EditProductCategoryModal editModal={editModal} editToggle={editToggle} editCuisine={editCuisine} setEditCuisine={setEditCuisine} handleEditCuisine={handleEditCuisine}/>  
           
       </Row>
        {/* Table */}
        
       
        <Row>
          <div className="col">
          
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Product Categories  / Cuisines</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Cusine</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                   
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {
                  data?.data?.map((item,key) =>(
                    <tr key={key}>
                        <td >{key+1}</td>
                        <td>{item.name}</td>
                        <td>{item.status}</td>
                        <td>
                            <Button onClick={()=>(editData(item.name,item.id))}>Edit</Button> 
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

export default ProductCategories