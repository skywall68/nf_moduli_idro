import React,{ useRef, useState, useEffect} from 'react'
import { PDFDocument } from 'pdf-lib'

import './Impostazioni.css'

import ElencoMacchine from './ElencoMacchine'
import ParametriStampa from './ParametriStampa'
import ElencoSaldatori from './ElencoSaldatori';
import CheckListPj8 from './CheckListPj8';
import CheckListPj16 from './CheckListPj16'
import ScegliPjPDF from './ScegliPjPDF'
import ElencoTipologia from './ElencoTipologia'
import { blue } from '@mui/material/colors'



const Impostazioni = ({
  //porto i valori su App.js
  setpj8App, 
  setpj16App, 
  setVisualizzaModulo,
  setSceltaModuloApp,
  
  setFilePj16JsonApp
}) => {
  
  const [pjPdf, setPjPdf] = useState() //memorizzo il file pdf
  const [selectedFile, setSelectedFile]= useState(null) //mi memorizza solo il nome
  const [selectedParametriStampa, setSelectedParametriStampa]= useState(false)//se il file è stato selezionato mi da 'true' per visualizzare il tasto 'OK'
  const [selectMacchineOrsaldatori,setSelectMacchineOrsaldatori]=useState(false)
  const [selectTipologia,setSelectTipologia]=useState(false) //controlla che abbia scelto il file tipologia
  const [filePj8Json1, setFilePj8Json1] = useState([]) //memorizzo il file pj8 per la tabella
  const [filePj16Json, setFilePj16Json] = useState([]) //memorizzo il file pj16 per la tabella
  const [selectedPj8OrPj16, setSelectedPj8OrPj16]=useState(false) //se il file è selezionato allore attiva il tasto 'ok'
  let modulo='';

  const importPDF = async ()=> {
    // scegliere il file:
    const fileInput = pjPdf;
        if (pjPdf.files.length === 0) {
          alert('Seleziona un file PDF prima di procedere.');
          return;
        }
    const pdfFile = fileInput.files[0]; 
    setVisualizzaModulo(true)
    
    try {
      
      // porto in App.js i valori dei 2 pdf 
      if(pdfFile.name === 'PJ 8 - rev 6 - IT.pdf'){
       modulo='8pj'
        
        setpj8App(pdfFile)
       
        setSceltaModuloApp( modulo) //determina l'apertura del modulo saldatori
      } else if (pdfFile.name === 'PJ 16 - rev 2 - IT.pdf'){
        modulo='16pj'
        setpj16App(pdfFile)
        //setFilePj16JsonApp(filePj16Json)
        setSceltaModuloApp(modulo)//determina l'apertura del modulo macchine
      }
      
    } catch (error) {
      console.error("Errore durante l'analisi del documento PDF:", error.message);  
    } 

  }
   
 //creiamo la condizione di vedere o non vedere gli elementi :
 let sceltaPdf;
  let elencoSaldatori;
  let elencoMacchine;
  let elencoTipologia;
  let checklistPj8;
  let checlistpj16;
  let vuoto;

  if(selectedFile === 'PJ 8 - rev 6 - IT.pdf'){
    elencoSaldatori= <ElencoSaldatori setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori}/>
    checklistPj8= <CheckListPj8 setSelectedPj8OrPj16={setSelectedPj8OrPj16} /> 
    elencoTipologia = <ElencoTipologia setSelectTipologia={setSelectTipologia} />
  } else if (selectedFile === 'PJ 16 - rev 2 - IT.pdf'){
    elencoMacchine= <ElencoMacchine setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} />
    checlistpj16=<CheckListPj16 setSelectedPj8OrPj16={setSelectedPj8OrPj16} />
    elencoTipologia = <ElencoTipologia setSelectTipologia={setSelectTipologia} />
  } else {
    vuoto="<h2>Nessun parametro scelto!!</h2>"
  }
  
  

 return (
    <div className='containerImpostazioni'> <h1>Impostazioni:</h1>

     <ParametriStampa setSelectedParametriStampa={setSelectedParametriStampa}/>
     {selectedParametriStampa ? <ScegliPjPDF setPjPdf={setPjPdf} setSelectedFile={setSelectedFile} /> : <h3></h3> }
    
    
   
      <div>
        {/* {selectedFile === 'PJ 8 - rev 6 - IT.pdf' && <ElencoSaldatori setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori}/> }
        <CheckListPj8 setFilePj8Json1={setFilePj8Json1} /> 
        {selectedFile === 'PJ 16 - rev 2 - IT.pdf' && <ElencoMacchine setSelectMacchineOrsaldatori={setSelectMacchineOrsaldatori} /> }
        {!selectedFile && <h2>Vuoto</h2>} */}
        {elencoSaldatori}
        {elencoMacchine}
        {elencoTipologia}
        {checklistPj8}
        {checlistpj16}
      </div>
    
      {selectedFile && selectedParametriStampa && selectMacchineOrsaldatori && selectedPj8OrPj16 && selectTipologia
       ? <button onClick={importPDF} style={{backgroundColor:'blue', color:'white'}}> OK </button> : <h3></h3> }
      
       
     
    


    </div>
  )
}

export default Impostazioni