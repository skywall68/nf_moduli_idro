//visualizzo la prima parte della lista pj8 in tabella da 1 a 7
import React, { useState, useEffect} from 'react'

const CheckListPj8View1 = ({setListaPagina1Pj8App}) => {

   const [controlli, setControlli] = useState([])
   
  

 
     
    //console.log('valore del file json:', filePj8Json1App)
     //console.log('array di oggetti filtrato:',fileArrayObjFiltrato)
    //uso  useEffect con la parentesi [] vuota perchè mi fa solo una volta il render, se è senza diventa un ciclo se invece ha un valore dentro viene ripetuto tutte le volte che il valore cambia
     useEffect(()=>{
       //prendo il file json da local storage recupero i primi sette valori e li metto dentro useState
      const filePj8Json1 =localStorage.getItem('jsonFilePj8')
      let fileArrayOggetti =[]
      if (filePj8Json1) {
        fileArrayOggetti = JSON.parse(filePj8Json1);
      }
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
          return { ...item, conforme: conformeValue };
        }
        return item;
      });
      setControlli(updatedItems)
      setListaPagina1Pj8App(controlli) //recupero i valori per portarli in App.js per poi stamparli
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
      setListaPagina1Pj8App(controlli) //recupero i valori per portarli in App.js per poi stamparli ??????????????????????????????????
    }
    //*************************************************************************** */
    //***********************Recupero le azioni********************************** */
    const handleInputChangeAzione = (id,field,value) =>{
   
      setControlli((prevControlli)=>
        prevControlli.map((azione)=>
         azione.id === id ? {...azione,[field]:value}: azione
        )
      )
      setListaPagina1Pj8App(controlli) //recupero i valori per portarli in App.js per poi stamparli ???????????ma una sovrascrive l'altra, non è meglio mandare un array???????????????????????
    }
    //************************************************************************** */
    return (
    
      <div className='checklist'>
         <div className='bottone'>
           <button onClick={handleToggleTabella}>
           {mostraTabella ? 'O' : 'V'}
           </button>
           <h2 style={{marginTop:'-20px'}}>Controlli</h2>
          </div>
          <div>
          {mostraTabella && ( 
          <table className='tabella'>
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

export default CheckListPj8View1