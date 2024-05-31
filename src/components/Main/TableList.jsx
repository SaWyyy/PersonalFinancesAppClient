import { useEffect, useState } from "react";
import dataService from "../../services/dataService";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

function TableList({sendData}) {
    const [allFinances, setAllFinances] = useState([])
    const [allFinancesMapped, setAllFinancesMapped] = useState([])
    const [isLoadingAllFinances, setIsLoadingAllFinances] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)
    const [pickCategory, setPickCategory] = useState("Default")

    const navigate = useNavigate()

    const categoryMap = {
        1: 'Dom',
        2: 'Jedzenie',
        3: 'Transport',
        4: 'Zdrowie',
        5: 'Ubrania',
        6: 'Edukacja',
        7: 'Relaks',
        8: 'Zwierzęta',
        9: 'Prezenty',
        10: 'Ubezpieczenie'
    }



    useEffect(() => {
        dataService.getAllFinances().then((data) => {
            setAllFinances(data)
            setAllFinancesMapped(mappedData)
            sendData(data)
            setIsLoadingAllFinances(false)
        })
    }, [isLoadingAllFinances])

    const mapCategory = (num) => {
        return categoryMap[num] || "unknown"
    }

    const mappedData = allFinances.map(item => {
        return {
            ...item,
            category: mapCategory(item.category)
        }
    })

    const handleDeleteItem = (id) => {
        if(!isLoadingAllFinances){
            dataService.deleteFinance(id).then(() => {
                setIsLoadingAllFinances(true)
            })
        }
    }

    const handleUpdateItem = (item) => {
        if(!isLoadingAllFinances){
            setSelectedItem(item)
            navigate("/update", {
                state: {item : item}
            })
        }
    }

    const handlePickCategory = (eventkey) => {
        setPickCategory(eventkey)
    }

    const filteredFinances = pickCategory === 'Default'
        ? allFinancesMapped
        : allFinancesMapped.filter(item => item.category === pickCategory)

    return (
        <div className="containter my-5">
            <div className="mx-auto rounded border p-4 border-info" style={{ width: "1500px"}}>
                <Table hover className="rounded-3 overflow-hidden table">
                    <tbody>
                        <tr className="table-active">
                            <td>Nazwa</td>
                            <td>Opis</td>
                            <td>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                <NavDropdown className="dropdown" title="Kategoria" onSelect={handlePickCategory}>
                                    <div style={{height: "100px", overflowY: "auto"}}>
                                        <NavDropdown.Item eventKey="Default">Wszystko</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Dom">Dom</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Jedzenie">Jedzenie</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Transport">Transport</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Zdrowie">Zdrowie</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Ubrania">Ubrania</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Edukacja">Edukacja</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Relaks">Relaks</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Zwierzęta">Zwierzęta</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Prezenty">Prezenty</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="Ubezpieczenie">Ubezpieczenie</NavDropdown.Item>
                                    </div>
                                </NavDropdown>
                                </div>
                            </td>
                            <td>Wydatek</td>
                            <td>Data</td>
                            <td></td>
                        </tr>
                        {
                            filteredFinances.map((item) =>
                                <tr key={item.id}>
                                    <td>
                                        <span className="truncate text-truncate">{item.name}</span>
                                    </td>
                                    <td>
                                        <span className="truncate text-truncate">{item.description}</span>
                                    </td>
                                    <td>{item.category}</td>
                                    <td>
                                        <span className="truncate text-truncate">{item.price}</span>
                                    </td>
                                    <td>{item.date}</td>
                                    <td>
                                        <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleUpdateItem(item)}>Edytuj</Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteItem(item.id)}>Usuń</Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default TableList