# Flexbox

Let's say we have a set of items with a container around them, like this:
```html
<div class="container">
  <div class="item green"></div>
  <div class="item blue"></div>
  <div class="item red"></div>
  <div class="item yellow"></div>
</div>
``` 
And we want to lay them out in a certain order, size and even space them out properly. Flexbox gives us the ability to that and more.
To work with flexbox we should first set the flexbox container’s **display** property to `flex`.
```css
.container {
   display: flex;
}
```

------------------------
## Ordering & Orientation

### Flex Direction
The **flex-direction** property sets the main-axis and cross-axis, if the main-axis is horizontal then the cross-axis is vertical, and vise-versa, it takes 4 different values:

* **row** (default): The main-axis is the horizontal axis, left to right.
* **row-reverse**: The main-axis is the horizontal axis, right to left.
* **column**: The main-axis is the vertical axis, top to bottom.
* **column-reverse**: The main-axis is the vertical axis, bottom to top.
```css
.container {
  display: flex;
  flex-direction: column;
}
```


### Flex Wrap:
By default the flex container will try to contain the items within it even if their width exceeds its width, but if there are too many items, they will eventually overflow, and that’s because, by default the **flex-wrap** property is set to `nowrap`, which makes the flex items lay out in a single line. When that happen we can fix it by resetting the **flex-wrap** property to either `wrap` or `wrap-reverse`.

* **nowrap** (default): The flex items are laid out in a single line which may cause the flex container to overflow. The cross-start is either equivalent to start or before depending flex-direction value. This is the default value.
* **wrap**: The flex items break into multiple lines. The cross-start is either equivalent to start or before depending flex-direction value and the cross-end is the opposite of the specified cross-start.
* **wrap-reverse**: Behaves the same as wrap but cross-start and cross-end are permuted.

**Note**: *cross-start and cross-end are the start and end of the cross axis.*

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

### Flex flow:
The **flex-flow** property is a container property (i.e. applies on the flex container) and is a shorthand for **flex-direction** and **flex-wrap**, it also takes the same default values `row`& `nowrap`.

```css
.container {
  display: flex;
  flex-flow: row wrap;
}
```

------------------------
## Alignment

### Justify Content:
The property **justify-content** is a flex items property, it allows us to define how the flex items are aligned along the main-axis, and it does that by distributing extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.

* **flex-start** (default): it doesn’t distribute any leftover space, instead it keeps it to the right of the flex items.
* **flex-end**: same as  flex-start, except it puts the leftover space to the left of the flex items pushing the flex items to the right.
* **center**: evenly divides the leftover space between the left and right side of all the flex items.
* **space-between**: evenly divides the leftover space between flex items.
* **space-around**: evenly divides the leftover space between the left and right side of each flex item.

*Concerned with the flex items and not the flex container, but it is applied on the flex container.*

```css
.container {
  display: flex;
  justify-content: center;
}
```

### Align items:
The property **align-items** is just like **justify-content** except it allows us to align *all* flex items along the cross-axis.

* **stretch** (default): the items stretch to fill the container, and the height of the container is defined by the tallest item (so, basically the items take the height of the tallest one of them).
* **flex-start**: aligns flex items to the start of the flex container (top if the main-axis is the horizontal, left if the main-axis is the vertical axis).
* **flex-end**: aligns flex items to the end of the flex container (bottom if the main-axis is the horizontal, right if the main-axis is the vertical axis).
* **center**: aligns the items in the center of the flex container.
* **baseline**: If the items run along the block direction (i.e. container's **flex-direction** is `column` or `column-reverse`) the value acts exactly like **flex-start**, Otherwise teh items are aligned such as their [baselines align](https://www.w3.org/TR/css-align-3/#baseline-values)

*Concerned with the flex items and not the flex container, but it is applied on the flex container.*
```css
.container {
  display: flex;
  align-items: flex-end;
}
```

------------------------
## Flexibility

### Flex grow:
The **flex-grow** (longhand) property sets the flex factor which determines how much the flex item will grow relative to the rest of the flex items in the flex container when positive free space is distributed.
Only accepts positive numbers.
Default 0.


#### Useful links
* [**Flexbox Spec**](https://www.w3.org/TR/css-flexbox-1/)
* MDN's [**Basic Concepts of Flexbox**](https://developer.mozilla.org/enUS/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
* CSS Ticks' [**A Guid To Flexbox**](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [**Flex Cheatsheet**](https://yoksel.github.io/flex-cheatsheet) by [@yoskel](https://github.com/yoksel)
* [**Flexbox generator**](http://bennettfeely.com/flexplorer/)
