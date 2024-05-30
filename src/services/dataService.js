import axios from "axios";

export default class dataService {
    static ipAddress = "http://localhost:5228"
    static token = localStorage.getItem("token")

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