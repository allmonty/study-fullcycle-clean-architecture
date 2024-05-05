import FindProductUseCase from "./find.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {

  it("should find a product", async () => {
    const productRepository = MockRepository();
    const product = {
      id: "1",
      name: "Product 1",
      price: 10,
    };
    productRepository.find.mockResolvedValue(product);
    const productFindUseCase = new FindProductUseCase(productRepository);

    const output = await productFindUseCase.execute(product);

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("should thrown an error when no product is found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const productFindUseCase = new FindProductUseCase(productRepository);

    await expect(productFindUseCase.execute({id: "123"})).rejects.toThrow(
      "Product not found"
    );
  });
});
