export const schoolFakeData = [
  {
    id: 1,
    name: '測試學校',
    phone: '031857462',
    email: 'testSchool123@gmail.com'
  },
  {
    id: 2,
    name: '測試學校2',
    phone: '031857463',
    email: 'testSchool321@gmail.com'
  },
  {
    id: 3,
    name: '測試學校3',
    phone: '031857468',
    email: 'testSchool456@gmail.com'
  },
  {
    id: 4,
    name: '測試學校4',
    phone: '031857464',
    email: 'testSchool456@gmail.com'
  }
]

export const studentFakeData = [
  {
    id: 1,
    name: '學生1',
    phone: '0987654321',
    email: 'testStudent123@gmail.com',
    fromSchool: [
      1,
      2
    ],
    key: 1
  },
  {
    id: 2,
    name: '學生2',
    phone: '0987679921',
    email: 'testStudent222@gmail.com',
    fromSchool: [
      1,
      2
    ],
    key: 2
  },
  {
    id: 3,
    name: '學生3',
    phone: '0987677321',
    email: 'testStudent789@gmail.com',
    fromSchool: [
      1,
      2,
      4
    ],
    key: 3
  }
]

export const teacherFakeData = [
  {
    id: 1,
    name: '測試人員',
    phone: '0912345678',
    email: 'testUser123@gmail.com',
    manageSchool: [1, 2],
    key: 1,
  },
  {
    id: 2,
    name: '測試人員2',
    phone: '0987654321',
    email: 'testUser2@gmail.com',
    manageSchool: [1, 2, 3],
    key: 2
  },
  {
    id: 3,
    name: '小丸子',
    phone: '0956432879',
    email: 'vul36678@gmail.com',
    manageSchool: [2, 4],
    key: 3
  },
  {
    id: 5,
    name: '測試老師',
    phone: '0978878454',
    email: 'test456@gmail.com',
    manageSchool: [2, 3, 4],
    key: 5
  }
]