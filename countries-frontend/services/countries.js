import axios from 'axios';
const baseUrl = 'https://restcountries.com/v3.1/name/';

const get = (userInput) => {
    const request = axios.get(baseUrl + userInput);
    const response = request
                        .then(response => response.data)
                        .catch(() => []);
    return response;
};

export default { get };
