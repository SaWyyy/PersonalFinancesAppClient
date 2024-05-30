import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function Navigationbar(){

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return(
        <Navbar bg="priamry" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Personal Finances App</Navbar.Brand>
                <Nav className="me-auto">

                </Nav>
                <Nav>
                    <Button variant="outline-light" onClick={handleLogout}>
                        Wyloguj się
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigationbar