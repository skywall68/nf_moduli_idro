import React,{ useState} from 'react'

import './Data.css'

const Data = ({appData, setAppData, appInputValue,setAppInputValue,sceltaModuloApp}) => {
 const[inputValue, setInputValue]=useState('') //serve per azzerare il campo
  let dataLista=""
  dataLista=appData //assegno il valore di data arrivata da App che a sua volta la prende da SeePdf.js

 //cancella data dentro casella di input
 const clearInput = () => {
  setInputValue(''); // Imposta il valore del campo di input a una stringa vuota
};

const handleInputChange =(e)=>{
  setAppInputValue(e.target.value)
  setAppData(e.target.value)
}
   return (
         <div className={sceltaModuloApp === 'ch' ? 'containerDataCH' : 'containerData'}>
             <h2>Data:</h2>
             <input
             className={sceltaModuloApp === 'ch' ? 'inputBoxCH' : 'inputBox'}
             type='text'
             value={appInputValue}
             onChange={handleInputChange}
              />
              
         </div>
       )
  
}

export default Data