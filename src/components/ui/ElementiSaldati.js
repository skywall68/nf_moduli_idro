import React, {useEffect, useState} from 'react'

import './ElementiSaldati.css'

function ElementiSaldati({appElementi, setAppElementoScelto}) {
  const [elementiSaldati, setElementiSaldati]=useState([])
  const [elementoScelto, setelementoScelto]= useState('')
  
  useEffect(() => {
    const copiaElementi = async () => {
      if (appElementi != null) {
        let data=[];

        if (Array.isArray(appElementi)) {
          // Se appElementiSaldati è già un array, lo usiamo direttamente
          data = appElementi;
         
        } else if (typeof appElementi === 'object') {
          // Se appElementiSaldati è un oggetto, otteniamo i valori
          data = Object.values(appElementi);
        } else {
          // Se appElementiSaldati non è né un array né un oggetto, gestisci come desideri
          data = [];
        }
        //console.log('Scegli elementi saldati:',data)
        setElementiSaldati(data);
      } else {
        setElementiSaldati([]);
      }
    };
    copiaElementi();       
  }, [appElementi]);
  


  const  handleSelectChange = (e)=>{
    const selectElement = e.target.value; //ho l'elemento selezionato cosa ne faccio?
    setelementoScelto(selectElement)
    setAppElementoScelto(selectElement)//lo mando in App.js per spedirlo in fooder.js per la stampa
  }

  return (

    <div className='ElementiSaldati'>
        <h2>Elementi Saldati</h2>
        <select className='elementi_select' onChange={handleSelectChange}>
          {elementiSaldati.map((elem, index) => (
             <option key={index} value={elem}>
               {elem}
             </option>
          ))}
        </select>
       
        </div>
  )
}

export default ElementiSaldati;