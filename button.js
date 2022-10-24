
const clickable = () => {
  console.log('eek');
  getAPI("config.php", click);
  alert("Callback successful!");
};

function click(){
  console.log('eek');
}