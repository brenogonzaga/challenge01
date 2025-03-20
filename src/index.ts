import * as fs from "fs";
import { Product, NormalizeOptions } from "./interfaces";
import { categorizeProducts } from "./categorize";

let customOptions: NormalizeOptions = {};
try {
  const configData = fs.readFileSync("config.json", "utf8");
  customOptions = JSON.parse(configData) as NormalizeOptions;
  console.log("Configurações customizadas carregadas:", customOptions);
} catch (error) {
  console.log(
    "Nenhum arquivo config.json encontrado ou erro ao ler. Usando configurações padrão."
  );
}

let products: Product[] = [];
try {
  const data = fs.readFileSync("data01.json", "utf8");
  products = JSON.parse(data) as Product[];
} catch (error) {
  console.error("Erro ao ler data01.json:", error);
  process.exit(1);
}

const categories = categorizeProducts(products, customOptions);

fs.writeFileSync("output.json", JSON.stringify(categories, null, 2), "utf8");
console.log("Arquivo output.json gerado com sucesso.");
