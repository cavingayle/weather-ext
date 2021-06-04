const OPEN_WEATHER_API_KEY = '074d70334afff4f149be9ea6552aec55'


export interface OpenWeatherData {
    name: string
    main:{
        feels_like: number
        humididty: number
        pressure: number
        temp_max: number
        temp_min: number
        temp: number
    }
    weather: {
        description: string
        icon: string
        id: number
        main: string
    }[]
    wind: {
        deg: number
        speed: number
    }
}

export type OpenWeatherTempScale = "metric" | 'imperial'

export async function fecthOpenWeatherData(
    city: string,
    tempScale:OpenWeatherTempScale
): Promise<OpenWeatherData> {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`)
    
    if (!res.ok) {
        throw new Error('City not found')
    }

    const data: OpenWeatherData = await res.json()
   
    return data
}