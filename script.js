const token = "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";
const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    try {
        image.src = "/Loading1.gif";
        const response = await fetch(
            "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"  // Ensure the content type is set to JSON
                },
                method: "POST",
                body: JSON.stringify({ "inputs": inputTxt.value })
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.blob();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

button.addEventListener('click', async function () {
    try {
        const response = await query();
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL;
    } catch (error) {
        console.error('Error processing request:', error);
        // Display a user-friendly message
        image.src = "";
        alert('An error occurred while processing your request. Please try again later.');
    }
});
