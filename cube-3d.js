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
	proto.getHeight = function() {
		var height = this.getAttribute( "height" ) || "100";
		return parseInt( height, 10 );
	};
	proto.getWidth = function() {
		var width = this.getAttribute( "width" ) || "100";
		return parseInt( width, 10 );
	};
	proto.resize = function() {
		var cube = this,
			height = this.getHeight() + "px",
			width = this.getWidth() + "px",
			halfHeight = this.getHeight() / 2,
			halfWidth = this.getWidth() / 2,
			front = cube.querySelector( "cube-front" ),
			back = cube.querySelector( "cube-back" ),
			top = cube.querySelector( "cube-top" ),
			bottom = cube.querySelector( "cube-bottom" ),
			left = cube.querySelector( "cube-left" ),
			right = cube.querySelector( "cube-right" ),
			zTransformString = "translateZ(" + halfHeight + "px)",
			rightPosition = this.getWidth() - halfHeight;

		cube.style.height = height;
		cube.style.width = width;

		sides.forEach(function( side ) {
			var node = cube.querySelector( side ),
				rightOrLeft = /(left|right)/.test( side );

			node.style.height = height;
			node.style.width = rightOrLeft ? height : width;
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
			= "rotateY(90deg) translateZ(" + rightPosition + "px)";
	};
	proto.styleBase = function() {
		var base = this.querySelector( "cube-base" ),
			face = this.getAttribute( "face" ),
			halfSize = this.getHeight() / 2,
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
		if ( attrName === "face" || attrName === "height" || attrName === "width" ) {
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