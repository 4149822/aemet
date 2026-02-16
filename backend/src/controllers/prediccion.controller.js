import fetch from 'node-fetch';

const fetchAemet = async (path) => {
    const response = await fetch(`https://opendata.aemet.es/opendata/${path}?api_key=${process.env.AEMET_API_KEY}`);
    if (!response.ok) throw new Error(`Error HTTP en la comunicación con la API de AEMET: ${response.status}`);

    return await response.json();
}

export const getPrediccion = (tipo) => async (req, res, next) => {
    const { codigo } = req.params;

    // En el caso que el codigo no se haya mandado.
    if (!codigo) return res.status(400).json({ error: "Codigo de municipio requerido" });

    // Validacion local del codigo para no hacer demasiadas requests a la API de AEMET innecesarias.
    if (!/^\d{5}$/.test(codigo)) return res.status(400).json({ error: "Codigo de municipio invalido" });

    try {
        const data = await fetchAemet(`api/prediccion/especifica/municipio/${tipo}/${codigo}`)

        if (data.estado !== 200) {
            if (data.estado === 404) {
                return res.status(404).json({ error: `No se encontraron datos para el código ${codigo}` });
            } else {
                throw new Error(`Error en la API de AEMET: ${data.descripcion}`);
            }
        }

        const dataResponse = await fetch(data.datos);
        if (!dataResponse.ok) throw new Error(`Error HTTP al obtener datos en la API de AEMET: ${dataResponse.status}`);
        const datos = await dataResponse.json();

        res.json({ success: true, tipo: tipo, data: datos });

    } catch (error) {
        next(error); // Mandamos el error al middleware.
    }
}