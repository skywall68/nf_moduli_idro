// è un componente React che permette di caricare e visualizzare un file PDF, 
// estrarre il testo dal PDF e processare il testo estratto per ricavare dati specifici. 
// Ecco un commento dettagliato su varie sezioni del codice:

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import  './SeePdf.css'  /*importo file css*/ 
import RecuperaData from './RecuperaData';

//Configura il worker di pdfjs per gestire il parsing dei file PDF.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// mi permette di vedere le liste e di recuperare le informazioni
const SeePdf = ({
  leggiFile,
  setNumeroPages, 
  setAppLista, 
  setAppData, //porta l'eventuale data in App
  setAppCliente, 
  setAppCantiere, 
  setAppOpera, 
  setAppPlan, 
  setAppElementi, //mi cattura elenco elementi
  //appRecuperaMiaLista,
  sceltaModuloApp, //mi dice se è 8pj o 16pj
 }) => {
  const [pdfPath, setPdfPath] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const [linesArray, setLinesArray] = useState([]);
  const [linesArrayElementi, setLinesArrayElementi] = useState([]);//ho solo gli elementi che iniziano con Element
  const [lista, setLista] = useState('lista ??');
  const [nomeCliente, setNomeCliente]= useState('');
  const [cantiere, setCantiere]= useState('');
  const [opera, setOpera]= useState('');
  const [plan, setPlan]= useState('');
 
  let elementiArray;
  
 //----------------funzione che mi estrae tutte le righe e mi crea un array----------
 //Divide il testo estratto dal PDF in righe e le trasforma in un array di oggetti.
 const extractAllLines = (text) => {
  // Dividi il testo in righe
  const lines = text.split('\n');

  // Mappa ogni riga in un oggetto e aggiungilo all'array
  const allLinesArray = lines.map(line => ({ elemento: line.trim() }));

  return allLinesArray;
};


//------------------------------------------------------------------
//Gestisce il caricamento del file PDF, controlla il tipo di file e chiama leggiFilePdf per estrarre il testo.
  const handleFileChange =async (e) => {
    const filePdf = e.target.files[0];
    if (filePdf.type === "application/pdf") {
       
      setPdfPath(URL.createObjectURL(filePdf));
      setLinesArray([]); // Resetta l'array quando il file cambia
      leggiFilePdf(filePdf)
      
      
  }else {
    alert("Per favore, seleziona un file PDF.");
  }

}
  //---------------------------------------------------------------
  //-----------------funzione che legge il file pdf-----------------
  //Estrae il testo dal PDF e lo processa per ottenere gli elementi che iniziano con "Elément:".
  const leggiFilePdf = async (file)=>{
    //console.log('valore di pdf:',pdfPath)
   try {
    const pdfText = await extractTextFromPdf(file);//mi visualizza insieme di testi dove ogni 'testo' va a capo
    const allLinesArray = extractAllLines(pdfText); // fuzione che prende testo e lo trasforma in un array di oggetti:
    
    setLinesArrayElementi((extractElements(allLinesArray))) ;// dovrebbe filtrare solo gli oggetti che iniziano con Element
    elementiArray = extractElements(allLinesArray)
    console.log('prima di aggiornare su set:',elementiArray);
    rimuoviElementPrefix(elementiArray)
    
   

   } catch (error) {
    console.error("Errore nell'estrazione del testo dal PDF:", error);

   }
  }
  //-----------------------------------------------------------------
  //Legge il file PDF come un array di byte e ne estrae il testo da tutte le pagine.
   //funzione che mi estrae tutti i valori da tutte le pagine
   const extractTextFromPdf = async (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(event.target.result);
          const pdf = await pdfjs.getDocument(typedArray).promise;
          const textPromises = [];
  
          for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            textPromises.push(pdf.getPage(pageNumber).then(page => page.getTextContent()));
          }
  
          const textContents = await Promise.all(textPromises);
          const text = textContents.map(textContent => 
            textContent.items.map(item => item.str).join('\n')
          ).join('\n');
  
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };
   //----------------------------------------------------------------
   //funzione che deve solo prendere determinati elementi
   //Filtra solo gli elementi che iniziano con "Elément:".
  const extractElements = (arrayPdf) => {
    
    return arrayPdf.filter(obj =>
      typeof obj.elemento === 'string' && obj.elemento.startsWith('Elément:')
    )
  };
  //--------------------------------------------
  //modifichiamo lo stile del pdf
  const pdfStyles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop:'10px',
    };

  //*********RECUPERO DATI CLIENTE**************************************** */
  //Estrae i dati del cliente dalla prima pagina del PDF.
  const recuperaDatiCliente = async () => {
  try {
    const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
    const pdfPage = await pdfDocument.getPage(1); 
    const textContent = await pdfPage.getTextContent();
    const lines = textContent.items.map(item => item.str); //array che contiene le righe della pagina 1
    setLinesArray(lines); // Aggiorna l'array con le nuove righe pagina 1
    recuperaLista(lines);//recupera intestazione lista:
} catch (error) {
    console.error('Errore durante l\'estrazione dei dati:', error);
  }

  }
 //************RECUPERA intestazione LISTA ************************************/
 //Estrae vari dati dalla lista, come cliente, cantiere, opera e piano.
   const recuperaLista = (lista)=>{
    const indexLista = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 14;
    if (indexLista !== -1) {
      const posizioneLista = indexLista  // deve puntare sul valore cliente nell'array
      setLista(lista[posizioneLista])
      setAppLista(lista[posizioneLista]) //recupera la lista per mandarla tramite App.js a Compilatore.js
      
      //recupera cliente
      const indexCliente= lista.findIndex(line => line.includes('Tabella Ferri n.')) + 4;
      setNomeCliente(lista[indexCliente])
      setAppCliente(lista[indexCliente]) //recupero il cliente per mandarlo tramite App.js a Compilatore.js
      //recupera cantiere
      const indexCantiere = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 8;
      setCantiere(lista[indexCantiere])
      setAppCantiere(lista[indexCantiere]) //recupero il cantiere per mandarlo tramite App.js a Compilatore.js
      //recupera opera
      const indexOpera = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 10;
      setOpera(lista[indexOpera])
      setAppOpera(lista[indexOpera]) //recupero l'opera per mandarlo tramite App.js a Compilatore.js
      //recupera plan
      const indexPlan = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 18;
      setPlan(lista[indexPlan])
      setAppPlan(lista[indexPlan]) //recupero il plan per mandarlo tramite App.js a Compilatore.js
     
     
    } else {
      // Se 'Lista' non è trovata, resetta l'indice
      
      setLista('non trovata')
    }
   }
  //******************************Rimuove il prefisso "Elément:" dagli elementi.*********************************************************************** */
   //pulisce l'array dalla scritta Element:
   const rimuoviElementPrefix = (dati)=>{
    const elencoPulito = dati.map(item =>({... item,
      elemento:item.elemento.replace('Elément: ', '')
    }))
    recuperaElementi(elencoPulito)
    console.log('elenco da rimuoviElementPrefix:',elencoPulito)

   }

  //****************RECUPERA ELEMENTI **************************** */ 
  //Filtra gli elementi in base alla scelta del modulo (8pj o 16pj) e aggiunge un'opzione "Scegli..." all'inizio dell'elenco.
  const recuperaElementi = (dati) =>{
  console.log('valore di dati:',dati)
  let risultato=[]
  

  if(sceltaModuloApp === '16pj'){  //devo visualizzare solo gli elementi ACF - 
    
    console.log('elementi  16pj:',dati)
    //const risultato =  dati.filter(elenco => elenco.elemento.includes('ACF'));
     risultato=dati
    .filter(item => item.elemento.startsWith('ACF'))
    .map(item => item.elemento);
    console.log('tipo:', typeof risultato);
    setAppElementi(risultato)
    console.log('ho filtrato solo gli ACF:', risultato);
  } else {  //ho scelto '8pj'
    //visualizzo solo gli elementi saldati nella dropdownlist
              risultato= dati
              .filter(item => !item.elemento.startsWith('ACF'))
              .map(item => item.elemento);
              console.log('tipo:', typeof risultato);
                      

    console.log('ho filtrato SENZA ACF', typeof risultato);
  }


   //voglio portare la scritta 'Scegli...' all'inizio della dropdown list dei elementi, devo confertire l'oggetto
   let scegli = ''
 
       if(Object.keys(risultato).length === 0){
         scegli = 'NESSUN DATO PRESENTE'
       } else { scegli='Scegli...'
    }
    const agiungiScegli = [scegli,...risultato]
    console.log('valore,',agiungiScegli)
    setAppElementi(agiungiScegli)//prendo gli elementi e tramite app.js li porto in ElementiSaldati.js
  }
  //*************************fine elenco elementi************************************* */

  //Renderizza l'input per selezionare un file PDF e visualizza il PDF con il componente Document e Page di react-pdf.

  //tasto quando si è scelto il file pdf
  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages); //mi fa vedere tutte le pagine che se disattivato ne vedo solo 1
    setNumeroPages(numPages);
    
    //devo recuperare i dati chiamando e creando una funzione async
    recuperaDatiCliente();
    //devo recuperare tutti gli Elements:
    //console.log('prima di chiamare la funzione recuperaElementi.');
    //recuperaElementi()
  };
  return (
    <div className='pdf-container'>
       <label htmlFor="fileInput">Seleziona un file liste:</label>
      <input type="file" accept=".pdf" onChange={handleFileChange} style={{ marginTop:'40px'}} />
      
        {pdfPath && (
            <div  style={pdfStyles}>
              
                <Document file={pdfPath} onLoadSuccess={handleLoadSuccess}>
                {Array.from(new Array(totalPages), (el, index) => (
                    <Page key={`page_${index + 1}`} 
                    pageNumber={index + 1} 
                    renderTextLayer={false} 
                    //style={{width:0, height:0}}
                     />
                    ))}
                </Document>
            </div>
        )}
        {totalPages && (
        <p>
          Total Pages: {totalPages}
        </p>
      )}
    </div>
  );
};

export default SeePdf;
