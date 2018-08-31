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

Managing focus is the concept of manipulating the tab order to be logical and intuitive. These are some of the scenarios where focus management can be crucial.

#### Managing focus at the page level

You might be using URL fragment identifiers to travel through the page content or building a single page web app where the visible content change without page refresh. In that case the best way to identify the selected content area is to give it a `tabindex="-1"` so that it doesn't appear in the natural tab order, and call its `focus()` method.

#### Managing focus in components

When building custom components you'd want to provide logical keyboard manipulation similar to the native component your custom component is based on.

The [**ARIA Authoring Practices**](https://www.w3.org/TR/wai-aria-practices/) guid, lists types of components and what kinds of keyboard actions they support.

#### Modals and keyboard traps

Keyboard trap happens when an element captures the tab and prevents the user from leaving it until it's complete. This can bothersome to the user, that's why the [Web AIM checklist section **2.1.2**](http://webaim.org/standards/wcag/checklist#sc2.1.2) states that **keyboard focus should never be locked or trapped at one particular page element**.

Although the aforementioned behavior can be very frustrating, there are cases where it helps the page author provide better accessibility. The modal for example when the modal is displayed you'd want the tab to be trapped in it until the user completes whatever functionality the modal provides or closes it.

The steps to build a temporary keyboard trap in the modal:

  1. Select the modal and modal-overlay using `document.querySelector`.

  2. Listen for keyboard events like `tab` & `tab`+`SHIFT` for moving forward and backwards through modal elements, `ESC` to close the modal so that the user doesn't have to search for a close button. You should also listen to click events on overlay & modal close button.

  3. Store a reference of the element that was focused before the modal was opened.

  4. Select all focusable elements within the modal using `document.querySelectorAll`.

  Instead of selecting elements separately you can pass this line of code that selects all potentially focusable elements:
  ```javascript
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

* **Every page should have an h1 heading**.
* **You should not skip heading levels**, such as jumping from `<h2></h2>` to an `<h4></h4>` going down the page.
* Headings should be used to divide content into meaningful sections, not to format text.
* **Nest headings by their rank (or level)**. Headings with an equal or higher rank start a new section, headings with a lower rank start new subsections that are part of the higher ranked section.
* **Not all headings should be visible**. Sometimes the role/title of a section is perfectly clear to people who can see the page, but not for the visually impaired, in that case it is good to move the said header off-screen.

**Note**: When hiding content that you want only screen reader users to see, don't use `display: none` or `visibility: hidden`. There are other ways to create [invisible Content Just for Screen Reader Users](https://webaim.org/techniques/css/invisiblecontent/).

#### Other navigation options

Screen reader users may use other elements to navigate around the page, including links, form controls, and landmarks.

That's why, when making your links make sure to:

* use descriptive text, such as instead of "Read more" you can use "Read more about XXXXX",
* avoid using Javascript to open link, this will not give screen readers enough information.
* avoid using anchor tags as buttons, use `button` element and then style it with CSS if that's what you are going for.
* provide an alt text when using image links.

Also, HTML5 introduced some new elements that help define the semantic structure of the page, including `header`, `footer`, `nav`, `article`, `section`, `main`, and `aside`. The use of these elements support keyboard navigation to the structure of a web page for screen reader users. [Read more about page landmarks](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/index.html).

## ARIA

### What is ARIA

The [**Web Accessibility Initiative's Accessible Rich Internet Applications**](https://www.w3.org/TR/wai-aria/) lebelled **WAI-ARIA** or just **ARIA**, is a specification written by the W3C, defining a set of additional HTML attributes that can be applied to elements to provide additional semantics and improve accessibility wherever it is lacking.

### How ARIA works

* ARIA works by changing and augmenting the standard DOM accessibility tree.
* ARIA can modify existing element semantics or add semantics to elements where no native semantics exist.
* **ARIA doesn't augment any of the element's inherent behavior**; it won't make the element focusable or give it keyboard event listeners. That is still part of our development task.

### What can ARIA do?

There are three main features ARIA spec defines, **role**, **properties** and **state**. Using these attributes, we can give an element the missing information so that assistive technologies can properly interpret it.

ARIA attributes don't affect anything about the web page, except for the information exposed by the browser's accessibility APIs (where screen readers get their information from).

**Note**: If you want to know the possible values for the role attribute and associated state and properties check the [**ARIA spec**](https://www.w3.org/TR/wai-aria/) or the more approachable [**ARIA Authoring Practices**](https://www.w3.org/TR/wai-aria-practices-1.1)

#### Work flow

Let's say we are creating a checkbox with a `li` element, the ARIA Authoring Practices states that we must give it the necessary information through the **role** and **state** attributes.
```html
<li tabindex="0" role="checkbox" aria-checked="false"></li>
```
* We specify the role of the element: `role="checkbox"`.
* We specify the state of the element: `aria-checked="false"` when unckecked, `aria-checked="true"` when checked.
* We are also specifying `tabindex="0"`, which adds the element to the accessibility tree (and tab order).

**Notes**:
* A role is a promise that the author of that `<li>` has also incorporated JavaScript that provides the keyboard interactions expected for a checkbox. Unlike HTML input elements, ARIA roles do not cause browsers to provide keyboard behaviors or styling.
* The ARIA Authoring Practices mentions other attributes like `aria-lebelby`, that will be discussed below.

### labels

#### aria-label

`aria-label` allows us to specify a string to be used as the accessible label. This overrides any other native labeling mechanism, such as a `label` element.

```html
<button aria-label="close">
  <img alt="" src="close.png">
</button>
```
#### aria-lebelledby

`aria-labelledby` allows us to specify the ID of another element in the DOM as an element's label.
  - Unlike `label` element, `aria-labelledby`attribute maybe used on any element.
  - the `label` element refers to the thing it labels, but `aria-labelledby` is set on the element that is labelled and refers to the element that labels it.
  - `aria-labelledby` doesn't give the same clicking behavior the HTML `label` element gives.
  - Only one `label` element may be associated with a labelable element; `aria-labelledby` can take a list of IDREFs to compose a label of multiple elements. The label will be concatinated in order the IDREFs are given.
  - `aria-labelledby` takes precedence over `aria-label` and native HTML `label` element.
  - `aria-labelledby` may refer to elements which are hidden.

```html
<div id="rg-label">Some label</div>
<span role="radiogroup" aria-labelledby="rg-label">
  ...
</span>
```

**Note**: Native HTML elements have implicit semantics, so make sure not to redefine default semantics. e.g. giving a `button` element a `role="button"`.

### Relationships

A relationship attribute creates a semantic relationship between elements on the page regardless of their DOM relationship.

#### aria-owns

`aria-owns` attribute creates a parent/child relationship between a group of elements in the accessibility tree. It is specified on the parent element and takes a list of IDREFs of elements that should be considered as children of that parent element.

#### aria-activedescendant

`aria-activedescendant` identifies the focused element in a group of related elements (e.g. items of a custom listbox) if DOM focus is on their parent. It is specified on the parent element and takes the IDREF of the child element to focus when the parent element is focused.

#### aria-describedby

`aria-describedby` attribute is similar to the `aria-labelledby` attribute, the difference is that a label should be concise, where a description is intended to provide more verbose information and may also reference elements that are not visible. You can think of a description is a great way to communicate supplementary, but not essential, information

Just like `aria-labelledby`, it is specified on the element that is described and takes a list of IDREFs of elements that comprise the description.

#### aria-posinset & aria-setsize

The `aria-posinset` ("position in set") and `aria-setsize` ("size of set") attributes work together.

* `aria-setsize` defines the number of items in the current set of listitems or treeitems.
* `aria-posinset` defines an element's number or position in the current set of listitems or treeitems.

**Notes**:
* `aria-posinset` and `aria-setsize` are not required if all elements in the set are present in the DOM.
* Both attributes are set on the items of the set and not the container.

### Hiding and Updating Content

#### aria-hidden

`aria-hidden` attribute allows us to exclude elements that are not visually hidden from the accessibility tree. Applying the `aria-hidden` attribute on an element will remove the element and all its descendants from the accessibility tree. The only exceptions are elements referred to by an `aria-labelledby` or `aria-describedby` attribute.

The `aria-hidden` attribute takes three values true/false/undefined. `true` and `false` values are self-explanatory, but when the `aria-hidden` attribute is given no value or `undefined`, the element's hidden state is determined by the user agent based on whether it is rendered.

#### aria-live

The `aria-live` attribute indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the [*live region*](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region). Marking a region "live" (the element `aria-live` is applied on and its descendants are all considered the *live region*) means that updates should be communicated to users immediately.

`aria-live` attribute takes three values:
* `aria-live="assertive"`:	Indicates that updates to the region have the highest priority and should be presented the user immediately.
* `aria-live="polite"`: Indicates that updates to the region should be presented at the next graceful opportunity, such as at the end of speaking the current sentence or when the user pauses typing.
* `aria-live="off"`(default): Indicates that updates to the region should not be presented to the user unless the used is currently focused on that region.

**Note**: It's better to set your live region in the initial page load, not doing so might cause problems.

There are other attribute that work along side `aria-live`, you fine-tune what is communicated to the user when the live region changes, these attributes are `aria-atomic`, `aria-relevant` and `aria-busy`.

##### aria-atomic

`aria-atomic` indicates whether the entire region should be considered as a whole when communicating updates. The values for aria-atomic may be true or false, with false being the default.

* **false** (default): Assistive technologies will present only the changed node or nodes.
* **true**: Assistive technologies will present the entire changed region as a whole, including the author-defined label if one exists.

##### aria-relevant

`aria-relevant` indicates what types of changes should be presented to the user. The attribute is represented as a space delimited list of the following values: `additions`, `removals`, `text`; or a single catch-all value all.

* **additions**: Element nodes are added to the accessibility tree within the live region.
* **additions text**: Equivalent to the combination of values, "additions text".
* **all**: Equivalent to the combination of all values, "additions removals text".
* **removals**: Text content, a text alternative, or an element node within the live region is removed from the accessibility tree.
* **text**: Text content or a text alternative is added to any descendant in the accessibility tree of the live region.

##### aria-busy

`aria-busy` attribute lets you notify assistive technology that it should temporarily ignore changes to an element, such as when things are loading. Once everything is in place, `aria-busy` should be set to false to normalize the reader's operation.

## Accessible Styles

### Styling focus

Focus sometimes might not go with the overall page design (e.g. blue focus with on blue background) and somewhat irritating, that is why the [WebAIM checklist section **2.4.7**](https://webaim.org/standards/wcag/checklist#sc2.4.7) states that "It is visually apparent which page element has the current keyboard focus (i.e., as you tab through the page, you can see where you are).". You can style focus by either altering the `outline` property of the target element or getting rid of it alltogether on the condition of providing an indicator of when the said element is focused. One ways of doing that:
```css
.target-elem:focus {
  outline: none;
  border: 1px solid #f00;
}
```

## Resources and Usefull links

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
* [**WAI-ARIA spec**](https://www.w3.org/TR/wai-aria/)
* [**ARIA In HTML spec**](https://www.w3.org/TR/html-aria/)
* [**ARIA Authoring Practices**](https://www.w3.org/TR/wai-aria-practices-1.1)
* [**ARIA - Page Landmarks**](https://www.w3.org/TR/2017/NOTE-wai-aria-practices-1.1-20171214/examples/landmarks/index.html)
* [**Hide content properly**](https://www.drupal.org/node/472572)

## Disclaimer

These are intended only as course notes following the Mobile Web Specialist Nano-Degree. I hope these provide help to any or all people who want to learn about accessibility.