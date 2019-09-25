const headers = { 'Content-Type': 'application/json' };

const getHospitalList = async () => {
    const request = await fetch('/getHospitals', {
      method: 'GET',
      headers: headers,
    });
    const list = await request.json();
    return list;
}

export default {
    getHospitalList
}