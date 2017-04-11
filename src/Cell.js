export default class Cell {
  constructor(ctx, size, x, y) {
    this.ctx = ctx
    this.corners = {
      topLeft: [x * size, y * size],
      topRight: [(x + 1) * size, y * size],
      bottomLeft: [x * size, (y + 1) * size],
      bottomRight: [(x + 1) * size, (y + 1) * size]
    }
    this.size = size
    this._color = 'white'
    this.changed = false
  }

  draw() {
    const oldStyle = this.ctx.fillStyle
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(...this.corners.topLeft, this.size, this.size)
    this.ctx.fillStyle = oldStyle
    this.changed = false
  }

  get color() {
    return this._color
  }

  set color(value) {
    this.changed = value !== this.color
    this._color = value
  }
}
