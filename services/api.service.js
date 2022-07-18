export const getWeatherApiUrl = (query) => `http://api.weatherstack.com/current?access_key=${process.env.api_key}&query=${query}`;
