import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";

function Header(){
    const [show, setShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("isAdmin");
        if (user) {
        setIsLoggedIn(true);
        }
    }, []);

    const handleLoginOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    // const handleLogout = () => {
    //     localStorage.removeItem("isAdmin");
    //     setIsLoggedIn(false);
    // };
    
    const navigate = useNavigate();
    
    const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);

    navigate("/");   // URL change 
    };
    
    return(
        <div className="py-4 bg-dark text-white" style={{ background: "#333", color: "#fff"}}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h2 className="text-white mb-0"><img src={reactLogo} className="framework" alt="React logo" /> React logo</h2>
                    </Col>
                     <Col md={5}>
                     <ul>
                        <li><a href="#">Home</a></li>
                     </ul>
                     </Col>
                    <Col md={3}>
                        {isLoggedIn ? (
                            <Button
                            variant="danger"
                            style={{ float: "right" }}
                            onClick={handleLogout}
                            >
                            Logout
                            </Button>
                        ) : (
                            <Button
                            variant="light"
                            style={{ float: "right" }}
                            onClick={handleLoginOpen} 
                            >
                            Login
                            </Button>
                        )}

                        <LoginModal
                            show={show}
                            handleClose={handleClose}
                            setIsLoggedIn={setIsLoggedIn} 
                        />
                    </Col>
                </Row>
                
            </Container>
        </div>
    );
}
export default Header;