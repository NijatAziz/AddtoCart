document.addEventListener("DOMContentLoaded", function () {
  let devicestr = localStorage.getItem("device");
  let device = JSON.parse(devicestr);
 
  if (!device || !device.length) {
    localStorage.setItem("device", JSON.stringify([]));
  } else {
    ShowProductCount(device);
    ShowTotalPrice(device);
  }
});

let buttons = document.querySelectorAll(".add_cart");

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let device = JSON.parse(localStorage.getItem("device"));
    if (!device) {
      localStorage.setItem("device", JSON.stringify([]));
      device = JSON.parse(localStorage.getItem("device"));
    }
    let product = GetProductsData(this);
    console.log(product);
    let sameid = device.find((pro) => {
      return pro.id == product.id;
    });
    if (!sameid) {
      device.push(product);
    } else {
      sameid.count++;
    }
    ShowTotalPrice(device);
    ShowProductCount(device);
    let devicestr = JSON.stringify(device);
    localStorage.setItem("device", devicestr);
  });
});

function GetProductsData(product) {
  let parent = product.parentElement.parentElement;
  console.log(parent);
  let title = parent.querySelector(".title").innerHTML;
 
  let src = parent.querySelector("img").src;
  let id = parent.getAttribute("data-id");
  let price = parent.querySelector(".price").innerHTML;
  result = { title, src, id, price, count: 1 };
  return result;
}

let cart = document.querySelectorAll(".cart");
let ul = document.querySelectorAll(".box_device");
let ulparent = document.querySelectorAll(".box");
let exitbtn = document.querySelectorAll(".exitbutton");

let emptytitle = document.querySelectorAll(".device_empty_title");
cart.forEach((crt) => {
  crt.addEventListener("click", function (product) {
    document.body.style.overflowY = "hidden";
    ulparent.forEach((ule) => {
      ule.classList.add("active");
    });
    let device = JSON.parse(localStorage.getItem("device"));

    ul.forEach((ll) => {
      ll.innerHTML = " ";
    });

    device.forEach((devices) => {
      let task = `
      <li style="cursor: pointer;" id="${devices.id}">
     <div class="d-flex">
       <div class="cart_image">
      <img src="${devices.src}" alt="">
        </div>
        <div class="info ">
       <span>${devices.count}</span>
       <span class="me-1 ms-1">x</span>
       <span>${devices.title}</span>
       <p>${devices.price}$</p>
       </div>
    </div>
    <div>
      
      </div>
      <div class="del_btn" >
        <i  class="fa-solid fa-trash" 
        
        
    ></i>
      </div>
      </li>
      `;
      ul.forEach((ll) => {
        ll.innerHTML += task;
      });
    });
    let delbtn = document.querySelectorAll(".del_btn");

    delbtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        let li = this.parentElement;
        let id = li.getAttribute("id");
        device = device.filter((dev) => dev.id != id);
        li.remove();
        ShowTotalPrice(device);
        ShowProductCount(device);
        localStorage.setItem("device", JSON.stringify(device));
        EmptyShow(device);
      });
    });
    EmptyShow(device);
  });
});

exitbtn.forEach((ext) => {
  ext.addEventListener("click", function () {
    ulparent.forEach((ule) => {
      ule.classList.remove("active");
    });
    document.body.style.overflowY = "scroll";
  });
});

function ShowTotalPrice(device) {
  let totals = document.querySelectorAll(".total_price");
  totals.forEach((tt) => {
    tt.innerHTML = device.reduce((total, product) => {
      return Math.trunc((total += parseFloat(product.price) * product.count));
    }, 0);
  });
}

function ShowProductCount(device) {
  let deviceCount = document.querySelectorAll(".count");
  deviceCount.forEach((dvc) => {
    dvc.innerText = device.reduce((total, product) => {
      return Math.trunc((total += product.count));
    }, 0);
  });
}
