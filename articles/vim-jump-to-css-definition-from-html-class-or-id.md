---
title: Vim Jump to CSS Definition from Class or ID in HTML
description: Learn how to create a small vim function that will take you to a class or ID definition from HTML.
tags: [vim, tool]
published: true
publishDate: 2015-01-29
previousUrl: https://blog.benjamincharity.com/vim-jump-to-css-definition-from-html-class-or-id/
---

# Vim - Jump to CSS definition from HTML class or id

Recently I came across a great [Vim function on Stack Overflow][so]. Once added to your `.vimrc`, it allows you to 
jump from a class or ID within an HTML document directly to the associated styles in your CSS.

Place this function in your `.vimrc` file:

```javascript
function! JumpToCSS()
  let id_pos = searchpos("id", "nb", line('.'))[1]
  let class_pos = searchpos("class", "nb", line('.'))[1]

  if class_pos > 0 || id_pos > 0
    if class_pos < id_pos
      execute ":vim '#".expand('<cword>')."' */styles/**/*.scss"
    elseif class_pos > id_pos
      execute ":vim '.".expand('<cword>')."' */styles/**/*.scss"
    endif
  endif
endfunction
```

I scoped the function's query to my style directory to speed up the search. Simply change `*/styles/**/*.scss` to 
reference your SCSS/LESS/CSS/etc directory (don't forget to change the extension if you are not using SCSS).

Inside Vim, open an HTML document and place your cursor over a class or ID and run the function by typing:

```bash
:call JumpToCSS()
```

Once the query finishes, Vim will open the file and take you to the correct style definition.

---

> **Bonus:** If you love your keyboard shorcuts like I do, add a quick shortcut to your `.vimrc`:

```bash
nnoremap <leader>] :call JumpToCSS()
```

This will allow you to simply hit your leader key followed by a closing bracket: `]` to call the function.

[so]: http://stackoverflow.com/questions/12833189/jump-to-css-selector-in-a-css-file-from-the-html-file-in-vim-using-a-single-keys
