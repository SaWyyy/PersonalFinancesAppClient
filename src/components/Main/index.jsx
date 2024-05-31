import NavigationBar from "./Navigationbar"
import TableList from "./TableList"
import Button from "react-bootstrap/Button";
import "./index.css"
import { useState } from "react";

function Main(){

    const [dataFromTable, setDataFromTable] = useState([])

    const handleDataFromTable = (data) => {
        setDataFromTable(data)
    }

    const countAllPrice = () => {
        const today = new Date()
        let month = today.getMonth() + 1
        var allPrice = 0
        dataFromTable.forEach((element) => {
            var date = element.date.split('-')
            if(Number(date[1]) === month){
                allPrice += Number(element.price)
            }
        })
        return allPrice
    }

    return(
        <div>
            <NavigationBar></NavigationBar>
            <div className="containter my-5">
                <div className="mx-auto d-flex justify-content-start">
                    <h2 className="text-start header">Twoje miesięczne wydatki: {countAllPrice()}</h2>
                    <a href="/add" className="ml-auto btn btn-outline-primary btn-lg" role="button">Dodaj</a>
                </div>
            </div>
            <TableList sendData={handleDataFromTable}></TableList>
        </div>
    )
}

export default Main