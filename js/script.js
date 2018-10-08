// API

fetch('https://randomuser.me/api/?results=10')
.then(function(response) {
    return response.json();
})
.then(function(data) { 
    addPersonToStorage(data);
    showPerson(data);
    
});

let addPersonToStorage = function(data) {

    let persons = [];
    
    for (i = 0; i < data.results.length; i++) {
 
        let person = {
            img: data.results[i].picture.large,
            name: data.results[i].name.first,
            last_name: data.results[i].name.last,
            age: data.results[i].dob.age,
            gender: data.results[i].gender,
            nationality: data.results[i].nat
        }

        JSON.parse(localStorage.getItem("persons"))
        persons.push(person);
    }

    localStorage.setItem("persons", JSON.stringify(persons));
}

let showPerson = function(data) {
    let putInCard = document.querySelector('.card');
    let tempStr = "";
    let i = 0;

    tempStr += `
        <div class="personClass">
            <img class="personPicture" src="${ data.results[i].picture.large }"></img>
            <h2 class="personName">${ data.results[i].name.first + ' ' + data.results[i].name.last }</h2>
            <p class="personEmail">${ data.results[i].email }</p>
            <p class="personAge">${ data.results[i].dob.age }</p>
            <p class="personGender">${ data.results[i].gender }</p>
            <p class="personNat">${ data.results[i].nat }</p>
            <button class="like">Like</button>
            <button class="dislike">Dislike</button>
        </div>
    `
    putInCard.innerHTML = tempStr;
}