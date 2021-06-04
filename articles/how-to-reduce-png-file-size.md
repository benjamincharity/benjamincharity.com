---
title: How To Reduce PNG File Size
description: Drastically reduce PNG size by replacing transparent colors.
tags: [png, design, optimization]
published: true
publishDate: 2016-02-11
previousUrl: https://blog.benjamincharity.com/how-to-reduce-png-file-size/
---

# Decrease PNG size by faking opacity

Because the PNG format can compress solid colors more efficiently than opacity (info at the end), if we flatten any 
opacities before exporting the image, it can drastically reduce file size.

For example, when the fills in this image are set to white with an opacity of 50%, the exported PNG weighs in around 45kb.

![opacity.png](https://blog.benjamincharity.com/content/images/2016/02/opacity_1.png)

However, if we replace the opacities with a sample of the color created by the opacity:

![Finder - images - Screen Shot January 21, 2016 at 11-38 AM.png](https://blog.benjamincharity.com/content/images/2016/02/opacity_2.png)

...the file size comes down to around 25kb.

---

### Further Reading

- [Great StackOverflow post explaining different image formats and their benefits & drawbacks](http://stackoverflow.com/a/7752936/722367)
- _[dead link removed]_
- _[dead link removed]_
