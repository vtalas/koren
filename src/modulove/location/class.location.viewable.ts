/// <reference path="../modulove.d.ts"/>

module grids {
	export class ViewAble implements ILocationView {
		top:number;
		left:number;
		width:number;
		height:number;

		constructor(data:ILocation, convert:IConvert) {
			this.width = convert.toPx(data.item.width);
			this.height = convert.toPx(data.item.height);
			if (data.position == null) {
				data.position = {};
				data.position.x = -3;
				data.position.y = 0;
			}
			this.top = convert.toPx(data.position.y);
			this.left = convert.toPx(data.position.x);
		}
	}
}