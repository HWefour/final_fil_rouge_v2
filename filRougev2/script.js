/* // Récupérer les informations du Session Storage
const nomEquipe = JSON.parse(sessionStorage.getItem("nomEquipe"));
const paysEquipe = JSON.parse(sessionStorage.getItem("paysEquipe"));
const anneeFondation = JSON.parse(sessionStorage.getItem("anneeFondation"));
const logoEquipe = JSON.parse(sessionStorage.getItem("logoEquipe"));
const nomStade = JSON.parse(sessionStorage.getItem("nomStade"));
const villeStade = JSON.parse(sessionStorage.getItem("villeStade"));
const capaciteStade = JSON.parse(sessionStorage.getItem("capaciteStade"));
 */
function test() {
  fetch("data.json").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function (json) {
        console.log(json.championnats[0]);
        for (var i = 0; i < json.championnats.length; i++) {
          for (var j = 0; j < json.championnats[i].team.length; j++) {
            console.log(json.championnats[i].team[j]["name"]);
            for (var k = 0; k < json.championnats[i].team[j].news.length; k++) {
              console.log(json.championnats[i].team[j].news[k].wiki);
            }
          }
        }
      });
    } else {
      console.log("Oops, nous n'avons pas du JSON!");
    }
  });
}
test();

function genererNews(id_team) {
  
  fetch("data.json").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function (json) {
        for (var i = 0; i < json.championnats.length; i++) {
          for (var j = 0; j < json.championnats[i].team.length; j++) {
            if (json.championnats[i].team[j].id === id_team) {
              for (
                var k = 0;
                k < json.championnats[i].team[j].news.length;
                k++
              ) {
                console.log(json.championnats[i].team[j].news[k].wiki);
              }
            }
          }
        }
      });
    } else {
      console.log("Oops, nous n'avons pas du JSON!");
    }
  });
}

function genererInformations(id_team) {
 
  fetch("data.json").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function (json) {
        for (var i = 0; i < json.championnats.length; i++) {
          for (var j = 0; j < json.championnats[i].team.length; j++) {
            if (json.championnats[i].team[j].id === id_team) {
              for (
                var k = 0;
                k < json.championnats[i].team[j].info.length;
                k++
              ) {
                console.log(json.championnats[i].team[j].info[k].venue.name);
              }
            }
          }
        }
      });
    } else {
      console.log("Oops, nous n'avons pas du JSON!");
    }
  });
}

function genererSquad(id_team) {
  
  let players = [];
  fetch("data.json").then(function (response) {
    var contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then(function (json) {
        for (var i = 0; i < json.championnats.length; i++) {
          for (var j = 0; j < json.championnats[i].team.length; j++) {
            if (json.championnats[i].team[j].id === id_team) {
              for (
                var k = 0;
                k < json.championnats[i].team[j].players.length;
                k++
              ) {
                // console.log(json.championnats[i].team[j].players[k].player.name);
                players.push(
                  json.championnats[i].team[j].players[k].player.name
                );
              }
              sessionStorage.setItem("players", JSON.stringify(players));
              //window.location.href = "../squad.html"; 
            }
          }
        }
      });
    } else {
      console.log("Oops, nous n'avons pas du JSON!");
    }
  });
}
function afficherInfoEquipe() {
  // Récupérer les données du fichier JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Récupérer les informations de l'équipe Atalanta
      const equipe = data.championnats[0].team[0];
      const nomEquipe = equipe.name;
      const paysEquipe = equipe.country;
      const anneeFondation = equipe.founded;
      const logoEquipe = equipe.logo;
      const nomStade = equipe.info[0].venue.name;
      const villeStade = equipe.info[0].venue.city;
      const capaciteStade = equipe.info[0].venue.capacity;
     /*   // Stocker les informations dans le Session Storage
      sessionStorage.setItem("nomEquipe", nomEquipe);
      sessionStorage.setItem("paysEquipe", paysEquipe);
      sessionStorage.setItem("anneeFondation", anneeFondation);
      sessionStorage.setItem("logoEquipe", logoEquipe);
      sessionStorage.setItem("nomStade", nomStade);
      sessionStorage.setItem("villeStade", villeStade);
      sessionStorage.setItem("capaciteStade", capaciteStade);
      // Rediriger l'utilisateur vers la page squad.html
      window.location.href = "../squad.html"; */

      // Créer des éléments HTML pour afficher les informations
      const container = document.createElement("div");
      const titre = document.createElement("h1");
      titre.textContent = nomEquipe;
      const logo = document.createElement("img");
      logo.src = logoEquipe;
      const infoEquipe = document.createElement("p");
      infoEquipe.textContent = `Pays : ${paysEquipe} | Année de fondation : ${anneeFondation}`;
      const infoStade = document.createElement("p");
      infoStade.textContent = `Stade : ${nomStade} (${villeStade}) | Capacité : ${capaciteStade}`;

      // Ajouter les éléments au conteneur
      container.appendChild(titre);
      container.appendChild(logo);
      container.appendChild(infoEquipe);
      container.appendChild(infoStade);

      // Ajouter le conteneur à la page HTML
      document.body.appendChild(container);
    })
    .catch((error) => console.error(error));
}

let clubbtn = document.getElementById("btn-club");

clubbtn.addEventListener("click" , function () {
  afficherInfoEquipe();
});
