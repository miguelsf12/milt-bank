// Adiciona um ouvinte de evento para o botão "Mostrar Mais"
document.getElementById('showMoreBtn').addEventListener('click', function () {
  // Esconde a div de finanças
  document.querySelector('.finances').style.display = 'none';
  // Exibe a div expandida
  document.getElementById('expandedFinance').style.display = 'block';
});

document.getElementById('closeBtn').addEventListener('click', function () {
  
  document.querySelector('.finances').style.display = 'flex';
  // Esconde a div expandida
  document.getElementById('expandedFinance').style.display = 'none';
});