import axios from 'axios';

const fetchTransactions = async() => {
    const response = await axios.get("");
    console.log(response.data);
}