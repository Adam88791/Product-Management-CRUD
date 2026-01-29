
// get input fields
const titleInput = document.getElementById("titleinput") || "Noo";
const priceInput = document.getElementById("priceinput") || 0;
const taxesInput = document.getElementById("taxesinput") || 0;
const adsInput = document.getElementById("adsinput") || 0;
const discountInput = document.getElementById("discountinput") || 0;
const quantityInput = document.getElementById("quantityinput") || 0;
const categoryInput = document.getElementById("categoryinput") || "Noo";

// all inputs selection
const allTotalInputs = document.querySelectorAll(".totalinputes");

// get price for one element 
const priceForElement = document.getElementById("priceforelement");
// get price for all elements
const allElementPrice = document.getElementById("allelementprice");



// ####
// calculate the final price for one element and all total quantity function 

allTotalInputs.forEach( (input) => {
    input.addEventListener("input" , () => {
        elementPrice();
    })
});

function elementPrice() {
    let total = ((Number(taxesInput.value / 100) * Number(priceInput.value)) + Number(priceInput.value) + Number(adsInput.value)) - Number((discountInput.value / 100) * Number(priceInput.value));
    priceForElement.innerHTML = total;
    allElementPrice.innerHTML = total * Number(quantityInput.value);
}




// #####
// Input Validation Function
function validateInputs() {
    // Trim whitespace
    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();
    const price = Number(priceInput.value);
    const taxes = Number(taxesInput.value);
    const ads = Number(adsInput.value);
    const discount = Number(discountInput.value);
    const quantity = Number(quantityInput.value);

    // Validate title
    if (!title) {
        alert("❌ Title is required!");
        titleInput.focus();
        return false;
    }
    if (title.length < 2) {
        alert("❌ Title must be at least 2 characters long!");
        titleInput.focus();
        return false;
    }

    // Validate price
    if (!priceInput.value || price < 0) {
        alert("❌ Price must be a positive number!");
        priceInput.focus();
        return false;
    }

    // Validate taxes
    if (!taxesInput.value || taxes < 0) {
        alert("❌ Taxes must be a positive number!");
        taxesInput.focus();
        return false;
    }

    // Validate ads
    if (!adsInput.value || ads < 0) {
        alert("❌ Ads must be a positive number!");
        adsInput.focus();
        return false;
    }

    // Validate discount
    if (!discountInput.value || discount < 0) {
        alert("❌ Discount must be a positive number!");
        discountInput.focus();
        return false;
    }

    // Validate quantity
    if (!quantityInput.value || quantity < 1) {
        alert("❌ Quantity must be at least 1!");
        quantityInput.focus();
        return false;
    }

    // Validate category
    if (!category) {
        alert("❌ Category is required!");
        categoryInput.focus();
        return false;
    }
    if (category.length < 2) {
        alert("❌ Category must be at least 2 characters long!");
        categoryInput.focus();
        return false;
    }

    return true;
}

// #####
// save function (create element , save to localstorage)

function saveFucntion () {
    // Validate inputs before saving
    if (!validateInputs()) {
        return;
    }

    let product = {
        id:Date.now(),
        title:titleInput.value.trim(),
        price:priceInput.value,
        taxes:taxesInput.value,
        ads:adsInput.value,
        discount:discountInput.value,
        quantity:quantityInput.value,
        category:categoryInput.value.trim(),
        finalprice:priceForElement.innerHTML,
        totalprice:allElementPrice.innerHTML
    }

    createElement(product);
    saveToLocalStorage(product);
}



// #######
// create the element function

