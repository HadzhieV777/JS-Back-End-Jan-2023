const breeds = require("../data/breeds.json");
const cats = require("../data/cats.json");
const path = require("path");

// Breeds template
const breedTemplate = (breed) => ` <option value="${breed}">${breed}</option>`;

const allBreedsTemplate = breeds.map(breedTemplate);

// Cats template
const catTemplate = (cat) => `<li data-id="${cat.id}">
    <img src="${path.join("/content/images/" + cat.image)}" alt="Cat">
    <h3>${cat.name}</h3>
    <p><span>Breed: </span>${cat.breed}</p>
    <p><span>Description: </span>${cat.description}</p>
    <ul class="buttons">
        <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
        <li class="btn delete"><a href="/cats-find-new-home/${
          cat.id
        }">New Home</a></li>
    </ul>
</li>`;

const allCatsTemplate = cats.map(catTemplate).join("");

module.exports = {
  allBreedsTemplate,
  allCatsTemplate
};
