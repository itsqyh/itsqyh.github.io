document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const photoDeck = document.querySelector(".photo-deck");
  const photoStack = document.querySelector(".photo-stack");
  const gallery = document.querySelector(".gallery");

  function setGalleryExpanded(expanded) {
    if (!photoDeck || !photoStack || !gallery) return;
    photoDeck.classList.toggle("is-expanded", expanded);
    photoStack.setAttribute("aria-expanded", String(expanded));
    gallery.setAttribute("aria-hidden", String(!expanded));
  }

  if (photoStack) {
    photoStack.addEventListener("click", () => {
      setGalleryExpanded(!photoDeck.classList.contains("is-expanded"));
    });
  }

  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("gallery-modal-img");
  const closeButton = document.querySelector(".gallery-close");

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".gallery-item").forEach((button) => {
    button.addEventListener("click", () => {
      if (photoDeck && !photoDeck.classList.contains("is-expanded")) return;

      const image = button.querySelector("img");
      if (!modal || !modalImage || !image) return;

      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
});
