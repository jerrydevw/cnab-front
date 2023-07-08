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

import { useEffect, useState } from 'react';
import axios from 'axios';

async function getCnabs(page, size, storeName) {
  const params = {
    page: page,
    size: size,
    storeName: storeName
  }

  const result = await axios.get('http://localhost:8080/cnab', {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    params: params
  });

  return result.data;

}

export default function Home() {
  const [file, setFile] = useState();

  const [cnabs, setCnabs] = useState(null);

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

  useEffect(() => {
    if (cnabs == null) {
      getCnabs(0, 2, "BAR DO JOÃO")
      .then((result) => {
        setCnabs(result);
      })
    }
    
  }), [cnabs];

  return (

    <Container>
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
        <TableCnab cnabsPaginated={cnabs}></TableCnab>
      </Row>
    </Container>

  )
}