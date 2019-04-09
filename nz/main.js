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
const kartenLayer = {
osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"],
    attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`
}),
stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
    subdomains: ["a", "b", "c"] , 
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.', 
}),
stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
    subdomains:  ["a", "b", "c"] , 
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.', 
}),
stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
    subdomains:  ["a", "b", "c"] , 
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.', 
}),
};

kartenLayer.osm.addTo(karte);

//Auswahlmenü hinzufügen
L.control.layers({
    "Toner": kartenLayer.stamen_toner, 
    "Terrain": kartenLayer.stamen_terrain, 
    "Watercolor": kartenLayer.stamen_watercolor, 

}).addTo(karte); 

//Fullscreen  
karte.addControl(new L.Control.Fullscreen());

//Mit Mausklick koordinaten anzeigen
let coords = new L.Control.Coordinates(); 
coords.addTo(karte); 
karte.on('click', function(e) {
	coords.setCoordinates(e);
});

//Positionmaker setzen
let pin = L.marker (
    [breite,laenge]
).addTo(karte);

//Popup zum Pin hängen
pin.bindPopup(titel).openPopup();

//position karte speichern
let hash = new L.Hash(karte);
