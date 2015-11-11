/// <reference path="../modulove.d.ts"/>

module grids {
	export class Width implements ICoordinateMapper {
		width:number;
		height:number;

		constructor(width:number, height?:number) {
			this.width = width;
			this.height = height || null;
		}

		toIndex(position:IPosition) {
			return this.coordinateIsValid(position) ? this.width * position.y + position.x : -1;
		}

		toPosition(index:number):IPosition {
			return {
				x: Math.floor(index % this.width),
				y: Math.floor(index / this.width)
			};
		}

		coordinateIsValid(position:IPosition) {
			if (this.height != null && position.y > this.height - 1) {
				return false;
			}
			return (position.x < this.width);
		};

		getMaxWidth() {
			return this.width;
		}

		getMaxHeight() {
			return this.height;
		}
	}
}