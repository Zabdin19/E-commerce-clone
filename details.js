
function getProductIdFromLocalStorage() {
  return localStorage.getItem("productId");
}

// Function to retrieve product ID from local storage and fetch product details
function getProductIdFromLocalStorageAndFetchDetails() {
  const productId = localStorage.getItem("productId");
  if (productId) {
    fetchProductDetails(productId);
  } else {
    console.error("Product ID not found in local storage.");
  }
}

// Call the function to retrieve product ID from local storage and fetch details
getProductIdFromLocalStorageAndFetchDetails();

function fetchProductDetails(productId) {
  console.log(productId);
  // Fetch product details using the productId
  fetch(`https://dummyjson.com/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((productDetails) => {
      displayProductDetails(productDetails);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
}


function displayProductDetails(product) {
    // console.log(product);
    const thumbnail = document.getElementById("thumbnail")
    thumbnail.src = product.thumbnail;

    const thumbnailGallery = document.getElementById("thumbnailGallery")

    for (let i = 0; i < product.images.length; i++) {
        const element = product.images[i];
        console.log(element);

        const galleryImages = document.createElement("img")
        galleryImages.src = element;

        thumbnailGallery.appendChild(galleryImages)
    }

    const productTitle = document.querySelector(".product-title")
    productTitle.textContent = product.title;

    const productDescription = document.querySelector(".product-description")
    productDescription.textContent = product.description;

    const productPrice = document.querySelector(".product-price")
    productPrice.textContent =`Price: ${product.price}` ;

    const productDiscount = document.querySelector(".product-discount")
    productDiscount.textContent =`Discount: ${product.discountPercentage}` ;

    const productRating = document.querySelector(".product-rating")
    productRating.textContent =`Rating: ${product.rating}` ;

    const productStock = document.querySelector(".product-stock")
    productStock.textContent =`Stock: ${product.stock}` ;

    const productBrand = document.querySelector(".product-brand")
    productBrand.textContent =`Brand: ${product.brand}` ;

    const productCategory = document.querySelector(".product-category")
    productCategory.textContent =`Category: ${product.category}` ;


   
}
