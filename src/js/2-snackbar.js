import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.getElementsByName('delay');
const radios = document.getElementsByName('state');

window.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(input[0].value.trim(), 10);

  if (!delay) {
    iziToast.show({
      color: '#FF0000',
      titleColor: 'white',
      title: ' &#9319 Please enter a valid delay',
      position: 'topRight',
    });
    return;
  }

  const selectedRadio = Array.from(radios).find(radio => radio.checked);

  const selected = selectedRadio.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selected === 'fulfilled') {
        resolve('Done!');
      } else if (selected === 'rejected') {
        reject('Error!');
      }
    }, delay);
  });

  promise
    .then(result => {
      iziToast.show({
        color: 'green',
        titleColor: 'white',
        title: ` ✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(err => {
      iziToast.show({
        color: '#FF0000',
        titleColor: 'white',
        title: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
