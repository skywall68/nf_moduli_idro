import React, { useState, useRef } from 'react'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

import Tasto from '../Tasto'
import Modal from './Modal'

import './Footer.css'

const Footer = ({
  setAppRecuperaLista,
  appLista,
  appCliente,
  appCantiere,
  appOpera,
  appOperatore,
  pj8App,
  pj16App,
  appElementoScelto,
  appControllatoNdi,
  listaPagina1Pj8App,
  listaPagina2Pj8App,
  listaPagina1Pj16App,
  listaPagina2Pj16App,
  saldatoreSceltoApp,
  tipologiaSceltaApp,
  macchinaSceltaApp,
}) => {

 console.log('Dentro footer:Lista:',appLista)
 console.log('Dentro footer Cliente:',appCliente )
 console.log('Dentro footer Cantiere:', appCantiere )
 console.log('Dentro footer Opera:',appOpera)
 console.log('Dentro footer Operatore:',appOperatore)
 console.log('Dentro footer modulo pj8:',pj8App)
 console.log('Dentro footer pj16:',pj16App)
 console.log('Dentro footer Elemento scelto:',appElementoScelto)
 console.log('Dentro footer n controllato di:',appControllatoNdi)
 console.log('Dentro footer valori del pj8 pagina 1:',listaPagina1Pj8App)
 console.log('Dentro footer valori del pj8 pagina 2:',listaPagina2Pj8App)
 console.log('Dentro footer valori del pj16 pagina 1:',listaPagina1Pj16App)
 console.log('Dentro footer valori del pj16 pagina 2:',listaPagina2Pj16App)
 console.log('Dentro footer Saldatori scelti:',saldatoreSceltoApp)
 console.log('Dentro footer Tipologia:',tipologiaSceltaApp)
 console.log('Dentro footer Macchina:',macchinaSceltaApp)

  return (
    <div>Footer</div>
  )
}

export default Footer