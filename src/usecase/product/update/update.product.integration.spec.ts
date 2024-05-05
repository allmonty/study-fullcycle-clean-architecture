import { Sequelize } from "sequelize-typescript";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
    };

    const product = await productCreateUseCase.execute(input);

    product.name = "Product a";

    const output = await productUpdateUseCase.execute(product);

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
