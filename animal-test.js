// Teachable Machine Image Model logic for Image Upload
const ANIMAL_MODEL_URL = "https://teachablemachine.withgoogle.com/models/GKiYsiOmx/";

let animalModel, labelContainer, maxPredictions;

// Load the model once on page load or first use
async function loadAnimalModel() {
    if (!animalModel) {
        const modelURL = ANIMAL_MODEL_URL + "model.json";
        const metadataURL = ANIMAL_MODEL_URL + "metadata.json";
        animalModel = await tmImage.load(modelURL, metadataURL);
        maxPredictions = animalModel.getTotalClasses();
    }
}

async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const uploadBtn = document.getElementById("upload-btn");
    const previewContainer = document.getElementById("image-preview-container");
    const previewImage = document.getElementById("image-preview");
    
    uploadBtn.disabled = true;
    uploadBtn.textContent = "Analyzing...";

    // Show preview
    const reader = new FileReader();
    reader.onload = async function(e) {
        previewImage.src = e.target.result;
        previewContainer.style.display = "block";
        
        // Ensure model is loaded
        await loadAnimalModel();
        
        // Predict
        await predictImage(previewImage);
        
        uploadBtn.disabled = false;
        uploadBtn.textContent = "Upload Another Image";
    };
    reader.readAsDataURL(file);
}

async function predictImage(imageElement) {
    const prediction = await animalModel.predict(imageElement);
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = ''; // Clear previous results

    for (let i = 0; i < maxPredictions; i++) {
        const probability = (prediction[i].probability * 100).toFixed(0);
        const className = prediction[i].className;

        const container = document.createElement("div");
        container.className = "prediction-bar-container";
        container.style.marginBottom = "10px";
        
        const bar = document.createElement("div");
        bar.className = "prediction-bar";
        bar.style.width = probability + "%";
        
        const text = document.createElement("span");
        text.className = "prediction-text";
        text.innerHTML = `${className}: ${probability}%`;
        
        // Highlight logic
        if (prediction[i].probability > 0.5) {
            bar.style.backgroundColor = "var(--bitcoin-color)";
        } else {
            bar.style.backgroundColor = "var(--subtitle-color)";
        }

        container.appendChild(bar);
        container.appendChild(text);
        labelContainer.appendChild(container);
    }
}
