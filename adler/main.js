//Skript für Adlerweg

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const title1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");

//console.log("Breite="breite, "Länge="laenge, "Titel="titel);

//Karte initialisieren
let karte = L.map("map");
//console.log(karte);

//auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);

const kartenLayer = {
        osm: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
        }), 
        geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
            attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    })
}; 

    //kartenlayer.osm.addTo(karte)
    kartenLayer.geolandbasemap.addTo(karte); 


        //Positionmaker 1 setzen
        let pin1 = L.marker(
            [breite1, laenge1]
        ).addTo(karte);

        //Popup zum Pin hängen
        pin1.bindPopup(title1).openPopup();

        //Positionmaker 2 setzen
        let pin2 = L.marker(
            [breite2, laenge2]
        ).addTo(karte);

        //Popup zum Pin hängen
        pin2.bindPopup(titel2).openPopup();


        for (let blick of ADLERBLICKE) {
            console.log(blick);
            let blickpin = L.marker(
                [blick.lat, blick.lng]
            ).addTo(karte);
            blickpin.bindPopup(
                `<h1>Standort ${blick.standort}</h1>
        <p>Höhe: ${blick.seehoehe}</p>
        <em> Kunde: ${blick.kunde}</em>`
            )
        }