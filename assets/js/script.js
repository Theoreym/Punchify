document.getElementById("absenceForm").addEventListener("submit", function (event) {
    // Réinitialise le message d'erreur
    document.getElementById("error").innerText = '';
  
    // Récupère les valeurs des champs
    const blessure = document.getElementById("blessure").value.trim();
    const date = document.getElementById("date").value.trim();
    const dateFin = document.getElementById("dateFin").value.trim();
  
    // Validation des champs
    if (blessure === "" || date === "" || dateFin === "") {
      document.getElementById("error").innerText = "Veuillez remplir tous les champs.";
      document.getElementById("error").classList.remove("d-none"); // Afficher le message d'erreur
      event.preventDefault(); // Empêcher la soumission du formulaire
      return;
    }
  });