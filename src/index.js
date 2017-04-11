class Cell {
  constructor(ctx, size, x, y) {
    this.ctx = ctx
    this.corners = {
      topLeft: [x * size, y * size],
      topRight: [(x + 1) * size, y * size],
      bottomLeft: [x * size, (y + 1) * size],
      bottomRight: [(x + 1) * size, (y + 1) * size]
    }
    this.size = size
    this.color = 'white'
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
    return this.color
  }

  set color(value) {
    this.changed = value !== this.color
    this.color = value
  }
}

class Snake {
  constructor(c, cellSize) {
    this.canvas = c
    this.ctx = this.canvas.getContext('2d')
    if (this.canvas.width % cellSize !== 0) {
      throw new Error('width doesnt divide cellSize')
    }

    if (this.canvas.height % cellSize !== 0) {
      throw new Error('height doesnt divide cellSize')
    }

    this.grid = []
    this.grid.width = this.canvas.width / cellSize
    this.grid.height = this.canvas.height / cellSize
    // fill grid
    for (let x = 0; x < this.grid.width; x++) {
      this.grid[x] = []
      for (let y = 0; y < this.grid.height; y++) {
        this.grid[x][y] = new Cell(this.ctx, cellSize, x, y)
      }
    }
  }

  draw() {
    this.mapGrid(cell => {
      if (cell.changed) {
        cell.draw()
      }
    })
  }

  mapGrid(cb) {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        cb(this.grid[x][y], [x, y])
      }
    }
  }
}
