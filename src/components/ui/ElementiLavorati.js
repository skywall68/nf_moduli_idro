import React, {useEffect, useState} from 'react'

import './ElementiLavorati.css'

const ElementiLavorati = ({appElementi,setAppElementoScelto,setNumeroElemento}) => {
    const[elementiLavorati, setElementiLavorati]=useState([])
    const[elementoScelto, setElementoScelto]=useState('')
    const [posizione,setPosizione]=useState('')
    const [commenti, setCommenti]=useState('')
    const numbers = Array.from({ length: 101 }, (_, index) => index); //cre un elenco di numeri da 0 a 100
    
    //Catturiamo gli elementi che arrivano da App.js che a sua volta arrivano da SeePdf.js
    useEffect(()=>{
      const copiaElementi = async () =>{
        if(appElementi != null){
          let data=[];
          if (Array.isArray(appElementi)) {
            // Se appElementiSaldati è già un array, lo usiamo direttamente
            data = appElementi;
        }  else if (typeof appElementi === 'object') {
          // Se appElementi è un oggetto, otteniamo i valori
          data = Object.values(appElementi);
        } else {
          // Se appElementi non è né un array né un oggetto, gestisci come desideri
          data = [];
        }
       
        setElementiLavorati(data);
      } else {
        setElementiLavorati([]);
      }
      }
      copiaElementi()
    },[appElementi])



    const handleSelectChange=(e)=>{
      setElementoScelto(e.target.value) //recupero il valore selezionato
      setAppElementoScelto(e.target.value)
      // console.log('elemento scelto:',e.target.value)

    }

    const handleSelectPosizione=(event)=>{
      setPosizione(event.target.value)
      // console.log('POSIZIONE sceltA:',event.target.value)
    }
    useEffect(()=>{
      if(posizione !=='' && posizione !==0 && commenti ===''){
        setAppElementoScelto(elementoScelto + '-pos.' + posizione)
       
      }
      else if (posizione !=='' && posizione !==0 && commenti !==''){
        setAppElementoScelto(elementoScelto + '-pos.' + posizione)
        setNumeroElemento(commenti)
        // console.log('controllato elemento dentro elementiLavorati:',commenti)
      
      }
    },[elementoScelto,posizione,commenti])


    return (
    <div className='elementiLavorati'>

        <h2>Lavorati:</h2>
         {elementiLavorati.length === 1 ?<div className='noElementi'> <h4>{elementiLavorati[0]}</h4></div>: 
              <select className='elementi_select'onChange={handleSelectChange}>
                  {
                    elementiLavorati.map((elem, index)=>(
                      <option key={index} value={elem} >
                      {elem}
                      </option>
                    ))
                   }
              </select>
            } 
            <select id="numero"  onChange={handleSelectPosizione}>
            <option value="">posizione:</option>
            {/* Utilizzo di map per generare dinamicamente le opzioni */}
            {numbers.map(number => (
             <option key={number} value={number}>{number}</option>
      ))}
              </select> 
              <div className='containerCommenti'>
                <h4>Controllato 1 di:</h4> 
              <input className='imputCommenti'
                                    type='text'
                                    value={commenti}
                                    onChange={(e)=>setCommenti(e.target.value)}
                                    placeholder='quant.'
                                     />
              </div>
              
    </div>
  )
}

export default ElementiLavorati