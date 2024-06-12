let form = document.querySelector("form");
console.log(form);
let main = document.querySelector(".main");
console.log(main);
form.addEventListener("button", (event) => {
    console.log(event);

    let mobileName = event.target.mobileName.value;
    let mobileQuntitity = event.target.mobileQuntitity.value;
    let mobilePrice = event.target.mobilePrice.value;
    let chackMobileName = 0;

    let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];

    for (let v of mobileData) {
        if (v.mobileName == mobileName) {
            chackMobileName = 1;
            break;
        }
    }

    if (chackMobileName == 1) {
        alert("Mobile Name Allready Exists")
    }
    else {

        mobileData.push({
            'mobileName': mobileName,
            'mobileQuntitity': parseInt(mobileQuntitity),
            'mobilePrice': mobilePrice
        });


        localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
        event.target.reset();
    }
    displayDataShow();
    event.preventDefault();

});





let displayDataShow = () => {
    let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
    let finalData = '';
    mobileData.forEach((element, i) => {



        finalData += ` <div class="item">

                                <span onclick='removeData(${i})'>&times;</span>

                                <h5>Mobile Name</h5>
                                <div>${element.mobileName}</div>

                                <h5>Mobile Quntitity</h5>
                                <div>${element.mobileQuntitity}</div>

                                <h5>Mobile Price</h5>
                                <div>${element.mobilePrice}</div>

                                <input type="number" id="addQnt" placeholder="Enter Purchas Quntitity"  >

                                <button onclick="chackMobileQntitity(${i})">Add to cart</button>
                                </div>`

    });
    main.innerHTML = finalData;

}

let removeData = (index) => {
    let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
    console.log(mobileData);
    mobileData.splice(index, 1);
    localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
    displayDataShow();
}


let chackMobileQntitity = (index) => {
    console.log(index);
    let mobileData = JSON.parse(localStorage.getItem("mobileDetails")) ?? [];
    console.log(mobileData);


    let avabilableQntitity = mobileData[index].mobileQuntitity;
    let currentQtn = parseInt(avabilableQntitity);
    console.log(currentQtn);

    console.log(typeof (currentQtn));


    let quntitityInput = document.getElementById("addQnt").value;
    let inputQtn = parseInt(quntitityInput);
    console.log(inputQtn);


    if (quntitityInput != '' && quntitityInput > 0) {
        if (quntitityInput <= mobileData[index].mobileQuntitity) {
            currentQtn = currentQtn - inputQtn

            mobileData[index].mobileQuntitity = currentQtn

            localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
            displayDataShow();
            console.log(currentQtn);





        }
        else {
            alert("Out up stock");


        }


    }
    else {
        alert("Plasec Fill Up Quntitity");



    }

    localStorage.setItem("mobileDetails", JSON.stringify(mobileData));
    displayDataShow();
}

displayDataShow();


// window.location.href = "purchace_Page.html";
// window.location.href = "create_Product.html";
