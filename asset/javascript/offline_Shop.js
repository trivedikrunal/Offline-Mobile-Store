document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("#createProductForm");
    let updateForm = document.querySelector("#updateProductForm");
    let updateCustomerForm = document.querySelector("#updateCustomerForm");
    let productList = document.querySelector(".productList");
    let historyList = document.querySelector(".historyList");
    let updateHistoryList = document.querySelector(".updateHistoryList");
    let updateFormContainer = document.querySelector(".updateFormContainer");
    let updateCustomerFormContainer = document.querySelector(".updateCustomerFormContainer");
    let customerForm = document.querySelector("#createCustomerForm");
    let customerList = document.querySelector(".customerList");
    let customerHistoryList = document.querySelector(".customerHistoryList");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let mobileName = event.target.mobileName.value;
            let mobileQuantity = event.target.mobileQuantity.value;
            let mobilePrice = event.target.mobilePrice.value;
            let checkMobileName = 0;

            let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];

            for (let v of mobileData) {
                if (v.mobileName === mobileName) {
                    checkMobileName = 1;
                    break;
                }
            }

            if (checkMobileName === 1) {
                alert("Mobile Name Already Exists");
            } else {
                let newProduct = {
                    mobileName: mobileName,
                    mobileQuantity: parseInt(mobileQuantity),
                    mobilePrice: mobilePrice
                };

                mobileData.push(newProduct);

                localStorage.setItem("mobileDetails", JSON.stringify(mobileData));

                addToHistory(newProduct);

                event.target.reset();
            }
            displayDataShow();
        });
    }

    if (customerForm) {
        customerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            let customerName = event.target.customerName.value;
            let customerEmail = event.target.customerEmail.value;
            let customerMobile = event.target.customerMobile.value;

            let customerData = JSON.parse(localStorage.getItem("customerDetails")) ?? [];

            let newCustomer = {
                customerName: customerName,
                customerEmail: customerEmail,
                customerMobile: customerMobile
            };

            customerData.push(newCustomer);

            localStorage.setItem("customerDetails", JSON.stringify(customerData));

            addToCustomerHistory(newCustomer);

            event.target.reset();
            displayCustomerData();
        });
    }

    if (updateForm) {
        updateForm.addEventListener("submit", (event) => {
            event.preventDefault();

            let updateIndex = event.target.updateIndex.value;
            let newMobileName = event.target.updateMobileName.value;
            let newMobilePrice = event.target.updateMobilePrice.value;

            let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];

            let updatedProduct = {
                ...mobileData[updateIndex],
                mobileName: newMobileName,
                mobilePrice: newMobilePrice
            };

            mobileData[updateIndex] = updatedProduct;

            localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
            addToUpdateHistory(updatedProduct);
            displayDataShow();

            updateFormContainer.style.display = "none";
        });
    }

    if (updateCustomerForm) {
        updateCustomerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            let updateCustomerIndex = event.target.updateCustomerIndex.value;
            let newCustomerName = event.target.updateCustomerName.value;
            let newCustomerEmail = event.target.updateCustomerEmail.value;
            let newCustomerMobile = event.target.updateCustomerMobile.value;

            let customerData = JSON.parse(localStorage.getItem("customerDetails")) ?? [];

            let updatedCustomer = {
                ...customerData[updateCustomerIndex],
                customerName: newCustomerName,
                customerEmail: newCustomerEmail,
                customerMobile: newCustomerMobile
            };

            customerData[updateCustomerIndex] = updatedCustomer;

            localStorage.setItem("customerDetails", JSON.stringify(customerData));
            displayCustomerData();

            updateCustomerFormContainer.style.display = "none";
        });
    }

    let addToHistory = (product) => {
        let historyData = JSON.parse(localStorage.getItem("historyDetails")) ?? [];
        let currentTime = new Date().toLocaleString();

        historyData.push({
            product: product,
            time: currentTime
        });

        localStorage.setItem("historyDetails", JSON.stringify(historyData));
        displayHistory();
    }

    let addToUpdateHistory = (product) => {
        let updateHistoryData = JSON.parse(localStorage.getItem("updateHistoryDetails")) ?? [];
        let currentTime = new Date().toLocaleString();

        updateHistoryData.push({
            product: product,
            time: currentTime
        });

        localStorage.setItem("updateHistoryDetails", JSON.stringify(updateHistoryData));
        displayUpdateHistory();
    }

    let addToCustomerHistory = (customer) => {
        let customerHistoryData = JSON.parse(localStorage.getItem("customerHistoryDetails")) ?? [];
        let currentTime = new Date().toLocaleString();

        customerHistoryData.push({
            customer: customer,
            time: currentTime
        });

        localStorage.setItem("customerHistoryDetails", JSON.stringify(customerHistoryData));
        displayCustomerHistory();
    }

    let displayDataShow = () => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        let finalData = '';

        mobileData.forEach((element, i) => {
            finalData += `<tr>
                            <td>${element.mobileName}</td>
                            <td>${element.mobileQuantity}</td>
                            <td>${element.mobilePrice}</td>
                            <td>
                                <button onclick='removeData(${i})'>Delete</button>
                                <button onclick='openUpdateForm(${i})'>Update</button>
                            </td>
                          </tr>`;
        });

        if (productList) {
            productList.innerHTML = finalData;
        }
    }

    let displayCustomerData = () => {
        let customerData = JSON.parse(localStorage.getItem("customerDetails")) ?? [];
        let finalData = '';

        customerData.forEach((element, i) => {
            finalData += `<tr>
                            <td>${element.customerName}</td>
                            <td>${element.customerEmail}</td>
                            <td>${element.customerMobile}</td>
                            <td>
                                <button onclick='removeCustomer(${i})'>Delete</button>
                                <button onclick='openUpdateCustomerForm(${i})'>Update</button>
                            </td>
                          </tr>`;
        });

        if (customerList) {
            customerList.innerHTML = finalData;
        }
    }

    let displayHistory = () => {
        let historyData = JSON.parse(localStorage.getItem("historyDetails")) ?? [];
        let finalData = '';

        historyData.forEach((element, i) => {
            finalData += `<tr>
                            <td>${element.product.mobileName}</td>
                            <td>${element.product.mobileQuantity}</td>
                            <td>${element.product.mobilePrice}</td>
                            <td>${element.time}</td>
                            <td>
                                <button onclick='removeHistory(${i})'>Delete</button>
                            </td>
                          </tr>`;
        });

        if (historyList) {
            historyList.innerHTML = finalData;
        }
    }

    let displayUpdateHistory = () => {
        let updateHistoryData = JSON.parse(localStorage.getItem("updateHistoryDetails")) ?? [];
        let finalData = '';

        updateHistoryData.forEach((element, i) => {
            finalData += `<tr>
                            <td>${element.product.mobileName}</td>
                            <td>${element.product.mobilePrice}</td>
                            <td>${element.time}</td>
                            <td>
                                <button onclick='removeUpdateHistory(${i})'>Delete</button>
                            </td>
                          </tr>`;
        });

        if (updateHistoryList) {
            updateHistoryList.innerHTML = finalData;
        }
    }

    let displayCustomerHistory = () => {
        let customerHistoryData = JSON.parse(localStorage.getItem("customerHistoryDetails")) ?? [];
        let finalData = '';

        customerHistoryData.forEach((element, i) => {
            finalData += `<tr>
                            <td>${element.customer.customerName}</td>
                            <td>${element.customer.customerEmail}</td>
                            <td>${element.customer.customerMobile}</td>
                            <td>${element.time}</td>
                            <td>
                                <button onclick='removeCustomerHistory(${i})'>Delete</button>
                            </td>
                          </tr>`;
        });

        if (customerHistoryList) {
            customerHistoryList.innerHTML = finalData;
        }
    }

    let removeData = (index) => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        mobileData.splice(index, 1);
        localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
        displayDataShow();
    }

    let openUpdateForm = (index) => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        let product = mobileData[index];

        updateForm.updateIndex.value = index;
        updateForm.updateMobileName.value = product.mobileName;
        updateForm.updateMobilePrice.value = product.mobilePrice;

        updateFormContainer.style.display = "block";
    }

    let removeCustomer = (index) => {
        let customerData = JSON.parse(localStorage.getItem("customerDetails")) ?? [];
        customerData.splice(index, 1);
        localStorage.setItem("customerDetails", JSON.stringify(customerData));
        displayCustomerData();
    }

    let openUpdateCustomerForm = (index) => {
        let customerData = JSON.parse(localStorage.getItem("customerDetails")) ?? [];
        let customer = customerData[index];

        updateCustomerForm.updateCustomerIndex.value = index;
        updateCustomerForm.updateCustomerName.value = customer.customerName;
        updateCustomerForm.updateCustomerEmail.value = customer.customerEmail;
        updateCustomerForm.updateCustomerMobile.value = customer.customerMobile;

        updateCustomerFormContainer.style.display = "block";
    }

    let removeHistory = (index) => {
        let historyData = JSON.parse(localStorage.getItem("historyDetails")) ?? [];
        historyData.splice(index, 1);
        localStorage.setItem("historyDetails", JSON.stringify(historyData));
        displayHistory();
    }

    let removeUpdateHistory = (index) => {
        let updateHistoryData = JSON.parse(localStorage.getItem("updateHistoryDetails")) ?? [];
        updateHistoryData.splice(index, 1);
        localStorage.setItem("updateHistoryDetails", JSON.stringify(updateHistoryData));
        displayUpdateHistory();
    }

    let removeCustomerHistory = (index) => {
        let customerHistoryData = JSON.parse(localStorage.getItem("customerHistoryDetails")) ?? [];
        customerHistoryData.splice(index, 1);
        localStorage.setItem("customerHistoryDetails", JSON.stringify(customerHistoryData));
        displayCustomerHistory();
    }

    displayDataShow();
    displayHistory();
    displayUpdateHistory();
    displayCustomerData();
    displayCustomerHistory();

    window.removeData = removeData;
    window.openUpdateForm = openUpdateForm;
    window.removeHistory = removeHistory;
    window.removeUpdateHistory = removeUpdateHistory;
    window.removeCustomer = removeCustomer;
    window.openUpdateCustomerForm = openUpdateCustomerForm;
    window.removeCustomerHistory = removeCustomerHistory;
});

