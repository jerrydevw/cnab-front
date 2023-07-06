'use client'

import styles from './page.module.css'
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

export default function Home() {

  const [file, setFile] = useState();

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
        "Origin": "http://localhost:3000",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  return (
    <main className={styles.main}>

      <div>
        <form method="post" onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <div>{file && `${file.name} - ${file.type}`}</div>
          <button type="submit">Upload</button>
        </form>
      </div>

    </main>
  )
}