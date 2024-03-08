import React, { useState,useRef } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import uncheckCheckboxes from '../UncheckCheckBoxes'

import Tasto from '../Tasto'
import Modal from './Modal'

import './Footer.css'

const Footer = ({
  setAppRecuperaLista, //porto in app la lista
  appLista, //numero lista
  appCliente,
  appCantiere,
  appOpera,
  appPlan,
  appData, //data controllo
  appOperatore,
  pj8App,//file pdf
  pj16App,//file pdf
  
  appElementoScelto,
  appControllatoNdi,
  listaPagina1Pj8App,//prima pagina di pj8 
  listaPagina2Pj8App,// seconda pagina di pj8
  listaPagina1Pj16App,
  listaPagina2Pj16App,
  saldatoreSceltoApp,
  tipologiaSceltaApp,
  macchinaSceltaApp,
  onCancel,
  setAppPulisciCampo

}) => {


const [showModalPrint, setShowModalPrint] = useState(false)
const [parametriStampa, setParametriStampa]=useState('')







 

 //********************gestione del Modal************************ */
 const openModalPrintHandler = ()=>{   //chiamata dal tasto CONFERMA
  //recupero parametri stampa:
  const parametriDiStampaJson = localStorage.getItem('parametriStampa')
  setParametriStampa(JSON.parse(parametriDiStampaJson))

 
   if (appData ===''){
    alert('inserire la data di consegna nell\'apposito box prima di confermare  !!!')
    return
  } else if (appData === null){
    alert('inserire la data di consegna nell\'apposito box prima di confermare  !!!')
    return
  }
   else {
    
    console.log('Dentro footer la data è in else:',appData)
    setShowModalPrint(true)// mi apre una finestra modal quando premo tasto conferma
     
  }
 } 
 const closeModalPrintHandler = ()=> setShowModalPrint(false) //chiude il modal
 //************************************************************** */
  //elenco delle parti da stampare:
  
 const dataControllo =appData
  
  const lista = appLista
  const operatore = appOperatore
  const cliente = appCliente
  const saldatori = saldatoreSceltoApp
  const macchina= macchinaSceltaApp
  const tipologia = tipologiaSceltaApp
  const opera = `${appOpera}  /`
  const plan = appPlan
  const etichetta = appElementoScelto
  const parametri_stampa = parametriStampa
  const nElementi = `n°1 di ${appControllatoNdi}`
  const spuntaFabbrica='x'
  const spuntaSuPiano = 'x'
  const cantiere = `${appCantiere} /`
  const paginaUnoAlto = [spuntaFabbrica,spuntaSuPiano,tipologia,cantiere,opera,cliente,plan,lista,etichetta,saldatori,]
  let pdfFile=''
  let listaPagina1=''
  let listaPagina2=''
  //scelta del modulo
  if(pj8App){
    pdfFile=pj8App
    listaPagina1=listaPagina1Pj8App
    listaPagina2=listaPagina2Pj8App
    
  }
  if(pj16App){
    pdfFile=pj16App
    listaPagina1=listaPagina1Pj16App
    listaPagina2=listaPagina2Pj16App
  }
  //*************************FUNZIONE DI STAMPA************************************************************ */
  const stampaFilePdf = async ()=>{
    let testoDaStampare=''
    
    try {
        const existingPdfBytes = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const page1 = pdfDoc.getPages()[0]; // dichiara una variabile page che contiene l'oggetto rappresentante la prima pagina del documento PDF.
        const { width, height } = page1.getSize(); //utilizza la destructuring assignment di JavaScript per estrarre i valori delle proprietà width e 
        //height dall'oggetto restituito dal metodo getSize() chiamato su un oggetto di pagina (page). 
        const page2 = pdfDoc.getPages()[1];
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);//utilizzato per disegnare testo sulla pagina del PDF utilizzando quel font specifico
        //prima parte pagina 1 in alto
        let coordinate=0
        let valoreY=0
         paginaUnoAlto.forEach((testo, index)=>{
         coordinate = parametri_stampa[index]
         testoDaStampare=testo
         valoreY=coordinate.y 
         console.log('testo da stampare:', coordinate.x,valoreY)
         page1.drawText(testoDaStampare, {
           x: coordinate.x,
           y: height  - coordinate.y, 
           font,
           size:parametri_stampa[33].font,
           color: rgb(0,0,0),
         })
        })
        //partenza coordinate conforme pagina 1
       const testo_spuntato = 'x'
       //definiamo un ciclo dei controlli che conforme sia 'Conforme' o 'Non Conforme' poi  DA METTERE EVENTUALI COMMENTI ED AZIONI PER OGNI RIGA
       let mioIdPagina1 = 10  //corrisponde id:11 del file paramentri stampa
       let coordinate_pagina = []
       let xNonconforme = parametri_stampa[34].x
       listaPagina1.forEach((controllo )=>{
       coordinate_pagina = parametri_stampa[mioIdPagina1]
        if(controllo.conforme=== true) {
          page1.drawText(testo_spuntato, {
            x:coordinate_pagina.x,
            y: height - coordinate_pagina.y,
            font,
            size:parametri_stampa[33].font,
            color: rgb(0, 0, 0),
          })
         } else if (controllo.conforme === false) {
          page1.drawText(testo_spuntato, {
            x:coordinate_pagina.x + xNonconforme,
            y: height -coordinate_pagina.y,
            font,
            size:parametri_stampa[33].font,
            color: rgb(0, 0, 0),
          })
            //mettere if per commenti ed azioni
            if(controllo.commenti !==''){
              page1.drawText(controllo.commenti,{
                x:parametri_stampa[31].x,
                y: height -coordinate_pagina.y,
                font,
                size:parametri_stampa[33].font,
                color: rgb(0, 0, 0),  
              })
              page1.drawText(controllo.azioneCurativa,{
                x:parametri_stampa[32].x,
                y: height -coordinate_pagina.y,
                font,
                size:parametri_stampa[33].font,
                color: rgb(0, 0, 0),  
              })
            }
          }
          mioIdPagina1++
      })
      //se l'elemento controllato è maggiore di uno allora riportalo
      if(nElementi>1) {
        const testoCommento=`Controllato 1 elemento di ${nElementi}`
       page1.drawText(testoCommento, {
         x:parametri_stampa[30].x,
         y: height -parametri_stampa[30].y,
         font,
         size:parametri_stampa[33].font,
         color: rgb(0, 0, 0),
       })
      } 
      //passiamo alla SECONDA PAGINA
      let mioIdPagina2 = 17
      listaPagina2.forEach((controllo)=>{
      coordinate_pagina = parametri_stampa[mioIdPagina2]
      if(controllo.conforme === 'Conforme' ){
        page2.drawText(testo_spuntato, {
         x:coordinate_pagina.x,
         y: height -coordinate_pagina.y,
         font,
         size:parametri_stampa[33].font,
         color: rgb(0, 0, 0),
        })
     } else if (controllo.conforme === 'Non Conforme'){
         page2.drawText(testo_spuntato, {
         x:coordinate_pagina.x,
         y: height -coordinate_pagina.y,
         font,
         size:parametri_stampa[33].font,
         color: rgb(0, 0, 0),
        })
        //mettere if per commenti ed azioni
        if(controllo.commenti !==''){
          page2.drawText(controllo.commenti,{
            x:parametri_stampa[31].x,
            y: height -coordinate_pagina.y,
            font,
            size:parametri_stampa[33].font,
            color: rgb(0, 0, 0),  
          })
          page2.drawText(controllo.azioneCurativa,{
            x:parametri_stampa[32].x,
            y: height -coordinate_pagina.y,
            font,
            size:parametri_stampa[33].font,
            color: rgb(0, 0, 0),  
          })
        }
     }
     mioIdPagina2++
    })
    //data del controllo:
    page2.drawText(dataControllo, {
      
      x:parametri_stampa[28].x,
      y: height -parametri_stampa[28].y,
      font,
      size:parametri_stampa[32].font,
      color: rgb(1, 0, 0),
     })
     // //operatore:
     page2.drawText(operatore,{
       x:parametri_stampa[29].x,
       y: height -parametri_stampa[29].y,
       font,
       size:parametri_stampa[33].font,
       color: rgb(1, 0, 0),

     })
     const modifiedPdfBytes = await pdfDoc.save(); //consente di salvare le modifiche apportate al documento PDF e ottenere i byte rappresentanti il PDF modificato
     const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });// crea un oggetto Blob  rappresenta un blocco di dati, in questo caso, l'array di byte che costituisce il documento PDF modificato
     saveAs(blob, `${lista}-${dataControllo}_pj8.pdf`); /* utilizza FileSaver.js per avviare il processo di salvataggio del file nel browser. Il browser visualizzerà quindi una finestra di dialogo per il salvataggio, consentendo 
     all'utente di scaricare il file PDF modificato con il nome specificato ('output.pdf').*/ 
      //recupero la lista da visualizzare come ultima fatta:
      setAppRecuperaLista(appLista)
    } catch (error) {
      console.error("Errore durante l'analisi del documento PDF:", error.message);
    }

  }
  //****************************FINE*********************************************************************** */
  //***********************COMANDO DI STAMPA****************************************************************
  const handlePrintClick = ()=> {
    if((operatore !=='' && saldatori!=='Scegli' && tipologia !=='Scegli')||(operatore !=='' && macchina!=='Scegli' && tipologia !=='Scegli')){
      setAppRecuperaLista(appLista) //mi porta su App.js il numero della lista creata
      //chiama la funzione di stampa:
      stampaFilePdf()
      //pulisci textbox di Data.js e CheckListDimensioniPj8View/CheckListDimensioniPj16View
      handleCancel()
    //chiudi modal
    closeModalPrintHandler();
  } else if (operatore ==='') {
    alert('Operatore mancante')
    closeModalPrintHandler();

  } else if((saldatori==='Scegli')||(macchina==='Scegli')){
    alert('Scegliere i saldatori o la macchina')
    closeModalPrintHandler();
  } else if(tipologia ==='Scegli') {
    alert('Scegliere la tipologia')
    closeModalPrintHandler();
  }
  
  else {
    alert('errore generico')
    closeModalPrintHandler();
  }

  }
  //****************************FINE*********************************************************************** */
  //cancella la textbox della data e svuota CheckListDimensioniPj8View/CheckListDimensioniPj16View
  const handleCancel =()=>{
    onCancel();//metodo che arriva da App.js
    setAppPulisciCampo(true)
  }

const nodeRef = useRef(null);

  return (
    <React.Fragment>
      <Modal 
      // header={<h2>Stampa pdf</h2>}
      show={showModalPrint} 
      onCancel={closeModalPrintHandler} 
      contentClass ="place-item__modal-content"
      footerClass = "place-item__modal-actions"
      nodeRef={nodeRef}
      
      >
        <div className='button-container-stampa'>
          <Tasto onClick={closeModalPrintHandler} label={"cancel"} />
          <Tasto onClick={handlePrintClick} label={"stampa"}/>
        </div>
      </Modal >
      <div className='footer'>
        <div className="button-container-conferma">
              <Tasto onClick={handleCancel} label="CANCEL"/>
              <Tasto onClick={openModalPrintHandler} label="conferma"/>
          </div>
      </div>
    </React.Fragment>

  )
}

export default Footer