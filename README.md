# react-neon

React Neon is a library to put a canvas on top of a component in order to draw a graphic effect. It's a bit like a post-processing graphical shader. A set of effects is included, with a base class to define new effects too. 

# Using react-neon

Install the module using `npm i react-neon` first, then import it in to your React app using `import withNeon from 'react-neon';` in your code. If you're using one of the included effects you'll also need to import the fx using `import withNeon, { fx } from 'react-neon';` .

withNeon is a React HoC, so you can use it when you export your component class and define an effect at the same time.

```export class withNeon(myComponent, new fx.Particles());```

# TODO

* Element mapper
* Canvas overlay (done)
* Resize observer (done)
* Scrolling updater / intersection observer
* Inject TWGL for WebGL shader effects (or minimal alternative)
* Perf timer
* React/Vue/framework version
* Register of active effects
* FX Plugins (done)
* NPM module (done)
* Tests
* Stencil (shape-outside?)
