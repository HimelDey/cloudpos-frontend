import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, Button, Navbar, NavbarBrand, Input, Nav, NavItem, Badge, CardText } from "reactstrap";

const categories = [
  { name: "Grocery", icon: "shopping-basket" },
  { name: "Pizza", icon: "pizza-slice" },
  { name: "Fast Food", icon: "hamburger" },
  { name: "Sushi", icon: "fish" },
  { name: "Chinese", icon: "utensils" },
  { name: "Sushi", icon: "fish" },
  { name: "Sushi", icon: "fish" },
  { name: "Sushi", icon: "fish" },

];

const items = [
  { id: 1, name: "Goldfish Crackers", price: "$3.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" },
  { id: 2, name: "Smartfood Popcorn", price: "$1.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" },
  { id: 3, name: "Reese's Puffs", price: "$3.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" },
  { id: 3, name: "Reese's Puffs", price: "$3.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" },
  { id: 3, name: "Reese's Puffs", price: "$3.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" },
  { id: 2, name: "Smartfood Popcorn", price: "$1.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" },
  { id: 2, name: "Smartfood Popcorn", price: "$1.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" },
  { id: 2, name: "Smartfood Popcorn", price: "$1.25", img: "https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC9pbWFnZS1wcm9jL3Byb2Nlc3NlZF9pbWFnZXMvYWU3OGU3NzRmZjIxM2RjNDI4NDMzOTJhYmE1NTY3NTgvZjk1ODZjMzZhYjdkYjg0ZDA5Yjc3N2NlZThjODI5YjEuanBlZw==" }

];

const HomePage = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <Container fluid>
      <Navbar color="white" light expand="md" className="mb-4 px-3">
        <NavbarBrand href="#">FoodDelivery</NavbarBrand>
        <Input type="search" placeholder="Search food..." className="w-25 mx-3" />
        <Nav className="ml-auto" navbar>
          <NavItem className="mx-2">
           
            
            {/* <FontAwesomeIcon icon={faSearch} /> */}
            </NavItem>
          <NavItem className="mx-2">
            {/* <FontAwesomeIcon icon={faUser} /> */}
            </NavItem>
          <NavItem className="mx-2">
            {/* <FontAwesomeIcon icon={faShoppingCart} />  */}
            ({cart.length})</NavItem>
        </Nav>
      </Navbar>

      <Row className="mb-1 ml-4">
        {categories.map((cat, index) => (
          <Col key={index} xs="1" className="text-center">
            {/* <FontAwesomeIcon icon={cat.icon} size="2x" /> */}
              <img src="https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/Grocery_v2.png" style={{height:"50px"}}></img>
            <p>{cat.name}</p>
          </Col>
        ))}
      </Row>


      <Row className="mb-4 ml-4">
          <Col xs="1">
            <Badge
                color="primary"
                pill
            >
                Primary
            </Badge>
          </Col>

          <Col xs="1">
            <Badge pill>
                Secondary
            </Badge>
          </Col>

          <Col xs="1">
            <Badge
                color="success"
                pill
            >
                Success
            </Badge>
          </Col>

          <Col xs="1">
            <Badge pill>
                Secondary
            </Badge>
          </Col>

          <Col xs="1">
            <Badge pill color="primary">
                Primary
            </Badge>
          </Col>

       
    
      </Row>
        <Row className="ml-4">
            <Col><h3>Recommended Items</h3></Col>
        </Row>

       

        <Row className="ml-4">
        {items.map((item) => (
            <Col key={item.id}  className="position-relative sm-4 md-2 xl-2"> {/* Added relative positioning */}
            <Card style={{ width: "150px", height: "200px", padding: "5px", position: "relative" }}> 
                <div style={{ position: "relative" }}> {/* Wrapper for positioning */}
                <CardImg 
                    style={{ height: "100px", objectFit: "cover", borderRadius: "8px" }} 
                    src={item.img} 
                    alt={item.name} 
                />
                {/* Floating Add Button */}
                <Button 
                    color="primary" 
                    size="sm" 
                    style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    borderRadius: "50%", 
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0"
                    }} 
                    onClick={() => addToCart(item)}
                >
                    +
                </Button>
                </div>
                <CardBody className="text-center" style={{ padding: "5px" }}>
                <CardTitle style={{ fontSize: "12px", marginBottom: "5px" }}>{item.name}</CardTitle>
                <CardText style={{ fontSize: "10px" }}>{item.price}</CardText>
                </CardBody>
            </Card>
            </Col>
        ))}
        </Row>



    </Container>
  );
};

export default HomePage;
