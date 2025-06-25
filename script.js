document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
    },
    {
      id: 2,
      name: "Product 2",
      price: 9.99,
    },
    {
      id: 3,
      name: "Product 3",
      price: 19.99,
    },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotalMsg = document.getElementById("cart-total");
  const cartTotal = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  cart.forEach(() => {
    renderCart();
  });

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${product.name}: $${product.price.toFixed(
      2
    )} </span> <button data-id="${product.id}"> Add To Cart </button>`;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
      saveToLocal();
      // console.log(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveToLocal();
    // console.log(cart)
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden");
      cartTotalMsg.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const renderedItem = document.createElement("div");
        renderedItem.innerHTML = `<span> ${item.name}: $${item.price} </span> <button data-index="${index}"> Remove </button>`;
        cartTotal.textContent = `${totalPrice.toFixed(2)}`;
        cartItems.appendChild(renderedItem);
      });
    } else {
      emptyCartMsg.classList.remove("hidden");
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const cartIndex = parseInt(e.target.getAttribute("data-index"));
      cart.splice(cartIndex, 1);
      saveToLocal();
      renderCart();
    }
    if (cart.length === 0) {
      cartTotal.textContent = `$0.00`;
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    cartTotal.textContent = `$0.00`;
    alert("Checkout Sucessfull");
    saveToLocal();
    renderCart();
  });

  function saveToLocal() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
