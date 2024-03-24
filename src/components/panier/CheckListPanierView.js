//mi visualizza la prima pagina in formato tabellare
import React, { useState, useEffect} from 'react'

import './CheckListPanierView.css'

const CheckListPanierView = ({setListaPagina1Pj16App}) => {
  const [controlli, setControlli] = useState([])
   //prendo il file json da local storage panierCompleto
   const filePanierJson1 =localStorage.getItem('jsonFileCH')

   useEffect(()=>{
    let fileArrayOggetti =[]
    if (filePanierJson1) {
      fileArrayOggetti = JSON.parse(filePanierJson1);
    }
     //recupero i primi cinque valori e li metto dentro useState
   const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=1 && elemento.id <=5)
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
      console.log('sono dentro handleOptionChange, id: ',id,'valore:',conformeValue)
      return { ...item, conforme: conformeValue };

    }
    console.log('sono fuori')
    return item;
  });
  setControlli(updatedItems)
  setListaPagina1Pj16App(updatedItems) //recupero i valori per portarli in App.js per poi stamparli
  }
  console.log('valore Recupero i valori nella option box:',controlli)
  //************************************************************************ */
   //******************Recupero i commenti ************************************* */
   const handleInputChangeCommenti = (id,field,value) =>{
    setControlli((prevControlli)=>
    prevControlli.map((commento)=>
    commento.id === id ? {...commento,[field]:value}: commento
     )
   )
   console.log(`ID: ${id}, Campo: ${field}, Valore: ${value}`);
   setListaPagina1Pj16App(controlli) //recupero i valori per portarli in App.js per poi stamparli ??????????????????????????????????
 }
 //*************************************************************************** */
  //***********************Recupero le azioni********************************** */
  const handleInputChangeAzione = (id,field,value) =>{
   
    setControlli((prevControlli)=>
      prevControlli.map((azione)=>
       azione.id === id ? {...azione,[field]:value}: azione
      )
    )
    setListaPagina1Pj16App(controlli) //recupero i valori per portarli in App.js per poi stamparli 
  }

  //aggiornamento prima di mandare il valori ad App.js perchè se inserisco un solo valore non viene aggiornato
  useEffect(()=>{
    setListaPagina1Pj16App(controlli)
  },[controlli])
  //************************************************************************** */








  return (
    <div className='containerCheckListPanierView'>
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
            <th colSpan="2">RISULTATO CONTROLLO</th>
            <th >COMMENTI/PRECISAZIONI</th>
            <th>AZIONE CURATIVA</th>
          </tr>
          <tr>
            <th></th>
            <th>CONFORME</th>
            <th>NON CONFORME</th>
            <th></th>
            <th></th>
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
                  </td>
              </tr>
            ))
          }
         </tbody>
      </table>
          )}
         </div>
    </div>
  )
}

export default CheckListPanierView