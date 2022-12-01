const addSubs = (e) => {
    e.preventDefault();

    // masih hardcoded karena belom ditest (cuma bisa di laptop anca)
    const newSubs = new FormData();
    newSubs.append("creator_id", 1);
    newSubs.append("subscriber_id", 2);
    newSubs.append("creator_name", "raisa");
    newSubs.append("subscriber_name", "yaya");
    newSubs.append("status", "PENDING");
    
    postAPI(
      `./api/subs/addsubs.php`, (resp) => {
      }, newSubs
    );
}