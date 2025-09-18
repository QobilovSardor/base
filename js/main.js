// JS
const modal = document.querySelector(".modal");
const openModalBtn = document.querySelector(".open-modal__btn");
const closeModalBtn = document.querySelector(".modal-close");

// modalni ochish
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// modalni yopish
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// tashqarisiga bosilganda yopish
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Escape bosilganda yopish
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
  }
});
