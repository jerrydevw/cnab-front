'use client'

import styles from './page.module.css'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import TableCnab from './component/table';
import PaginationCustom from './component/pagination';
import SearchTable from './component/search';
import SelectQuantityTable from './component/select';
import url from 'url';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState();

  const [cnabs, setCnabs] = useState(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [storeName, setStoreName] = useState(null);
  const [totalPages, setTotalPages] = useState(0);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const hadleSearchTerm = (searchTerm) => {
    setStoreName(searchTerm);
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!file) {
      console.log("No file selected! ");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios.post('http://localhost:8080/cnab', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*"
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });

  };

  const getCnabs = async function getCnabs(page, size, storeName) {
    const params = new URLSearchParams();
    params.append('page', page);
    params.append('size', size);
    params.append('storeName', storeName);

    // const params = new url.URLSearchParams({ page: page, size: size, storeName: storeName });

    const result = await axios.get('http://localhost:8080/cnab', {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      params: params
    });

    return result.data;

  }

  useEffect(() => {
    if (cnabs == null) {
      getCnabs(page, size, storeName)
      .then((result) => {
        setCnabs(result);
        setTotalPages(result.totalPages);
      })
    }
    
  }), [cnabs];


  useEffect(() => {
    if (cnabs != null) {
      getCnabs(page, size, storeName)
      .then((result) => {
        setCnabs(result);
        setTotalPages(result.totalPages);
      })
    }
  }, [page, size, storeName]);

  return (

    <Container>
      <Row>
        <Col>
          lembrar de jogar para o meio do container
        </Col>
      </Row>
    
      <Row>
        <Col>
          <>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" onChange={handleFileChange}/>
            </Form.Group>
          </>   
        </Col>

        <Col>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Upload</Button>
        </Col>
        
      </Row>

      <Row>
        <Col>
          <SearchTable setStoreName={setStoreName}></SearchTable>
        </Col>
      </Row>

      <Row>
        <TableCnab cnabsPaginated={cnabs}></TableCnab>
      </Row>

      <Row>
        <div className="d-flex justify-content-center">
          <PaginationCustom setPage={handlePageChange} currentPage={page} totalPages={totalPages}></PaginationCustom>
        </div>
      </Row>
    </Container>

  )
}