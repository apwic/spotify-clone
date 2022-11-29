const premiumSingerLayout = () => {
  getAPI(`http://localhost:8080/users`, (data) => {
    const jsonData = JSON.parse(data);
    const singers = jsonData.users;

    str = `<div class="page-title">Premium Singer
                </div>
                <div class="info">
                    <div class="info-column">Name</div>
                    <div class="info-column">Subscription</div>
                </div>
                <div id="singers" class="singer-list-container">`;

    str += singers.map(singer =>
        `<div class="singer-list">
            <div class="singer">
                <div class="text-info">${singer.name}</div>
            </div>
            <div class="singer">
                <div class="text-info">Subscribed</div>
            </div>
        </div>`
    ).join("");

    document.getElementById("page-container").innerHTML =  str;
  });
};

premiumSingerLayout();