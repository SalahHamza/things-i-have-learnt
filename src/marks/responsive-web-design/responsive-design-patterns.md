# Responsive Design Patterns

## Mostly fluid

The mostly fluid pattern consists primarily of a fluid grid. On large or medium screens, it usually remains the same size, simply adjusting the margins on wider screens.

On smaller screens, the fluid grid causes the main content to reflow, while columns are stacked vertically. One major advantage of this pattern is that it usually only requires one breakpoint between small screens and large screens.

**[Example](/build/pages/responsive-design-patterns/mostly-fluid/index.html)**

## Column Drop

On full-width **column drop** starts with a multi-column layout and ends up with a single column layout, dropping columns along the way as screen sizes get narrower (i.e. not enough space for the content). Unlike the **Mostly Fluid** pattern, the overall size of elements in this layout tend to stay consistent.

**[Example](/build/pages/responsive-design-patterns/column-drom/index.html)**

## Layout Shifter

This pattern does the most to adapt across different screen sizes. That is, different layouts are used on large, medium, and small screens.

Key to this layout is the way content moves about, instead of reflowing and dropping below other columns. Due to the significant differences between each major breakpoint, it is more complex to maintain and likely involves changes within elements, not just overall content layout.

**[Example 1](/build/pages/responsive-design-patterns/layout-shifter/example_1/index.html)**, **[Example 2](/build/pages/responsive-design-patterns/layout-shifter/example_2/index.html)**, **[Example 3](/build/pages/responsive-design-patterns/layout-shifter/example_3/index.html)**

## Off Canvas

Rather than stacking content vertically, the off canvas pattern places less frequently used content—perhaps navigation or app menus—off screen, only showing it when the screen size is large enough, and on smaller screens, content is only a click away.

**[Example](/build/pages/responsive-design-patterns/off-canvas/index.html)**

## Example - Hometown Page

**[First Layout](/build/pages/responsive-design-patterns/rdp-hometown/first_layout/index.html)**, **[Second Layout](/build/pages/responsive-design-patterns/rdp-hometown/second_layout/index.html)**

## Useful links

* Google's - **[Responsive Web Design Patterns](https://developers.google.com/web/fundamentals/design-and-ux/responsive/patterns#layout_shifter)** by [Pete LePage](https://developers.google.com/web/resources/contributors/petelepage).

* **[Multi-Device Layout Patterns](https://www.lukew.com/ff/entry.asp?1514)** by [Luke Wroblewski](https://www.lukew.com/about/)

* **[Responsive Design](https://responsivedesign.is/patterns)** by JUSTIN AVERY