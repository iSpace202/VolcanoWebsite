class Map {
    constructor(map_data) {
        this.name = map_data["name"];
        this.id = map_data["id"];
        this.trailer = map_data["trailer"];
        this.type = map_data["type"];
        this.price = map_data["price"];
        this.release_date = map_data["release_date"];
        this.short_description = map_data["short_description"];
        this.long_description = map_data["long_description"];
        this.keyart_path = map_data["keyart_path"];
        this.screenshots = map_data["screenshots"];
    }
}

function makeCard(map_data) {
    const name = map_data.name;
    const description = map_data.short_description;
    const keyart = map_data.keyart_path;
    const type = map_data.type;

    return '<div class="col">' +
        '<div class="card text-bg-light">' +
        '<img src="${keyart}" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<span class="badge bg-secondary">${type}</span>' +
        '<h5 class="card-title">${name}</h5>' +
        '<p class="card-text">${description}</p>' +
        '<a href="#" class="btn btn-primary">Learn more <i class="bi bi-eye-fill"></i></a>' +
        '</div>' +
        '</div>' +
        '</div>';
}

document.addEventListener("DOMContentLoaded", function () {
    const data = JSON.parse("maps.json");
    for (let i = 0; i < data.maps.length; i++) {
        let map_data = new Map(data.maps[i]);
        const card = makeCard(map_data);
        $("#mapsTable").load(card);
    }
});