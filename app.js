class App {
  constructor() {
    this.select = document.getElementsByClassName('stations');
    this.date = document.getElementById('date');
    this.timeTable = document.getElementsByClassName('time-table')[0];
    this.url = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR';
    this.getStation();
    (() => {
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      if (day < 10) day = '0' + day;
      this.date.value = `${year}-${month}-${day}`;
      window.addEventListener('change', () => {
        let begin = this.select[0].options[this.select[0].selectedIndex].value;
        let end = this.select[1].options[this.select[1].selectedIndex].value;
        let time = this.date.value;
        this.getTime(begin, end, time);
      });
    })();
  }

  async getStation() {
    const endpoint = `${this.url}/Station?$top=20&$format=JSON`;

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        data.forEach(element => {
          let id = element.StationID;
          let name = element.StationName['Zh_tw'];
          this.renderSelect(id, name);
        });
      } else {
        throw new Error('Oh my god!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getTime(oriId, desId, time) {
    const endpoint = `${this.url}/DailyTimetable/OD/${oriId}/to/${desId}/${time}?$orderby=OriginStopTime%2FDepartureTime&$format=JSON`;

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        while (this.timeTable.firstChild) {
          this.timeTable.removeChild(this.timeTable.firstChild);
        }
        data.forEach(e => {
          let no = e.DailyTrainInfo.TrainNo;
          let beginTime = e.OriginStopTime.DepartureTime;
          let endTime = e.DestinationStopTime.ArrivalTime;
          this.renderTimeTable(no, beginTime, endTime);
        });
      } else {
        throw new Error('Oh my god!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  renderSelect(id, name) {
    let option = this.$create('option', { class: 'station text-white', value: id }, name);
    this.select[0].appendChild(option);
    option = this.$create('option', { class: 'station text-white', value: id }, name);
    this.select[1].appendChild(option);
  }

  renderTimeTable(no, beginTime, endTime) {
    let section = this.$create('section', { class: 'time-row d-flex justify-content-around my-1 bg-secondary' });
    let p1 = this.$create('div', { class: 'text-white' }, no);
    let p2 = this.$create('div', { class: 'text-white' }, beginTime);
    let p3 = this.$create('div', { class: 'text-white' }, endTime);
    section.appendChild(p1);
    section.appendChild(p2);
    section.appendChild(p3);
    this.timeTable.appendChild(section);
  }

  $create(tag = 'div', attrs = {}, text = '') {
    const node = document.createElement(tag);

    Object.keys(attrs).forEach((name) => {
      node.setAttribute(name, attrs[name]);
    });
    node.textContent = text;

    return node;
  }
}

export { App as default };
