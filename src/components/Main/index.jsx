import NavigationBar from "./Navigationbar"
import TableList from "./TableList"
import Button from "react-bootstrap/Button";
import "./index.css"

function Main(){
    return(
        <div>
            <NavigationBar></NavigationBar>
            <div className="containter my-5">
                <div className="mx-auto d-flex justify-content-start">
                    <h2 className="text-start header">Twoje wydatki</h2>
                    <a href="/add" className="ml-auto btn btn-outline-primary btn-lg" role="button">Dodaj</a>
                </div>
            </div>
            <TableList></TableList>
        </div>
    )
}

export default Main