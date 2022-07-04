import axios from 'axios';

const getWeather = (city) => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const location = `?q=${city}`;
    const api_key = '&appid=3954ac8c3003271f325a3d7e814592a1';
    const units = '&units=metric';

    const request = axios.get(baseUrl + location + api_key + units);
    const response = request
                        .then(response => response.data)
                        .catch(() => []);
    return response;
};

const getIcon = (iconID) => {
    return (`http://openweathermap.org/img/wn/${iconID}@2x.png`);
};

export default { getWeather, getIcon };
