function calcularCustoBeneficio() {
    // Obter os elementos de entrada do formulário
    const nome = document.getElementById('nome').value;
    const tamanho = parseFloat(document.getElementById('tamanho').value);
    const preco = parseFloat(document.getElementById('preco').value);
  
    // Calcular a área da pizza (considerando que é um círculo)
    const area = Math.PI * Math.pow(tamanho / 2, 2);
  
    // Calcular o custo por cm²
    const custoPorCm2 = preco / area;
  
    return { nome, tamanho, preco, custoPorCm2 };
  }
  
  function adicionarPizza() {
    // Calcular o custo benefício para a pizza atual
    const pizzaAtual = calcularCustoBeneficio();
  
    // Obter a tabela de resultados
    const tabela = document.querySelector('table tbody');
  
    // Adicionar uma nova linha com as informações da pizza
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
      <td>${pizzaAtual.nome}</td>
      <td>${pizzaAtual.tamanho}</td>
      <td>R$ ${pizzaAtual.preco.toFixed(2)}</td>
      <td>R$ ${pizzaAtual.custoPorCm2.toFixed(2)}</td>
      <td></td>
    `;
  
    // Adicionar a nova linha à tabela
    tabela.appendChild(novaLinha);
  
    // Atualizar a diferença percentual em relação à pizza anterior (se aplicável)
    if (tabela.rows.length > 1) {
      const linhaAnterior = tabela.rows[tabela.rows.length - 2];
      const custoPorCm2Anterior = parseFloat(linhaAnterior.cells[3].innerText.substring(2));
      const diferencaPercentual = ((pizzaAtual.custoPorCm2 - custoPorCm2Anterior) / custoPorCm2Anterior) * 100;
      linhaAnterior.cells[4].innerText = `${diferencaPercentual.toFixed(2)}%`;
    }
  }
  
  // Capturar o evento de envio do formulário
  const form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário
    adicionarPizza();
  });
  