// logic.js

document.addEventListener('DOMContentLoaded', function () {
    // ------------------------------------------------------------------
    // Variables y selección de elementos
    // ------------------------------------------------------------------
    let cart = []; // Array que almacenará los productos en el carrito
  
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartBtn = document.getElementById('emptyCartBtn');
    const addProductForm = document.getElementById('addProductForm');
    const productsGrid = document.querySelector('.products-grid');
  
    // ------------------------------------------------------------------
    // Mostrar/ocultar el modal del carrito al hacer clic en el ícono
    // ------------------------------------------------------------------
    cartIcon.addEventListener('click', function () {
      cartModal.classList.toggle('show');
    });
  
    // ------------------------------------------------------------------
    // Función para actualizar la interfaz del carrito
    // ------------------------------------------------------------------
    function updateCartUI() {
      cartItemsContainer.innerHTML = '';
      let total = 0; // Nuevo: variable para el total
      if (cart.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.classList.add('empty-cart');
        emptyMsg.textContent = 'Your cart is empty';
        cartItemsContainer.appendChild(emptyMsg);
      } else {
        cart.forEach(item => {
          total += item.price * item.quantity; // Acumula el total
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('cart-item');
          itemDiv.style.display = 'flex';
          itemDiv.style.alignItems = 'center';
          itemDiv.style.marginBottom = '1rem';
          
          const img = document.createElement('img');
          img.src = item.image;
          img.alt = item.name;
          img.style.width = '50px';
          img.style.height = '50px';
          img.style.objectFit = 'cover';
          img.style.marginRight = '0.5rem';
  
          const nameSpan = document.createElement('span');
          nameSpan.textContent = item.name;
          nameSpan.style.flex = '1';
  
          const detailsSpan = document.createElement('span');
          detailsSpan.textContent = `$${item.price} x ${item.quantity}`;
          detailsSpan.style.marginLeft = '0.5rem';
  
          itemDiv.appendChild(img);
          itemDiv.appendChild(nameSpan);
          itemDiv.appendChild(detailsSpan);
  
          cartItemsContainer.appendChild(itemDiv);
        });
        // Nuevo: Mostrar el total del carrito
        const totalDiv = document.createElement('div');
        totalDiv.style.textAlign = 'right';
        totalDiv.style.fontWeight = 'bold';
        totalDiv.style.marginTop = '1rem';
        totalDiv.textContent = 'Total: $' + total;
        cartItemsContainer.appendChild(totalDiv);
      }
    }
  
    // ------------------------------------------------------------------
    // Función para agregar un producto al carrito
    // ------------------------------------------------------------------
    function addToCart(product) {
      const index = cart.findIndex(item => item.name === product.name);
      if (index !== -1) {
        // Si ya existe, se incrementa la cantidad
        cart[index].quantity += 1;
      } else {
        // Si es nuevo, se agrega con cantidad 1
        cart.push({ ...product, quantity: 1 });
      }
      updateCartUI();
    }
  
    // ------------------------------------------------------------------
    // Asignar eventos a los botones "Add to Cart" de los productos existentes
    // ------------------------------------------------------------------
    function attachAddToCartEvents() {
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          const productCard = e.target.closest('.product-card');
          if (productCard) {
            const name = productCard.querySelector('h3').textContent;
            const image = productCard.querySelector('img').src;
            const price = parseFloat(productCard.getAttribute('data-price'));
            const product = { name, price, image };
            addToCart(product);
          }
        });
      });
    }
    attachAddToCartEvents();
  
    // ------------------------------------------------------------------
    // Vaciar el carrito: elimina todos los productos y actualiza la UI
    // ------------------------------------------------------------------
    emptyCartBtn.addEventListener('click', function () {
      cart = [];
      updateCartUI();
    });
  
    // ------------------------------------------------------------------
    // Agregar un nuevo producto a la tienda mediante el formulario
    // ------------------------------------------------------------------
    addProductForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const productName = document.getElementById('productName').value.trim();
      const productPrice = parseFloat(document.getElementById('productPrice').value.trim());
      const productImage = document.getElementById('productImage').value.trim();
      const productFlavor = document.getElementById('productFlavor').value.trim();
      const productType = document.getElementById('productType').value.trim();
      const productWeight = document.getElementById('productWeight').value.trim();
  
      // Validación del precio mínimo
      if (productPrice < 1000) {
        alert('El precio del artículo debe ser al menos 1,000');
        return;
      }
  
      // Crear la nueva tarjeta del producto
      const newCard = document.createElement('div');
      newCard.classList.add('product-card');
      newCard.setAttribute('data-price', productPrice);
  
      const imgElem = document.createElement('img');
      imgElem.src = productImage;
      imgElem.alt = productName;
  
      const h3Elem = document.createElement('h3');
      h3Elem.textContent = productName;
  
      const ulElem = document.createElement('ul');
      ulElem.classList.add('product-attributes');
  
      const liFlavor = document.createElement('li');
      liFlavor.textContent = 'Sabor: ' + productFlavor;
      const liType = document.createElement('li');
      liType.textContent = 'Tipo: ' + productType;
      const liWeight = document.createElement('li');
      liWeight.textContent = 'Peso: ' + productWeight;
  
      ulElem.appendChild(liFlavor);
      ulElem.appendChild(liType);
      ulElem.appendChild(liWeight);
  
      // Botón para agregar al carrito en el nuevo producto
      const addButton = document.createElement('button');
      addButton.classList.add('add-to-cart');
      addButton.textContent = 'Add to Cart';
      addButton.addEventListener('click', function () {
        const product = {
          name: productName,
          price: productPrice,
          image: productImage
        };
        addToCart(product);
      });
  
      // Ensamblar la tarjeta y agregarla a la sección de productos
      newCard.appendChild(imgElem);
      newCard.appendChild(h3Elem);
      newCard.appendChild(ulElem);
      newCard.appendChild(addButton);
      productsGrid.appendChild(newCard);
  
      // Limpiar el formulario
      addProductForm.reset();
    });
  });
