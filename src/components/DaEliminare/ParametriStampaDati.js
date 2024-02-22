import React, { useState,useContext} from 'react'
import {ParametriStampaContext} from './ParametriStampaContext'

const ParametriStampaDati = () => {
    const[fileJson, setFileJson]=useState(null)
    const {datiStampa,updatedati}=useContext(ParametriStampaContext)

    const handleFileRead =(e)=>{
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            setFileJson(content);
          };
      
          reader.readAsText(file);
        };
    

  return (
    <div>
        <h2>ParametriStampaDati</h2>
        <input type="file" onChange={handleFileRead} />
        <strong>Contenuto del file JSON:</strong>
        <pre>{fileJson}</pre>
    </div>
  )
}

export default ParametriStampaDati