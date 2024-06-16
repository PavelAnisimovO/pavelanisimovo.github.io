/*------------------------- Participants carousel --------------------------------------------*/

const prevNumber = document.querySelector('.prev_number');
const nextNumber = document.querySelector('.next_number');
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
const carousel = document.querySelector('.participants_carousel');
const sliders = document.querySelectorAll('.participants_carousel-card');
const sliderWidth = document.querySelector('.participants_carousel-card').offsetWidth;

let activeSlideIndex = 1;
let activeSlide = sliders[0];
let interval;

function initialCarouselValues() {
    nextNumber.textContent = (sliders.length).toString();
    prevNumber.textContent = '1';
    activeSlide.classList.add('active-slide');
    interval = setInterval(() => {
        nextButton.click();
    }, 4000);
}

initialCarouselValues();

const autoplay = () => {
    interval = setInterval(() => {
        nextButton.click();
    }, 4000);
}

function moveSlider() {
    if ((activeSlideIndex % sliders.length) !== 0) {
        prevNumber.textContent = (activeSlideIndex % sliders.length).toString();
        if(window.innerWidth > 1365) {
            carousel.style.transform = `translateX(-${((activeSlideIndex % sliders.length) - 1) * (sliderWidth + 20)}px)`;
            } else {
            carousel.style.transform = `translateX(-${((activeSlideIndex % sliders.length) - 1) * sliderWidth}px)`;
        }
    } else {
        prevNumber.textContent = (sliders.length).toString();
        if(window.innerWidth > 1365) {
            carousel.style.transform = `translateX(-${(activeSlideIndex - 1) * (sliderWidth + 20)}px)`;
        } else {
            carousel.style.transform = `translateX(-${(activeSlideIndex - 1) * sliderWidth}px)`;
        }
    }
}

nextButton.addEventListener('click', () => {
    if (activeSlideIndex > 0 && activeSlideIndex < sliders.length) {
        activeSlideIndex++;
        moveSlider();
    } else {
        activeSlideIndex = 1;
        moveSlider()
    }
});

prevButton.addEventListener('click', () => {
    if (activeSlideIndex > 1 && activeSlideIndex <= sliders.length) {
        activeSlideIndex--;
        moveSlider();
    } else {
        activeSlideIndex = sliders.length;
        moveSlider()
    }
});

carousel.addEventListener("mouseenter", () => clearInterval(interval));
carousel.addEventListener("mouseleave", () => autoplay());

/*------------------------- Stages carousel --------------------------------------------*/

const prevArrow = document.querySelector('.prev_arrow');
const nextArrow = document.querySelector('.next_arrow');
const paginationDots = document.querySelectorAll('.stages__section_pagination-dot');
const stagesItems = document.querySelectorAll('.stages__section_blocks-item');

let currentSlideIndex = 0;

prevArrow.classList.add('no-active');

let activeDot = paginationDots[0];
activeDot.classList.add('active');

prevArrow.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
    }
});

nextArrow.addEventListener('click', () => {
    if (currentSlideIndex < stagesItems.length - 1) {
        currentSlideIndex++;
        showSlide(currentSlideIndex)
    }
});

function showSlide(index) {
    stagesItems.forEach((item, i) => {
        item.classList.remove('active');
    });
    if (currentSlideIndex === 0) {
        prevArrow.classList.add('no-active');
    } else if (currentSlideIndex === stagesItems.length - 1) {
        nextArrow.classList.add('no-active');
    } else {
        prevArrow.classList.remove('no-active');
        nextArrow.classList.remove('no-active');
    }

    paginationDots.forEach((item, i) => {
        if (index === i) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })

    stagesItems[index].classList.add('active');
}

/*----------------------- Airplane animation ------------------------------------------*/

const sectionImage = document.querySelector('.stages__section_image');
const windowHeight = window.innerHeight;

if (window.innerWidth < 1366) {
    function calculatePosition(scrollY) {
        const scrollProgress = scrollY / windowHeight;
        return scrollProgress * 35 - 100;
    }

    function updateElementPosition() {
        const scrollY = window.scrollY;
        const position = calculatePosition(scrollY);
        sectionImage.style.right = `${position}%`;
    }
}

window.addEventListener('scroll', updateElementPosition);


/*-------------------------- Smooth scroll ---------------------------------------------*/

const links = document.querySelectorAll('.main__section_btns a');

links.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
