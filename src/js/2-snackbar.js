// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const input = document.getElementsByName('delay');
console.dir(input);
const button = document.getElementsByTagName('button')[0];
const radios = document.getElementsByName('state');
let selected;

button.addEventListener('click', event => {
  const delay = parseInt(input[0].value.trim(), 10);
  console.log(delay);
  event.preventDefault();
  if (!delay) {
    iziToast.show({
      color: '#FF0000',
      titleColor: 'white',
      title: ' &#9319 Please enter a valid delay',
      position: 'topRight',
    });
    return;
  }
  for (let radio of radios) {
    if (radio.checked) {
      selected = radio.value;
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
        .finally(() => {
          console.log('Preloader stop');
        })
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
    }
  }
});

// ✅ Fulfilled promise in ${delay}ms`

//`❌ Rejected promise in ${delay}ms`]

// iziToast.show({
//   color: '#FF0000',
//   titleColor: 'white',
//   title: ' &#9319 Please choose a date in the future',
//   position: 'topRight',
// });
