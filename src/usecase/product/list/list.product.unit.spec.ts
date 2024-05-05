import ListProductUseCase from "./list.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test list product use case", () => {

  it("should list a single product", async () => {
    const productRepository = MockRepository();
    const product = {
      id: "1",
      name: "Product 1",
      price: 10,
    };
    productRepository.findAll.mockReturnValue([product]);
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output).toEqual({
      products: [{
        id: product.id,
        name: product.name,
        price: product.price,
      }]
    });
  });

  it("should list many product", async () => {
    const productRepository = MockRepository();
    const products = [{
      id: "1",
      name: "Product 1",
      price: 10,
    },
    {
      id: "2",
      name: "Product 2",
      price: 10,
    },
    {
      id: "3",
      name: "Product 3",
      price: 10,
    }];
    productRepository.findAll.mockReturnValue(products);
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output).toEqual({
      products: products
    });
  });
});
