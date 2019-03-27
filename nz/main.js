//Skript für Neuseelandreise

const div = document.getElementById ("map");
const breite = div.getAttribute ("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute ("data-title");

//console.log("Breite="breite, "Länge="laenge, "Titel="titel);

//Karte initialisieren
let karte = L.map("map");
//console.log(karte);

//auf Ausschnitt zoomen
karte.setView(
    [breite, laenge],
    13
);

//openstreetmap einbauen - s=server, z= zoom, x=laenge, y=breite
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png"). addTo(karte);

//Positionmaker setzen
let pin = L.marker (
    [breite,laenge]
).addTo(karte);

//Popup zum Pin hängen
pin.bindPopup(title).openPopup();
