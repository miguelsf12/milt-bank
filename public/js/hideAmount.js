document.addEventListener('DOMContentLoaded', async function () {
  const amountElement = document.getElementById('amount');
  const toggleButton = document.getElementById('toggleButton');

  async function fetchAmount() {
    try {
      const response = await fetch('/api/getAmount');

      if (!response.ok) {
        throw new Error(`Erro na resposta da API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Valor recebido da API:', data.amount);
      return data.amount;
    } catch (error) {
      console.error('Erro ao obter o valor do banco de dados:', error);
      return null;
    }
  }

  async function toggleAmountVisibility() {
    const isVisible = !amountElement.classList.contains('hidden');

    if (isVisible) {
      amountElement.textContent = ' •••••';
      amountElement.classList.add('hidden');
      toggleButton.classList.remove('bi-eye');
      toggleButton.classList.add('bi-eye-slash');
    } else {
      const amount = await fetchAmount();
      amountElement.textContent = amount !== null ? amount : 'Erro ao obter o valor';
      amountElement.classList.remove('hidden');
      toggleButton.classList.remove('bi-eye-slash');
      toggleButton.classList.add('bi-eye');
    }
  }

  toggleButton.addEventListener('click', toggleAmountVisibility);

  // Chama a função para exibir o valor inicial
  // await toggleAmountVisibility()
});
