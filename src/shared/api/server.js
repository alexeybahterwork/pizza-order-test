import { createServer } from 'miragejs';
import { products } from './data/products';

export default function () {
  createServer({
    routes() {
      this.namespace = 'fakeApi';
      this.timing = 800;

      this.get('/products', () => {
        return products;
      });

      this.post('/cart/add', (schema, request) => {
        return JSON.parse(request.requestBody);
      });

      this.post('/order/add', (schema, request) => {
        return JSON.parse(request.requestBody);
      });
    },
  });
}
