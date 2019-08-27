import React from "react";

class App extends React.Component {
  state = {
    products: [],
    product: {
      name: "",
      price: "",
      producer: "",
      created_at: ""
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
      `http://localhost:4000/products/add?name=${product.name}&price=${product.price}&producer=${product.producer}&created_at=${product.created_at}`
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

  renderProduct = ({ product_id, name, price, producer, created_at }) => (
    <div key={product_id} className="grid">
      <span>{product_id}</span>
      <span>{name}</span>
      <span>{price.toFixed(2)}</span>
      <span>{producer}</span>
      <span>{created_at.slice(0, 10)}</span>
      <button onClick={() => this.editProduct(product_id)}>Edit</button>
      <button onClick={() => this.deleteProduct(product_id)}>Delete</button>
    </div>
  );

  render() {
    const { products, product } = this.state;
    return (
      <div className="App">
        <h1>React with mySQL</h1>
        <div className="grid">
          <span>
            <strong>Id</strong>
          </span>
          <span>
            <strong>Name</strong>
          </span>
          <span>
            <strong>Price</strong>
          </span>
          <span>
            <strong>Producer</strong>
          </span>
          <span>
            <strong>Created at</strong>
          </span>
          <span>
            <strong>Edit</strong>
          </span>
          <span>
            <strong>Delete</strong>
          </span>
        </div>

        {products.map(this.renderProduct)}
        <div>
          <label>Name</label>
          <input
            value={product.name}
            onChange={e =>
              this.setState({ product: { ...product, name: e.target.value } })
            }
          />
          <label>Price</label>
          <input
            value={product.price}
            onChange={e =>
              this.setState({ product: { ...product, price: e.target.value } })
            }
          />
          <label>Producer</label>
          <input
            value={product.producer}
            onChange={e =>
              this.setState({ product: { ...product, price: e.target.value } })
            }
          />
          <label>Created at</label>
          <input
            value={product.created_at}
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
