import React from "react";

class App extends React.Component {
  state = {
    products: [],
    product: {
      name: "",
      price: ""
    }
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    fetch("http://localhost:4000/products")
      .then(response => response.json())
      .then(response =>
        this.setState({
          products: response.data
        })
      )
      .catch(err => console.error(err));
  };

  addProduct = () => {
    const { product } = this.state;
    fetch(
      `http://localhost:4000/products/add?name=${product.name}&price=${product.price}`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));
  };

  editProduct = id => {
    const { product } = this.state;
    console.log(this.state.products);
    fetch(
      `http://localhost:4000/products/edit/${id}?name=${product.name}&price=${product.price}`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));
  };

  deleteProduct = id => {
    fetch(`http://localhost:4000/products/delete/${id}`)
      .then(this.getProducts)
      .catch(err => console.error(err));
  };

  renderProduct = ({ product_id, name, price }) => (
    <div key={product_id}>
      product name: {name} Price: {price}
      <button onClick={() => this.editProduct(product_id)}>Edit</button>
      <button onClick={() => this.deleteProduct(product_id)}>Delete</button>
    </div>
  );

  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
        <h1>React with mySQL</h1>
        {products.map(this.renderProduct)}
        <div>
          <input
            value={product.name}
            onChange={e =>
              this.setState({ product: { ...product, name: e.target.value } })
            }
          />
          <input
            value={product.price}
            onChange={e =>
              this.setState({ product: { ...product, price: e.target.value } })
            }
          />
          <button onClick={this.addProduct}>Add Product</button>
        </div>
      </div>
    );
  }
}

export default App;
