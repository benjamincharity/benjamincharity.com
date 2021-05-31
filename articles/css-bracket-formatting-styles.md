---
title: CSS Bracket Formatting Styles
description: Examples of various formatting styles for CSS brackets.
tags: [css]
published: true
publishDate: 2014-01-21
previousUrl: https://blog.benjamincharity.com/css-bracket-formatting-styles/
---

# CSS Bracket Formatting Styles

Ever wondered what the various <abbr title="Cascading Style Sheets">CSS</abbr> bracket styles were called? (neither 
did I but, it's actually pretty interesting)

### _Default_
```css
.foo {
  color: red;
  display: block;
}
```

### _[Banner][banner]_
```css
.foo {
  color: red;
  display: block;
  }
```

### _Saver_
```css
.foo { color: red;
  display: block;
}
```

### _Aligned_
```css
.foo { color: red;
  display: block;
  }
```

### _[Pico][pico]_
```css
.foo { color: red;
  display: block; }
```

### _Extra_
```css
.foo {
 color: red;
 display: block; }
```

### _[GNU][gnu]_
```css
.foo
{
  color: red;
  display: block;
}
```

### _HMANN_
```css
.foo
{ color: red;
  display: block;
}
```

---

Personally, I feel that the `default` style is by far the most readable, followed closely by the `GNU` style. My 
primary issue with styles such as `saver` or `pico` is that you cannot move entire lines up and down due to the
first and/or last declaration sharing a line with the selector or bracket.

> **Note:** I couldn't actually find documentation to verify some of these naming conventions. If anyone knows a 
> source or possibly a different name for a style, reach out on Twitter: [@benjamincharity][twitter-link]

[pico]: http://en.wikipedia.org/wiki/Indent_style#Pico_style
[gnu]: http://en.wikipedia.org/wiki/Indent_style#GNU_style
[banner]: http://en.wikipedia.org/wiki/Indent_style#Banner_style
[twitter-link]: http://twitter.com/benjamincharity
