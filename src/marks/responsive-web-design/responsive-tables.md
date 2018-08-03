# Responsive Tables

## Hidden Columns
The concept here is to hide columns based on their importance as the viewport gets smaller. This can be done by applying a `display: none` on the columns you want to hide at a certain breakpoint.

The bad thing about hidden columns technique is that the hidden columns are not seen by search engines or screen readers.

## No More Tables
With the no more tables technique, below a certain viewport width, the table is collapsed and resembles a long list, as opposed to a table data.

The nice thing about this technique is all of the data is visible no matter what the size of the viewport is.

**Implementation**:
```css
table, thead, tbody, th, td, tr {
  display: block;
}
```
We set a `display: block` on **table**, **thead**, **tbody**, **th**, **td** and **tr** to render them one on top of the other.
```css
thead tr {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
```
Instead of setting `display: none` to the header, we position it off the screen so that it's still accessible to screen readers and search engines.
```css
td {
  position: relative;
  padding-left: 50%;
}
```
The table cells are now displayed as full width block elements, some left padding maybe needed and also set the position on these elements to relative.
```css
td::before {
  position: absolute;
  left: 6px;
  content: attr(data-th);
  font-weight: bold;
}
```
To add the row labels, You may use the before pseudo selector and add `td:before`, and inside, set the position to `left: 6` pixels so that you get it positioned in the right place.

This emplies that you should set a `data-th` attribute on all the `tr` elements in the `tbody`.

**[No More Tables - example](https://codepen.io/JohnMav/pen/BoGJNy)**.

## Contained Scrolling

All you've got to do here is wrap the table with a `div`, set its `width: 100%` and `overflow-x: auto`.
```css
div.target-table {
  width: 100%;
  overflow-x: auto;
}
```

**[Contained Scrolling - example](https://codepen.io/JohnMav/pen/Mazrwm)**.

## Useful links

* **[Responsive data table roundup](https://css-tricks.com/responsive-data-table-roundup/)**
* **[Difference Between 'display: none' and 'visibility: hidden' in CSS](https://www.lifewire.com/display-none-vs-visibility-hidden-3466884)**