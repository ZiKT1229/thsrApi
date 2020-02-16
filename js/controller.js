class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initProcess();
  }

  initProcess() {
    this.model.getStation(this.view.renderSelect.bind(this.view));
    this.view.renderDate();
    
    window.addEventListener('change', () => {
      let beginStation = this.view.select[0].options[this.view.select[0].selectedIndex].value;
      let endStaion = this.view.select[1].options[this.view.select[1].selectedIndex].value;
      let date = this.view.date.value;
      let beginTime = this.view.filter[0].options[this.view.filter[0].selectedIndex].value;
      let endTime = this.view.filter[1].options[this.view.filter[1].selectedIndex].value;

      this.view.clearTimeTable();
      this.model.getTime(this.view.renderTimeTable.bind(this.view), beginStation, endStaion, date, beginTime, endTime);
    });
  }
}

export { Controller as default };
