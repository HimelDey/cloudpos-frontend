
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
import { useAuthenticateMutation } from "services/Authentication";

const Login = () => {

    const navigate = useNavigate();
    const [authenticateMutation] = useAuthenticateMutation();
    const [user, setUser] = useState({
      
      password :'',
      email:'',
    
    });


    const handleLogin = async(e) => {
      e.preventDefault();
      const response = await authenticateMutation( user ).unwrap();
      await setUser({
        password :'',
        email:'',
      }); // Clear the input field after adding the cuisine
      if(response.data != null){
        setShowSuccessAlert(true);
        await localStorage.setItem("token", response.data);
          // Hide the alert
        
        setTimeout(() => {
           navigate("/admin/index");
        }, 3000);
       
      }
      else{
        setDangerSuccessAlert(true); 
        setTimeout(() => {
          setDangerSuccessAlert(false) // Hide the alert
        }, 3000);

      }
     
    }


    const [showSuccessAlert, setShowSuccessAlert] = useState(false);  // Initially show the alert
    const [showDangerAlert, setDangerSuccessAlert] = useState(false);  // Initially show the alert
  
  
  return (
    <>
      <Col lg="5" md="7">
        {showSuccessAlert && <Alert>Success</Alert>}
        {showDangerAlert && <Alert color='danger'>Wrong Credentials</Alert>}

        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
          
        
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={user?.email}
                    onChange={(e) =>(setUser((prev)=>({
                      ...prev,
                      email:e.target.value
                    })))}
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
                    value={user?.password}
                    onChange={(e) =>(setUser((prev)=>({
                      ...prev,
                      password:e.target.value
                    })))}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
