const breeds = require('../data/breeds.json')

const breedTemplate = (breed) => ` <option value="${breed}">${breed}</option>`

const allBreedsTemplate = breeds.map(breedTemplate)

module.exports = {
    allBreedsTemplate
}