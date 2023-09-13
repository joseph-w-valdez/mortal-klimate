'use client';
import { useState } from 'react';

export default function Form() {
  const [userLocation, setUserLocation] = useState('');
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

      const weatherData = await response.json();
      console.log('weather results:', weatherData);
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
    );
}
