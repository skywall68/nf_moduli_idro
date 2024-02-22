import React, {useState, useEffect} from 'react'

const ElencoTipologia = ({setSelectTipologia}) => {
    const [elencoTxt, setElencoTxt]=useState([])
    const [isGreen,setIsGreen]=useState(false)
  
    useEffect(()=>{
      localStorage.setItem('tipologia',JSON.stringify( elencoTxt))
     
    },[elencoTxt])
  
    const handleFileChange = async(e)=>{
      const file = e.target.files[0]
      if(file){
        try {
          const fileContenuto = await readFile(file)
          const lines = fileContenuto.split('\n').filter(line => line.trim() !=='') //mi crea un array prendendo riga per riga
          setElencoTxt(lines)
          setSelectTipologia(true) //mi permette di visualizzare il dato OK su Impostazioni.js
          setIsGreen(true) //mi porta il colore da rosso a verde
         
         
         
          
        } catch (error) {
          console.log('da Tipologia.js errore caricamento file', error)
        }
      }
    }
  
    const readFile = (file)=>{
      return new Promise((resolve,reject)=>{
        const reader = new FileReader()
        reader.onload = (e)=>{
        resolve(e.target.result)
        }
        reader.onerror = (e)=>{
          reject(new Error('Errore nel leggere articolo (Tipologia.js)', e))
        }
        reader.readAsText(file)
      })
    }
   
    return (
      <div style={{backgroundColor: isGreen ? 'chartreuse': 'red'}}>
        <h2>  Elenco tipologia elementi</h2>
        <label htmlFor="fileInput">Seleziona un file .tpl:</label>
        <input type='file' accept='.tpl' onChange={handleFileChange}/>
        </div>
    )
  }
  

export default ElencoTipologia