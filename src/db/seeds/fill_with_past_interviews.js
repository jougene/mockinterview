const _ = require('lodash')

const pastInterviews = [
  {
    interviewer: 'Кирилл Мокевнин',
    interviewee: 'Денис Кривощеков',
    profession: 'Ruby on Rails',
    position: 'Junior',
    videoLink: 'https://youtu.be/YrXJzD2E6NU',
    date: '2016-03-02 00:00:00'
  },
  {
    interviewer: 'Кирилл Мокевнин',
    interviewee: 'Евгений Синицын',
    profession: 'PHP',
    position: 'Junior',
    videoLink: 'https://youtu.be/H8OZ3B2_X3U',
    date: '2016-03-11 00:00:00'
  },
  {
    interviewer: 'Кирилл Мокевнин',
    interviewee: 'Данияр Супиев',
    profession: 'Python',
    position: 'Junior',
    videoLink: 'https://youtu.be/QirXa-T8C2k',
    date: '2016-03-25 00:00:00'
  },
  {
    interviewer: 'Данил Письменный',
    interviewee: 'Денис Товстоган',
    profession: 'Python',
    position: 'Junior',
    videoLink: 'https://youtu.be/YstIUUh6aFU',
    date: '2016-04-22 00:00:00'
  },
  {
    interviewer: 'Антон Сергеев',
    interviewee: 'Антон Маркелов',
    profession: 'Python',
    position: 'Junior',
    videoLink: 'https://youtu.be/C8SlKzeLAgQ',
    date: '2016-05-06 00:00:00'
  },
  {
    interviewer: 'Кирилл Мокевнин',
    interviewee: 'Дмитрий Струнгарь',
    profession: 'JavaScript frontend',
    position: 'Junior',
    videoLink: 'https://youtu.be/JERUf-xKU1o',
    date: '2018-06-25 00:00:00'
  },
  {
    interviewer: 'Кирилл Мокевнин',
    interviewee: 'Демид Каширин',
    profession: 'JavaScript backend',
    position: 'Junior',
    videoLink: 'https://youtu.be/HM42MlWbhFI',
    date: '2018-09-07 00:00:00'
  },
  {
    interviewer: 'Егор Бугаенко',
    interviewee: 'Сагындык Мухамбетов',
    profession: 'Java',
    position: 'Junior',
    videoLink: 'https://youtu.be/UUhB4rVlIoU',
    date: '2018-12-07 00:00:00'
  },
  {
    interviewer: 'Василий Васильков',
    interviewee: 'Тимур Маликин',
    profession: 'Java',
    position: 'Middle',
    videoLink: 'https://youtu.be/boDeUHdsfAI',
    date: '2018-12-15 00:00:00'
  },
  {
    interviewer: 'Алексей Пирогов',
    interviewee: 'Евгений Губа',
    profession: 'PHP',
    position: 'Middle',
    videoLink: 'https://youtu.be/PmhdRXq1QBE',
    date: '2019-09-30 19:00:00'
  }
]

exports.seed = async (knex) => {
  const interviewers = pastInterviews.map(i => {
    const [firstname, lastname] = i.interviewer.split(' ')

    return { firstname, lastname, role: 'interviewer', enabled: false, archived: true }
  })

  const interviewees = pastInterviews.map(i => {
    const [firstname, lastname] = i.interviewee.split(' ')

    return { firstname, lastname, role: 'interviewee', enabled: false, archived: true }
  })

  const allUsers = _.uniqBy([...interviewers, ...interviewees], i => i.firstname && i.lastname)

  await knex.transaction(async trx => {
    await trx.raw('truncate users cascade')
    const users = await trx.batchInsert('users', allUsers, 10).returning('*')
    console.log(users)

    const interviews = pastInterviews.map(i => {
      const interviewee = users.find(u => `${u.firstname} ${u.lastname}` === i.interviewee)
      const interviewer = users.find(u => `${u.firstname} ${u.lastname}` === i.interviewer)

      const { profession, position, videoLink, date } = i

      return { profession, position, video_link: videoLink, planned_at: date, status: 'passed', interviewee_id: interviewee.id, interviewer_id: interviewer.id }
    })

    return trx.batchInsert('interviews', interviews, 10)
  })
}
