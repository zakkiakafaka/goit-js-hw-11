class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(`${selector}`);
    this.targetDate = targetDate;
    this.intervalId = null;
    this.start();
  }


  start() {
    this.setCountdownTimer();
    this.intervalId = setInterval(() => {
      this.setCountdownTimer();
    }, 1000);
  }

  clear() {
    const time = this.getCountdownTimer(0);
    this.updateCountdownTimer(time);
  }

  setCountdownTimer() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    const time = this.getCountdownTimer(deltaTime);
    this.updateCountdownTimer(time);

    if (deltaTime < 0) {
      clearInterval(this.intervalId);
      this.clear();
      return;
    }
  }


  pad(value) {
    return String(value).padStart(2, "0");
  }

  getCountdownTimer(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  updateCountdownTimer({ days, hours, mins, secs }) {
    this.selector.querySelector('[data-value="days"]').textContent = days;
    this.selector.querySelector('[data-value="hours"]').textContent = hours;
    this.selector.querySelector('[data-value="mins"]').textContent = mins;
    this.selector.querySelector('[data-value="secs"]').textContent = secs;
  }
}


const firstCountdownTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Dec 31, 2020"),
});

const secondCountdownTimer = new CountdownTimer({
  selector: "#timer-2",
  targetDate: new Date("Dec 12, 2020 12:45 PM"),
});
