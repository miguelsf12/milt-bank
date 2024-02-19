// Função para formatar o CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres que não são números
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona um ponto após os primeiros 3 dígitos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona um ponto após os segundos 3 dígitos
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona um traço antes dos últimos 2 dígitos
  return cpf;
}

// Função para permitir apenas números no campo e formatar o CPF
document.getElementById('cpf').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não são números
  event.target.value = formatarCPF(event.target.value); // Formata o CPF conforme o padrão

  // Limita o comprimento do valor inserido para 11 dígitos
  if (event.target.value.length > 14) {
      event.target.value = event.target.value.slice(0, 14);
  }
});