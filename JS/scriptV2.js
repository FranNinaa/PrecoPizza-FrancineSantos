// Função para calcular o custo benefício da pizza com base no formato
function calcularCustoBeneficio() {
    const nomeInput = document.getElementById('nome');
    const tamanhoInput = document.getElementById('tamanho');
    const precoInput = document.getElementById('preco');
  
    // Verificar se os elementos existem no DOM
    if (!nomeInput || !tamanhoInput || !precoInput) {
      alert('Elementos do DOM não encontrados.');
      return null;
    }
  
    const nome = nomeInput.value;
    const tamanho = tamanhoInput.value;
    const preco = parseFloat(precoInput.value);
  
    // Verificar se os dados de entrada são válidos
    if (isNaN(preco) || preco <= 0) {
      alert('Preço inválido.');
      return null;
    }
  
    let area;
  
    if (tamanho.includes('x')) {
      const [largura, altura] = tamanho.split('x').map(parseFloat);
      area = largura * altura;
    } else {
      const raio = parseFloat(tamanho) / 2;
      area = Math.PI * Math.pow(raio, 2);
    }
  
    const custoPorCm2 = preco / area;
  
    return { nome, tamanho, preco, custoPorCm2 };
  }
  
  // Função para adicionar uma nova pizza à tabela
  function adicionarPizza() {
    const pizzaAtual = calcularCustoBeneficio();
  
    if (!pizzaAtual) {
      alert('Não foi possível calcular o custo benefício da pizza.');
      return;
    }
  
    const tabela = document.querySelector('table tbody');
  
    if (!tabela) {
      alert('Tabela não encontrada.');
      return;
    }
  
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
      <td>${pizzaAtual.nome}</td>
      <td>${pizzaAtual.tamanho}</td>
      <td>R$ ${pizzaAtual.preco.toFixed(2)}</td>
      <td>R$ ${pizzaAtual.custoPorCm2.toFixed(2)}</td>
      <td></td>
    `;
  
    tabela.appendChild(novaLinha);
  
    if (tabela.rows.length > 1) {
      const linhaAnterior = tabela.rows[tabela.rows.length - 2];
  
      if (linhaAnterior && linhaAnterior.cells[3]) {
        const custoPorCm2Anterior = parseFloat(linhaAnterior.cells[3].innerText.substring(2));
        const diferencaPercentual = ((pizzaAtual.custoPorCm2 - custoPorCm2Anterior) / custoPorCm2Anterior) * 100;
        linhaAnterior.cells[4].innerText = `${diferencaPercentual.toFixed(2)}%`;
      }
    }
  }
  
  const form = document.querySelector('form');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      adicionarPizza();
    });
  } else {
    alert('Formulário não encontrado.');
  }
  