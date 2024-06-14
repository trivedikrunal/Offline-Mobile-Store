document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("#createProductForm");
    let productList = document.querySelector(".productList");
    let historyList = document.querySelector(".historyList");
    let updateHistoryList = document.querySelector(".updateHistoryList");

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

                // Add to history
                addToHistory(newProduct);

                event.target.reset();
            }
            displayDataShow();
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
            finalData += `<div class="item">
                            <div>Product Name:${element.mobileName}</div>
                            <div>Product Price:${element.mobilePrice}</div>
                            <button onclick='removeData(${i})'>Delete</button>
                            <button onclick='updateData(${i})'>Update</button>
                          </div>`;
        });

        if (productList) {
            productList.innerHTML = finalData;
        }
    }

    let displayHistory = () => {
        let historyData = JSON.parse(localStorage.getItem("historyDetails")) ?? [];
        let finalData = '';

        historyData.forEach((element, i) => {
            finalData += `<div class="item">
                            <div>Product Name: ${element.product.mobileName}</div>
                            <div>Product Quantity: ${element.product.mobileQuantity}</div>
                            <div>Product Price: ${element.product.mobilePrice}</div>
                            <div>Time: ${element.time}</div>
                            <button onclick='removeHistory(${i})'>Delete</button>
                          </div>`;
        });

        if (historyList) {
            historyList.innerHTML = finalData;
        }
    }

    let displayUpdateHistory = () => {
        let updateHistoryData = JSON.parse(localStorage.getItem("updateHistoryDetails")) ?? [];
        let finalData = '';

        updateHistoryData.forEach((element, i) => {
            finalData += `<div class="item">
                            <div>Product Name: ${element.product.mobileName}</div>
                            <div>Product Price: ${element.product.mobilePrice}</div>
                            <div>Time: ${element.time}</div>
                            <button onclick='removeUpdateHistory(${i})'>Delete</button>
                          </div>`;
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

    let updateData = (index) => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        let newMobileName = prompt("Enter new mobile name:", mobileData[index].mobileName);
        let newMobilePrice = prompt("Enter new mobile price:", mobileData[index].mobilePrice);

        if (newMobileName && newMobilePrice) {
            let updatedProduct = {
                ...mobileData[index],
                mobileName: newMobileName,
                mobilePrice: newMobilePrice
            };

            mobileData[index] = updatedProduct;

            localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
            addToUpdateHistory(updatedProduct);
            displayDataShow();
        }
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
    window.updateData = updateData;
    window.removeHistory = removeHistory;
    window.removeUpdateHistory = removeUpdateHistory;
});
