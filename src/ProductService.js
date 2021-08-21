import axios from "axios";

const url = "http://localhost:5000";

class ProductService {
  static async getProducts() {
    try {
      const res = await axios.get(`${url}/products`);
      const data = await res.data;
      return await data;
    } catch (e) {
      return e;
    }
  }
  static async getCountries() {
    try {
      const res = await axios.get(`${url}/countries`);
      const data = await res.data;
      return await data;
    } catch (e) {
      return e;
    }
  }

  static updateProduct(product) {
    return axios.post(`${url}/cogs`, {
      id: product.id,
      productName: product.productName,
      cogs: product.cogs
    });
  }
}
export default ProductService;
