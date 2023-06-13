const socket = io();

// Función para crear una fila en la tabla de productos
function createProductRow(product) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${product.pid}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>
        <button class="edit-button" data-id="${product.pid}">Editar</button>
        <button class="delete-button" data-id="${product.pid}">Eliminar</button>
      </td>
    `;
    productList.appendChild(tr);
}

// Función para limpiar la lista de productos en la tabla
function clearProductList() {
    productList.innerHTML = "";
}

// Función para manejar la acción de agregar un producto
function handleAddProduct(e) {
    e.preventDefault();

    const title = document.getElementById("title-form").value;
    const description = document.getElementById("description-form").value;
    const category = document.getElementById("category-form").value;
    const price = document.getElementById("price-form").value;
    const code = document.getElementById("code-form").value;
    const stock = document.getElementById("stock-form").value;

    const newProduct = {
        title,
        description,
        category,
        price,
        code,
        stock
    };

    socket.emit("add-product", newProduct);
    addProductForm.reset();
}

// Función para manejar la acción de editar un producto
function handleEditProduct(productId) {

    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {

            console.log('Datos del producto:', product);
        })
        .catch(error => {
            console.error('Error al obtener los datos del producto:', error);
        });
}

// Función para manejar la acción de eliminar un producto
function handleDeleteProduct(productId) {

    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        fetch(`/api/products/${productId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {

                    console.log('Producto eliminado:', productId);
                } else {
                    console.error('Error al eliminar el producto:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el producto:', error);
            });
    }
}


