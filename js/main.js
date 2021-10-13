var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var btnAdd = document.getElementById("btnAdd");
var udpataBtn = document.getElementById("udpataBtn");
var rows = document.getElementById("rows");
var btnDelete;
var btnUpdata;

var productObject = {};
var productContainerArra;
var count1;

if (localStorage.getItem("productArray") == null) {
    productContainerArra = [];
} else {
    productContainerArra = JSON.parse(localStorage.getItem("productArray"));
    displayFunc();
}
// /////////////////////////////////////////////////////////////Events-------------------------------

btnAdd.addEventListener("click", addProductFunc);

udpataBtn.addEventListener("click", updateBtn);

// /////////////////////////////////////////////////////////////Funs-------------------------------

function addProductFunc() {
    productObject = {
        prodName: productName.value,
        prodCategory: productCategory.value,
        prodPrice: productPrice.value,
        proddesc: productDescription.value
    }
    productContainerArra.push(productObject);
    // /////////////////////////////////local storage
    localStorage.setItem("productArray", JSON.stringify(productContainerArra));
    clearFunc();
    displayFunc();
}

function displayFunc() {
    var cartoona = "";
    for (var i = 0; i < productContainerArra.length; i++) {
        cartoona += `    <tr>
        <td>` + (i + 1) + `</td>
        <td>` + productContainerArra[i].prodName + `</td>
        <td>` + productContainerArra[i].prodCategory + `</td>
        <td>` + productContainerArra[i].prodPrice + `</td>
        <td>` + productContainerArra[i].proddesc + `</td>
        <td><button onclick="deleteFunc(` + i + `)" class=" btnDelete btn btn-danger">Delete</button></td>
        <td><button onclick="updateFunc(` + i + `), countFunc(` + i + `)" class=" btnUpdata btn btn-warning">Updata</button></td>
    </tr>`
    }
    rows.innerHTML = cartoona;
    btnDelete = document.getElementsByClassName("btnDelete");
    btnUpdata = Array.from(document.getElementsByClassName("btnUpdata"));
}

function deleteFunc(index) {
    productContainerArra.splice(index, 1);
    localStorage.setItem("productArray", JSON.stringify(productContainerArra));
    displayFunc();
}

function updateFunc(index) {
    productName.value = productContainerArra[index].prodName;
    productDescription.value = productContainerArra[index].proddesc;
    productPrice.value = productContainerArra[index].prodPrice;
    productCategory.value = productContainerArra[index].prodCategory;
    udpataBtn.style.display = "block";
    btnAdd.style.display = "none";
    // //////////////////////////////////////////disabled////////////////////////
    btnDelete[index].setAttribute("disabled", true);
    btnUpdata[index].setAttribute("disabled", true);

}

function updateBtn() {
    productObject = {
        prodName: productName.value,
        prodCategory: productCategory.value,
        prodPrice: productPrice.value,
        proddesc: productDescription.value
    }
    productContainerArra.splice(count1, 1, productObject);
    localStorage.setItem("productArray", JSON.stringify(productContainerArra));
    udpataBtn.style.display = "none";
    btnAdd.style.display = "block";
    displayFunc();
    clearFunc();
}

function countFunc(index) {
    count1 = index;
    return count1;
}

function clearFunc() {
    productName.value = "";
    productDescription.value = "";
    productPrice.value = "";
    productCategory.value = "";
}

function searchFunc(term) {
    var cartoona = ``;
    for (i = 0; i < productContainerArra.length; i++) {
        if (productContainerArra[i].prodName.toLocaleLowerCase().includes(term.toLocaleLowerCase()) == true || productContainerArra[i].prodCategory.toLocaleLowerCase().includes(term.toLocaleLowerCase()) == true || productContainerArra[i].prodPrice.includes(term) == true) {
            cartoona += `    <tr>
            <td>` + (i + 1) + `</td>
            <td>` + productContainerArra[i].prodName + `</td>
            <td>` + productContainerArra[i].prodCategory + `</td>
            <td>` + productContainerArra[i].prodPrice + `</td>
            <td>` + productContainerArra[i].proddesc + `</td>
            <td><button onclick="deleteFunc(` + i + `)" class=" btnDelete btn btn-danger">Delete</button></td>
            <td><button onclick="updateFunc(` + i + `), countFunc(` + i + `)" class=" btnUpdata btn btn-warning">Updata</button></td>
        </tr>`
        }
    }
    rows.innerHTML = cartoona;
}