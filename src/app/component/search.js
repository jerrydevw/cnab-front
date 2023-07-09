import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function SearchTable({ setStoreName }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchTerm = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setStoreName(searchTerm);
        }, 600);

        return () => {
            clearTimeout(delayDebounceFn);
        };
    }, [searchTerm, setStoreName]);

    return (
        <>
            <Form.Label htmlFor="inputPassword5">Busca</Form.Label>
            <Form.Control
                type="text"
                id="searchCnab"
                aria-describedby="passwordHelpBlock"
                onChange={(e) => handleSearchTerm(e.target.value)}
            />
            <Form.Text id="passwordHelpBlock" muted>
                Informe o nome da loja
            </Form.Text>
        </>
    );
}

export default SearchTable;
