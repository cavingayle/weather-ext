import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Box,
  Button
} from '@material-ui/core'
import 'fontsource-roboto'
import './options.css'
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,

} from '../utils/storage'

type FormState = 'ready' | 'saving'

const App: React.FC<{}> = () => {

  const [options, setOptions] = useState<LocalStorageOptions | null>(null)
  const [formState, setFormState] = useState<FormState>('ready')


  useEffect(() => {
    getStoredOptions()
      .then((options) => setOptions(options))
  }, []
  )


  const handleHomeCityChange = (homeCity: string) => {
    console.log(homeCity)
    setOptions({
      ...options,
      homeCity
    })
  }


  const handleSaveButtonClick = () => {
    setFormState('saving')
    setStoredOptions(options)
      .then(() => {
        setTimeout(() => {
          setFormState('ready')
        }, 1000)
      
    })
  }

  if (!options) {
    return null
  }

  const isFieldDisabled =  formState === 'saving'

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField disabled={isFieldDisabled} onChange={e => handleHomeCityChange(e.target.value)} value={options.homeCity} fullWidth placeholder="Enter a home city name" />
            </Grid>
            <Grid item>
              <Button  disabled={isFieldDisabled} color="primary" variant="contained" onClick={handleSaveButtonClick}>
                {formState === 'ready' ? "Save" :  'Saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )


}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
