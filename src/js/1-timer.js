import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const dataPicker = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
button.disabled = true;
let deadline;
flatpickr(dataPicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates, dateStr, instance) {
    if (selectedDates[0] > new Date()) {
      button.disabled = false;
    } else {
      button.disabled = true;

      iziToast.show({
        color: '#FF0000',
        titleColor: 'white',
        title: ' &#9319 Please choose a date in the future',
        position: 'topRight',
      });
    }
    this.clickOpens;
    deadline = selectedDates[0];
    console.dir(selectedDates[0]);
    console.log(dateStr);
    console.log(instance);
  },
});

const timer = {
  intervalId: null,

  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start() {
    dataPicker.disabled = true;
    button.disabled = true;
    this.intervalId = setInterval(() => {
      const diff = deadline - Date.now();

      if (diff <= 0) {
        this.stop();

        return;
      }

      const timeComponents = this.getTimeComponents(diff);
      this.elements.days.textContent = this.pad(timeComponents.days);
      this.elements.hours.textContent = this.pad(timeComponents.hours);
      this.elements.minutes.textContent = this.pad(timeComponents.minutes);
      this.elements.seconds.textContent = this.pad(timeComponents.seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    button.disabled = false;
    dataPicker.disabled = false;
    console.log('timer stopped');
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};
button.addEventListener('click', () => {
  timer.start();
});
