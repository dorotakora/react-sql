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
    const { name, price, producer, created_at } = this.state.product;
    fetch(
      `http://localhost:4000/products/add?name=${name}&price=${price}&producer=${producer}&created_at=${created_at}`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));
    this.clearInpuFields();
  };

  editProduct = (id, event) => {
    document.querySelector("#addProductBtn").style.display = "none";
    document.querySelector("#updateProductBtn").style.display = "inline-block";

    event.target.innerHTML = "Submit";
    [...document.querySelectorAll(".editBtn")].map(button => {
      if (button.innerHTML === "Edit") {
        button.disabled = true;
      }
      return button;
    });
    [...document.querySelectorAll(".deleteBtn")].map(button => {
      return (button.disabled = true);
    });

    let editingProduct;

    const products = this.state.products.map(product => {
      if (id === product.product_id) {
        product.created_at = product.created_at.slice(0, 10);
        editingProduct = product;
      }
      return editingProduct;
    });
    this.setState({
      product: editingProduct
    });
  };
  updateProduct = id => {
    document.querySelector("#addProductBtn").style.display = "inline-block";
    document.querySelector("#updateProductBtn").style.display = "none";

    [...document.querySelectorAll(".editBtn")].map(button => {
      button.disabled = false;
      if (button.innerHTML === "Submit") {
        button.innerHTML = "Edit";
      }
      return button;
    });
    [...document.querySelectorAll(".deleteBtn")].map(button => {
      return (button.disabled = false);
    });

    const { name, price, producer, created_at } = this.state.product;
    fetch(
      `http://localhost:4000/products/edit/${id}?name=${name}&price=${price}&producer=${producer}&created_at=${created_at}`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));

    this.clearInpuFields();
  };

  deleteProduct = id => {
    fetch(`http://localhost:4000/products/delete/${id}`)
      .then(this.getProducts)
      .catch(err => console.error(err));
  };

  clearInpuFields = function() {
    let clearProduct = {
      name: "",
      price: "",
      producer: "",
      created_at: ""
    };
    this.setState({
      product: clearProduct
    });
  };

  renderProduct = ({ product_id, name, price, producer, created_at }) => (
    <div key={product_id} className="grid">
      <span>{product_id}</span>
      <span>{name}</span>
      <span>{price.toFixed(2)}</span>
      <span>{producer}</span>
      <span>{created_at.slice(0, 10)}</span>
      <button
        onClick={event => this.editProduct(product_id, event)}
        className="editBtn"
      >
        Edit
      </button>
      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this product?")) {
            this.deleteProduct(product_id);
          }
        }}
        className="deleteBtn"
      >
        Delete
      </button>
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
            id="inputName"
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
              this.setState({
                product: { ...product, producer: e.target.value }
              })
            }
          />
          <label>Created at</label>
          <input
            value={product.created_at}
            onChange={e =>
              this.setState({
                product: { ...product, created_at: e.target.value }
              })
            }
          />
          <button onClick={this.addProduct} id="addProductBtn">
            Add Product
          </button>
          <button
            style={{ display: "none" }}
            onClick={() => this.updateProduct(product.product_id)}
            id="updateProductBtn"
          >
            Update Product
          </button>
        </div>
      </div>
    );
  }
}

export default App;
