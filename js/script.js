const like = document.getElementById("like");
const dislike = document.getElementById('dislike');
const likeList = document.getElementsByClassName("likedList")[0];
const dislikeList = document.getElementsByClassName('dislikedList')[0];
let id = 0;
let count = 0;


function runData() {
    fetch('https://randomuser.me/api/?results=10')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) { 
        addPersons(data); 
        showPerson(id);
    });
}

function addPersons(data) {
    data.results.forEach((person, id) => {
        let personCard = {
            id: id,
            img: person.picture.large,
            first_name: person.name.first,
            last_name: person.name.last,
            age: person.dob.age,
            gender: person.gender,
            nationality: person.nat,
            status: null
        }

        save(id, personCard);
    });
    console.log(data);
}

function showPerson(id) {
    let person = JSON.parse(localStorage.getItem(id));
    
    let putInCard = document.querySelector('.person');
    let tempStr = "";

    tempStr += `
        <div class="personClass">
            <img class="personPicture" src="${ person.img }"></img>
            <h2 class="personName">${ person.first_name + ' ' + person.last_name }</h2>
            <p class="personAge">${ person.age }</p>
            <p class="personGender">${ person.gender }</p>
            <p class="personNat">${ person.nationality }</p> 
        </div>
    `;
    putInCard.innerHTML = tempStr;
}

function checkCount() {
    if(count > 9) {
        count = 0;
        runData()
        showPerson(id);
    } else {
        count++;
        console.log('count: ' + count);
        showPerson(id);
    }
}

function showList() {
    
        populateList("liked"); 
    
};

function populateList(status) {
    let person = JSON.parse(localStorage.getItem(id));
    if(person.status === status) {
        likeList.innerHTML += `
            <div class="personList">
                <h1>${ person.first_name }</h1>
            </div>
        `;
    } else {
        dislikeList.innerHTML += `
            <div class="personList">
                <h1>${ person.first_name }</h1>
            </div>  
        `;
    }
    
};

function changeStatus(status){
    let person = JSON.parse(localStorage.getItem(id));
    person.status = status;
    save(id, person);
    id++;
    console.log('id: ' + id);
    checkCount();
    showList();
    console.log(person.status);
};

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

like.addEventListener("click", () => {
    changeStatus("liked");
});

dislike.addEventListener("click", () => {
    changeStatus("disliked");
});

window.addEventListener('load', () => {
    runData(); 
});
