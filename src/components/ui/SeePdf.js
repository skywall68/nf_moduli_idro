import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './SeePdf.css';
import RecuperaData from './RecuperaData';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const SeePdf = ({
  leggiFile,
  setNumeroPages,
  setAppLista,
  setAppData,
  setAppCliente,
  setAppCantiere,
  setAppOpera,
  setAppPlan,
  setAppElementi,
  sceltaModuloApp,
}) => {
  const [pdfPath, setPdfPath] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const [linesArray, setLinesArray] = useState([]);
  const [linesArrayElementi, setLinesArrayElementi] = useState([]);
  const [lista, setLista] = useState('lista ??');
  const [nomeCliente, setNomeCliente] = useState('');
  const [cantiere, setCantiere] = useState('');
  const [opera, setOpera] = useState('');
  const [plan, setPlan] = useState('');

  const handleFileChange = async (e) => {
    const filePdf = e.target.files[0];
    if (filePdf.type === "application/pdf") {
      setPdfPath(URL.createObjectURL(filePdf));
      setLinesArray([]);
      await leggiFilePdf(filePdf);
    } else {
      alert("Per favore, seleziona un file PDF.");
    }
  };

  const leggiFilePdf = async (file) => {
    try {
      const pdfText = await extractTextFromPdf(file);
      const allLinesArray = extractAllLines(pdfText);
      const elementiArray = extractElements(allLinesArray);
      setLinesArrayElementi(elementiArray);
      rimuoviElementPrefix(elementiArray);
    } catch (error) {
      console.error("Errore nell'estrazione del testo dal PDF:", error);
    }
  };

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

  const extractAllLines = (text) => {
    const lines = text.split('\n');
    return lines.map(line => ({ elemento: line.trim() }));
  };

  const extractElements = (arrayPdf) => {
    return arrayPdf.filter(obj =>
      typeof obj.elemento === 'string' && obj.elemento.startsWith('Elément:')
    );
  };

  const rimuoviElementPrefix = (dati) => {
    const elencoPulito = dati.map(item => ({
      ...item,
      elemento: item.elemento.replace('Elément: ', '')
    }));
    recuperaElementi(elencoPulito);
  };

  const recuperaElementi = (dati) => {
    let risultato = [];
    if (sceltaModuloApp === '16pj') {
      risultato = dati.filter(item => item.elemento.startsWith('ACF')).map(item => item.elemento);
    } else {
      risultato = dati.filter(item => !item.elemento.startsWith('ACF')).map(item => item.elemento);
    }
    const scegli = risultato.length === 0 ? 'NESSUN DATO PRESENTE' : 'Scegli...';
    const agiungiScegli = [scegli, ...risultato];
    setAppElementi(agiungiScegli);
  };

  const recuperaDatiCliente = async () => {
    try {
      const pdfDocument = await pdfjs.getDocument(pdfPath).promise;
      const pdfPage = await pdfDocument.getPage(1);
      const textContent = await pdfPage.getTextContent();
      const lines = textContent.items.map(item => item.str);
      setLinesArray(lines);
      recuperaLista(lines);
    } catch (error) {
      console.error('Errore durante l\'estrazione dei dati:', error);
    }
  };

  const recuperaLista = (lista) => {
    const indexLista = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 14;
    if (indexLista !== -1) {
      setLista(lista[indexLista]);
      setAppLista(lista[indexLista]);

      const indexCliente = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 4;
      setNomeCliente(lista[indexCliente]);
      setAppCliente(lista[indexCliente]);

      const indexCantiere = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 8;
      setCantiere(lista[indexCantiere]);
      setAppCantiere(lista[indexCantiere]);

      const indexOpera = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 10;
      setOpera(lista[indexOpera]);
      setAppOpera(lista[indexOpera]);

      const indexPlan = lista.findIndex(line => line.includes('Tabella Ferri n.')) + 18;
      setPlan(lista[indexPlan]);
      setAppPlan(lista[indexPlan]);
    } else {
      setLista('non trovata');
    }
  };

  const handleLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    setNumeroPages(numPages);
    recuperaDatiCliente();
  };

  return (
    <div className='pdf-container'>
      <label htmlFor="fileInput">Seleziona un file liste:</label>
      <input type="file" accept=".pdf" onChange={handleFileChange} style={{ marginTop: '40px' }} />
      {pdfPath && (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          <Document file={pdfPath} onLoadSuccess={handleLoadSuccess}>
            {Array.from(new Array(totalPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={false} />
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