function createElement(product) {

    const tableBody = document.getElementById("parent");

    // parent (tr)
    const parent = document.createElement("tr");
    parent.dataset.id = product.id;


    // title
    const title = document.createElement("td");
    title.classList.add("title");
    title.textContent = product.title;
    parent.append(title);

    // price
    const price = document.createElement("td");
    price.classList.add("price");
    price.textContent = product.price;
    parent.append(price);

    // taxes
    const taxes = document.createElement("td");
    taxes.classList.add("taxes");
    taxes.textContent = product.taxes;
    parent.append(taxes);

    // ads
    const ads = document.createElement("td");
    ads.classList.add("ads");
    ads.textContent = product.ads;
    parent.append(ads);

    // discount
    const discount = document.createElement("td");
    discount.classList.add("discount");
    discount.textContent = product.discount;
    parent.append(discount);

    // price for element
    const elementFinalPrice = document.createElement("td");
    elementFinalPrice.classList.add("priceforelement");
    elementFinalPrice.textContent = product.finalprice;
    parent.append(elementFinalPrice);

    // quantity
    const quantity = document.createElement("td");
    quantity.classList.add("quantity");
    quantity.textContent = product.quantity;
    parent.append(quantity);

    // price for all elements
    const finalTotal = document.createElement("td");
    finalTotal.classList.add("finaltotal");
    finalTotal.textContent = product.totalprice;
    parent.append(finalTotal);

    // category
    const category = document.createElement("td");
    category.classList.add("category");
    category.textContent = product.category;
    parent.append(category);


    // buttons//////
    // update
    const update = document.createElement("td");
    const updateButton = document.createElement("button");
    updateButton.classList.add("update");
    updateButton.innerHTML = "Update";
    update.append(updateButton);
    parent.append(update);

    // update button functionality 
    updateButton.addEventListener("click" , () => {
        updateFunction(product);
    })

    // delete
    const deleteTD = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = "Delete";
    deleteTD.append(deleteButton);
    parent.append(deleteTD);

    // delete button foncionality
    deleteButton.addEventListener("click" , () => {
        let deleteArray = JSON.parse(localStorage.getItem("products")) || [];
        deleteArray = deleteArray.filter((product) => product.id != parent.dataset.id);
        localStorage.setItem("products" , JSON.stringify(deleteArray));
        parent.remove();
    })


    tableBody.prepend(parent);

}

// ######
// function to save in local storage
function saveToLocalStorage(product) {
    let productsAraay = JSON.parse(localStorage.getItem("products")) || [];

    productsAraay.push(product);

    localStorage.setItem("products" , JSON.stringify(productsAraay));
}



// #####
// function to load from local storage

window.addEventListener("load" , () => {
    loadFromLocaStorage();
})

function loadFromLocaStorage() {
    let loadedArray = JSON.parse(localStorage.getItem("products")) || [];
    loadedArray.forEach(product => {
        createElement(product);
    })
}



// #####
// function to update
// infos : two function one to show the product detailles in the UI (inputs fields so that user can change on it)
// and second one to update in localstorage and the UI will be reload and showed the new detialles based on the update in the local storage

let productId = null;

function updateFunction(product) {

    // fill the inputs with product detailles
    titleInput.value = product.title;
    priceInput.value = product.price;
    taxesInput.value = product.taxes;
    adsInput.value = product.ads;
    discountInput.value = product.discount;
    quantityInput.value = product.quantity
    categoryInput.value = product.category;
    priceForElement.textContent = product.finalprice;
    allElementPrice.textContent = product.totalprice;
    // to share the id with the updatelocalstorage fucntion
    productId = product.id;


    addButton.innerHTML = "Save";
    
}

function updateInLocalStorage(id) {

        let updatesArray = JSON.parse(localStorage.getItem("products")) || [];
        updatesArray = updatesArray.map((ele) => {

            if(ele.id == id) {

                ele.title = titleInput.value;
                ele.price = priceInput.value;
                ele.taxes = taxesInput.value;
                ele.ads = adsInput.value;
                ele.discount = discountInput.value;
                ele.quantity = quantityInput.value;
                ele.category = categoryInput.value;
                ele.finalprice = priceForElement.textContent;
                ele.totalprice = allElementPrice.textContent;
            }

            return ele
        });

        localStorage.setItem("products" , JSON.stringify(updatesArray));
}
// //////////



// get action buttons
const addButton = document.getElementById("submit");


addButton.addEventListener("click" , () => {
    
    if(addButton.innerHTML === "Add") {
        saveFucntion();
        showToast("Operation done successfully", "success");
    } else {
        // Validate inputs before updating
        if (!validateInputs()) {
            return;
        }
        updateInLocalStorage(productId);
        document.getElementById("parent").textContent = "";
        loadFromLocaStorage();
        addButton.innerHTML = "Add";
        allTotalInputs.forEach(input => {
            input.value = "";
        })
    }
    allTotalInputs.forEach(input => {
        input.value = "";
    })
    document.querySelectorAll(".totalpriceinputes").forEach(span => {
        span.textContent = 0;
    })
    showToast("Operation done successfully", "success");
});



// ######
// search future functionality

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input" , () => {
    let searchValue = searchInput.value.toLowerCase();
    let serachByArray = JSON.parse(localStorage.getItem("products")) || [];

    serachByArray = serachByArray.filter(product => {
        return (
            product.title.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue)
        )
    });

    document.getElementById("parent").textContent = "";

    serachByArray.forEach(productEle => {
        createElement(productEle);
    });
});



// ####
// small pop-up function
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
