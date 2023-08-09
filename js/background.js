const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img"); //img라는 엘리멘트를 추가시켜주는 소스

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage); //바디에 추가하는 소스