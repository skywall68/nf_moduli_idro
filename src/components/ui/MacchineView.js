import React, { useState, useEffect} from 'react'
import './MacchineView.css'

const MacchineView = ({setMacchinaSceltaApp}) => {
    const [macchinaSelezionata, setMacchinaSelezionata]=useState('')
    const [elencoMacchine, setElencoMacchine]= useState([])

    const handleSelectChange=(event)=>{
        const macchina = event.target.value //recupero la macchina
        setMacchinaSelezionata(macchina)
        setMacchinaSceltaApp(macchina)
    }
    //memorizzo la macchina scelta
    useEffect(()=>{
        localStorage.setItem('macchina',JSON.stringify(macchinaSelezionata))
    },[macchinaSelezionata])

    //carico le macchine prendendole da local storage:
    const elencoMacchineData = async ()=>{
        try {
            const elencoStringa = await localStorage.getItem('elencoMacchine')
            if(elencoStringa){
                const elencoArray = JSON.parse(elencoStringa)
                setElencoMacchine(elencoArray)
                
            }
            
        } catch (error) {
            console.log('Errore nel recupero dati da localStorage:', error);
        }

    }

    const handleOptionClick =()=>{
        elencoMacchineData()
    }



  return (
    <div className='containerMacchine'>
        <h2>Macchine</h2>
        <select className='select_macchine' onChange={handleSelectChange} onClick={handleOptionClick}>
         {
            elencoMacchine.map((macchine, index)=>(
                <option key={index} value={macchine}>
                  {macchine}
                </option>
            ))
         }
        </select>
    </div>
  )
}

export default MacchineView