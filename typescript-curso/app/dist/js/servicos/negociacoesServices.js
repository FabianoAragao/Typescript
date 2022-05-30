import { Negociacao } from "../models/negociacao.js";
export class NegociacoesService {
    obterNegociacoesDoDia() {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dadosArrayJson) => {
            return dadosArrayJson.map(valores => {
                return new Negociacao(new Date, valores.vezes, valores.montante);
            });
        });
    }
}
//# sourceMappingURL=negociacoesServices.js.map