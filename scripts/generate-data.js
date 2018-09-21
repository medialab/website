const faker = require('faker');
const uuid = require('uuid/v4');

const SIZE = 1000;

// Generate a mass of fake people
const PEOPLE = [];
for (let i = 0; i < SIZE; i++) {
  PEOPLE.push({
    id: uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    bio: '<p>The most impressive bio evaaaa.</p>'
  });
}

console.log(JSON.stringify({people: PEOPLE}, null, 2));
