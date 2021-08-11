'use strict';


//from w3schools
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



Donator.prototype.randomAge = function () {
    this.age.push(random(this.min, this.max))
    saveDataToStorage();
}




function Donator(name, donation) {
    this.name = name;
    this.donation = donation;
    this.age = [];
    this.min = 20;
    this.max = 60;
    Donator.all.push(this);

}

Donator.all = [];



let form = document.getElementById('form');

form.addEventListener('submit', submitter);

function submitter(event) {
    event.preventDefault();


    let newName = event.target.namefield.value;
    let newDonation = parseInt(event.target.amount.value);


    let newDonator = new Donator(newName, newDonation)

    newDonator.randomAge();
    newDonator.tableHeader();
    newDonator.tableBody();
    saveDataToStorage();
    form.removeEventListener('submit', submitter);
}



function saveDataToStorage() {
    let stringArr = JSON.stringify(Donator.all);
    localStorage.setItem('donator', stringArr);


}


function getDataFromStorage() {
    let data = localStorage.getItem('donator');
    let parsedArr = JSON.parse(data);
    if (parsedArr !== null) {
        for (let i = 0; i < parsedArr.length; i++) {
            let addedDonator = new Donator(parsedArr[i].name, parsedArr[i].donation);
        }

    }

}



Donator.prototype.tableHeader = function () {

    let table = document.getElementById('parent');
    let fisrtTr = document.createElement('tr');
    table.appendChild(fisrtTr);

    let firstTh = document.createElement('th');
    fisrtTr.appendChild(firstTh);
    firstTh.textContent = 'Donator Name';

    let secondTH = document.createElement('th');
    fisrtTr.appendChild(secondTH);
    secondTH.textContent = 'Donation Amount'

    let thirdTh = document.createElement('th');
    fisrtTr.appendChild(thirdTh);
    thirdTh.textContent = " Donator Age";

}



Donator.prototype.tableBody = function () {

    let table = document.getElementById('parent');

    for (let i = 0; i < Donator.all.length; i++) {
        let secondTr = document.createElement('tr');
        table.appendChild(secondTr);

        let firstTd = document.createElement('td');
        secondTr.appendChild(firstTd);
        firstTd.textContent = Donator.all[i].name;

        let secondTd = document.createElement('td');
        secondTr.appendChild(secondTd);
        secondTd.textContent = Donator.all[i].donation;

        let thirdTd = document.createElement('td');
        secondTr.appendChild(thirdTd);
        thirdTd.textContent = Donator.all[i].age;

    }

}













getDataFromStorage();