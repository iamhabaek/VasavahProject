import Mock from '../mock';

const rfpDB = {
    rfp: [
        {
          'id': '5a7b73f76bed15c94d1e46d4',
          'index': 0,
          'guid': 'c01da2d1-07f8-4acc-a1e3-72dda7310af8',
          'dateNeed': 'January 24, 2020',
        },
      ]
}



Mock.onGet('/api/rfp/all').reply(config => {
    return [200, rfpDB.rfp]
});
