//visualizzo la prima parte della lista pj8 in tabella da 1 a 6
import React, { useState, useEffect} from 'react'

import ModalMio from '../ModalMio'
import Tasto from '../Tasto'
import './CheckListCHView.css'

const CheckListCHView = ({setListaPagina1Pj8App, elencoAzioniApp,appPulisciCampo,setAppPulisciCampo}) => {

  const [controlli, setControlli] = useState([])
  //const [inizioControlli, setInizioControlli]=useState([])
  const [showModalMio, setShowModalMio]=useState(false)
  const [mioID, setMioID]=useState(0)
  const [commenti, setCommenti]=useState('')
 
   //prendo il file ch_Completo json da local storage 
   const fileCHJson1 =localStorage.getItem('jsonFileCH')

  useEffect(()=>{
  
   let fileArrayOggetti =[]
   if (fileCHJson1) {
     fileArrayOggetti = JSON.parse(fileCHJson1);
   }
   //recupero i primi sette valori e li metto dentro useState
   const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=1 && elemento.id <=7)
    setControlli(fileArrayObjFiltrato)
  },[])

 //***********mi permette di nascondere la tabella***********************
 const [mostraTabella, setMostraTabella] = useState(true);  
 const handleToggleTabella = () => {
   setMostraTabella((prev) => !prev);
}; 
//*************Recupero i valori nella option box********************** 
const handleOptionChange =(id, conformeValue)=>{
  const updatedItems = controlli.map(item =>{
    if (item.id === id) {
     // console.log('sono dentro handleOptionChange, id: ',id,'valore:',conformeValue)
      setMioID(item.id) //recupero il id della riga per mandarla nel modalMio per commenti/azioni
       //APRE IL MODAL se è 'non conforme'
       if(conformeValue === false){
        //console.log('dentro controlli!!!')
      //devo portare id nella modale
       setShowModalMio(true)
       }
      return { ...item, conforme: conformeValue };

    }
    //console.log('sono fuori')
    return item;
  });
  setControlli(updatedItems)
  
  setListaPagina1Pj8App(updatedItems) //recupero i valori per portarli in App.js per poi stamparli
  
  }
 // console.log('valore Recupero i valori nella option box:',controlli)
  //************************************************************************ */
  //comando che mi cattura solo il commento:
const catturaCommento =(id, conformeValue)=>{
  const updatedItems = controlli.map(item =>{
    if (item.id === id) {
      ///console.log('sono dentro handleOptionChange, id: ',id,'valore:',conformeValue)
      setMioID(item.id) //recupero il id della riga per mandarla nel modalMio per commenti/azioni
       //APRE IL MODAL se è 'conforme'
       if(conformeValue === true){
        //console.log('dentro controlli!!!')
      //devo portare id nella modale
       setShowModalMio(true)
       }
      return { ...item, conforme: conformeValue };

    }
    //console.log('sono fuori')
    return item;
  });
  setControlli(updatedItems)
  
  setListaPagina1Pj8App(updatedItems) //recupero i valori per portarli in App.js per poi stamparli
  
}
    //******************Recupero i commenti ************************************* */
    const handleInputChangeCommenti = (id,field,value) =>{
      setControlli(prevControlli=>{
        // Creiamo un nuovo array mappando i commenti esistenti
        const updatedControlli = prevControlli.map(commento => {
          // Se l'ID corrisponde, creiamo un nuovo oggetto con il valore aggiornato
          return commento.id === id ? { ...commento, [field]: value } : commento;
        });
      // Restituiamo il nuovo array aggiornato
     // console.log('valore Recupero i valori COMMENTO in update:',updatedControlli)
    return updatedControlli;
    });
    // console.log(`ID: ${id}, Campo: ${field}, Valore: ${value}`);
     setListaPagina1Pj8App(controlli) //recupero i valori per portarli in App.js per poi stamparli
     setCommenti('')
   }
   //*************************************************************************** */
   //***********************Recupero le azioni********************************** */
   const handleInputChangeAzione = (id,field,value) =>{
   
    setControlli((prevControlli)=>
      prevControlli.map((azione)=>
       azione.id === id ? {...azione,[field]:value}: azione
      )
    )
    setListaPagina1Pj8App(controlli) //recupero i valori per portarli in App.js per poi stamparli 
  }

  //aggiornamento prima di mandare il valori ad App.js perchè se inserisco un solo valore non viene aggiornato
  useEffect(()=>{
    setListaPagina1Pj8App(controlli)
  },[controlli])
//***********************Lavoro con ModalMio***************************
//funzione che chiude Modal richiamata dal componente ModalMio
const closeModalMio =()=>{
  //console.log('controlli.',controlli)
  setShowModalMio(false)
}

  //******************************fine******************************************** */
  return (
    <div className='containerCheckListCHView'>
        <div className='bottoneCH'>
           <button onClick={handleToggleTabella}>
           {mostraTabella ? 'O' : 'V'}
           </button>
           
          </div>
          <div>
          {mostraTabella && ( 
          <table className='tabellaCH'>
          <thead>
          <tr>
            <th>CONTROLLI</th>
            <th colSpan="3">RISULTATO CONTROLLO</th>
            {/* <th >COMMENTI/PRECISAZIONI</th>
            <th>AZIONE CURATIVA</th> */}
          </tr>
          <tr>
            <th></th>
            <th>CONFORME</th>
            <th>NON CONFORME</th>
            <th>COM.</th>
            {/* <th></th>
            <th></th> */}
          </tr>
        </thead>
        <tbody>
          {
            controlli.map((controllo)=>(
              <tr key={controllo.id}>
                <td>{controllo.nome}</td>
                 <td>
                    <label>
                      <input
                        type="radio"
                        name={`risultato-${controllo.id}`}
                        value="true"
                        checked={controllo.conforme === true}
                        onChange={()=> handleOptionChange(controllo.id, true)}
                       />
                  </label>
                  </td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name={`risultato-${controllo.id}`}
                        value="false"
                        checked={controllo.conforme === false}
                        onChange={()=> handleOptionChange(controllo.id, false)}
                       />
                    </label>
                  </td>
                  <td>
                  <Tasto onClick={()=>catturaCommento(controllo.id, true)}></Tasto>
                 </td>
                  {/* <td>
                    <input
                      type='text'
                      value={controllo.commenti}
                      onChange={(e)=>handleInputChangeCommenti(controllo.id, 'commenti', e.target.value)}
                      placeholder='commenti'
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={controllo.azioneCurativa}
                      onChange={(e)=>handleInputChangeAzione(controllo.id, 'azioneCurativa', e.target.value)}
                      placeholder='azione curativa'
                    />
                  </td> */}
              </tr>
            ))
          }
         </tbody>
      </table>
          )}
          <ModalMio 
        showModalMio={showModalMio} 
        closeModalMio={closeModalMio}
        handleInputChangeCommenti={handleInputChangeCommenti}
        handleInputChangeAzione={handleInputChangeAzione}
        setControlli={setControlli}
        controlli={controlli}
        commenti={commenti}
        setCommenti={setCommenti}
        mioID={mioID}
        elencoAzioniApp={elencoAzioniApp}
        
         /> 
         </div>
    </div>
    
  )
}

export default CheckListCHView