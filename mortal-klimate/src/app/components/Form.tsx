'use client';
import { useState } from 'react';
import Image from 'next/image'

interface WeatherData {
  current: {
    condition: {
      text: string,
      icon: string,
    },
    feelslike_c: number,
    feelslike_f: number,
    gust_kph: number,
    gust_mph: number,
    humidity: number,
    temp_c: number,
    temp_f: number,
    wind_kph: number,
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
  const [isFahrenheit, setIsFahrenheit] = useState(true)
  const [isImperial, setIsImperial] = useState(true)


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

    const toggleTempUnit = () => {
      setIsFahrenheit(!isFahrenheit)
    }

    const toggleImperialUnits = () => {
      setIsImperial(!isImperial)
    }

    return (
        <div className='flex flex-col gap-4 border border-2 p-6 rounded-xl min-w-[500px]'>
          <form
            onSubmit={handleSubmit}
            className='flex gap-4 justify-between items-center'
          >
              <div className='flex gap-1'>
                <input
                    id='location-input'
                    className='text-black rounded-lg pl-4 h-10'
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
                    className='bg-gray-300 h-10 px-2 py-1 rounded-lg text-black hover:bg-gray-500 hover:text-white transition duration-300'
                >
                  Submit
                </button>
              </div>
              <div className='flex flex-col w-[200px] gap-2'>
              <button
                className='flex bg-gray-500 rounded-xl relative items-center'
                type='button'
                onClick={toggleTempUnit}
              >
                  <div className={`w-5 h-5 rounded-full absolute bg-white shadow-xl ${isFahrenheit ? 'translate-x-1' : 'translate-x-[175px]'} transition duration-300`}></div>
                  <div className='w-1/2'>°F</div>
                  <div className='w-1/2'>°C</div>
                </button>
              <button
                className='flex bg-gray-500 rounded-xl relative items-center'
                type='button'
                onClick={toggleImperialUnits}
              >
                  <div className={`w-5 h-5 rounded-full absolute bg-white shadow-xl ${isImperial ? 'translate-x-1' : 'translate-x-[175px]'} transition duration-300`}></div>
                  <div className='w-1/2 pl-3'>Imperial</div>
                  <div className='w-1/2 pr-2'>Metric</div>
                </button>
              </div>
          </form>
          {weatherData && (
            <div className='flex flex-col gap-2'>
              <h1>{weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</h1>
              <div className='flex items-center justify-between'>
                <p>Condition: {weatherData.current.condition.text}</p>
                <div className='w-16 h-16 relative'>
                    <Image
                    src={`https:${weatherData.current.condition.icon}`}
                    alt={weatherData.current.condition.text}
                    fill={true}
                    sizes='100vh'
                    />
                    </div>
              </div>
              {isFahrenheit && (
                <>
                    <p>Temperature: {weatherData.current.temp_f}°F</p>
                    <p>Feels Like: {weatherData.current.feelslike_f}°F</p>
                </>
              )}
              {!isFahrenheit && (
                <>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                    <p>Feels Like: {weatherData.current.feelslike_c}°C</p>
                </>
              )}
              {isImperial && (
                <>
                    <p>Wind Speed: {weatherData.current.wind_mph}mph</p>
                    <p>Gust Speed: {weatherData.current.gust_mph}mph</p>
                </>
              )}
              {!isImperial && (
                <>
                    <p>Wind Speed: {weatherData.current.wind_kph}kph</p>
                    <p>Gust Speed: {weatherData.current.gust_kph}kph</p>
                </>
              )}
              <p>Humidity: {weatherData.current.humidity}</p>
              <p>UV Index: {weatherData.current.uv}</p>
            </div>
          )}
        </div>
    );
}
