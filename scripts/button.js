
const clickable = () => {
  console.log('eek');
  getAPI("./api/config.php", click);
  alert("Callback successful!");
};

function click(){
  console.log('eek');
}