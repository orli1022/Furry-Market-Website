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

// eventArea

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const prevMonth = document.querySelector(".prevMonth");
const nextMonth = document.querySelector(".nextMonth");
const monthNames = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
];
const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

function createCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1); // 當月第一天
    const lastDay = new Date(currentYear, currentMonth + 1, 0); // 當月最後一天
    const startingDay = firstDay.getDay(); // 當月第一天是星期幾
    const monthLength = lastDay.getDate(); // 當月總天數

    // 顯示月份
    const monthDisplay = document.getElementById("monthDisplay");
    monthDisplay.textContent = `${currentYear}年 ${monthNames[currentMonth]}`;

    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    // 星期幾的header
    weekdays.forEach(weekday => {
        const weekdayDiv = document.createElement("div");
        weekdayDiv.classList.add("weekday");
        weekdayDiv.textContent = weekday;
        calendar.appendChild(weekdayDiv);
    });

    // 添加月份第一天之前的空白格子
    for (let i = 0; i < startingDay; i++) {
        const dayDiv = document.createElement("div");
        calendar.appendChild(dayDiv);
    }

    // 當月所有日期
    const today = new Date();
    for (let i = 1; i <= monthLength; i++) {
        const dayDiv = document.createElement("div");
        const day = document.createElement("div");
        day.textContent = i;
        day.classList.add("day");

        // 顯示當天
        if (
            today.getDate() === i &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear
        ) {
            day.classList.add("current-day");
        }

        dayDiv.appendChild(day);
        calendar.appendChild(dayDiv);
    }
}

// 上個月
prevMonth.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        // 月份<0，切換到上一年的12月
        currentMonth = 11;
        currentYear--;
    }
    createCalendar();
});

// 下個月
nextMonth.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        // 月份>11，切換到下一年的1月
        currentMonth = 0;
        currentYear++;
    }

    createCalendar();
});

createCalendar();

// Swiper.js

let newsSwiper; // newsArea
let footerSwiper; // footerArea

function initNewsSwiper() {
    // 初始化 Swiper
    newsSwiper = new Swiper(".newsSwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
            delay: 3000 // 每3秒切換下一張
        },
        loop: true // 循環
    });
}

function initFooterSwiper() {
    footerSwiper = new Swiper(".footerSwiper", {
        autoplay: {
            delay: 2000
        },
        loop: true,
        breakpoints: {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 50
            },
            0: {
                slidesPerView: 1
            }
        }
    });
}

function checkWindowSize() {
    // 檢查視窗大小
    if (window.innerWidth <= 1200) {
        if (!newsSwiper) {
            initNewsSwiper(); // 初始化newsSwiper
        }
        if (!footerSwiper) {
            initFooterSwiper(); // 初始化footerSwiper
        }
    } else {
        // destroy swiper
        if (newsSwiper) {
            newsSwiper.destroy(true, true); // 清除swiper instance, clean style 重置
            newsSwiper = null;
        }
        if (footerSwiper) {
            footerSwiper.destroy(true, true);
            footerSwiper = null;
        }
    }
}

checkWindowSize(); // 載入網頁就先檢查

window.addEventListener("resize", checkWindowSize); // 檢查視窗大小
