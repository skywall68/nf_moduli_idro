//Scelgo il pdf pj8 o pj16
import React,{ useRef, useState, useEffect} from 'react'

import './ScegliPjPDF.css'

const ScegliPjPDF = ({setPjPdf,setSelectedFile}) => {
  const fileInputRef = useRef() //non viene modificato nei diversi render
  const [isGreen, setIsGreen]=useState(false)

  const handleFileChange = () => {
    // Puoi eseguire azioni aggiuntive quando il file viene selezionato
    const file = fileInputRef.current.files[0];
    if(file){
       setSelectedFile(file.name)
       setPjPdf(fileInputRef.current);
       setIsGreen(true)
    }else {
      setSelectedFile(null);
      setPjPdf(null);
      setIsGreen(false);
    }
   
    
   
   
    //console.log("File selezionato:", fileInputRef.current.files[0].name, 'nome:',fileInputRef.current);
  };
  

  return (
    <div className={!isGreen ?'containerPjPdf':'containerPjPdfGreen'}>
        <h2>Scegli il file Pj</h2>
        <label htmlFor="fileInput"></label>
        <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{fontSize:20}}
      />
        </div>
  )
}

export default ScegliPjPDF