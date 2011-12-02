Crooked Teeth
=============

*Crooked Teeth* is a jQuery plug-in you can use to make boxes crooked.

Usage
-----

Download the plugin and include it in your html pages. Then simply call the crooked method on any elements you'd like to en-crooked-inate.

When applied to an element Crooked Teeth will use the border width (which can vary on each side) as a guide for how crooked it can make an element. So with a 5 pixel border, the new crooked border will stay within that guide.

If an element has no border Crooked Teeth will use the padding width as its variance range. Otherwise you can pass in a parameter "amount" to override this. You can specify widths in the CSS shorthand:

* A single value will apply equally to all for sides
* Two values separated by a space will apply to the top & bottom and left & right borders respectively
* etc.

Settings
--------

You can pass Crooked Teeth a number of parameters to control its output:

* amount -- the amount of border variance or "crookedness" of the box
* xwobble -- defaults to true - whether or not to vary the border horizontally
* ywobble -- defaults to true - whether or not to vary the border vertically
* xsymmetry -- the x-component of the border variance will be symmetrical
* ysymmetry -- the y-component of the border variance will be symmetrical
* connect -- values are "vertical" or "horizontal". Used for chaining adjancent elements together

Demo
----

See [http://ansonparker.github.com/Crooked-Teeth] for a demo of Crooked Teeth in action



