import axios from "axios";

export default class dataService {
    static ipAddress = "http://localhost:5228"
    static token = localStorage.getItem("token")

    static validateAddData = (name, description, category, price) => {
        let errors = []
        if(!name){
            errors.push("Należy podać nazwę!")
        }
        if(!description){
            errors.push("Należy podać opis")
        }
        if(!category){
            errors.push("Należy podać kategorię")
        } else if (isNaN(Number(category))){
            errors.push("Zła kategoria")
        }
        if(!price){
            errors.push("Należy podać wydatek!")
        } else if (isNaN(Number(price))){
            errors.push("Wydatek musi być liczbą")
        }
        return errors
    }

    static getAllFinances = async () => {
        try {
            const res = await axios.get(`${this.ipAddress}/api/Finances`,
                {
                    headers: { Authorization: `Bearer ${this.token}`},
                }
            )
            return res.data
        } catch (err) {
            console.error(err)
        }
    }

    static addFinance = async (name, description, category, price) => {
        try {
            const res = await axios.post(`${this.ipAddress}/api/Finances`,
                {
                    name: name,
                    description: description,
                    category: category,
                    price: price
                },
                {
                    headers: { Authorization: `Bearer ${this.token}`},
                }
            )
            return res.data
        } catch (err) {
            console.error(err)
        }
    }

    static deleteFinance = async (id) => {
        try {
            const res = await axios.delete(`${this.ipAddress}/api/Finances/${id}`,
                {
                    headers: { Authorization: `Bearer ${this.token}`},
                }
            )
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
}