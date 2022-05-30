import { NegociacaoController } from './controllers/negociacao-controller.js';
const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error(`N&atildeo foi poss&iacutevel inicializar a 
                        aplica&ccedil&atildeo.`);
}
const btnImporta = document.querySelector('#botao-importa');
if (btnImporta) {
    btnImporta.addEventListener('click', () => {
        controller.importaDados();
    });
}
else {
    throw Error(`bot&atildeo importa n&atildeo foi encontrado.`);
}
//# sourceMappingURL=app.js.map