
import { route } from "fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { useAddUsersMutation } from "services/Authentication";
const Register = () => {
  const navigate = useNavigate();
  const [addUsersMutation] = useAddUsersMutation();

  const [newUser, setNewUser] = useState({
    name : '',
    password :'',
    email:'',
    city:'St. Johns'
  });

  const handleAddUser = async(e) => {
    e.preventDefault();
    const response = await addUsersMutation( newUser ).unwrap();
    setNewUser({
      name : '',
      password :'',
      email:'',
      city:'St. Johns'
    }); // Clear the input field after adding the cuisine
    showAlert(response);
   
  }

  
  const showAlert = (response) =>{
    if(response.HttpStatus == 200){
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);  // Hide the alert
      }, 5000);
      navigate("./login");
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
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
          {showSuccessAlert && <Alert>Success</Alert>}
          {showDangerAlert && <Alert color='danger'>Something is wrong</Alert>}

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleAddUser}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input 
                    placeholder="Name"
                    type="text" 
                    value={newUser.name}
                    onChange={(e) => setNewUser((prev)=>({
                      ...prev,
                      name: e.target.value
                    }))}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={newUser.email}

                    onChange={(e) => setNewUser((prev)=>({
                      ...prev,
                      email: e.target.value
                    }))}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={newUser.password}

                    onChange={(e) => setNewUser((prev)=>({
                      ...prev,
                      password: e.target.value
                    }))}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit" >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
