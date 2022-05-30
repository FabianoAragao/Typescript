import { NegociacaoDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService
{
    public obterNegociacoesDoDia() : Promise<Negociacao[]>
    {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dadosArrayJson: NegociacaoDoDia[]) =>
        {
            return dadosArrayJson.map(
                valores=>{
                    return new Negociacao(new Date, valores.vezes, valores.montante)
                }
            );
        });
    }
}