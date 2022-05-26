import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { DiasDaSemana } from '../enum/dias-da-semana.js';

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = Negociacao.criaDe(this.inputData.value,
                                            this.inputQuantidade.value,
                                            this.inputValor.value);

        if(!this.verificaDiaUtil(negociacao.data))        
        {
            this.mensagemView.update('Apenas negocia&ccedil&otildees em dias uteis s&atildeo aceitas.');
            return;
        }

        this.negociacoes.adiciona(negociacao);
        this.atualizaview();
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaview()
    {        
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negocia&ccedil&atildeo adicionada com sucesso');
        
        this.limparFormulario();
    }

    private verificaDiaUtil(data : Date) : boolean
    {
        return (data.getDay() > DiasDaSemana.DOMINGO && 
                    data.getDay()  < DiasDaSemana.SABADO);
    }
}
