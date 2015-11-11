/// <reference path="../modulove.d.ts"/>

module grids {

	export class Height implements ICoordinateMapper {
		height:number;

		constructor(height:number) {
			this.height = height;
		}

		toIndex(position:IPosition) {
			return this.coordinateIsValid(position) ? this.height * position.x + position.y : -1;
		}

		toPosition(index:number):IPosition {
			return {
				x: Math.floor(index / this.height),
				y: Math.floor(index % this.height)
			};
		}

		coordinateIsValid(position:IPosition) {
			return (position.y < this.height);
		};

		getMaxWidth() {
			return null;
		}

		getMaxHeight() {
			return this.height;
		}
	}
}
