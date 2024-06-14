document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("form");
    let main = document.querySelector(".main");

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
                mobileData.push({
                    mobileName: mobileName,
                    mobileQuantity: parseInt(mobileQuantity),
                    mobilePrice: mobilePrice
                });

                localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
                event.target.reset();
            }
            displayDataShow();
        });
    }

    let displayDataShow = () => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        let finalData = '';
        mobileData.forEach((element, i) => {
            finalData += `<div class="item">
                            <span onclick='removeData(${i})'>&times;</span>
                            <h5>Mobile Name</h5>
                            <div>${element.mobileName}</div>
                            <h5>Mobile Quantity</h5>
                            <div>${element.mobileQuantity}</div>
                            <h5>Mobile Price</h5>
                            <div>${element.mobilePrice}</div>
                            <input type="number" id="addQnt${i}" placeholder="Enter Purchase Quantity">
                            <button onclick="checkMobileQuantity(${i})">Add to cart</button>
                          </div>`;
        });
        if (main) {
            main.innerHTML = finalData;
        }
    }

    let removeData = (index) => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        mobileData.splice(index, 1);
        localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
        displayDataShow();
    }

    let checkMobileQuantity = (index) => {
        let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
        let availableQuantity = mobileData[index].mobileQuantity;
        let currentQtn = parseInt(availableQuantity);
        let quantityInput = document.getElementById(`addQnt${index}`).value;
        let inputQtn = parseInt(quantityInput);

        if (quantityInput !== '' && inputQtn > 0) {
            if (inputQtn <= currentQtn) {
                currentQtn -= inputQtn;
                mobileData[index].mobileQuantity = currentQtn;
                localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
                displayDataShow();
            } else {
                alert("Out of stock");
            }
        } else {
            alert("Please fill in the quantity");
        }
    }

    displayDataShow();
    window.removeData = removeData;
    window.checkMobileQuantity = checkMobileQuantity;
});
