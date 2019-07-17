# data binding workshop

![](./disc-gif.gif)

## the challenge

you have this data:

```js
const data = [
  { id: 1, radius: 20, x: 150, color: '#2F4F4F' },
  { id: 2, radius: 10, x: 400, color: '#8B0000' },
  { id: 3, radius: 40, x: 650, color: '#708090' }
];
```

for each item of data we want to create three circles; Two dynamic circles that will increase and decrease when we press the buttons, and one static one that will always stay the same size.

### The static circle

The static circle will have radius of 100, a stroke-width of 3px, and be the colour stated in the data.

### The coloured-dynamic circle

The coloured-dynamic circle will have the radius and colour stated in the data and a stroke width of 1px.

### The coral-dynamic circle

The coral-dynamic circle will have a radius 5px bigger than the coloured-dynamic circle, stroke width of 3px and color: 'coral'.

The x value for each circle is in the data, the y value should position the circles in the vertical center of the svg.

The two dynamic circles will increase in size when we press the + button until it reaches the size of the static circle then it will remain that size, until the '-' button is pressed. When the dynamic circles reach the static circle they should change colour to be filled with the colour stated in the data, opacity: 0.5 (bonus points for make the colour fade in and out!)

### The text

Each circle will have text in the center of it that displays the radius of the circle (i.e. it will change when the radius changes). The font-size of this text should be half of the radius and should also increase/ decrease when the radius does.

## to run the app for development

in public

```
npm run build:watch
```

in server

```
npm start
```

go to http://localhost:3000
