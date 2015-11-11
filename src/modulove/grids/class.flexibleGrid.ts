/// <reference path="../modulove.d.ts"/>
/// <reference path="../location/class.location.simple.ts"/>

module grids {
	export class FlexibleGrid implements IGrid {
		cells:Array<boolean>;
		mapper:ICoordinateMapper;

		constructor(mapper:ICoordinateMapper) {
			this.mapper = mapper;
			this.cells = [];
		}

		getFirstEmpty(startPosition?:IPosition):IPosition {
			var i = 0;

			if (startPosition) {
				i = this.mapper.toIndex(startPosition) + 1;
			}

			while (!this.cellIsEmpty(i)) {
				i++;
				if (i > this.cells.length) {
					return null;
				}
			}

			return this.mapper.toPosition(i);
		}

		getMax() {
			var w = this.mapper.getMaxWidth();
			var h = this.mapper.getMaxHeight();
			var a = this.mapper.toPosition(this.cells.length - 1);

			return {x: w || a.x + 1, y: h || a.y + 1};
		}

		fillCell(position:number):void {
			if (this.cells[position] == false) {
				//throw "cannot fill cell " + position;
			}
			this.cells[position] = false;
		}

		appendElement(data:ILocation):boolean {
			var self = this,
				cells;

			cells = this.locationToCells(data);
			for (var i = 0; i < cells.length; i++) {
				self.fillCell(cells[i]);
			}

			return cells != -1;
		}

		locationToCells(location:ILocation) {
			var cells = [],
				i, j,
				dimension = location.item;

			for (i = 0; i < dimension.width; i++) {
				for (j = 0; j < dimension.height; j++) {
					cells.push(this.mapper.toIndex({x: i + location.position.x, y: j + location.position.y}));
				}
			}
			return cells;
		}

		clear() {
			this.cells = [];
		}

		getLine(x, y, length:number):Array<number> {
			var currentCell,
				ret = [];

			for (var i = 0; i < length; i++) {
				currentCell = this.mapper.toIndex({x: x + i, y: y});
				if (currentCell == -1 || !this.cellIsEmpty(currentCell)) {
					return [];
				}
				ret.push(currentCell);
			}

			return ret;
		}

		getColumn(x, y, length:number) {
			var currentCell,
				i,
				ret = [];

			for (i = 0; i < length; i++) {
				currentCell = this.mapper.toIndex({x: x, y: y + i});
				if (currentCell == -1 || !this.cellIsEmpty(currentCell)) {
					return [];
				}
				ret.push(currentCell);
			}

			return ret;
		}

		tryAddElement(position:IPosition, item:IDimensions):boolean {
			var location = this.getCellsInArea(position, item);

			if (location.isBiggerThan(item)) {
				this.appendElement(SimpleLocation.create(position, item));
				return true;
			}
			return false;
		}

		getCellsInArea(startPosition:IPosition, dimension:IDimensions):ILocation {
			var cells = [],
				x = 1,
				y = 0,
				position,
				availableLines,
				availableColumns,
				dx = 1,
				columnsDone = false,
				linesDone = false,
				column, line;

			while (true) {
				line = y < dimension.height && !linesDone ? this.getLine(startPosition.x, startPosition.y + y, dx) : [];

				if (line.length == 0 && dx > 1) {
					dx--;
				}

				column = x < dimension.width && !columnsDone ? this.getColumn(startPosition.x + x, startPosition.y, dx) : [];

				availableColumns = column.length > 0;
				availableLines = line.length > 0;

				if (!availableColumns) {
					columnsDone = true;
				} else {
					x++;
				}

				if (!availableLines) {
					linesDone = true;
				} else {
					y++;
				}

				if (!columnsDone && !linesDone) {
					dx++
				}

				cells = cells.concat(line).concat(column);
				if (columnsDone && linesDone) {
					break;
				}
			}
			position = this.mapper.toPosition(cells[0]);
			return new SimpleLocation([x, y, position.x, position.y]);
		}

		private cellIsEmpty(index:number) {
			return this.cells[index] || this.cells[index] === undefined;
		}
	}
}