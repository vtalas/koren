declare module grids {
	export interface IGrid {
		getMax: () => IPosition;
		getFirstEmpty: (start?:IPosition) => IPosition;
		tryAddElement: (startPosition:IPosition, dimension:IDimensions) => boolean;
		appendElement: (item:ILocation) => boolean;
		getCellsInArea: (startPosition:IPosition, dimension:IDimensions) => ILocation;
		clear: () => void;
	}

	export interface ICoordinateMapper {
		toIndex: (position:IPosition) => number;
		toPosition: (index:number) => IPosition;
		coordinateIsValid: (position:IPosition) => boolean;
		getMaxHeight: () => number;
		getMaxWidth: () => number;
	}

	export interface IConvert {
		toPx: (points) => number;
		toPoint: (pixels) => number;
	}

	export interface IDimensions {
		width: number;
		height: number;
	}
	export interface IContainerSettings {
		width?: number;
		height?: number;
		step?: number;
	}

	export interface ILocation {
		item: IDimensions;
		position: IPosition;
		setPosition: (pos:IPosition) => void;
		equalsTo: (location:ILocation) => boolean;
		isBiggerThan: (dimension:IDimensions) => boolean;
	}

	export interface ILocationView {
		top: number;
		left: number;
		width:number;
		height: number;
	}

	export interface IPosition {
		x: number;
		y: number;
	}


}
