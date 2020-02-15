class View {
  constructor() {
    this.select = document.querySelectorAll('.stations');
    this.date = document.getElementById('date');
    this.timeTable = document.querySelector('.time-table');
  }

  renderSelect(id, name) {
    let option = $create('option', { class: 'station text-white', value: id }, name);
    this.select[0].appendChild(option);
    option = $create('option', { class: 'station text-white', value: id }, name);
    this.select[1].appendChild(option);
  }

  renderDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    this.date.value = `${year}-${month}-${day}`;
  }

  renderTimeTable(no, beginTime, endTime) {
    let section = $create('section', { class: 'time-row d-flex justify-content-around my-1 bg-secondary' });
    let p1 = $create('div', { class: 'text-white' }, no);
    let p2 = $create('div', { class: 'text-white' }, beginTime);
    let p3 = $create('div', { class: 'text-white' }, endTime);
    section.appendChild(p1);
    section.appendChild(p2);
    section.appendChild(p3);
    this.timeTable.appendChild(section);
  }

  clearTimeTable() {
    while (this.timeTable.firstChild) {
      this.timeTable.removeChild(this.timeTable.firstChild);
    }
  }
}

const $create = (tag = 'div', attrs = {}, text = '') => {
  const node = document.createElement(tag);

  Object.keys(attrs).forEach((name) => {
    node.setAttribute(name, attrs[name]);
  });
  node.textContent = text;

  return node;
}

export { View as default };
