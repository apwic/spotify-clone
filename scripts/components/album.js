const deleteAlbum = () => {
    const id = new URLSearchParams(window.location.search).get("id");
    console.log(id);
    getAPI(`./api/song/getsongs.php?album_id=${id}`, async(resp) => {
        const data = JSON.parse(resp);
        const formData = new FormData();
        formData.append("id", id);
        formData.append("songs", JSON.stringify(data.payload));
        postAPI(
            `./api/album/deletealbum.php`, (resp) => {
            const data = JSON.parse(resp);
            alert(data.description);
            // goToHome();
            }, formData
        )
    })
}
