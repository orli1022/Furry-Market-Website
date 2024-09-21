// menuArea

let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    let bannerArea = document.querySelector(".bannerArea").offsetHeight;
    let scrollY = window.scrollY;

    if (scrollY >= bannerArea) {
        // 黏在視窗最上面
        header.style.position = "sticky";
        header.style.top = "-1px";
    } else {
        header.style.position = "relative";
        header.style.top = "auto";
    }
});

// infoArea

// max-width: 768px
let number = 0; // 從第一個開始
const infoBoxes = document.querySelectorAll(".info-box");
const totalBoxes = infoBoxes.length;

const infoChangeOne = () => {
    // 一次只顯示一個info
    infoBoxes.forEach(box => box.classList.remove("active"));
    infoBoxes[number].classList.add("active");

    number = (number + 1) % totalBoxes; // 循環
};

// min-width: 768px && max-width: 1200px
let index = 2; // 從最後一個開始
const infoChangeTwo = () => {
    infoBoxes.forEach(box => (box.style.display = "block"));
    infoBoxes[index].style.display = "none"; // 隱藏

    index = (index + 1) % totalBoxes;
};

let isExecuted = false; // 紀錄是否將最後一個infoBox隱藏, 避免重複隱藏
let intervalId; // 儲存 setInterval 的 id

const startChangeInfo = () => {
    clearInterval(intervalId); // 清除之前的定時器, 避免定時器同時啟用

    if (window.matchMedia("(max-width: 768px)").matches) {
        infoBoxes.forEach(box => (box.style.display = "block")); // 避免在視窗切換時, 有infoBox被隱藏
        intervalId = setInterval(infoChangeOne, 3000);
        isExecuted = false;
    } else if (
        window.matchMedia("(min-width: 769px) and (max-width: 1200px)").matches
    ) {
        if (!isExecuted) {
            // 檢查最後一個infoBox是否被隱藏
            infoBoxes[2].style.display = "none"; // 隱藏
            isExecuted = true;
        }
        intervalId = setInterval(infoChangeTwo, 3000);
    } else {
        infoBoxes.forEach(box => (box.style.display = "block"));
        isExecuted = false;
    }
};

startChangeInfo();
window.addEventListener("resize", startChangeInfo); // 當視窗大小改變時重新檢查

// photoArea

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const photoBoxes = document.querySelectorAll(".photo-box");
const totalphotoBoxes = photoBoxes.length;

let photoIndex = 0;

prevBtn.addEventListener("click", () => {
    if (photoIndex <= 0) {
        // 避免負數出現
        photoIndex = totalphotoBoxes - 1;
    } else {
        photoIndex = (photoIndex - 1) % totalphotoBoxes; // 上一張照片
    }
    setPhoto();
});

nextBtn.addEventListener("click", () => {
    photoIndex = (photoIndex + 1) % totalphotoBoxes; // 下一張照片
    setPhoto();
});

function setPhoto() {
    photoBoxes.forEach(box => box.classList.remove("active"));
    photoBoxes[photoIndex].classList.add("active");
}
