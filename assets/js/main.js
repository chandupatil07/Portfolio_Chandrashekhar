/* ==========================================
   INTERACTIVE PORTFOLIO ENGINE (MAIN.JS)
   Author: Chandrashekhar Patil (Redesigned)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initMouseGlowBlobs();
  initGlassCardShine();
  initCertificateModal();
  initContactForm();
  initProjectFilter();
});

/* 1. INTERSECTION OBSERVER FOR SCROLL REVEALS */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Option to unobserve after reveal
        // observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // viewport
    threshold: 0.15, // trigger when 15% visible
    rootMargin: "0px 0px -50px 0px" // trigger slightly before entering screen
  });
  
  revealElements.forEach((el) => observer.observe(el));
}

/* 2. DYNAMIC INTERACTIVE BACKGROUND MOUSE BLOBS */
function initMouseGlowBlobs() {
  // Create decorative dynamic blobs programmatically to keep index.html clean
  const body = document.body;
  const blob1 = document.createElement("div");
  const blob2 = document.createElement("div");
  
  blob1.className = "glow-blob blob-1";
  blob2.className = "glow-blob blob-2";
  
  body.appendChild(blob1);
  body.appendChild(blob2);
  
  // Track mouse coordinates to move blobs gently
  window.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Slow interpolation movement for premium feel
    blob1.style.transform = `translate(${x * 0.03}px, ${y * 0.03}px)`;
    blob2.style.transform = `translate(${-x * 0.02}px, ${-y * 0.02}px)`;
  });
}

/* 3. CARD HOVER SHINE EFFECTS */
function initGlassCardShine() {
  const cards = document.querySelectorAll(".glass-card");
  
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside element
      const y = e.clientY - rect.top;  // y position inside element
      
      // Update background with light flare gradient on cursor coordinates
      card.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, rgba(6, 182, 212, 0.12), rgba(15, 23, 42, 0.45))`;
    });
    
    card.addEventListener("mouseleave", () => {
      // Revert to static design color
      card.style.background = "var(--bg-card)";
    });
  });
}

/* 4. PREMIUM CERTIFICATE ZOOM MODAL */
function initCertificateModal() {
  const certWrappers = document.querySelectorAll(".cert-img-wrapper");
  
  certWrappers.forEach((wrapper) => {
    const img = wrapper.querySelector("img");
    if (!img) return;
    
    wrapper.addEventListener("click", () => {
      // Build sleek modal overlay
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100%";
      overlay.style.height = "100vh";
      overlay.style.background = "rgba(3, 7, 18, 0.9)";
      overlay.style.backdropFilter = "blur(10px)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "9999";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.3s ease";
      
      const modalImg = document.createElement("img");
      modalImg.src = img.src;
      modalImg.style.maxWidth = "90%";
      modalImg.style.maxHeight = "80vh";
      modalImg.style.borderRadius = "12px";
      modalImg.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      modalImg.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.7)";
      modalImg.style.transform = "scale(0.95)";
      modalImg.style.transition = "transform 0.3s ease";
      
      overlay.appendChild(modalImg);
      document.body.appendChild(overlay);
      
      // Lock scroll
      document.body.style.overflow = "hidden";
      
      // Animate opening
      setTimeout(() => {
        overlay.style.opacity = "1";
        modalImg.style.transform = "scale(1)";
      }, 50);
      
      // Close triggers
      overlay.addEventListener("click", () => {
        overlay.style.opacity = "0";
        modalImg.style.transform = "scale(0.95)";
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = "auto";
        }, 300);
      });
    });
  });
}

/* 5. FUNCTIONAL CONTACT FORM ACTION */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    const originalText = btn.innerHTML;
    
    // Quick sending animation
    btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    btn.style.pointerEvents = "none";
    
    // Create FormData from the form element (automatically packages all inputs with name attributes)
    const formData = new FormData(form);
    
    // Send form data asynchronously using FormSubmit's AJAX endpoint
    fetch("https://formsubmit.co/ajax/chandupatil0711@gmail.com", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("FormSubmit response not OK: " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      btn.innerHTML = 'Success! <i class="fas fa-check"></i>';
      btn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      form.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = "var(--accent-gradient)";
        btn.style.pointerEvents = "all";
      }, 3000);
    })
    .catch(error => {
      console.warn("Form submit failed, falling back to standard submit:", error);
      // Fallback: If AJAX fetch is blocked/fails, submit via traditional form POST
      form.action = "https://formsubmit.co/chandupatil0711@gmail.com";
      form.method = "POST";
      
      // Ensure hidden fields exist for redirect
      let redirectInput = form.querySelector("input[name='_next']");
      if (!redirectInput) {
        redirectInput = document.createElement("input");
        redirectInput.type = "hidden";
        redirectInput.name = "_next";
        redirectInput.value = window.location.href;
        form.appendChild(redirectInput);
      }
      
      // Let the form submit naturally
      form.submit();
    });
  });
}

/* 6. INTERACTIVE PROJECT ROLE-BASED FILTER */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  
  if (filterBtns.length === 0) return;
  
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active states on filter buttons
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filterValue = btn.getAttribute("data-filter");
      
      projectCards.forEach(card => {
        const cardRoles = card.getAttribute("data-roles");
        
        if (filterValue === "all") {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else if (cardRoles && cardRoles.split(" ").includes(filterValue)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300); // matches CSS card transition timing
        }
      });
    });
  });
}
