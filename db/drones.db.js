const Drones = [
  {
    _id: "203c35c4-5791-4893-8029-02b9e944f3c3",
    serialNumber: 'SN001',
    model: "Lightweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 80,
    state: 'LOADING',
    loadedItems: [
      {
        "_id": "203c3b9e945c49-02b9e944f3c3",
        "name": "Melatonin",
        "code": "MEDCODE_001",
        "weight": 100,
        "image": "https://unsplash.com/photos/tUnhb_1qy4A"
      }
    ],
    loadedWeightsKg: 100
  },
  {
    _id: "203c35c4-57-32784378391-4893-80294vb23",
    serialNumber: 'SN002',
    model: "Middleweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 100,
    state: 'LOADING',
    loadedItems: [],
    loadedWeightsKg: 0
  },
  {
    _id: "203c35c4-574378391-4893-804vb2389c35",
    serialNumber: 'SN003',
    model: "Cruiserweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 15,
    state: 'IDLE',
    loadedItems: [],
    loadedWeightsKg: 0
  },
  {
    _id: "203c35c4-58391-4vb2391-4vb3c35",
    serialNumber: 'SN004',
    model: "Cruiserweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 100,
    state: 'LOADING',
    loadedItems: [],
    loadedWeightsKg: 0
  },
  {
    _id: "203c35c4-5791-4203c44vb029-3203c23c35",
    serialNumber: 'SN005',
    model: "Middleweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 10,
    state: 'RETURNING',
    loadedItems: [],
    loadedWeightsKg: 0
  },
  {
    _id: "203c3235c4-5791-4893-803c44vb23c35",
    serialNumber: 'SN006',
    model: "Heavyweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 100,
    state: 'LOADED',
    loadedItems: [
      {
        _id: "203ce944f79e94-4f3b9e94c3",
        name: 'Paracetamol',
        code: 'MEDCODE_002',
        weight: 200,
        image: 'https://unsplash.com/photos/tUnhb_1qy4A'
      },
      {
        _id: "203ce944f79e94-4f3b9e94c3",
        name: 'Paracetamol',
        code: 'MEDCODE_002',
        weight: 200,
        image: 'https://unsplash.com/photos/tUnhb_1qy4A'
      },
      {
        "_id": "203c3b9e945c49-02b9e944f3c3",
        "name": "Melatonin",
        "code": "MEDCODE_001",
        "weight": 100,
        "image": "https://unsplash.com/photos/tUnhb_1qy4A"
      }
    ],
    loadedWeightsKg: 500
  },
  {
    _id: "203c91-4893-803c44v-3203c44vb23c35",
    serialNumber: 'SN007',
    model: "Middleweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 100,
    state: 'LOADING',
    loadedItems: [],
    loadedWeightsKg: 0
  },
  {
    _id: "23-891-4893-03c35c-32023c35",
    serialNumber: 'SN008',
    model: "Middleweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 70,
    state: 'DELIVERING',
    loadedItems: [
      {
        _id: "203ce944f79e94-4f3b9e94c3",
        name: 'Paracetamol',
        code: 'MEDCODE_002',
        weight: 200,
        image: 'https://unsplash.com/photos/tUnhb_1qy4A'
      },
      {
        _id: "203c3502b9ec4-5791-944f3c3",
        name: 'Panadol',
        code: 'MEDCODE_003',
        weight: 300,
        image: 'https://unsplash.com/photos/tUnhb_1qy4A'
      }
    ],
    loadedWeightsKg: 500
  },
  {
    _id: "203893-8029-3203c44vb23c35",
    serialNumber: 'SN009',
    model: "Middleweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 20,
    state: 'DELIVERED',
    loadedItems: [],
    loadedWeightsKg: 0
  },
  {
    _id: "203c35c4-503c44v791-4893-80b23c35",
    serialNumber: 'SN0010',
    model: "Heavyweight",
    weightLimitKg: 500,
    batteryCapacityPercentage: 50,
    state: 'RETURNING',
    loadedItems: [],
    loadedWeightsKg: 0
  },
];

module.exports = Drones;