_cal.createObject('colorChange');

_cal.colorChange.bg = document.querySelectorAll('.sunrise');
_cal.colorChange.color = document.querySelectorAll('.sunrise-color');

_cal.colorChange.overTime = (bg, color) => {
  const time = _cal.today.getHours();
  const condition = [time <= 6, time >= 18];

  if (!condition.includes(true)) return;

  if (bg) {
    bg.classList.remove('sunrise');
    bg.classList.add('sunset');
  }

  if (color) {
    color.classList.remove('sunrise-color');
    color.classList.add('sunset-color');
  }
};

_cal.colorChange.selectOverTime = (select) => {
  const time = _cal.today.getHours();
  const condition = [time <= 6, time >= 18];

  if (!condition.includes(true)) return;

  select.classList.add('select-sunset');
};

[].forEach.call(_cal.colorChange.bg, (bg) => {
  _cal.colorChange.overTime(bg);
});

[].forEach.call(_cal.colorChange.color, (color) => {
  _cal.colorChange.overTime(null, color);
});
