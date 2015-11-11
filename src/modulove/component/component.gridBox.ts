/// <reference path="../modulove.d.ts"/>
/// <reference path="../location/class.location.viewable.ts"/>
/// <reference path="../../../libs/bobril/dist/bobril.d.ts"/>
/// <reference path="../../../libs/velocity/velocity-animate.d.ts"/>

module Grida {
	export var GridBox:IBobrilComponent;
	export interface IGridBoxData {
		animate: boolean;
		location: grids.ILocation;
		convert: grids.IConvert;
		children: any;
	}

	interface IGridBoxCtx {
		data: IGridBoxData
	}
	GridBox = {
		render(ctx:IGridBoxCtx, me:IBobrilNode):void {
			var viewable = new grids.ViewAble(ctx.data.location, ctx.data.convert),
				width = viewable.width - 5,
				height = viewable.height - 5,
				top = viewable.top,
				animate = ctx.data.animate,
				left = viewable.left;

			me.tag = "div";
			me.style = {
				backgroundColor: "gray",
				opacity: 0.6,
				position: "absolute",
				width: width,
				height: height
			};

			if (!animate) {
				me.style.left = left;
				me.style.top = top;
			}
			me.children = ctx.data.children;

		},
		postInitDom(ctx:IGridBoxCtx, me:IBobrilCacheNode, element:HTMLElement) {
			if (!ctx.data.animate) {
				return;
			}
			var x =  Math.floor((Math.random() * 500));
			element.style.top = x + "px";
			element.style.left = x + "px";

			var viewable = new grids.ViewAble(ctx.data.location, ctx.data.convert);

			Velocity(element, {
				translateX: viewable.left - x,
				translateY: viewable.top - x
			}, {duration: Math.floor((Math.random() * 1000) + 200)});
		}
	}
}
