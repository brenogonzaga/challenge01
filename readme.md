# Desafio de Categorização de Produtos

Este projeto em TypeScript implementa um algoritmo para agrupar produtos de supermercados considerando variações no nome (ordem das palavras, capitalização, acentuação e sinônimos). A ideia é identificar produtos equivalentes mesmo que os títulos apresentem pequenas diferenças, gerando uma saída agrupada em JSON.

## Configuração

- **config.json**  
  (Opcional) Crie ou edite o arquivo `config.json` para customizar as regras de normalização (ex.: stopwords, mapeamento de unidades, sinônimos):

  ```json
  {
    "stopwords": ["tipo", "de", "do", "da", "dos", "das", "e", "com"],
    "unitMappings": {
      "l": ["l", "litro", "litros", "litro(s)"],
      "kg": ["kg", "quilo", "quilos"],
      "g": ["g", "grama", "gramas"],
      "ml": ["ml", "mililitro", "mililitros"]
    },
    "sortTokens": true,
    "synonymMapping": {
      "joao": "tio joao",
      "piracanjuba": "piracanjuba"
    }
  }
  ```

- **data01.json**  
  Este arquivo deve conter os dados dos produtos a serem agrupados.

## Compilação e Execução

### Usando ts-node com nodemon (modo desenvolvimento)

Para rodar o projeto sem compilar manualmente, execute o comando abaixo na raiz do projeto:

```bash
nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/index.ts
```

Isso fará com que o nodemon monitore as alterações nos arquivos TypeScript dentro da pasta `src` e reinicie a aplicação automaticamente.

## Personalização

Você pode ajustar as regras de normalização modificando o arquivo `config.json`. As opções disponíveis incluem:

- **stopwords**: Lista de palavras a serem ignoradas durante a normalização.
- **unitMappings**: Mapeamento de unidades de medida para padronização (ex.: "litro", "litros" → "l").
- **sortTokens**: Se `true`, os tokens serão ordenados, garantindo que a ordem das palavras não afete o agrupamento.
- **synonymMapping**: Mapeamento de sinônimos para unificar termos equivalentes.

## Considerações Finais

Esta solução é altamente customizável para cenários de webscraping de produtos. Caso as regras de normalização precisem ser refinadas para novos casos, basta ajustar as opções no `config.json` ou modificar a lógica no módulo `normalize.ts`.

---
