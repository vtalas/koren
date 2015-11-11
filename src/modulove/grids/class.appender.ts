/// <reference path="../modulove.d.ts"/>
/// <reference path="../location/class.location.viewable.ts"/>
/// <reference path="../location/class.location.simple.ts"/>

module grids {
	export class Appender {
		grid:IGrid;
		locations:Array<ILocation>;
		convert:IConvert;

		constructor(grid:grids.IGrid, convert:grids.IConvert, data:Array<grids.ILocation>) {
			this.grid = grid;
			this.convert = convert;
			var self = this;

			var a = data.filter(a => a.position && a.position.x != -1 );
			var b = data.filter(a => !a.position || a.position && a.position.x == -1 );

			this.locations = a.concat(b).map((item) => {
				return self.findPositionForItem(item);
			});
		}

		findPositionForItem(location:ILocation, startPosition?:IPosition):ILocation {
			var position,
				i = 0;

			var item = location.item;

			if (location.position && location.position.x != -1 && location.position.y != -1) {
				this.grid.appendElement(location);
				return location;
			}

			while (true) {
				i++;
				if (i == 120) {
					console.log("break! (todo)");
					location.setPosition({x: -5, y: 0});
					return location;
				}
				position = this.grid.getFirstEmpty(startPosition);

				if (position == null) {
					location.setPosition({x: -1, y: -1});
					return location;
				}

				if (this.grid.tryAddElement(position, item)) {
					location.setPosition(position);
					return location;
				}
				startPosition = position;
			}
		}

		getContainerDimensions():IDimensions {
			var maxPosition = this.grid.getMax();
			return {width: this.convert.toPx(maxPosition.x), height: this.convert.toPx(maxPosition.y)};
		}

		recalculate() {
			//TODO v.talas 
			//this.grid.clear();
			//for (var i = 0; i < this.locations.length; i++) {
			//	var obj = this.locations[i];
			//	obj = this.findPositionForItem(obj.item);
			//}
		}
	}
}

