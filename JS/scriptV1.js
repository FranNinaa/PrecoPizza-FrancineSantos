//EXEMPLO FEITO EM AULA

//toques do professor
/*
    var pizza1 =[]
    pizza1[0] = "Gigante" dados que vem da tela
    pizza1[1] = 50 diametro
    pizza1[2] = 50.00 preco
    pizzas.push(pizza1)

     var pizza2 =[]
    pizza2[0] = "Grande" dados que vem da tela
    pizza2[1] = 35 diametro
    pizza2[2] = 35.00 preco
    pizzas.push(pizza2)

    var pizza3 =[]
    pizza3[0] = "Media" dados que vem da tela
    pizza3[1] = 25 diametro
    pizza3[2] = 25.00 preco
    pizzas.push(pizza3)

      var pizza =[]
    pizza4[0] = "Pequena" dados que vem da tela
    pizza4[1] = 15 diametro
    pizza4[2] = 15.00 preco
    pizzas.push(pizza4)

    calcular a area da pizza = dividir o preco pela area

    pizzas.foreach(pizza => {
        let raio = pizza[1] / 2;
        let area = math.pi * (raio * raio) ---calcula a area
        mostra na tela os resultado
        pizza.push(area)

        let precoCmQuadrado = pizza[2] / area --- e tem o preco por cm quarado e tem q adiciona na pizzas
        pizza.push(precoCmQuadrado)
    })

     quantos porcentos cada pizza é mais cara que a pizza com tamanho diferente uma da outra
   vamos comparar os precos para saber a diferemça de valores
    exemplo

    pizzas.sort(function(a, b){
        if(a[4] > b[4]){
            return 1
        }
        if(a[4] > b[4]){
            return -1
        }
        return 0
    })
    mostra na tela as informações para o usuario

    oservação - a gigante tem o melhor custo beneficio diante do diametro das demais

    se conseque acessar a pizza conseguimos acessar uma posição especifica dentro de pizza
    tem diametro e preco e quero calcula a area
*/
//-----------------------------------------------------------------------------------------------------------

// Array para armazenar os dados das pizzas
var pizzas = [];

// Função que é chamada quando o formulário é enviado
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtém os valores do formulário
    var nome = document.getElementById('nome').value;
    var tamanho = parseFloat(document.getElementById('tamanho').value);
    var preco = parseFloat(document.getElementById('preco').value);

    // Calcula a área da pizza
    var raio = tamanho / 2;
    var area = Math.PI * (raio * raio);

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
            '<td>' + (pizza[4] === 0 ? 'Melhor Custo Beneficio' : '+' + pizza[4].toFixed(0) + '%') + '</td>';

        tbody.appendChild(tr);
    });
}
/*
    Explicação diante do codigo acima.

    - Quando o formulário é enviado, ele pega o nome, tamanho e preço da pizza.
    - Calcula a área da pizza e o preço por centímetro quadrado.
    - Adiciona esses dados a um array chamado "pizzas".
    - Calcula a diferença percentual do preço em relação à melhor opção (pizza com melhor custo-benefício).
    - Ordena as pizzas pelo custo-benefício.
    - Atualiza a tabela no HTML com os resultados.
*/