const images = document.querySelectorAll(".cert-grid img");

images.forEach(img => {
  img.addEventListener("click", () => {
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.8)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.innerHTML = `<img src="${img.src}" style="max-width:90%;border-radius:10px">`;

    modal.onclick = () => modal.remove();
    document.body.appendChild(modal);
  });
});
