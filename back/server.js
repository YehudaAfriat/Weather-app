
const express = require("express");
const dotenv = require('dotenv').config(); // חבילה לצורך קריאת נתוני קובץ אי-אן-וי
// const fetch = require('node-fetch');
const cors = require("cors");

const app = express();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const PORT = process.env.PORT;

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());
app.use(express.static("../front/dist"));

app.get("/weather", async (req, res) => {
    console.log("'GET' alert from front.."); //
    
    /* object destructuring */
    const { city } = req.query;
    // עוד שיטה במקום לבצ את הפקודה הבאה
    // const city = req.body.city;
    console.log(`query: "${city}"`); //

    // במידה ומשהו לא תקין במשתנה 'סיטי' תוציא שגיאה למשתמש
    if(!city){
        return res.status(400).json({message: "city is required"});
    }
    
    console.log("trying to fetch data..."); //

    try {
        // שמירת הבקשה במשתנה. קידוד עבור משתנה העיר שיתאים לפורמט של יו-אר-אל
        // בצירוף בקשות לפרמטרים נוספים כגון סוג יחידת מספר עבור מעלות ולחות
        // בנוסף מצורף מפתח ה-איי-פי-איי לבקשה
        // בקשת 'גט' לשרת מזג האוויר
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${API_KEY}`;    

    console.log(`Fetching data from: ${apiUrl}...`); //

    // קריאה לשרת עם הבקשה למזג האוויר
    const response = await fetch(apiUrl);
    // בדיקת מענה מהשרת
    if(!response.ok){
        console.error(`OpenWeatherMap API responded with status ${response.status}`); //
        return res.status(404).json({message: "city not found"});
    }
    // המרה נתונים מג'ייסון שהתקבלו מהשרת
    const data = await response.json();    

    // פורמט שליחת הנתונים חזרה ללקוח
    const weather = {
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        description: data.weather[0].description,
    }
    console.log(`Data recived..`); //
    console.log(`Sending...`); //
    console.log(data);
    
    
    res.json(weather); // שליחת התשובה למשתמש
    } catch (error) {
        console.error('Error occurred:', error.message); // 
        res.status(500).json({error: "faild to fetch weather data."})
    }

    res.end();
});



app.listen(PORT, () => {
    console.log("listening on port http://localhost:" + PORT);
});
