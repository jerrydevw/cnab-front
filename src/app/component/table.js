import Table from 'react-bootstrap/Table';

function TableCnab(cnabsPaginated) {
    const tableHeaders = [
        "Data", "Valor", "Cpf", "Numero do cartao", "Hora", "Dono da loja", "Nome da loja", "Tipo", "Natureza"
    ]


    return (
        <Table striped bordered hover>

            <thead>
                <tr>
                    <th>#</th>
                    {tableHeaders.map((headerName, index) => (
                        <th key={index}>{headerName}</th>
                    ))}
                </tr>
            </thead>

            <tbody>

                {cnabsPaginated.cnabsPaginated?.content.map((cnab, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{cnab.date}</td>
                        <td>{cnab.value}</td>
                        <td>{cnab.cpf}</td>
                        <td>{cnab.cardNumber}</td>
                        <td>{cnab.hour}</td>
                        <td>{cnab.onwnerStore}</td>
                        <td>{cnab.nameStore}</td>
                        <td>{cnab.type.description}</td>
                        <td>{cnab.type.nature}</td>
                    </tr>    
                ))}
            </tbody>
        </Table>
    );
}

export default TableCnab;