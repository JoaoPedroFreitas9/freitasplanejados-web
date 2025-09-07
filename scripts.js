document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-orcamento");
  const modalOverlay = document.getElementById("modal-overlay");
  const resultadoModal = document.getElementById("resultado-modal");
  const closeButton = document.querySelector(".close-button");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let tipo = document.getElementById("tipo").value;
    let comprimento = parseFloat(document.getElementById("comprimento").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let cor = document.getElementById("cor").value;
    let ferragensDescricao = document.getElementById("ferragem").value;
    let fatorMdf = parseFloat(
      document.querySelector("input[name='mdf']:checked").value
    );

    let precoMdf = parseFloat(document.getElementById("precoMdf").value) || 0;
    let ferragensBase =
      parseFloat(document.getElementById("ferragensBase").value) || 0;
    let lucro = (parseFloat(document.getElementById("lucro").value) || 0) / 100;

    let area = (comprimento * altura) / 10000;

    // Custos
    let custoMdf = area * precoMdf;
    let subtotal = custoMdf + ferragensBase;

    // Aplica acabamento (fator MDF)
    let custoAjustado = subtotal * fatorMdf;

    // Aplica lucro
    let precoFinal = custoAjustado * (1 + lucro);

    // Monta o HTML do resultado
    const resultadoHTML = `
      <h2>📋 Resumo do Orçamento</h2>
      <p><strong>Tipo de móvel:</strong> ${tipo || "Não informado"}</p>
      <p><strong>Cor escolhida:</strong> ${cor || "Não informado"}</p>
      <p><strong>Ferragens:</strong> ${
        ferragensDescricao || "Não informado"
      }</p>
      <hr>
      <p><strong>Custo MDF:</strong> R$ ${custoMdf.toFixed(2)}</p>
      <p><strong>Ferragens:</strong> R$ ${ferragensBase.toFixed(2)}</p>
      <p><strong>Subtotal (MDF + Ferragens):</strong> R$ ${subtotal.toFixed(
        2
      )}</p>
      <p><strong>Ajuste pelo MDF</strong> R$ ${custoAjustado.toFixed(2)}</p>
      <h3>💰 Orçamento Final (com Lucro): R$ ${precoFinal.toFixed(2)}</h3>
    `;

    resultadoModal.innerHTML = resultadoHTML;

    modalOverlay.classList.add("show");
  });

  function fecharModal() {
    modalOverlay.classList.remove("show");
  }

  closeButton.addEventListener("click", fecharModal);

  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      fecharModal();
    }
  });
});
