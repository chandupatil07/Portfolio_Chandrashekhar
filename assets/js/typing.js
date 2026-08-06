/* ==========================================
   TYPING ROTATOR LOGIC
   Author: Chandrashekhar Patil (Redesigned)
   ========================================== */

const titles = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Software Engineer",
  "Data Scientist",
  "Data Engineer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  const currentTitle = titles[titleIndex];
  
  if (isDeleting) {
    // Remove characters
    typingElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add characters
    typingElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }
  
  // Speed control
  let typingSpeed = isDeleting ? 40 : 80;
  
  // Check for completion
  if (!isDeleting && charIndex === currentTitle.length) {
    // Pause at full text
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    // Move to next title
    titleIndex = (titleIndex + 1) % titles.length;
    typingSpeed = 500;
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Start typing animation on load
document.addEventListener("DOMContentLoaded", () => {
  if (typingElement) {
    typeEffect();
  }
});
