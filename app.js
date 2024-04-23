document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('.first ul').classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  function fetchData() {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        displayData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function displayData(data) {
    const container = document.getElementById("data-container");

    // Check if products is an array
    if (data && Array.isArray(data.products)) {
      data.products.forEach((product) => {
        const card = createProductCard(product);
        container.appendChild(card);

        // Add event listener to each card
        card.addEventListener("click", () => {
          saveProductIdToLocalStorage(product.id);
          window.location.href = `details.html?id=${product.id}`;
        //   fetchProductDetails(product.id);
        });
      });
    } else {
      console.error("Data is not in the expected format:", products);
    }
  }

  function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const title = document.createElement("h2");
    title.textContent = product.title;

    const id = document.createElement("div");
    id.textContent = product.id;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.textContent = `Price: ${product.price}`;

    // Create image element for the first image
    const image = document.createElement("img");
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      // Set the src and alt attributes of the image
      image.src = product.images[0];
      image.alt = product.title;
      image.classList.add("product-image");
    } else {
      console.error(
        "Product images not found or not in the expected format:",
        product
      );
    }

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(id);
    card.appendChild(description);
    card.appendChild(price);

    return card;
  }
});

function fetchProductDetails(productId) {
  const productDetailsContainer = document.getElementById("productDetails");
  window.location.href = "details.html";
  
  // Check if productDetailsContainer exists before accessing it
  if (productDetailsContainer) {
    productDetailsContainer.textContent = ""; // Clear previous content if any

    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((productDetails) => {
        const detailsContainer = document.createElement("div");
        detailsContainer.classList.add("product-details");
        detailsContainer.innerHTML = `
                    <h3>${productDetails.title}</h3>
                    <p><strong>Price:</strong> ${productDetails.price}</p>
                    <p><strong>Description:</strong> <br> ${productDetails.description}</p>
                `;

        // Display images
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("product-image-container");
        productDetails.images.forEach((image) => {
          const img = document.createElement("img");
          img.src = image;
          img.alt = productDetails.title;
          img.classList.add("product-image");
          imageContainer.appendChild(img);
        });
        detailsContainer.appendChild(imageContainer);

        // Append details to productDetailsContainer
        productDetailsContainer.appendChild(detailsContainer);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  } else {
    console.error("productDetailsContainer not found in the DOM.");
  }
}

// Function to save product ID to local storage
function saveProductIdToLocalStorage(productId) {
    localStorage.setItem('productId', productId);
}