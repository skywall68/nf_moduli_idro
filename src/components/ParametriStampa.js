import React,{ useState} from 'react'

import './ParametriStampa.css'

const ParametriStampa = ({setSelectedParametriStampa}) => {
    const[fileJson, setFileJson]=useState(null)
    const [isGreen, setIsGreen]=useState(false)
    
    
    const handleFileRead = (e) => {
        if(fileJson === null){
           const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
          const content = event.target.result;
          setFileJson(content);
    
          // Memorizza il contenuto del file JSON in localStorage
          localStorage.setItem('parametriStampa', content);
          setSelectedParametriStampa(true)
          setIsGreen(true)
        };
    
        reader.readAsText(file);
        } 
       
      };

    return (
        <div className={!isGreen ?'containerParametriStampa':'containerParametriStampaGreen'}>
            <h2>Parametri Stampa:</h2>
            <label htmlFor="fileInput">Seleziona un file .pst:</label>
            <div id="customFileInput" onClick={() => document.getElementById('fileInput').click()}>
             Parametri Stampa
            </div>
           <input id="fileInput" type="file" accept=".pst" onChange={handleFileRead} style={{ display: 'none' }} />
            
            
        </div>
      )
    }

export default ParametriStampa