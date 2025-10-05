const { setWorldConstructor } = require('@cucumber/cucumber');

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.baseUrl = process.env.BASE_URL || 'http://localhost:5173';
  }
}

setWorldConstructor(CustomWorld);
