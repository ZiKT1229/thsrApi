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
      let begin = this.view.select[0].options[this.view.select[0].selectedIndex].value;
      let end = this.view.select[1].options[this.view.select[1].selectedIndex].value;
      let date = this.view.date.value;

      this.view.clearTimeTable();
      this.model.getTime(this.view.renderTimeTable.bind(this.view), begin, end, date);
    });
  }
}

export { Controller as default };
