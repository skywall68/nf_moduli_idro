const RecuperaData = (lista)=>{
let dataListamia = localStorage.getItem('dataLista')
const dataArray=JSON.parse(dataListamia)
const filteredData = dataArray.filter(item => item.liste.includes(lista))

if (filteredData.length > 0) { // Assicurati che ci siano dati filtrati
    const firstFilteredItem = filteredData[0]; // Prendi il primo elemento dall'array filtrato
    const data = firstFilteredItem.data;
    console.log('Recupero la data e poi la carico sulla variabile:', data);
    return data; // Ritorna la data
  } else {
    console.log('Nessuna data trovata per la lista specificata');
    return null; // Ritorna null se non ci sono dati filtrati
  }
}

export default RecuperaData;