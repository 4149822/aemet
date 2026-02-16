import './SearchForm.css';

import { useState, useEffect } from 'react';

const SearchForm = ({ setResultados, setLoading, setError, tipo, setTipo }) => {
    const [codigo, setCodigo] = useState('')
    const [tipoForm, setTipoForm] = useState(tipo);

    useEffect(() => {
        setResultados(null); // Limpiamos los resultados cuando se cambia el tipo del form
    }, [tipoForm, setResultados]);

    const onSearch = async (e) => {

        const codigoTrim = codigo.trim();
        if (!codigoTrim.match(/^\d{5}$/)) {
            setError('Introduce un código de municipio válido (5 dígitos)');
            setResultados(null);
            return;
        }

        setLoading(true);
        setError('');
        setResultados(null);

        try {
            const response = await fetch(`http://localhost:3000/prediccion/${tipoForm}/${codigoTrim}`);

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Error en la consulta');
            }

            const data = await response.json();
            setTipo(tipoForm);
            setResultados(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="box">
            <h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#000000" width="32" height="32"><g fill="none" stroke-linejoin="round" stroke-width="4" stroke="currentColor"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"></path><path stroke-linecap="round" d="M26.657 14.343A7.975 7.975 0 0 0 21 12a7.975 7.975 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"></path></g></svg>
                Consultar el tiempo
            </h2>

            <div className="flex">
                <div className="segmented">
                    <button
                        className={tipoForm === 'diaria' ? 'active' : ''}
                        onClick={() => setTipoForm('diaria')}
                    >
                        Diaria
                    </button>
                    <button
                        className={tipoForm === 'horaria' ? 'active' : ''}
                        onClick={() => setTipoForm('horaria')}
                    >
                        Horas
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Código de municipio (ej: 30016)"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />

                <button onClick={onSearch}>Consultar</button>
            </div>
        </div>
    );
};


export default SearchForm;