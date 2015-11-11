/// <reference path="../modulove.d.ts"/>

/// <reference path="component.gridBox.ts"/>
/// <reference path="../class.moduloveFactory.ts"/>
/// <reference path="../../../libs/bobril/dist/bobril.d.ts"/>

module fillGridDemo {

	import Modulove = modulove.Modulove;
	export var moduloveComponent:IBobrilComponent;
	export interface IModuloveCtx {
		data: {
			items: Array<grids.ILocation>;
			container: grids.IContainerSettings;
			itemRender: (item:grids.ILocation, convert:grids.IConvert) => any
		}
	}

	moduloveComponent = {
		render(ctx:IModuloveCtx, me:IBobrilNode): void {
			var mod = this.createMod(ctx),
				containerDimensions = mod.renderer.getContainerDimensions(),
				containerStyle = ctx.data.container.style || {};

			containerStyle.width = containerDimensions.width;
			containerStyle.height = containerDimensions.height;
			containerStyle.position = "relative";

			me.tag = "div";
			me.attrs = {tabindex: 0};
			me.style = containerStyle;
			me.className = "modulove-component";
			me.children = this.getChildren(mod, ctx);
		},

		getChildren(mod:Modulove, ctx) {
			var elements = [],
				i,
				item,
				box;

			for (i = 0; i < mod.locations.length; i++) {
				item = mod.locations[i];
				box = ctx.data.itemRender(item, mod.renderer.convert);
				elements.push(box);
			}
			return elements;
		},

		createMod(ctx:IModuloveCtx): Modulove {
			var data = ctx.data.items,
				containerSettings = ctx.data.container;

			return new modulove.Modulove(containerSettings, data);
		}
	};

}