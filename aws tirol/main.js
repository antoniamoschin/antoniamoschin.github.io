//Karte initialisieren
let karte = L.map("map");
//console.log(karte);

//Kartenlayer hinzufügen
const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpg", { //high DPI
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bbmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpg", { //Orthophoto
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpg", { //Gelände
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),

    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpg", { //Oberfläche
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at"> basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
};

kartenLayer.geolandbasemap.addTo(karte);

//Auswahlmenü hinzuügen: 
const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "OpenStreetMap": kartenLayer.osm,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bbmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapoberflaeche,
    "Toner": kartenLayer.stamen_toner,
    "Terrain": kartenLayer.stamen_terrain,
    "Watercolor": kartenLayer.stamen_watercolor,

}).addTo(karte);

// Wikipedia Koordinaten einfügen
karte.setView(
    [47.2672222, 11.392778], 15
);

//console.log(AWS); 

async function loadStations() {
    const response = await fetch("https:\\aws.openweb.cc/stations");
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            console.log("Layer:", layer);
            const date = new Date(layer.feature.properties.date);
            return `<h4>${layer.feature.properties.name}</h4>
            Höhe(m):${layer.feature.geometry.coordinates[2]}<br>
            Temperatur: ${layer.feature.properties.LT}°C <br>
            Datum: ${date.toLocaleDateString("de-AT")} 
            ${date.toLocaleTimeString("de-AT")} <br>
            Windgeschwindigkeit (km/h): 
            ${layer.feature.properties.WG ? layer.feature.properties.WG: 'keine Daten'}
            <hr>
            <footer>Land Tirol - <a href="https://data.tirol.gv.at"> data.tirol.gv.at </a> </footer>`;
        })
        .addTo(awsTirol);
    // awsTirol.addTo(karte); damit nur die Windrichtung am Anfang angezeigt wird

  
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstattionen Tirol");

     //Windrichtung anzeigen lassen 
    const windLayer = L.featureGroup(); 
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = 'black';
                if (feature.properties.WG > 20) {
                    color = 'red'; 
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color:${color}; transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-3x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung"); 
    // windLayer.addTo(karte); 

      //Temperaturlayer hinzufügen
      const temperaturLayer = L.featureGroup(); 
      const farbPalette = [
        [0, "blue"], 
        [1, "orange"], 
        [2, "red"]

      ];
      L.geoJson(stations, {
          pointToLayer: function (feature, latlng) {
              if (feature.properties.LT) {
                 let color = 'red'; 
                for (let i=0; i<farbPalette.length; i++){
                      console.log(farbPalette[i], feature.properties.LT); 
                      if (feature.properties.LT < farbPalette[i][0]){
                        color = farbPalette [i][1];
                        break; 
                      }
                  }
                  //let color = 'blue';
                  //if (feature.properties.LT > 0) {
                  //    color = 'red'; 
                  //}
                  return L.marker(latlng, {
                      icon: L.divIcon({
                          html: `<div class="temperaturLabel"style="background-color:${color}"> ${feature.properties.LT}</div>`
                      })
                  });
              }
          }
      }).addTo(temperaturLayer);
      layerControl.addOverlay(temperaturLayer, "Temperatur"); 
      temperaturLayer.addTo(karte); 
  
}
loadStations();