const services = require('./services');
const { calculateWaitingTime } = services;

describe('Test calculateWaitingTime', () => {
  it('should give use a sum in hours given valid waitingList', () => {
    const waitingList = [
      { averageProcessTime: 30, patientCount: 5 },
      { averageProcessTime: 5, patientCount: 1 },
      { averageProcessTime: 40, patientCount: 3 },
      { averageProcessTime: 10, patientCount: 7 }
    ];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((5.75).toFixed(2));
  });

  it('should return 0 if given empty array', () => {
    const waitingList = [];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((0).toFixed(2));
  });

  it('should return 0 if given empty array', () => {
    const waitingList = null;
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((0).toFixed(2));
  });

  it('should skip over corrupted patientCount data and return a sum of valid data', () => {
    const waitingList = [{ averageProcessTime: 30, patientCount: 5 }, { averageProcessTime: 5 }];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((2.5).toFixed(2));
  });

  it('should skip over corrupted averageProcessTime data and return a sum of valid data', () => {
    const waitingList = [{ averageProcessTime: 30, patientCount: 5 }, { patientCount: 5 }];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((2.5).toFixed(2));
  });

  it('should skip over corrupted data and return a sum of valid data', () => {
    const waitingList = [{ averageProcessTime: 30, patientCount: 5 }, {}];
    const waitTime = calculateWaitingTime(waitingList);
    expect(waitTime).toBe((2.5).toFixed(2));
  });
});
