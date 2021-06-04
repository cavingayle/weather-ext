import React, { useEffect, useState } from 'react'
import { fecthOpenWeatherData, OpenWeatherData, OpenWeatherTempScale } from "../../utils/api"
import { Box, Card, CardActions, CardContent, Typography, Button } from '@material-ui/core'

const WeatherCardContainer: React.FC<{
    children: React.ReactNode
    onDelete?: () => void
}> = ({ children, onDelete }) => {
    return <Box mx={'4px'} my={"16px"}>
        <Card>
            <CardContent>
                {children}
            </CardContent>
            <CardActions>
                {
                    onDelete && <Button color='secondary' onClick={onDelete}>Delete</Button>
                }

            </CardActions>
        </Card>
    </Box>
}

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCard: React.FC<{
    city: string
    tempScale: OpenWeatherTempScale
    onDelete?: () => void
}> = ({ city, onDelete, tempScale }) => {

    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
    const [cardState, setCardState] = useState<WeatherCardState>("loading")

    useEffect(() => {
        fecthOpenWeatherData(city, tempScale)
            .then((data) => {
                setWeatherData(data)
                setCardState("ready")
            })
            .catch((err) => setCardState("error"))
    }, [city, tempScale])

    if (cardState === "loading" || cardState === "error") {
        return <WeatherCardContainer onDelete={onDelete}>
            <Typography>
                {
                    cardState == "loading" ? "Loading..." : "Error: could not retriever weather data for this city"
                }
            </Typography>
        </WeatherCardContainer>
    }

    return <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="h5">{city}</Typography>
        <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
        <Typography variant="body1">Feels like:{Math.round(weatherData.main.feels_like)}</Typography>
    </WeatherCardContainer>

}
export default WeatherCard