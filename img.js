const closeIcon = document.querySelector(".icon");
const shadow = document.querySelector(".shadow");
const select = document.getElementById("select");
const previewBox = document.querySelector(".preview-box");
const previewImg = previewBox.querySelector("img");
const currentImg = previewBox.querySelector(".current-img");
const totalImg = previewBox.querySelector(".total-img");

var gallery;

function filterImages(category) {
    const gallery = document.querySelectorAll(".image");
    gallery.forEach((image) => {
        const imageCategory = image.getAttribute("data-category");
        if (category === "All" || category === imageCategory) {
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
    });
}

function getValue() {
    const selectedCategory = select.value;
    filterImages(selectedCategory);
}

document.querySelector('.gallery').addEventListener("click", (event) => {
    let imageURL = event.target.src;
    previewImg.src = imageURL;
    previewBox.classList.add("show");
});

closeIcon.addEventListener("click", (event) => {
    event.stopPropagation(); // propagation to the preview box
    previewBox.classList.remove("show");
});

// Function to add a delete button to each image
function addDeleteButton(image) {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("lemon");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", (event) => {
        event.stopPropagation(); // propagation to the preview box
        if (image !== previewBox) {
            image.remove();
        }
    });
    image.appendChild(deleteButton);
}

// Add delete buttons to existing images
gallery.forEach((image) => {
    addDeleteButton(image);
});

function uploadImages(input) {
    if (input.files && input.files.length > 0) {
        for (let i = 0; i < input.files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newImage = document.createElement("div");
                newImage.classList.add("image");
                newImage.setAttribute('data-index', i);
                newImage.setAttribute("data-category", select.value);
                newImage.innerHTML = `<span><img src="${e.target.result}" alt=""></span>`;
                document.querySelector(".gallery").appendChild(newImage);
                addDeleteButton(newImage); // Add delete button to the new image
                filterImages(select.value); // Call filterImages after adding the image
            };
            reader.readAsDataURL(input.files[i]);
        }
    }
}
