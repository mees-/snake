import View from './View'
import Snake from './Snake'

const defaultOptions = {
  colors: {
    background: 'white',
    snake: 'red',
    snakeHead: 'blue',
    food: 'green'
  },
  startSpeed: 200,
  foodAmount: 3,
  snakeAmount: 1,
  cellSize: 10
}

export default class Game {
  constructor(canvas, options) {
    const opts = Object.assign({}, defaultOptions, options)
    Object.assign(opts.colors, defaultOptions.colors, options.colors)
    this.ondie = null
    this.ontick = null
    this.view = new View(canvas, opts.cellSize)
    this.snake = new Snake(this.view.center())
    this.speed = opts.startSpeed
    this.startSpeed = opts.startSpeed
    this.foods = []
    this.foodAmount = opts.foodAmount
    this._nextTick = null
    this.colors = opts.colors

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
        // change direction
        this.snake.direction = direction
        clearTimeout(this._nextTick)
        this._nextTick = null
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
    while (this.foods.length < this.foodAmount) {
      console.log
      this.foods.push([
        generateRandom(this.view.grid.width - 1),
        generateRandom(this.view.grid.height - 1)
      ])
    }
    try {
      // internally move snake
      const newCell = this.snake.move()
      if (
        newCell[0] < 0 || newCell[0] > this.view.grid.width ||
        newCell[1] < 0 || newCell[1] > this.view.grid.height
      ) {
        this.stop()
        if (typeof this.ondie === 'function') {
          this.ondie(this)
        }
      }
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
    this.view.fill(this.colors.background)
    // render snake
    for (const part of this.snake.body) {
      this.view.grid[part[0]][part[1]].color = this.colors.snake
    }
    // recolor the head
    const head = this.snake.head()
    this.view.grid[head[0]][head[1]].color = this.colors.snakeHead
    // check if we ate a food else render it
    for (let i = 0; i < this.foods.length; i++) {
      const food = this.foods[i]
      if (
        this.snake.head()[0] === food[0] &&
        this.snake.head()[1] === food[1]
      ) {
        this.foods.splice(i, 1)
        this.snake.grow()
        this.speed = this.startSpeed * (1 / (0.5 * Math.sqrt(this.snake.body.length)))
      } else {
        this.view.grid[food[0]][food[1]].color = this.colors.food
      }
    }

    // render all foods
    this.view.draw()
  }

  start() {
    if (this._nextTick === null) {
      this.autoTick()
    }
  }

  autoTick() {
    // set timeout for next tick
    this._nextTick = setTimeout(() => {
      this.tick()
      this.autoTick()
    }, this.speed)
  }

  reset() {
    this.snake = new Snake(this.view.center())
  }

  stop() {
    clearTimeout(this._nextTick)
    this._nextTick = null
    this.view.fill('white')
  }

  pause() {
    clearTimeout(this._nextTick)
    this.nextTick = null
  }
}

const generateRandom = function generateRandom(max) {
  return Math.floor(Math.random() * (max + 1))
}
