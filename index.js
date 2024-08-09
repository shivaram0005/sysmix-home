document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.toggle_button');
  const navLinks = document.querySelector('.links-content');
  const ctaButton = document.querySelector('.navbar-button');

  toggleButton.addEventListener('click', () => {
      navLinks.classList.toggle('links-content');
      ctaButton.classList.toggle('navbar-button');
  });
});




// start of carousel-section
document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const items = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  let isDragging = false;
  let startX = 0;
  let offsetX = 0;

  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    document.querySelector('.carousel-inner').style.transform = `translateX(-${index * 100}%)`;
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  }

  function prevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showItem(currentIndex);
    });
  });

  let autoSlide = setInterval(nextItem,5000);

  const carouselInner = document.querySelector('.carousel-inner');

  carouselInner.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    offsetX = 0;
    clearInterval(autoSlide);
  });

  carouselInner.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    if (offsetX > 100) {
      prevItem();
    } else if (offsetX < -100) {
      nextItem();
    }
    autoSlide = setInterval(nextItem, 5000);
  });

  carouselInner.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    offsetX = e.clientX - startX;
  });

  carouselInner.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  // Initialize first slide display
  showItem(currentIndex);
});

//  end of carousel-section

