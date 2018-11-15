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
        console.log(count);
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

let liked = [];
let disliked = [];

function populateList(status) {
    
    let person = JSON.parse(localStorage.getItem(id - 1));

    if( localStorage.getItem("liked") ) {
        let liked = JSON.parse(localStorage.getItem("liked"));
    } else {
        let liked = [];
    }

    if( localStorage.getItem("disliked") ) {
        let liked = JSON.parse(localStorage.getItem("disliked"));
    } else {
        let disliked = [];
    }

    if(person.status === status) {
        likeList.innerHTML += `
            <div class="personList">
                <h1>${ person.first_name }</h1>
            </div>
        `;
        liked.push(person);
        save('liked', liked);
        console.log(liked);
    } else {
        dislikeList.innerHTML += `
            <div class="personList">
                <h1>${ person.first_name }</h1>
            </div>  
        `;
        disliked.push(person);
        save('disliked', disliked);
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

const replace = document.querySelectorAll('.dropzone');

(function () {
    document.addEventListener('dragstart', dragStart);
    document.addEventListener('drop', dragDrop);
    document.addEventListener('dragend', dragEnd, false);
    document.addEventListener('dragover', dragOver, false);
  })();
  
  function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
    e.target.style.opacity = .3;
    e.dataTransfer.dropEffect = "move";
    console.log('start');
  } 
  
  function dragDrop(e) {
    e.preventDefault();
  
    // only drop on dropzones
    if (e.toElement.className === "dropzone") {
      let data = e.dataTransfer.getData("text");
      e.target.appendChild(document.getElementById(data));
      console.log(data);
    }
    console.log('drop');
  }

  function dragEnd(e) {
    e.target.style.opacity = "";
    console.log('end');
  }
  
  function dragOver(e) {
    e.preventDefault();
    console.log('over');
  }


  // Mapbox

  mapboxgl.accessToken = 
  "pk.eyJ1Ijoic2ltb2RlbWUyIiwiYSI6ImNqb2dhZGliajA2Mm8zcHM2bnYzaXcyNHgifQ.ku1ga-pHa4P2na52olONjA";

  if ("geolocation" in navigator) {
    console.log('Works');
  } else {
    console.log('Does not work');
  }

  let map = new mapboxgl.Map({
    container: 'map', // HTML container id
    style: 'mapbox://styles/mapbox/streets-v9', // style URL
    center: [-21.9270884, 64.1436456], // starting position as [lng, lat]
    zoom: 13
  });

  let marker = new mapboxgl.Marker()
    .setLngLat([-21.9270884, 64.1436456])
    .addTo(map);