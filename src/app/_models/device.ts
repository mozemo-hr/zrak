export class Device {
    deviceId: string;
    name: string;
    source: string;
    x?: number; // HTRS96 coordinate system
    y?: number; // HTRS96 coordinate system
    pm10: number;
    pm25: number;
    lastMeasureTime: number;
}

// vezano za HTRS96 koordinatni sustav - riječ je o koordinatnom sustavu koji RH već nekoliko godina gura kao službeni koordinatni sustav
// sve koordinate s Ekokarte su u tom sustavu
// leaflet nažalost nema out of the box podršku HTRS96 ali se taj sustav može importati koristeći proj4leaflet lib (https://kartena.github.io/Proj4Leaflet/)
// jedini problem je što proj4leaflet podržava verziju 1.0.# a leaflet je sada na 1.7.#
// naravno, svi primjeri definicija HTRS96 su nestali s neta ali sam uspio iskopati u nekom svom prastarom projektu snippet :)

// primjer:

// ovo je radilo na leaflet verziji 1.0.3.
// var crs = new L.Proj.CRS("EPSG:3765", "+proj=tmerc +lat_0=0 +lon_0=16.5 +k=0.9999 +x_0=500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs", {
//     resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, .5, .25, .125, .0625, .03125],
//     origin: [-5e5, 5169674]
// });

// var map = L.map('map', {
//     crs: crs,
//     zoom: 8,
//     tiles: true,
//     dragging: true,
//     touchZoom: true
// });