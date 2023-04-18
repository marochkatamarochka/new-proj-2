let myMap;

const init = () => {
myMap = new ymaps.Map("map", {
    center: [59.935274, 30.312388],
    zoom: 11
    controls: []
});
const coords = [
    [59.94554327989287, 30.38935262114668],
    [59.91142323563909, 30.50024587065841]
];
const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "/img/maps.png",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -51]
});
coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
})
myMap.geoObjects.add(myCollection);

myMap.behaviors.disable('scrollZoom');
}
ymaps.ready(init);