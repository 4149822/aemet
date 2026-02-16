import './WeatherResults.css';
import WeatherCard from './WeatherCard';

const WeatherResults = ({ tipo, data }) => {
    if (!data || data.length === 0) return null; // Si no hay datos pues no mostramos nada

    const { nombre, provincia } = data[0];
    const dias = data[0].prediccion.dia;

    return (
        <div class="box">
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32" height="32">
                    <g fill="none">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
                            d="M30.783 24.565a6.783 6.783 0 1 0-6.683-7.947" stroke="currentColor"></path>
                        <path
                            d="M33 7a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm9 5a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm2 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4ZM22 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"
                            fill="currentColor"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
                            d="M9.455 39.994A13.95 13.95 0 0 1 4 28.885C4 21.217 10.105 15 17.636 15c6.297 0 11.598 4.346 13.166 10.253a8.921 8.921 0 0 1 4.107-.996c5.02 0 9.091 4.144 9.091 9.256c0 3.796-2.244 7.059-5.455 8.487"
                            stroke="currentColor"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4"
                            d="M22.243 24.757a6 6 0 0 0-8.485 8.485" stroke="currentColor"></path>
                    </g>
                </svg>
                Tiempo en {nombre}, {provincia}
            </h2>
            <div class="weather-cards">

                {tipo === 'diaria' &&
                    dias.map((dia, i) => (
                        <WeatherCard key={i} data={dia} tipo="diaria" />
                    ))
                }

                {tipo === 'horaria' &&
                    dias.map((dia, i) => (
                        <div key={i} className="dia-bloque">

                            <h3>{new Date(dia.fecha).toLocaleDateString()}</h3>

                            <div className="horas-container">
                                {dia.estadoCielo.map((hora, j) => (
                                    <WeatherCard
                                        key={j}
                                        data={{
                                            hora: hora.periodo,
                                            descripcion: hora.descripcion,
                                            temperatura: dia.temperatura.find(
                                                t => t.periodo === hora.periodo
                                            )?.value,
                                            precipitacion: dia.probPrecipitacion?.find(
                                                p => p.periodo === hora.periodo
                                            )?.value
                                        }}
                                        tipo="horaria"
                                    />
                                ))}
                            </div>

                        </div>
                    ))}

            </div>
        </div>
    )
}

export default WeatherResults;