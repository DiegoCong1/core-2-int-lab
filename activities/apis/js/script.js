        const apiKey = "live_2UiXKuqOKkmS60ksCWHYIDNk16PglSObT8na1FP3lJn84CLcr2bSIuYFLkMPS13y";
        const newDogButton = document.getElementById("new-dog-button");
        const dogImage = document.getElementById("dog-image");

        function fetchDogImage() {
            fetch("https://api.thedogapi.com/v1/images/search", {
                headers: {
                    "x-api-key": apiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                const imageUrl = data[0].url;
                dogImage.src = imageUrl;
            });
        }

        newDogButton.addEventListener("click", fetchDogImage);
