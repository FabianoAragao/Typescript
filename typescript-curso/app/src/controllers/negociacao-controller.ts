import { Negociacao } from '../models/negociacao.js';
import { Negociacoes } from '../models/negociacoes.js';
import { MensagemView } from '../views/mensagem-view.js';
import { NegociacoesView } from '../views/negociacoes-view.js';
import { DiasDaSemana } from '../enum/dias-da-semana.js';
import { tempoDeExecucao } from '../decorators/tempo-de-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-injector.js';
import { NegociacoesService } from '../servicos/negociacoesServices.js';
import { imprimir } from '../utils/imprimir.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() 
    {
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect()
    @tempoDeExecucao()
    public adiciona(): void 
    {        
        const negociacao = Negociacao.criaDe(this.inputData.value,
                                            this.inputQuantidade.value,
                                            this.inputValor.value);

        if(!this.verificaDiaUtil(negociacao.data))        
        {            
            this.mensagemView.update('Apenas negocia&ccedil&otildees em dias uteis s&atildeo aceitas.');
            return;
        }

        this.negociacoes.adiciona(negociacao);

        imprimir(negociacao, this.negociacoes);

        this.atualizaview();        
    }

    public importaDados(): void
    {        
        this.negociacoesService.obterNegociacoesDoDia()
            .then(negociacoesDeHoje => 
            {
                return negociacoesDeHoje.filter(negociacoesDeHoje => 
                {
                    return !this.negociacoes
                                    .lista()
                                    .some(Negociacao => Negociacao.ehIgual(negociacoesDeHoje))
                })
            })
            .then(negociacoesArrayJson =>
            
        {
            for(let negociacao of negociacoesArrayJson)
            {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
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
