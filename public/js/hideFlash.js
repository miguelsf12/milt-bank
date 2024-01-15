document.addEventListener("DOMContentLoaded", function () {
  // Espera o DOM estar completamente carregado

  // Obtém a referência para o botão e a div
  var hideButton = document.getElementById("hideButton");
  var errorDiv = document.getElementById("errorDiv");

  // Adiciona um evento de clique ao botão
  hideButton.addEventListener("click", function () {
    // Oculta a div com a classe 'messageErro'
    errorDiv.style.display = "none";
  })
})