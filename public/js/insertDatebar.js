function formatarData(input) {
  let valor = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (valor.length > 2) {
    valor = valor.substring(0, 2) + '/' + valor.substring(2);
  }
  if (valor.length > 5) {
    valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
  }

  input.value = valor;
}