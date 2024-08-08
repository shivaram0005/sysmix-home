let currentSlideIndex = 0;
let isTransitioning = false;

function moveSlide(direction) {
    if (isTransitioning) return;

    const slides = document.querySelector('.slider');
    const totalSlides = slides.children.length;

    currentSlideIndex += direction;

    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }

    updateSlider();
}

function currentSlide(index) {
    const slides = document.querySelector('.slider');
    const totalSlides = slides.children.length;
    currentSlideIndex = index;

    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    } else if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }

    updateSlider();
}

function updateSlider() {
    if (isTransitioning) return;

    isTransitioning = true;

    const slides = document.querySelector('.slider');
    const totalSlides = slides.children.length;

    // Move the slider
    slides.style.transition = 'transform 0.5s ease-in-out';
    const offset = -currentSlideIndex * (slides.children[0].clientWidth + 20); // Adjust for margin
    slides.style.transform = `translateX(${offset}px)`;

    // Update card and background after transition
    setTimeout(() => {
        const currentSlide = slides.children[currentSlideIndex];
        const currentCard = currentSlide.querySelector('.card');

        slides.querySelectorAll('.card').forEach(card => card.classList.remove('card-expanded'));
        currentCard.classList.add('card-expanded');

        const background = currentSlide.getAttribute('data-background');
        document.body.style.backgroundImage = `url(${background})`;
        // background.style.position = "relative"

        const dots = document.querySelectorAll('.vertical-dots .dot');
        dots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                dot.classList.add('active');
                dot.querySelector('.number').style.display = 'block';
            } else {
                dot.classList.remove('active');
                dot.querySelector('.number').style.display = 'none';
            }
        });

        const title = currentSlide.querySelector('.card h3').innerText;
        const cardTitle = document.querySelector('.card-title');

        cardTitle.style.opacity = 0; // Start hidden
        cardTitle.style.transform = 'translateY(20px)'; // Start off-screen

        setTimeout(() => {
            cardTitle.innerText = title;
            cardTitle.style.opacity = 1; // Fade in
            cardTitle.style.transform = 'translateY(0)'; // Move to original position
        }, 300); // Delay to match the slider transition duration

        isTransitioning = false;
    }, 500); // Match this delay with the slider transition time
}

function initialize() {
    const initialCard = document.querySelector('.slider').children[currentSlideIndex].querySelector('.card');
    initialCard.classList.add('card-expanded');
    updateSlider();
}

initialize();
