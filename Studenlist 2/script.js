"use strict";

document.addEventListener("DOMContentLoaded", start);
function start() {
  // Sæt array for alle studerende
  let personer = [];
  // sætte en filter variable
  let filter = "alle";
  // Kunne ikke få min sort til at virke
  let sortby;
  document.querySelectorAll("#sort-by").forEach(option => {
    option.addEventListener("change", sortBy);
  });

  //sæt destinationen for json data
  let dest = document.querySelector("#students");
  let temp = document.querySelector("template");

  // Henter json
  async function getJson() {
    let jsonData = await fetch("http://petlatkea.dk/2019/students1991.json");
    personer = await jsonData.json();

    // forsøg på at sortere a - z
    personer.sort((a, b) => {
      return a.id - b.id;
    });
    visStudents();
  }

  // funktionen visStudents placerer json data i den templatet skrevet i string
  // Derudover besider den funktionen åbn som laver et pop-up ud fra en anden template
  function visStudents() {
    dest.innerHTML = "";
    personer.forEach(eachStudent => {
      if (filter == "alle" || filter == eachStudent.house) {
        let template = `<div class="vis">
<h2>${eachStudent.fullname}</h2><p class="kort">${eachStudent.house}</p>`;
        dest.insertAdjacentHTML("beforeend", template);
        dest.lastElementChild.addEventListener("click", åbn);
        function åbn() {
          document.querySelector("#indhold").innerHTML = `<div class="pop">
<h2>${eachStudent.fullname}</h2><img class="billede" src = "imgs/harry.jpg"><p>${eachStudent.house}</p>`;
          document.querySelector("#popup").style.display = "block";
        }
      }
    });
  }
  //function visStudens slut
  // Tilføjer en luk knap til popupen og en eventlistener på mine menupunktersom sender til filtrerings funktionen
  document.querySelector("#luk button").addEventListener("click", () => {
    document.querySelector("#popup").style.display = "none";
  });
  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filtrering);
  });
  // i filtrering funktionen tager den alle elementer med .filter classen og fjerner classen "valgt" fra alle, og til den bestemte knap man har trykket på.
  function filtrering() {
    filter = this.getAttribute("data-students");
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
      elm.classList.remove("valgt");
    });
    this.classList.add("valgt");
    visStudents();
  }

  // mit forgæves forsøg på at sortere de studerende :((((
  function sortBy() {
    sortby = this.value;
    console.log(sortby);

    if (sortby == "Firstname") {
      personer.sort(function(a, b) {
        return a.firstname.localCompare(b.firstname);
      });
    } else if (sortby == "Lastname") {
      console.log(sortering);

      personer.sort(function(a, b) {
        return a.lastname.localCompare(b.lastname);
      });
    } else if (sortby == "House") {
      console.log(sortering);

      personer.sort(function(a, b) {
        return a.house.localCompare(b.house);
      });
    } else if (sortby == "none") {
      start();
    }
  }

  getJson();
}
