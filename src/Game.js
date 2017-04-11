import View from './View'
import Snake from './Snake'

const colors = {
  background: 'white',
  snake: 'red',
  snakeHead: 'blue',
  food: 'green'
}

export default class Game {
  constructor(canvas, size, speed = 400) {
    this.ondie = null
    this.ontick = null
    this.view = new View(canvas, size)
    this.snake = new Snake(this.view.center())
    this.speed = speed
    this.foods = []
    this._interval = null
    // bind to keydown
    window.onkeydown = ({ keyCode }) => {
      let direction
      switch (keyCode) {
        case 37:
          direction = 'left'
          break
        case 38:
          direction = 'down'
          break
        case 39:
          direction = 'right'
          break
        case 40:
          direction = 'up'
          break
        default:
      }
      if (typeof direction === 'string' && !this.snake.dead) {
        // we change direction
        this.snake.direction = direction
        clearInterval(this._interval)
        this._interval = null
        this.start()
        // also tick once to make the direction change instant
        this.tick()
      }
    }
  }

  tick() {
    if (typeof this.ontick === 'function') {
      this.ontick(this)
    }
    while (this.foods.length < 3) {
      this.foods.push([
        generateRandom(this.view.grid.width - 1),
        generateRandom(this.view.grid.height - 1)
      ])
    }
    try {
      // internally move snake
      this.snake.move()
    } catch (e) {
      if (this.snake.dead) {
        this.stop()
        if (typeof this.ondie === 'function') {
          this.ondie(this)
        }
      } else {
        throw e
      }
    }
    // redraw view
    this.view.fill(colors.background)
    // render snake
    for (const part of this.snake.body) {
      this.view.grid[part[0]][part[1]].color = colors.snake
    }
    // recolor the head
    const head = this.snake.head()
    this.view.grid[head[0]][head[1]].color = colors.snakeHead
    // check if we ate a food else render it
    for (let i = 0; i < this.foods.length; i++) {
      const food = this.foods[i]
      if (
        this.snake.head()[0] === food[0] &&
        this.snake.head()[1] === food[1]
      ) {
        this.foods.splice(i, 1)
        this.snake.grow()
      } else {
        this.view.grid[food[0]][food[1]].color = colors.food
      }
    }

    // render all foods
    this.view.draw()
  }

  start() {
    if (this._interval === null) {
      this._interval = setInterval(() => {
        this.tick()
      }, this.speed)
    }
  }

  reset() {
    this.snake = new Snake(this.view.center())
  }

  stop() {
    this.view.fill('white')
    clearInterval(this._interval)
    this._interval = null
  }

  pause() {
    clearInterval(this._interval)
    this._interval = null
  }
}

const generateRandom = function generateRandom(max) {
  return Math.floor(Math.random() * (max + 1))
}
