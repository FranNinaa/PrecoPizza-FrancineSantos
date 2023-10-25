// Array para armazenar os dados das pizzas
var pizzas = [];

// Função que é chamada quando o formulário é enviado
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtém os valores do formulário
    var nome = document.getElementById('nome').value;
    var tamanho = document.getElementById('tamanho').value; // Altera o tipo de input para "text" para acomodar diferentes formatos
    var preco = parseFloat(document.getElementById('preco').value);

    // Calcula a área da pizza
    var area;
    if (tamanho.includes('x')) {
        // Pizza retangular ou quadrada
        var dimensoes = tamanho.split('x');
        var altura = parseFloat(dimensoes[0]);
        var largura = parseFloat(dimensoes[1]);
        area = altura * largura;
    } else {
        // Pizza redonda
        var raio = parseFloat(tamanho) / 2;
        area = Math.PI * (raio * raio);
    }

    // Calcula o preço por cm²
    var precoCmQuadrado = preco / area;

    // Adiciona os dados da pizza ao array
    pizzas.push([nome, tamanho, preco, precoCmQuadrado, 0]);

    // Recalcula a diferença percentual
    if (pizzas.length > 1) {
        var melhorCB = pizzas.reduce(function (prev, current) {
            return (prev[3] < current[3]) ? prev : current;
        });

        pizzas.forEach(function (pizza) {
            var diferencaPercentual = ((pizza[3] - melhorCB[3]) / melhorCB[3]) * 100;
            pizza[4] = diferencaPercentual;
        });
    }

    // Ordena as pizzas pelo custo-benefício
    pizzas.sort(function (a, b) {
        return a[3] - b[3];
    });

    // Atualiza a tabela no HTML
    atualizarTabela();
});

function atualizarTabela() {
    var tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    pizzas.forEach(function (pizza) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + pizza[0] + '</td>' +
            '<td>' + pizza[1] + '</td>' +
            '<td>R$ ' + pizza[2].toFixed(2) + '</td>' +
            '<td>R$ ' + pizza[3].toFixed(2) + '</td>' +
            '<td>' + (pizza[4] === 0 ? 'Melhor CB' : '+' + pizza[4].toFixed(0) + '%') + '</td>';

        tbody.appendChild(tr);
    });
}
/*
    As principais modificações na versão 2 incluem:

     - O tipo do input de tamanho mudou para "text" para acomodar diferentes 
        formatos de pizza (redonda, retangular, quadrada). Isso permite que 
        o usuário insira dimensões como "20x30" para pizzas retangulares.

    - O cálculo da área foi ajustado para tratar pizzas redondas e pizzas
        retangulares/quadradas de forma diferente.

     - As demais partes do script permanecem semelhantes à versão anterior, 
        incluindo o cálculo de custo-benefício, classificação e atualização da tabela.
*/