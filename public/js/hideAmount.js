document.addEventListener('DOMContentLoaded', function () {
  const amountElement = document.getElementById('amount');
  const toggleButton = document.getElementById('toggleButton');

  toggleButton.addEventListener('click', function () {
    // Verifica se o conteúdo está visível
    const isVisible = !amountElement.classList.contains('hidden');

    if (isVisible) {
      // Oculta o valor e troca o ícone
      amountElement.textContent = '***';
      amountElement.classList.add('hidden');
      toggleButton.classList.remove('bi-eye');
      toggleButton.classList.add('bi-eye-slash');
    } else {
      // Mostra o valor original e troca o ícone
      amountElement.textContent = '200';
      amountElement.classList.remove('hidden');
      toggleButton.classList.remove('bi-eye-slash');
      toggleButton.classList.add('bi-eye');
    }
  });
});