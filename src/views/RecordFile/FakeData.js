export const FakeData = [
  {
    id: 1,
    name: '紀錄1',
    school: 1,
    mainTeacher: 1,
    subTeacher: null,
    studentList: [
      1,
      3
    ],
    dateList: [
      '2022-01-01',
      '2022-01-08'
    ],
    checkForm: [
      {
        student: 1,
        '2022-01-01': {
          attend: 'true',
          ps: 'test'
        },
        '2022-01-08': {
          attend: 'false',
          ps: 'test555'
        }
      },
      {
        student: 3,
        '2022-01-01': {
          attend: 'false',
          ps: 'b123'
        },
        '2022-01-08': {
          attend: 'false',
          ps: 'a777'
        }
      }
    ]
  }
]