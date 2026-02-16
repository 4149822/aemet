
const Status = ({ loading, error }) => {
    if (!loading && !error) return null; // No mostrar nada si no hay ni error ni cargando.

    return (
        <div class="box">
            {loading && <span>Cargando...</span>}
            {error && <span >Error: {error}</span>}
        </div>
    );
};

export default Status;