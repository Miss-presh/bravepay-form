const galleries = [
  ["images/Splash screen.png", "images/Onboarding 11.png", "images/Login.jpg"],
  ["images/home.jpg", "images/Support Page.jpg", "images/Notification.png"],
  ["images/logofeatures.jpg", "images/stats.png", "images/Business Tools.jpg"]
];

let currentGallery = 0;
let currentIndex = 0;
let autoSlideInterval;

const screenFrame = document.getElementById("screenFrame");
const screen = document.getElementById("screenContent");

function changeGallery(index) {
  currentGallery = index;
  currentIndex = 0;
  updateScreen();
  resetAutoSlide(); // Restart auto-slide when switching gallery
}

function updateScreen() {
  screen.style.backgroundImage = `url('${galleries[currentGallery][currentIndex]}')`;
}

function nextImage() {
  const images = galleries[currentGallery];
  currentIndex = (currentIndex + 1) % images.length;
  updateScreen();
}

function prevImage() {
  const images = galleries[currentGallery];
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateScreen();
}

// Swipe detection
let startX = null;

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  if (startX === null) return;
  let endX = e.changedTouches[0].clientX;
  let diff = startX - endX;

  if (diff > 50) {
    nextImage();
    resetAutoSlide();
  } else if (diff < -50) {
    prevImage();
    resetAutoSlide();
  }

  startX = null;
}

screen.addEventListener("touchstart", handleTouchStart);
screenFrame.addEventListener("touchstart", handleTouchStart);
screen.addEventListener("touchend", handleTouchEnd);
screenFrame.addEventListener("touchend", handleTouchEnd);

// Auto-slide function
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextImage();
  }, 5000); // 5 seconds
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Initial load
updateScreen();
startAutoSlide(); // Start auto-slide on load
