import './WeatherCard.css';

const getEmoji = (estado) => {
    if (!estado) return '';
    const estadoLower = estado.toLowerCase();

    switch (true) {
        case estadoLower.includes('despejado'):
            return '☀️';
        case estadoLower.includes('poco nuboso'):
            return '🌤️';
        case estadoLower.includes('lluvia'):
            return '🌧️';
        case estadoLower.includes('nub'):
            return '☁️';
        case estadoLower.includes('tormenta'):
            return '⛈️';
        case estadoLower.includes('nieve'):
            return '❄️';
        case estadoLower.includes('niebla'):
            return '🌫️';
        default:
            return '';
    }
};

const WeatherCard = ({ data, tipo }) => {

    if (tipo === 'diaria') {
        const maxPrecip = data.probPrecipitacion?.length ? Math.max(...data.probPrecipitacion.map(p => Number(p.value))) : 0; // Cojemos la prob maxima del dia.
        const estadoObj = data.estadoCielo?.find(
            e => e.descripcion && e.descripcion.trim() !== ''
        ); // Por simplifcar buscamos el primer estadoCielo que su descripcion no sea vacia

        const estadoCielo = estadoObj?.descripcion ?? "Sin datos";

        return (
            <div className="weather-card">
                <h3>{new Date(data.fecha).toLocaleDateString()}</h3>
                <p>{getEmoji(estadoCielo)} {estadoCielo}</p>
                <p>Max: {data.temperatura.maxima}°C</p>
                <p>Min: {data.temperatura.minima}°C</p>
                <p>Precip: {maxPrecip}%</p>
            </div>
        );
    }

    if (tipo === 'horaria') {
        return (
            <div className="weather-card">
                <h3>{data.hora}:00</h3>
                <p>{getEmoji(data.descripcion)} {data.descripcion}</p>
                {data.temperatura && <p>Temp: {data.temperatura}°C</p>} { /* Cuando lo hacemos por horaria la AEMET a veces nos devuelve esta valor nulo */}
            </div>
        );
    }

    return null;
};

export default WeatherCard;