document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("#createProductForm");
    let updateForm = document.querySelector("#updateProductForm");
    let productList = document.querySelector(".productList");
    let historyList = document.querySelector(".historyList");
    let updateHistoryList = document.querySelector(".updateHistoryList");
    let updateFormContainer = document.querySelector(".updateFormContainer");

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

    let displayDataShow = () => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        let finalData = '';

        mobileData.forEach((element, i) => {
            finalData += `<tr>
                            <td>${element.mobileName}</td>
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

    displayDataShow();
    displayHistory();
    displayUpdateHistory();
    window.removeData = removeData;
    window.openUpdateForm = openUpdateForm;
    window.removeHistory = removeHistory;
    window.removeUpdateHistory = removeUpdateHistory;
});
