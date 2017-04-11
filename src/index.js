import Game from './Game'
const canvas = document.getElementById('game')
canvas.height = 600
canvas.width = 990

const game = new Game(canvas, 15)
window.game = game
game.ondie = () => {
  const ctx = canvas.getContext('2d')
  ctx.font = '48px editundo'
  ctx.fillText(
    'You ded',
    Math.floor(canvas.width / 2.3),
    Math.floor(canvas.height / 2.5))
  setTimeout(() => {
    location.reload()
  }, 2000)
}

const score = document.getElementById('score')
game.ontick = () => {
  score.innerHTML = game.snake.body.length
}
game.start(100)
