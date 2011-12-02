Crooked Teeth
=============

Crooked Teeth is a jQuery plug-in you can use to make page elements crooked. Jump to the [http://ansonparker.github.com/Crooked-Teeth](example site) to see Crooked Teeth in action.

_CAVEAT EMPTOR_ Crooked Teeth uses canvas for drawing so IE is not currently supported. But it should just fail silently.

Usage
-----

Download the plugin and include it in your html pages. Then simply call the `crookedTeeth()` method on any jQuery selector. 

When applied to an element Crooked Teeth will use the border width (which can vary on each side) as a guide for how crooked it can make an element. So with a 5 pixel border, the new crooked border will stay within that guide.

If an element has no border Crooked Teeth will use the padding width as its variance range. Otherwise you can pass in a parameter "amount" to override this. You can specify widths in the CSS shorthand:

* A single value will apply equally to all for sides
* Two values separated by a space will apply to the top & bottom and left & right sides respectively
* Three values separated by a space will apply to the top, right & left and bottom sides respectively
* Four values will.. I think you get the point!

Settings
--------

You can pass Crooked Teeth a number of parameters to control its output:

* amount -- the integer amount of distortion or "crookedness" of the box (or each side if more than one value given)
* xwobble -- (defaults to true) - whether or not to distort horizontally
* ywobble -- (defaults to true) - whether or not to distort vertically
* xsymmetry -- true/false, the x-component of the distortion will be the same on both sides
* ysymmetry -- true/false, the y-component of the distortion variance will be the same on both sides
* connect -- values are "vertical" or "horizontal". Used for connecting adjacent elements together (suppressing distortion on shared sides)

Examples
--------

See [http://ansonparker.github.com/Crooked-Teeth] for a demo of Crooked Teeth in action

To-Do
-----

* Allow user to specify distortion (not random)
* Optionally allow randomness to be repeatable with a seed value (for consistent appearance)
* Allow for other shapes (perhaps multiple random points per side) as well as blobs and curves
* Allow `crookedTeeth()` to run multiple times on an element with expected results (preserve initial element state)
* Better cross-browser support