import React,{ useState} from 'react'

import './Data.css'

const Data = ({setAppData, appInputValue,setAppInputValue,sceltaModuloApp}) => {
 const[inputValue, setInputValue]=useState('') //serve per azzerare il campo

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