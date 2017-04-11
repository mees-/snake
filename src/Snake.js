export default class Snake {
  constructor(start) {
    this.body = []
    this.body.push(start)
    this.toGrow = 0
    this.dead = false
    this._direction = 'left'
  }

  rawMove(newCell) {
    const idx = this.indexOf(newCell)
    if ((idx >= 0) ||
    newCell[0] < 0 ||
    newCell[1] < 0) {
      this.dead = true
      const err = new Error('Moved into self')
      err.snake = true
      throw err
    }
    this.body.push(newCell)
    if (this.toGrow === 0) {
      this.body.shift()
    } else {
      this.toGrow--
    }
  }

  grow(n = 1) {
    this.toGrow += n
  }

  head() {
    return this.body[this.body.length - 1]
  }

  nth(n) { // starts at 0!
    return this.body[this.body.length - 1 - n]
  }

  tail() {
    return this.body[0]
  }

  move() {
    const newCell = [...this.head()]
    switch (this.direction) {
      case 'up':
        newCell[1]++
        break
      case 'down':
        newCell[1]--
        break
      case 'left':
        newCell[0]--
        break
      case 'right':
        newCell[0]++
        break
      default:
    }
    this.rawMove(newCell)
  }

  indexOf(cell) {
    for (let i = 0; i < this.body.length; i++) {
      const part = this.body[i]
      if (part[0] === cell[0] && part[1] === cell[1]) {
        return i
      }
    }

    return -1
  }
  get direction() {
    return this._direction
  }
  set direction(value) {
    // prevent moving backwards
    switch (this._direction) {
      case 'up':
        if (value !== 'down') {
          this._direction = value
          this.lastDirectionChange = Date.now()
        }
        break
      case 'down':
        if (value !== 'up') {
          this._direction = value
          this.lastDirectionChange = Date.now()
        }
        break
      case 'left':
        if (value !== 'right') {
          this._direction = value
          this.lastDirectionChange = Date.now()
        }
        break
      case 'right':
        if (value !== 'left') {
          this._direction = value
          this.lastDirectionChange = Date.now()
        }
        break
      default:
    }
  }
}
