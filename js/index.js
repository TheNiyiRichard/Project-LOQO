const modalTriggers = document.querySelectorAll("[data-v-target]");
const allModals = document.querySelectorAll("[data-v-id]");
const backdrop = document.querySelector(".v-backdrop");
const productsToSlide = document.querySelectorAll(".v-products-container .v-each-product");
const slideTogglers = document.querySelectorAll(".v-toggle-slide-container .v-slide-btn");

function removeActiveElement(element) {
	if (element) {
		backdrop.classList.remove("show");
		element.classList.remove("active");
	}
}
function addActiveElement(element) {
	if (element) {
		backdrop.classList.add("show");
		element.classList.add("active");
	}
}

function handleEachToggler(event) {
	event.stopPropagation();
	const target = this.getAttribute("data-v-target");
	if (target) {
		allModals.forEach((modal) => {
			const attr = modal.getAttribute("data-v-id");
			if (target === attr && !modal.classList.contains("active")) {
				addActiveElement(modal);
			} else {
				removeActiveElement(modal);
			}
		});
	}
}

function handleClickOutside() {
	document.addEventListener("click", function (event) {
		event.stopPropagation();
		allModals.forEach((modal) => {
			if (!modal.contains(event.target) && modal.classList.contains("active")) {
				removeActiveElement(modal);
			}
		});
	});
}

allModals.forEach((modal, _, arrayOfModals) => {
	const closeModalButton = modal.querySelector(".v-close-modal");
	closeModalButton.addEventListener("click", function () {
		arrayOfModals.forEach((m) => {
			removeActiveElement(m);
		});
	});
});

if (modalTriggers) {
	modalTriggers.forEach((modalToggler) => {
		modalToggler.addEventListener("click", handleEachToggler);
	});
}

function slideInOut(currentSlide) {
	productsToSlide.forEach((slide, slideIndex) => {
		if (slideIndex === currentSlide) {
			slide.classList.add("active");
		} else {
			slide.classList.remove("active");
		}
	});
}

if (slideTogglers) {
	let currentSlide = 0;
	slideTogglers.forEach((slidetoggle) => {
		const where = slidetoggle.getAttribute("data-where");
		if (where === "v-next") {
			slidetoggle.addEventListener("click", function () {
				currentSlide = currentSlide < productsToSlide.length - 1 ? currentSlide + 1 : 0;
				slideInOut(currentSlide);
			});
		}
		if (where === "v-prev") {
			slidetoggle.addEventListener("click", function () {
				currentSlide = currentSlide > 0 ? currentSlide - 1 : productsToSlide.length - 1;
				slideInOut(currentSlide);
			});
		}
	});
}

handleClickOutside();
