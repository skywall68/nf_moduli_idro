function uncheckCheckboxes() {
    // Seleziona tutti gli elementi di input di tipo checkbox nella tabella
    const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
    
    // Itera attraverso ogni checkbox e deseleziona
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
  
  export default uncheckCheckboxes;