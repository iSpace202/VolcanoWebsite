function makeCard(map_data) {
    const name = map_data["name"];
    const description = map_data["short_description"].replace(/"/g, "");
    const keyart = map_data["keyart_path"];
    const type = map_data["type"].replace(/"/g, "");
    const map_id = map_data["id"];

    return '<div class="col">' +
        '<div class="card text-bg-light">' +
        '<img src=' + keyart + ' class="card-img-top" alt="...">' +
        '<div class="card-body">' + '<span class="badge bg-secondary">' + type + '</span>' +
        '<h5 class="card-title">' + name + '</h5>' + '<p class="card-text">' + description + '</p>' +
        '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mapModal" data-bs-map-id=' + map_id + '>Learn more <i class="bi bi-eye-fill"></i></button>' +
        '</div>' + '</div>' + '</div>';
}

function makeScreenshots(screenshots) {
    const screenshot_amount = screenshots.length;

    let ss_html = '<div id="carouselExampleIndicators" class="carousel slide">' +
        '<div class="carousel-indicators">'
    for (let i = 0; i < screenshot_amount; i++) {
        ss_html += '<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to=' + i + (i === 0 ? ' class="active" aria-current="true"' : '') + ' aria-label="Screenshot ' + (i + 1) + '"></button>'
    }
    ss_html += '</div>' +
        '<div class="carousel-inner">'
    for (let i = 0; i < screenshot_amount; i++) {
        ss_html += '<div class=' + (i === 0 ? "carousel-item active" : "carousel-item") + '>' +
            '<img src=' + screenshots[i] + ' class="d-block w-100" alt="Screenshot ' + (i + 1) + '">' +
            '</div>'
    }

    ss_html += '</div>' +
        '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">' +
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '<span class="visually-hidden">Previous</span>' +
        '</button>' +
        '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">' +
        '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '<span class="visually-hidden">Next</span>' +
        '</button>' +
        '</div>'

    return ss_html;
}

let maps;
document.addEventListener("DOMContentLoaded", function () {
    fetch('maps.json')
        .then(response => response.json())
        .then(data => {
            maps = data;
            data.forEach(function (map_data) {
                $("#mapsTable").append(makeCard(map_data))
            })
        })
});

const mapModal = document.getElementById('mapModal');
if (mapModal) {
    mapModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const map_id = button.getAttribute('data-bs-map-id')

        for (let i = 0; i < maps.length; i++) {
            if (maps[i].id === map_id) {
                mapModal.querySelector('.modal-title').textContent = maps[i]["name"].replace(/"/g, "");
                mapModal.querySelector('#map-description').innerHTML = maps[i]["long_description"].replace(/"/g, "");
                mapModal.querySelector('#map-screenshots').innerHTML = makeScreenshots(maps[i]["screenshots"]);
                mapModal.querySelector('#map-trailer').innerHTML = maps[i]["trailer"].length > 5 ? maps[i]["trailer"] : null;

                let url_name = encodeURI(maps[i]["trailer"].replace(" ", "-"));
                history.pushState(null, '', `minecraft-maps/${url_name}`);
                break;
            }
        }
    })
    mapModal.addEventListener('hide.bs.modal', event => {

        history.replaceState(null, '', 'minecraft-maps/');
    })
}