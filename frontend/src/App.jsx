import { useState } from 'react';

import './App.css'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import WeatherResults from './components/WeatherResults';
import Status from './components/Status';

function App() {
  const [resultados, setResultados] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tipo, setTipo] = useState('diaria')

  return (
    <div className="app">
      <Header />

      <div className="main-container">

        <SearchForm
          setResultados={setResultados}
          setLoading={setLoading}
          setError={setError}
          setTipo={setTipo}
          tipo={tipo}
        />

        <Status error={error} loading={loading} />

        <WeatherResults data={resultados} tipo={tipo} />
      </div>

    </div>
  )
}

export default App
