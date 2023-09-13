'use client';
import { useEffect, useState } from 'react';

const weatherApi = process.env.WEATHER_API_KEY
const weatherApiUrl = process.env.WEATHER_API_URL
async function fetchWeatherData() {
  try {
    const fetchUrl = `${weatherApiUrl}/current.json?key=${weatherApi}&q=London&aqi=no`
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const weatherData = await response.json();
    // Handle and use the weather data here
    console.log(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

export default function Form() {
    const [userLocation, setUserLocation] = useState('');

    function handleSubmit(event: any) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const location = formData.get('location')
        console.log('Form Data', formData);
        console.log('location', location);
        setUserLocation('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                id='location-input'
                className='text-black'
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
            >
                    Submit
            </button>
        </form>
    );
}