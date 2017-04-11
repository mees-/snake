import Cell from './Cell'

export default class View {
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
    let changed = 0
    this.mapGrid(cell => {
      if (cell.changed) {
        changed++
        cell.draw()
      }
    })

    return changed
  }

  mapGrid(cb) {
    for (let x = 0; x < this.grid.width; x++) {
      for (let y = 0; y < this.grid.height; y++) {
        cb(this.grid[x][y], [x, y])
      }
    }
  }

  fill(color) {
    this.mapGrid(cell => {
      cell.color = color
    })
  }

  changeCell(x, y, color) {
    this.grid[x][y].color = color
  }

  center() {
    const x = Math.ceil(this.grid.width / 2)
    const y = Math.ceil(this.grid.height / 2)

    return [x, y]
  }
}
