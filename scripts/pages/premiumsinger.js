const addSubs = (e) => {
    console.log("add");
    e.preventDefault();
    const singer = JSON.parse(e.target.value);
    console.log(singer);

    getAPI(`/api/authentication/userdata.php`, (data) => {
        const userData = JSON.parse(data);
        const userId = userData.dataUser.user_id;
        const userName = userData.dataUser.username;

        const addSubscription = new FormData();
        addSubscription.append("creator_id", singer.user_id);
        addSubscription.append("subscriber_id", userId);
        addSubscription.append("creator_name", singer.name);
        addSubscription.append("subscriber_name", userName);
        addSubscription.append("status", "PENDING");

        postAPI(`/api/subs/addsubs.php`, (resp) => {}, addSubscription);
        // window.location.reload();
    });

    // // masih hardcoded karena belom ditest (cuma bisa di laptop anca)
    // const newSubs = new FormData();
    // newSubs.append("creator_id", 1);
    // newSubs.append("subscriber_id", 2);
    // newSubs.append("creator_name", "raisa");
    // newSubs.append("subscriber_name", "yaya");
    // newSubs.append("status", "PENDING");
    
    // postAPI(
    //   `./api/subs/addsubs.php`, (resp) => {
    //   }, newSubs
    // );
    // };
}

const premiumSingerLayout = () => {
  getAPI(`http://localhost:1356/users`, (data) => {
    const jsonData = JSON.parse(data);
    const singers = jsonData.users;
    getAPI(`./api/subs/getusersubs.php`, (dataSubs) => {
        const jsonDataSubs = JSON.parse(dataSubs);
        const subs = jsonDataSubs.payload;
        console.log(subs, singers);

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
                ${
                    subs?.creator_id === singer?.user_id ? 
                        (subs?.status === "PENDING" ? `<div class="text-info">Requested</div>` 
                        : (subs?.status === "ACCEPTED" ? `<div class="text-info">See Songs</div>` : `<div class="text-info">Rejected</div>`)) 
                    : `<button class="text-info" value=${JSON.stringify(singer)} onclick="addSubs(event)">Subscribe</button>`
                }
            </div>
        </div>`
        ).join("");

        str += `</div>`

        document.getElementById("page-container").innerHTML =  str;
    })
  });
};

premiumSingerLayout();