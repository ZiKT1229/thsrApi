class Model {
  constructor() {
    this.url = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR';
  }

  async getStation(renderMethod) {
    const endpoint = `${this.url}/Station?$top=20&$format=JSON`;

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        data.forEach(e => {
          let { StationID } = e;
          let StationName = e.StationName['Zh_tw'];
          
          renderMethod(StationID, StationName);
        });
      } else {
        throw new Error('Oh my god!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getTime(renderMethod, oriId, desId, date) {
    const endpoint = `${this.url}/DailyTimetable/OD/${oriId}/to/${desId}/${date}?$orderby=OriginStopTime%2FDepartureTime&$format=JSON`;

    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        data.forEach(e => {
          let { TrainNo } = e.DailyTrainInfo;
          let { DepartureTime } = e.OriginStopTime;
          let { ArrivalTime } = e.DestinationStopTime;

          renderMethod(TrainNo, DepartureTime, ArrivalTime);
        });
      } else {
        throw new Error('Oh my god!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export { Model as default };
