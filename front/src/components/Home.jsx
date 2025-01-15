/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';

export default function Home() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // פונקציה שתוציא בקשה איי-פי-איי לשרת לקבלת נתוני מזג אוויר
  const fetchWeather = async () => {

    // בדיקת תקינות נתוני שם העיר
    // אם סטייט שם העיר ללא תווים תעדכן את סטייט השגיאות ותצא מהפונקציה
    if(!city.trim()){ // פונקציה טרים גוזרת רווחים מיותרים ואם אין רווח ויש תווים אז הכל תקין
      setError('Please enter a city name');
      return;
    }

    // עדכון הסטייטים השונים
    setLoading(true);
    setError('');
    setWeather(null);
    
    try {
      
      // קבלת נתונים מהשרת עם שליחת נתוני שם העיר בתצורת קי=ווליו לאחר הסימן שאלה
      // משתמש להעברת נתונים לשרת ישירות
      // בצד שרת ניתן לראות איך השרת קורא את הנתונים
      const response = await fetch(`http://localhost:3000/weather?city=${city}`);
      
      // או.קיי - מחזיר בוליאני תקין כשמקבל סטטוסים בין 200 ל - 299
      if(!response.ok){
        throw new Error('Failed to fetch weather data. Please try again.');
      }

      // קבלת הנתונים מהשרת והמרתם מתבנית ג'ייסון
      const data = await response.json();
      setWeather(data); // עדכון סטייט עם הנתונים שהתקבלו
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // בצורה דיפולטיבית בתגית פורם, כאשר לוחצים על כפתור לשליחת הטופס 'טייפ=סאבמיט' הדף מבצע רענון
  // לכן נרצה לעצור את ההתנהגות הזו
  // זה חשוב בריאקט כי אנחנו מטפלים בבקשה בג'יי-אס מה שמאפשר לנו לעדכן את הממשק
  // באופן דינאמי ללא טעינת העמוד מחדש 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };


  return (
    <div>
            <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Get Weather
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Weather in {weather.city}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind} km/h</p>
          <p>Now: {weather.description}</p>
        </div>
      )}
    </div>
  )
};
