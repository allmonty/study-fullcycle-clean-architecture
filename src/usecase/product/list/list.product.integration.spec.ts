import { Sequelize } from "sequelize-typescript";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test list product use case", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    const productListUseCase = new ListProductUseCase(productRepository);

    const inputs = [
      { name: "Product 1", price: 100, },
      { name: "Product 2", price: 110, },
      { name: "Product 3", price: 111, },
    ]

    await productCreateUseCase.execute(inputs[0]);
    await productCreateUseCase.execute(inputs[1]);
    await productCreateUseCase.execute(inputs[2]);

    const output = await productListUseCase.execute({});

    expect(output).toEqual({
      products: [{
        ...inputs[0],
        id: expect.any(String),
      },
      {
        ...inputs[1],
        id: expect.any(String),
      },
      {
        ...inputs[2],
        id: expect.any(String),
      }]
    });
  });
});
