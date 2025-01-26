document.addEventListener("DOMContentLoaded", function () {
  if (!document.body.classList.contains("single-work")) {
    return;
  }

  const modal = document.createElement("div");
  modal.id = "img-viewer";

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", function () {
    document.body.style.overflow = null;
    modal.style.display = "none";
  });
  modal.appendChild(closeBtn);

  const img = document.createElement("img");
  img.classList.add("modal-content");
  modal.appendChild(img);

  document.body.appendChild(modal);

  const featuredImage = document.querySelector(
    ".wp-block-post-featured-image img"
  );

  if (!featuredImage) {
    return;
  }

  featuredImage.addEventListener("click", function () {
    img.src = featuredImage.src;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});
