import React from 'react'

const Answer = () => {
  const answers = [
    'Определенно а',
    'Конечно нет',
    'Звезды не могут ответить отрицательно',
    'Ответ не положительный',
    'Возможно',
    'Не точно',
    'Однозначно',
  ]


  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
      <div style={{height: '400px', width: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, .7)', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', color: 'black',}}>
        {answers[Math.floor(Math.random() * answers.length)]}
      </div>
    </div>
  )
}

export default Answer