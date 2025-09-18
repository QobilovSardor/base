const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".header .nav");
const menuBtnIcon = document.querySelector(".menu-btn img");

const burgerIcon = "/images/burger.svg";
const closeIcon = "/images/close.svg";

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");

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
const contactForm = document.getElementById("contactForm");
const submitBtn = contactForm.querySelector("button[type='submit']");

const openModal = () => {
  modal.classList.remove("hidden");
  setTimeout(() => modalContent.classList.add("active"), 10);
};

const closeModal = () => {
  modalContent.classList.remove("active");
  setTimeout(() => modal.classList.add("hidden"), 300);
};

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalContent.classList.contains("active")) {
    closeModal();
  }
});

const inputs = contactForm.querySelectorAll("input[name]");
const checkFormValidity = () => {
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });
  submitBtn.disabled = !isValid;
};

inputs.forEach((input) => input.addEventListener("input", checkFormValidity));

checkFormValidity();

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  const data = {
    chat_id: "6277848912",
    name: formData.get("name"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    comment: formData.get("comment"),
  };

  try {
    const response = await fetch("https://ninety.uz/tourist-center/request/", {
      method: "POST",
      body: new URLSearchParams(data),
    });

    const result = await response.json();

    if (result.status === "success") {
      openModal();

      setTimeout(() => {
        closeModal();
      }, 2000);

      contactForm.reset();
      checkFormValidity();
    } else {
      alert("❌ Ошибка: " + result.message);
    }
  } catch (err) {
    alert("⚠️ Сеть или серверда xatolik");
  }
});
