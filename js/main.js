const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.header .nav');
const menuBtnIcon = document.querySelector(".menu-btn img");

// icon manzillari (o'zingdagi fayl nomiga qarab sozlab ol)
const burgerIcon = "/images/burger.svg";
const closeIcon = "/images/close.svg";

menuBtn.addEventListener("click", () => {
  nav.classList.toggle('active');

  // navda active class bor-yo'qligini tekshiramiz
  if (nav.classList.contains("active")) {
    menuBtnIcon.src = closeIcon;
  } else {
    menuBtnIcon.src = burgerIcon;
  }
});

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const openModalBtn = document.querySelector(".open-modal__btn");
const closeModalBtn = document.querySelector(".modal-close");

// elementlar borligini tekshirish (ishlayotgan muhitda konsolga ogohlantirish beradi)
if (!modal || !modalContent || !openModalBtn) {
  console.warn("Modal elementlari topilmadi.");
}

// modalni ochish
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");

  // kichik kechikish: browser .hidden ni olib tashlaganini sezadi va transition ishlaydi
  setTimeout(() => {
    modalContent.classList.add("active");
  }, 10);
});

// yopish funksiyasi (contentga active olib tashlanadi, so'ngra modal yashiriladi)
const closeModal = () => {
  modalContent.classList.remove("active");

  // CSS transition vaqtiga mos keltiring (masalan 300ms)
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
};

// close tugmasi
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

// tashqarisiga bosilganda yopish
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Escape bosilganda yopish
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalContent.classList.contains("active")) {
    closeModal();
  }
});
