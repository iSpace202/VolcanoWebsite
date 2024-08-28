function makeCard(map_data) {
    const name = map_data["name"];
    const description = map_data["short_description"].replace(/"/g, "");
    const keyart = map_data["keyart_path"];
    const type = map_data["type"].replace(/"/g, "");
    const map_id = map_data["id"];

    return '<div class="col">' +
        '<div class="card text-bg-light mt-3">' +
        '<img src=' + keyart + ' class="card-img-top" alt="...">' +
        '<div class="card-body">' + '<h5 class="card-title">' + name + '</h5>' +
         '<span class="badge bg-secondary">' + type + '</span>' + '<p class="card-text">' + description + '</p>' +
        '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mapModal" data-bs-map-id=' + map_id + '>Learn more <i class="bi bi-eye-fill"></i></button>' +
        '</div>' + '</div>' + '</div>';
}

function makeScreenshots(screenshots) {
    const screenshot_amount = screenshots.length;

    let ss_html = '<div id="map-screenshot-carousel" class="carousel slide">' +
        '<div class="carousel-indicators">'
    for (let i = 0; i < screenshot_amount; i++) {
        ss_html += '<button type="button" data-bs-target="#map-screenshot-carousel" data-bs-slide-to=' + i + (i === 0 ? ' class="active" aria-current="true"' : '') + ' aria-label="Screenshot ' + (i + 1) + '"></button>'
    }
    ss_html += '</div>' +
        '<div class="carousel-inner">'
    for (let i = 0; i < screenshot_amount; i++) {
        ss_html += '<div class=' + (i === 0 ? '"carousel-item active"' : '"carousel-item"') + '>' +
            '<img src=' + screenshots[i] + ' class="d-block w-100" alt="Screenshot ' + (i + 1) + '">' +
            '</div>'
    }

    ss_html += '</div>' +
        '<button class="carousel-control-prev" type="button" data-bs-target="#map-screenshot-carousel" data-bs-slide="prev">' +
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '<span class="visually-hidden">Previous</span>' +
        '</button>' +
        '<button class="carousel-control-next" type="button" data-bs-target="#map-screenshot-carousel" data-bs-slide="next">' +
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
            const adventure_maps = data.filter(function (entry) {
                return entry.type === 'Adventure';
            })
            const minigame_maps = data.filter(function (entry) {
                return entry.type === 'Minigame';
            })
            const survival_spawn_maps = data.filter(function (entry) {
                return entry.type === 'Survival Spawn';
            })
            adventure_maps.forEach(function (map_data) {
                $("#adventure-maps").append(makeCard(map_data))
            })
            minigame_maps.forEach(function (map_data) {
                $("#minigame-maps").append(makeCard(map_data))
            })
            survival_spawn_maps.forEach(function (map_data) {
                $("#survival-spawn-maps").append(makeCard(map_data))
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
                mapModal.querySelector('#map-price').innerHTML = maps[i]["price"].replace(/"/g, "");
                mapModal.querySelector('#map-keyart').setAttribute('src', maps[i]["keyart_path"]);
                mapModal.querySelector('#map-link').setAttribute("href", `https://www.minecraft.net/en-us/marketplace/pdp?id=${maps[i]["id"]}`);
                
                if (maps[i]["trailer"] != null) {
                    mapModal.querySelector('#map-trailer > iframe').setAttribute("src", `https://www.youtube.com/embed/${maps[i]["trailer"]}`);
                    mapModal.querySelector('#map-trailer').classList.remove("collapse");
                    mapModal.querySelector('#map-keyart').classList.add("collapse");
                }
                else {
                    mapModal.querySelector('#map-keyart').classList.remove("collapse");
                    mapModal.querySelector('#map-trailer').classList.add("collapse");
                }

                document.title = maps[i]["name"].replace(/"/g, "");
                history.pushState(null, null, `minecraft-maps/${maps[i]["url_name"].replace(/"/g, "")}`);
                break;
            }
        }
    })
    mapModal.addEventListener('hide.bs.modal', event => {

        history.replaceState(null, null, '/minecraft-maps');
    })
}

window.addEventListener("popstate", event => {
    if (mapModal) {
        document.title = "Minecraft Maps";
        mapModal.hide();
    }
})