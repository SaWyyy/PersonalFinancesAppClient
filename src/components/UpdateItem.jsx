import { useState } from "react"
import dataService from "../services/dataService"
import { useLocation, useNavigate } from "react-router-dom"

function UpdateItem(){
    const location = useLocation()
    const item = location.state.item
    const id = item.id

    const categoryMap = {
        'Dom': 1,
        'Jedzenie': 2,
        'Transport': 3,
        'Zdrowie': 4,
        'Ubrania': 5,
        'Edukacja': 6,
        'Relaks': 7,
        'Zwierzęta': 8,
        'Prezenty': 9,
        'Ubezpieczenie': 10,
    }

    const mapCategory = (str) => {
        return categoryMap[str] || "unknown"
    }
    
    const [name, setName] = useState(item.name)
    const [description, setDescriptiton] = useState(item.description)
    const [category, setCategory] = useState(mapCategory(item.category))
    const [price, setPrice] = useState(item.price)
    const [message, setMessage] = useState();
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
	const [validateErrors, setValidateErrors] = useState([]);

    const navigate = useNavigate()

    const handleName = (e) => {
        setName(e.target.value)
        setSubmitted(false)
    }

    const handleDescription = (e) => {
        setDescriptiton(e.target.value)
        setSubmitted(false)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setSubmitted(false)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
        setSubmitted(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError(false);

		const validationResult = dataService.validateAddData(name, description, category, price);

		if (!validationResult.length == 0) {
			setMessage("Formularz został niepoprawnie wypełniony:")
			setValidateErrors(validationResult);
			setError(true);
		} else {
			setValidateErrors([]);
			setSubmitted(true);
			setError(false);
			dataService.updateFinance(id, name, description, Number(category), Number(price)).then((res) => {
				console.log("Dodano dane");
                navigate("/main")
			}).catch((err) => {
				const status = err.toJSON().status;
				console.log(err);
			})
			setValidateErrors([])
		}
    }

    const errorMessage = () => {
		return (
			<div
				className="error alert alert-danger alert-dismissible fade show"
				role="alert"
				style={{
					display: error ? "" : "none",
				}}
			>
				<strong>{message}</strong>
				<ul>
					{validateErrors.map((error) => (
                  <li>{error}</li>
                ))}
				</ul>
			</div>
		);
	};


    return(
        <div className="container mt-5">
			<div className="row justify-content-center align-items-center">
				<div className="col-sm-12 col-md-12 col-lg-4">
					<h1 className="mb-3">Edytuj</h1>
					<form method="post" onSubmit={(e) => {}}>
						<div className="messages">{errorMessage()}</div>
						<div className="mb-3">
							<label className="form-label">Nazwa</label>
							<input
								type="text"
								className="form-control"
								onChange={handleName}
								value={name}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="mb-3">
							<label className="form-label">Opis</label>
							<input
								type="text"
								className="form-control"
								onChange={handleDescription}
								value={description}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="mb-3">
							<label className="form-label">Kategoria</label>
                            <select
                                className="form-select"
                                onChange={handleCategory}
                                value={category}
                            >
                                <option value="">Wybierz kategorię</option>
                                <option value="1">Dom</option>
                                <option value="2">Jedzenie</option>
                                <option value="3">Transport</option>
                                <option value="4">Zdrowie</option>
                                <option value="5">Ubrania</option>
                                <option value="6">Edukacja</option>
                                <option value="7">Relaks</option>
                                <option value="8">Zwierzęta</option>
                                <option value="9">Prezenty</option>
                                <option value="10">Ubezpieczenie</option>
                            </select>
							<span className="text-danger"></span>
						</div>
                        <div className="mb-3">
							<label className="form-label">Wydatek</label>
							<input
								type="text"
								className="form-control"
								onChange={handlePrice}
								value={price}
							/>
							<span className="text-danger"></span>
						</div>
						<div className="mb-3">
							<button
								type="submit"
								className="btn btn-primary"
								onClick={handleSubmit}
							>
								Edytuj
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
    )
}

export default UpdateItem