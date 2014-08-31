(function() {
	"use strict";

	var proto = Object.create( HTMLElement.prototype ),
		sides = [ "cube-front", "cube-back", "cube-top", "cube-bottom", "cube-left", "cube-right" ];

	proto.createdCallback = function() {
		var base = document.createElement( "cube-base" ),
			cube = this;

		this.appendChild( base );
		sides.forEach(function( value ) {
			base.appendChild( cube.querySelector( value ) );
		});

		this.resize();
	};
	proto.getSize = function() {
		var size = this.getAttribute( "size" ) || "100";
		return parseInt( size, 10 );
	};
	proto.resize = function() {
		var cube = this,
			size = this.getSize() + "px",
			halfSize = this.getSize() / 2,
			front = cube.querySelector( "cube-front" ),
			back = cube.querySelector( "cube-back" ),
			top = cube.querySelector( "cube-top" ),
			bottom = cube.querySelector( "cube-bottom" ),
			left = cube.querySelector( "cube-left" ),
			right = cube.querySelector( "cube-right" ),
			zTransformString = "translateZ(" + halfSize + "px)";

		cube.style.height = size;
		cube.style.width = size;

		sides.forEach(function( side ) {
			var node = cube.querySelector( side );
			node.style.height = size;
			node.style.width = size;
		});

		this.styleBase();

		front.style.webkitTransform = front.style.transform = zTransformString;
		back.style.webkitTransform = back.style.transform =
			"rotateX(-180deg) " + zTransformString;
		top.style.webkitTransform = top.style.transform = "rotateX(90deg) "
			+ zTransformString;
		bottom.style.webkitTransform = bottom.style.transform =
			"rotateX(-90deg) " + zTransformString;
		left.style.webkitTransform = left.style.transform =
			"rotateY(-90deg) " + zTransformString;
		right.style.webkitTransform = right.style.transform
			= "rotateY(90deg) " + zTransformString;
	};
	proto.styleBase = function() {
		var base = this.querySelector( "cube-base" ),
			face = this.getAttribute( "face" ),
			halfSize = this.getSize() / 2,
			rotateString =
				( face == "back" ) ? "rotateX(-180deg)" :
				( face == "top" ) ? "rotateX(-90deg)" :
				( face == "bottom" ) ? "rotateX(90deg)" :
				( face == "left" ) ? "rotateY(90deg)" :
				( face == "right" ) ? "rotateY(-90deg)" : "";

		base.style.webkitTransform = base.style.transform =
			"translateZ(-" + halfSize + "px) " + rotateString;
	};
	proto.attributeChangedCallback = function( attrName, oldVal, newVal ) {
		if ( attrName === "face" || attrName === "size" ) {
			this.resize();
		}
	};

	document.registerElement( "cube-3d", {
		prototype: proto
	});
	document.registerElement( "cube-base", {
		prototype: Object.create( HTMLElement.prototype )
	});
	sides.forEach(function( value ) {
		document.registerElement( value, {
			prototype: Object.create( HTMLElement.prototype )
		});
	});
}());