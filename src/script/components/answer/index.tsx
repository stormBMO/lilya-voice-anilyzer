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
    <div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', background: 'rgba(255, 255, 255, .5)'}}>
      {answers[Math.floor(Math.random() * answers.length)]}
    </div>
  )
}

export default Answer