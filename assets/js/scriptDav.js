// Display adherents lits to add on groups
const btnAddAdherentOnList = document.querySelector("#btnAddAdherentOnList");
btnAddAdherentOnList.addEventListener("click", function() {
    const divAddAdherentOnList = document.querySelector("#divAddAdherentOnList");
    divAddAdherentOnList.classList.remove("visually-hidden");
});

function myFunction() {
    // Declare variables
    var input, filter, tr, td, i, txtValue;
    input= document.querySelector('#searchAdherent');
    filter = input.value.toUpperCase();
    tr = document.querySelectorAll('tr');
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].querySelectorAll("td");
      if (td.length > 0) {
        txtValue = td[0].textContent || td[0].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

