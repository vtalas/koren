/// <reference path="../modulove.d.ts"/>

module grids {
	export class SimpleLocation implements ILocation {
		item:grids.IDimensions;
		position:grids.IPosition;

		constructor(data?) {
			if (!data) {
				return;
			}
			this.position = {x: data[2] == undefined ? -1 : data[2], y: data[3] == undefined ? -1 : data[3]};
			this.item = {width: data[0], height: data[1]};
		}

		static create(position, item) {
			var simpleLocation = new SimpleLocation();
			simpleLocation.item = item;
			simpleLocation.position = position;
			return simpleLocation;
		}

		setPosition(position:IPosition) {
			this.position = position;
		}

		isBiggerThan(dimension:IDimensions) {
			return (this.item.width >= dimension.width && this.item.height >= dimension.height);
		}

		equalsTo(location:ILocation) {
			return this.item.height == location.item.height &&
				this.item.width == location.item.width &&
				this.position.x == location.position.x &&
				this.position.y == location.position.y;
		}
	}

}