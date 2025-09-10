import React, { useState } from "react";
import "../MainScreen/MainScreen.css";

export default function MainScreen() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: "1000" },
    { id: 2, name: "Phone", price: "500" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editId, setEditId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: "", price: "" });

  const handleAddClick = () => {
    setIsAdding(true);
    setNewProduct({ name: "", price: "" });
  };

  const handleAddChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddSave = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProducts([
      ...products,
      { id: Date.now(), name: newProduct.name, price: newProduct.price },
    ]);
    setIsAdding(false);
  };

  const handleEditClick = (product) => {
    setEditId(product.id);
    setEditProduct({ name: product.name, price: product.price });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditSave = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, ...editProduct } : p))
    );
    setEditId(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Products List</h2>
      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th className="ActionsColumn">
              Actions
              <button style={{ marginLeft: 8 }} onClick={handleAddClick}>
                Add Product
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {isAdding && (
            <tr>
              <td>
                <input
                  name="name"
                  value={newProduct.name}
                  onChange={handleAddChange}
                  placeholder="Product Name"
                  className="InputContainer"
                />
              </td>
              <td>
                <input
                  name="price"
                  value={newProduct.price}
                  onChange={handleAddChange}
                  placeholder="Price"
                   className="InputContainer"
                />
              </td>
              <td>
                <button onClick={handleAddSave}>Save</button>
                <button
                  onClick={() => setIsAdding(false)}
                  style={{ marginLeft: 8 }}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
          {products.map((product) =>
            editId === product.id ? (
              <tr key={product.id}>
                <td>
                  <input
                    name="name"
                    value={editProduct.name}
                    onChange={handleEditChange}
                    className="InputContainer"
                  />
                </td>
                <td>
                  <input
                    name="price"
                    value={editProduct.price}
                    onChange={handleEditChange}
                    className="InputContainer"
                  />
                </td>
                <td>
                  <button onClick={() => handleEditSave(product.id)}>
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    style={{ marginLeft: 8 }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
