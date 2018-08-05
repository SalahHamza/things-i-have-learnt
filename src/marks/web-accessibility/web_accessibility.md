# Web Accessibility

## Overview

### What is Accessibility

> Broadly speaking, when we say a site is accessible, we mean that the site's content is available, and its functionality can be operated, by literally *anyone*.

and it also

> refers to the experience of users who might be outside the narrow range of the "typical" user, who might access or interact with things differently than you expect. Specifically, it concerns users who are experiencing some type of impairment or disability — and bear in mind that that experience might be non-physical or temporary.

### Web Content Accessibility Guidelines (WCAG)

> Web Content Accessibility Guidelines (WCAG) 2.0 covers a wide range of recommendations for making Web content more accessible.

**WCAG** revolves around 4 principles labelled **[POUR](https://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head)**:

1. **Perceivable**: Users must be able to perceive the information being presented (it can't be invisible to all of their senses)
2. **Operable**: Users must be able to operate the interface (the interface cannot require interaction that a user cannot perform)
3. **Understandable**: Users must be able to understand the information as well as the operation of the user interface (the content or operation cannot be beyond their understanding)
4. **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents (browsers), including assistive technologies.

**WCAG** can be a bit overwhelming that's where the [**Web AIM checklist**](https://webaim.org/standards/wcag/checklist) comes in hand. The **Web AIM** checklist is (in a nutshell) an easy-to-read, well-structured "summary" of the **WCAG**.

## Focus

### What is Focus?

> Focus refers to which control on the screen (an input item such as a field, checkbox, button, or link) currently receives input from the keyboard, and from the clipboard when you paste content.

### why is this important?

> Some users operate their computer almost entirely with the keyboard or other input device. For those users, focus is critical; it's their primary means of reaching everything on the screen.

Which is why the [Web AIM check list section **2.1.1**](https://webaim.org/standards/wcag/checklist#sc2.1.1) states that **All page functionality is available using the keyboard, unless the functionality cannot be accomplished in any known way using a keyboard (e.g., free hand drawing)**.

### how do you know if an item is focused?

> The currently focused item is often indicated by a focus ring, the style of which depends on both the browser and on any styling the page author has applied.

### focusable elements

Some native HTML elements are focusable by design and don't require the page author to explicitly insert them into the tab order, elements like text fields, select lists, links, buttons, ...etc. But other native elements are not focusable by design.

> There's generally no need to focus something if the user can't interact with it.

### DOM order matters!

Native HTML elements are automatically inserted into the tab order based on their position in the DOM. Sometimes the author of the page may change the visual order of the elements using CSS, but the DOM order remains the same and that may cause a confusion to users who rely heavily on the keyboard.

That's why the [Web AIM check list section **1.3.1**](https://webaim.org/standards/wcag/checklist#sc1.3.2) states that **The reading and navigation order (determined by code order) is logical and intuitive**.

### manipulate the tab order (tabindex)

There are some instances where you would want to manipulate the tab order and that can be done with the `tabindex` attribute.

> `tabindex` can be applied to any element — although it is not necessarily useful on every element — and takes a range of integer values. Using tabindex, you can specify an explicit order for focusable page elements, insert an otherwise unfocusable element into the tab order, and remove elements from the tab order.

* `tabindex="-1"`:
  - The element is not in the natural tab order.
  - The element can be programmatically focused with the **`focus()`** method.
* `tabindex="0"`:
  - The element is in the natural tab order.
  - The element can be programmatically focused with the **`focus()`** method.
* `tabindex="n"` (n>=1):
  - The element is in the natural tab order.
  - The element jumps to the front of the natural tab order.

**Note**: Using a tab order greater than 0 is discouraged and considered **anti-pattern**.

> Ideally, if you need to put something earlier in the tab order, the best bet is to move it up in the DOM.

### focus management

Managing focus is the concept of manipulating the tab order to be logical and intuitive. These are some of the scenarios where focus management can be crucial:

* **Managing focus at the page level**:

You might be using URL fragment identifiers to travel through the page content or building a single page web app where the visible content change without page refresh. In that case the best way to identify the selected content area is to give it a `tabindex="-1"` so that it doesn't appear in the natural tab order, and call its `focus()` method.

* **Managing focus in components**:

When building custom components you'd want to provide logical keyboard manipulation similar to the native component your custom component is based on.

The [**ARIA Authoring Practices**](https://www.w3.org/TR/wai-aria-practices/) guid, lists types of components and what kinds of keyboard actions they support.

* **Modals and keyboard traps**:

Keyboard trap happens when an element captures the tab and prevents the user from leaving it until it's complete. This can bothersome to the user, that's why the [Web AIM checklist section **2.1.2**](http://webaim.org/standards/wcag/checklist#sc2.1.2) states that **keyboard focus should never be locked or trapped at one particular page element**.

Although the aforementioned behavior can be very frustrating, there are cases where it helps the page author provide better accessibility. The modal for example when the modal is displayed you'd want the tab to be trapped in it until the user completes whatever functionality the modal provides or closes it.

The steps to build a temporary keyboard trap in the modal:

  1. Select the modal and modal-overlay using `document.querySelector`.

  2. Listen for keyboard events like `tab` & `tab`+`SHIFT` for moving forward and backwards through modal elements, `ESC` to close the modal so that the user doesn't have to search for a close button. You should also listen to click events on overlay & modal close button.  

  3. Store a reference of the element that was focused before the modal was opened.

  4. Select all focusable elements within the modal using `document.querySelectorAll`.
  
  Instead of selecting elements separately you can pass this line of code that selects all potentially focusable elements:
  ```js
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  const focusableElements = modal.querySelectorAll(focusableElementsString);
  ```
  The reason for doing this is to keep an eye on the first and last elements in the modal so that we know when to loop back. 

  **i.e** if the currently focusable element is the last and the user presses `tab` the focus should go to the first element in the modal. And if the currently focusable element is the first and the user presses `tab`+`SHIFT` the focus should go to the last element.

  5. Display the modal window and focus the first focusable element.
  
  6. Basically, the user does what he wants to do.
  
  7. When the user closes the modal, return the focus to the element we kept reference to in step **3**.
  
  8. You can now be happy knowing you've provided your users with an accessible modal window :).
  
## Semantics Basics

### Assistive Technology

Assistive technology is a generic term that describes tools used by people with disabilities to accomplish tasks.

There are many assistive technologies people might use to access your web sites:

* Screen readers
* Screen magnification software
* Speech input software
* Text readers
* Alternative input devices
  - Head pointers
  - Motion tracking or eye tracking
  - Single switch entry devices

Read more about the [types of assistive technologies](https://webaccess.berkeley.edu/resources/assistive-technology).

The point is, as a developer you must consider that users may access your website using any of the aforementioned assistive technologies that rely on *programmatically expressed semantics* to create an accessible user experience.

### Affordance

> An affordance is any object that offers, or affords, its user the opportunity to perform an action. The better the affordance is designed, the more obvious or intuitive its use.

For example a well designed button *affords* being clicked, or a checkbox affords being checked (yes) or unchecked (no).

### Screen readers

A screen reader is a software used by blind or visually impaired people to read the content of the computer screen.

You should expect a well-designed reader to tell you all, or at least most, of the following information about the elements it encounters.

* The element's **role** or type, if it is specified (it should be).
* The element's **name**, if it has one (it should).
* The element's **value**, if it has one (it may or may not).
* The element's **state**, e.g., whether it is enabled or disabled (if applicable).

### The accessibility tree

The accessibility tree is a modified DOM tree that the browser presents to assistive technologies. It only contains the necessary information about each element's affordances for the user to know how to interact with that element.

### Semantics in native HTML

> A browser can transform the DOM tree into an accessibility tree because much of the DOM has *implicit* semantic meaning.

That is why it is usually better to use native HTML elements that are recognized by browsers and work predictably on a variety of platforms, so that we can take advantage of that built in accessibility.

For example a `span` can be used to construct an element that looks like a button and then add it to the tab order by setting its `tabindex` attribute, instead of that, we can just use the `button` element.

Also, input or control elements, and visual content like images, we need to make sure that we specify a name. And we can do that by giving them:

* Visible labels, which are used by all users to associate meaning with an element, and/or
* Text alternatives, which are only used when there is no need for a visual label.

Which is why the [Web AIM check list section **1.1.1**](https://webaim.org/standards/wcag/checklist#g1.1) states that developers should **Provide text alternatives for any non-text content**.

### Text Alternatives for images

> Images are an important component of most web pages, and are of course a particular sticking point for low-vision users. We must consider the role an image plays in a page to work out what type of text alternative it should have.

If an image doesn't have an `alt` attribute, a screen reader will announce this image using its literal name `/name-of-image-file.ext`.

The `alt`attribute comes in action when the image:
* fails to load,
* is accessed by a web crawler, or
* is encountered by a screen reader

In a nutshell:

* `alt` attributes should be set on every image.

* `alt` attributes should be descriptive for important images.

* `alt` attributes should be empty for images that are just decorations `alt=""`.


### Navigating content

On content-heavy pages, such as wikipedia, it's not practical to read through everything from the top down, that's why screen reader users often rely on a list of headings to locate information.

#### Using Headings effectively

* Every page should have an h1 heading.
* You should not skip heading levels, such as jumping from `<h2></h2>` to an `<h4></h4>` going down the page.
* Headings should be used to divide content into meaningful sections, not to format text.
* Nest headings by their rank (or level). Headings with an equal or higher rank start a new section, headings with a lower rank start new subsections that are part of the higher ranked section.
* Not all headings should be visible. Sometimes the role/title of a section is perfectly clear to people who can see the page, but not for the visually impaired, in that case it is good to move the said header off-screen.

**Note**: When hiding content that you want only screen reader users to see, don't use `display: none` or `visibility: hidden`. There are other ways to create [invisible Content Just for Screen Reader Users](https://webaim.org/techniques/css/invisiblecontent/).

#### Other navigation options

Screen reader users may use other elements to navigate around the page, including links, form controls, and landmarks.

That's why, when making your links make sure to:

* use descriptive text, such as instead of "Read more" you can use "Read more about XXXXX",
* avoid using Javascript to open link, this will not give screen readers enough information.
* avoid using anchor tags as buttons, use `button` element and then style it with CSS if that's what you are going for.

Also, HTML5 introduced some new elements that help define the semantic structure of the page, including `header`, `footer`, `nav`, `article`, `section`, `main`, and `aside`. The use of these elements support keyboard navigation to the structure of a web page for screen reader users. [Read more about page landmarks](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/index.html).

## Resources

* [**Google Web Training - Accessibility**](https://developers.google.com/web/fundamentals/accessibility/)
* [**Udacity course on Accessibility**](https://mena.udacity.com/course/web-accessibility--ud891)
* [**Removing Headaches from Focus Management**](https://developers.google.com/web/updates/2016/03/focus-start-point?hl=en)
* [**Web Content Accessibility Guidelines (WCAG) 2.0**](https://www.w3.org/TR/WCAG20/)
* [**Web AIM checklist**](https://webaim.org/standards/wcag/checklist)
* [**Berkeley Web Access**](https://webaccess.berkeley.edu/)
* [**What Are Affordances in Web Design?**](http://blog.teamtreehouse.com/affordances-web-design)
* [**Web AIM - Semantic Structure**](https://webaim.org/techniques/semanticstructure/)
* [**Web Accessibility Evaluation Tool (WAVE)**](http://wave.webaim.org/)
* [**Invisible Content Just for Screen Reader Users**](https://webaim.org/techniques/css/invisiblecontent/)
* [**Using headings to improve accessibility**](https://www.drupal.org/docs/7/creating-accessible-themes/using-headings-to-improve-accessibility)
* [**Web Accessibility Tutorials - Page Structure - Headings**](https://www.w3.org/WAI/tutorials/page-structure/headings/)
* [**ARIA - Page Landmarks**](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/index.html)

## Disclaimer

These are intended only as course notes following the Mobile Web Specialist Nano-Degree. I hope these provide help to any or all people who want to learn about accessibility.