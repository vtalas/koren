/// <reference path="../modulove.d.ts"/>
/// <reference path="../class.moduloveFactory.ts"/>

import ModuloveFactory = modulove.Modulove;
var itemData = [
	[1, 1],
	[1, 1],
	[3, 3, 1, 1],
	[3, 2],
	[2, 2],
	[3, 2],
	[1, 1],
	[1, 1],
];

var items = itemData.map((item) => {
		return new grids.SimpleLocation([item[0], item[1], item[2], item[3]]);
	}
);

var settings = {
	width: 200,
	step: 20
};
var x = new ModuloveFactory(settings, items);

//items should have positions computed
console.log(x.getLocations());