/* Wien OGD Beispiele */

let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

karte.addControl(new L.Control.Fullscreen());

karte.setView([48.208333, 16.373056], 12);

// die Implementierung der Karte startet hier

//Daten werden von dieser Seite bezogen
const url = ' https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD &srsName=EPSG:4326&outputFormat=json'

//Marker anders gestalten
function makeMarker(feature, latlng) {
    const fotoicon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/sehenswuerdigogd.svg',
        iconSize: [16, 16]
    });
    const sightMarker = L.marker(latlng, {
        icon: fotoicon //Marker ein icon geben sonst normaler blauer Standardmarker
    });
    //Variable innerhalb der Funktion:
    sightMarker.bindPopup(`
    <h3>${feature.properties.NAME}</h3>
    <p>${feature.properties.BEMERKUNG}</p>
    <hr>
    <footer><a target=blanc href="${feature.properties.WEITERE_INF}">Weblink</a></footer>
    `);
    return sightMarker;
}

//Funktion asynchoner Prozess, auf Daten warten und dann umwandeln in json + Cluster für Marker bilden (vorher im html eingearbeitet)
async function loadSights(url) {
    const sehenswuerdigkeitenClusterGruppe = L.markerClusterGroup();
    const response = await fetch(url);
    const sightsData = await response.json();
    const geoJson = L.geoJson(sightsData, {
        pointToLayer: makeMarker
    });
    sehenswuerdigkeitenClusterGruppe.addLayer(geoJson);
    karte.addLayer(sehenswuerdigkeitenClusterGruppe);
    //Layer zur Kontrollstation oben rechts (ein- und ausschalten) hinzufügen
    layerControl.addOverlay(sehenswuerdigkeitenClusterGruppe, "Sehnswürdigkeiten");

    //Search Plugin einfügen
    const suchFeld = new L.Control.Search({
        layer: sehenswuerdigkeitenClusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false //innerhalb der ganzen eichenkette wird Begriff gesucht --> Davor nur am Satzanfang gesucht
    });
    karte.addControl(suchFeld);
}

loadSights(url);

//Maßstab einbauen
const massstab = L.control.scale({
    imperial: false,
    metric: true,
});
karte.addControl(massstab);

//Spazierwege hinzufügen
const wege = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERLINIEOGD &srsName=EPSG:4326&outputFormat=json'

//Popup an den Linien anheften
function linienPopup(feature, layer) {
    const popup = `
    <h3>${feature.properties.NAME}</h3>
    `;
    layer.bindPopup(popup);
}

async function loadWege(wegeUrl) {
    const response = await fetch(wegeUrl)
    const wegeData = await response.json();
    const wegeJson = L.geoJson(wegeData, {
        //Wegenetz grün färben
        style: function () {
            return {
                color: "green"
            };
        },
        //Linienpopup
        onEachFeature: linienPopup
    });
    karte.addLayer(wegeJson);
    layerControl.addOverlay(wegeJson, "Spazierwege");
}
loadWege(wege);

//Einbauen WLAN
//Daten werden von dieser Seite bezogen
const wlan = 'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WLANWIENATOGD&srsName=EPSG:4326&outputFormat=json'

//Marker anders gestalten
function makewlan(feature, latlng) {
    const wlanicon = L.icon({
        iconUrl: 'http://www.data.wien.gv.at/icons/wlanwienatogd.png',
        iconSize: [16, 16]
    });


    const wlanMarker = L.marker(latlng, {
        icon: wlanicon //Marker ein icon geben sonst normaler blauer Standardmarker
    });

    //Variable innerhalb der Funktion:
    wlanMarker.bindPopup(`
    <h3>${feature.properties.NAME}</h3>
    <p>${feature.properties.ADRESSE}</p>
    <hr>
    <footer><a target=blanc href="${feature.properties.WEITERE_INF}">Weblink</a></footer>
    `);
    return wlanMarker;
}


//Funktion asynchoner Prozess, auf Daten warten und dann umwandeln in json + Cluster für Marker bilden (vorher im html eingearbeitet)
async function loadwlan(wlan) {
    const wlanClusterGruppe = L.markerClusterGroup();
    const wlanresponse = await fetch(wlan);
    const wlanData = await wlanresponse.json();
    const wlangeoJson = L.geoJson(wlanData, {
        pointToLayer: makewlan
    });

    //Clustergruppe 
    wlanClusterGruppe.addLayer(wlangeoJson);
    karte.addLayer(wlanClusterGruppe);
    //Layer zur Kontrollstation oben rechts (ein- und ausschalten) hinzufügen
    layerControl.addOverlay(wlanClusterGruppe, "WLAN");
}
//Laden loadwlan außerhalb der Funktion
loadwlan(wlan);


async function wikipediaArtikelLaden(url) { //Url die in Funktion verwendet wird hat keine Verbidnung mit anderen Urls
    console.log("Lade", url);
    const antwort = await fetch(url);
    const jsonDaten = await antwort.json();

    console.log(jsonDaten);
    for (let artikel of jsonDaten.geonames) {
        const wikipediaMarker = L.marker([artikel.lat, artikel.lng], { //geschwungene Klammer für icon)
            icon: L.icon({
                iconUrl: "images/wikipediaArtikelLaden.png",
                iconSize: [22, 22]
            })
        }).addTo(karte);

        //Marker einfügen
        wikipediaMarker.bindPopup(`
    <h3>${artikel.title}</h3>
     <hr>
    <p>${artikel.summary}</p>
    <footer><a target="_blank" href="https://${artikel.wikipediaUrl}">Weblink</a></footer>
     `);
    }
}
//Wikipedia Artikel 
//http://api.geonames.org/wikipediaBoundingBoxJSON?formatted=true&north=44.1&south=-9.9&east=-22.4&west=55.2&username=webmapping&style=full

karte.on("click", function () {
    console.log("Karte geladen", karte.getBounds());

    let ausschnitt = {
        n: karte.getBounds().getNorth(),
        s: karte.getBounds().getSouth(),
        o: karte.getBounds().getEast(),
        w: karte.getBounds().getWest(),
    }
    console.log(ausschnitt);
    const geonamesUrl = `http://api.geonames.org/wikipediaBoundingBoxJSON?formatted=true&north=${ausschnitt.n}&south=${ausschnitt.s}&east=${ausschnitt.o}&west=${ausschnitt.w}&username=webmapping&style=full&maxRows=5`;

    console.log(geonamesUrl);

    //Json Artikel laden
    wikipediaArtikelLaden(geonamesUrl); //Funktion aufrufen und oben laden

});