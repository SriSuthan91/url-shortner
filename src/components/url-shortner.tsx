import React from 'react';
import { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import axios from 'axios';
import validator from 'validator';
import api_url from "../api/api";


function UrlShortner() {
    const [url, setUrl] = useState('');
    const [shortendUrl, setShortenedUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchData = async () => {

      if(url.trim().length === 0){
        setErrorMessage('Url must be filled out...');
        setTimeout(() => setErrorMessage(""), 3000);
        return false;
      }

     
      if (!validator.isURL(url)) {
        setErrorMessage('Url must be valid');
        setTimeout(() => setErrorMessage(""), 3000);
        return false;
      } 

      await axios.post(`${api_url}`, {'original_url':url},{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
       }).then((response) => {
        setShortenedUrl(response.data);
      }).catch((err) => {
        setErrorMessage('Something went wrong, try again later');
        setTimeout(() => setErrorMessage(""), 3000);
      });   
    };

    const handleSuccessMsg = () => {
      setSuccessMessage("The URL has been copied");
      setTimeout(() => setSuccessMessage(""), 3000);
    }

  return (
    <>
    <div className='form'>
       <input
            className="url-input"
            type="text"
            placeholder="Enter link to be shortened"
            value={url}
            onChange={(e)=>{setUrl(e.target.value)}}
          />
          <button type="button" className="submit-btn" onClick={() => {
           fetchData()}}>
            Submit URL
          </button>
    </div>
    {errorMessage && (
     <p className="error"> {errorMessage} </p>
    )}
    {shortendUrl &&
    <div className="copy-div">
      <span id="shorten-url">{shortendUrl}</span>
     <CopyToClipboard text={shortendUrl}>
      <button className="copy-btn" onClick={handleSuccessMsg}>copy</button>
     </CopyToClipboard>
</div>
}

{successMessage && (
     <p className="success"> {successMessage} </p>
    )}
    </>
  );
}

export default UrlShortner;