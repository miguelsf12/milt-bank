document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("amountPay");

  // Evento para posicionar o cursor no último caractere
  input.addEventListener("click", function () {
    input.setSelectionRange(input.value.length, input.value.length);
  });

  // Evento para substituir o número à esquerda do cursor
  input.addEventListener("keydown", function (event) {
    var position = input.selectionStart;

    // Se o usuário pressionar backspace e o cursor estiver na vírgula, não fazer nada
    if (event.key === "Backspace" && position === input.value.indexOf(",")) {
      event.preventDefault();
      return;
    }

    // Se o usuário pressionar qualquer tecla numérica
    if (!isNaN(parseInt(event.key))) {
      // Obter o valor atual sem formatação
      var currentValue = parseFloat(input.value.replace(",", ".").replace(/[^0-9.]/g, ""));
      // Converter para uma string com duas casas decimais
      var newValue = (currentValue * 10 + parseInt(event.key) / 100).toFixed(2).replace(".", ",");

      // Se todos os números forem apagados, definir o valor padrão como "00,00"
      if (isNaN(currentValue)) {
        newValue = "00,00";
      }

      // Atualizar o valor do campo
      input.value = newValue;

      // Posicionar o cursor no lugar certo
      input.setSelectionRange(position, position);

      event.preventDefault();
    }
  });
});
