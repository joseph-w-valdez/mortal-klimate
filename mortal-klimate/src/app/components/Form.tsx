'use client';
import { useState } from 'react';

interface WeatherData {
  current: {
    condition: {
      text: string,
      icon: string,
    },
    feelslike_f: number,
    gust_mph: number,
    humidity: number,
    temp_f: number,
    wind_mph: number,
    uv: number,
  };
  location: {
    name: string,
    country: string,
    region: string,
  }
}

export default function Form() {
  const [userLocation, setUserLocation] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const weatherApi = process.env.NEXT_PUBLIC_WEATHER_API_KEY
  const weatherApiUrl = process.env.NEXT_PUBLIC_WEATHER_API_URL

  async function fetchWeatherData() {
    try {
      const fetchUrl = `${weatherApiUrl}/current.json?key=${weatherApi}&q=${userLocation}&aqi=no`
      console.log('fetch', fetchUrl)
      const response = await fetch(fetchUrl);


      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const currentWeather = await response.json();
      console.log('weather results:', currentWeather);
      setWeatherData(currentWeather)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

    function handleSubmit(event: any) {
        event.preventDefault()
        fetchWeatherData()
        setUserLocation('');
    };

    return (
        <div className='flex flex-col gap-4 border border-2 p-6 rounded-xl'>
          <form
            onSubmit={handleSubmit}
            className='flex gap-4'
          >
              <input
                  id='location-input'
                  className='text-black rounded-lg pl-4'
                  name='location'
                  value={userLocation}
                  type='text'
                  placeholder='Enter location...'
                  required
                  onChange={(e) => {setUserLocation(e.target.value)}}
              />
              <button
                  id='submit-button'
                  type='submit'
                  className='bg-gray-300 px-2 py-1 rounded-lg text-black hover:bg-gray-500 hover:text-white transition duration-300'
              >
                      Submit
              </button>
          </form>
          {weatherData && (
            <div className='flex flex-col gap-2'>
              <h1>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h1>
              <div className='flex items-center justify-between'>
                <p>Condition: {weatherData.current.condition.text}</p>
                <img
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                  className='w-16 h-16'
                />
              </div>
              <p>Temperature: {weatherData.current.temp_f}°F</p>
              <p>Feels Like: {weatherData.current.feelslike_f}°F</p>
              <p>Wind Speed: {weatherData.current.wind_mph}mph</p>
              <p>Gust Speed: {weatherData.current.gust_mph}mph</p>
              <p>Humidity: {weatherData.current.humidity}</p>
              <p>UV Index: {weatherData.current.uv}</p>
            </div>
          )}
        </div>
    );
}
