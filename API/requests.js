export default {
  getTodoList() {
    const API = 'https://jsonplaceholder.typicode.com/todos';

    return fetch(API);
  }
}
