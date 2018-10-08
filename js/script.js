// API

fetch('https://randomuser.me/api/?results=10')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    

});

for (i = 0; i < data.results.length; i++) {

    let persons = [];
    let person = {
        name: data.results[i].name.first,
        last_name: data.results[i].name.last,
        email: data.results[i].email,
        age: data.results[i].dob.age,
        gender: data.results[i].gender,
        nationality: data.results[i].nat,
        img: data.results[i].picture.large
    }

    persons.push(person);
    console.log(person);

    let person_serialized = JSON.stringify(persons);
    localStorage.setItem("persons", person_serialized);
    let person_deserialized = JSON.parse(localStorage.getItem("persons"))

    let putInCard = document.querySelector('.card');
    let tempStr = "";

    tempStr += `
        <div class="personClass">
            <h2 class="personName">${ data.results[i].name.first + ' ' + data.results[i].name.last }</h2>
            <p class="personEmail">${ data.results[i].email }</p>
            <p class="personAge">${ data.results[i].dob.age }</p>
            <p class="personGender">${ data.results[i].gender }</p>
            <p class="personNat">${ data.results[i].nat }</p>
            <img class="personPicture" src="${ data.results[i].picture.large }"></img>
            <button id="like">Like</button>
            <button class="dislike">Dislike</button>
        </div>
    `

    putInCard.innerHTML = tempStr;
}

console.log((data.results));