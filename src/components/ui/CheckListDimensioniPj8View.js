//visualizzo la seconda parte (pagina) modulo pj8
import React, { useState, useEffect} from 'react'

import './CheckListDimensioniPj8View.css'

const CheckListDimensioniPj8View = ({setListaPagina2Pj8App}) => {
    //recupero la seconda  parte del modulo pj8 da local storage
    const [controlli, setControlli] = useState([])
    //recupero il file memorizzato
    useEffect(()=>{
    //prendo il file json da local storage recupero dal id7 al id20 dentro useState
    const filePj8Json1 =localStorage.getItem('jsonFilePj8')
    let fileArrayOggetti =[]
    if (filePj8Json1) {
      fileArrayOggetti = JSON.parse(filePj8Json1);
    }
    const fileArrayObjFiltrato = fileArrayOggetti.filter(elemento => elemento.id >=8 && elemento.id <=20)
     setControlli(fileArrayObjFiltrato)
    },[])
    console.log('chekdimensioni:',controlli)

  return (
    <div>CheckListDimensioni</div>
  )
}

export default CheckListDimensioniPj8View