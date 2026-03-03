# CLI-Present

_A terminal-based presentation tool for developers who live in the command line._

---

## Text Formatting

> "Markdown you already know. Now it renders beautifully."

**Bold** for emphasis, _italic_ for tone, **_bold italic_** for when you mean it.

~~Strikethrough~~ for what didn't make the cut. Inline `code` for technical terms.

---

## Links

Resources render as readable references:

- [React](https://react.dev) — UI framework
- [Ink](https://github.com/vadimdemedes/ink) — React for CLIs
- [Marked](https://marked.js.org) — Markdown parser

---

## Lists

### Unordered

- First item
- Second item with **bold**
- Third item with `code`

### Ordered

1. Step one — _beginning_
2. Step two — _middle_
3. Step three — _done_

### Nested

- Parent item
  - Child item
  - Another child
- Back to parent

---

## Code Blocks

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

**Multiple languages.** Syntax highlighted automatically.

---

## Tables

| Feature  | Status | Notes               |
| -------- | ------ | ------------------- |
| Headings | `Done` | h1–h6 supported     |
| Lists    | `Done` | Ordered & unordered |
| Code     | `Done` | Syntax highlighted  |
| Tables   | `Done` | Full alignment      |

---

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

---

## Keyboard Navigation

| Action         | Keys                        |
| -------------- | --------------------------- |
| Next slide     | `→` `l` `n` `Space` `Enter` |
| Previous slide | `←` `h` `p` `Backspace`     |
| First slide    | `g`                         |
| Last slide     | `G`                         |
| Jump to slide  | `1`–`9`                     |
| Go to slide    | `0`                         |
| Quit           | `q` `Escape`                |

---

## Themes

| Theme     | Style                   |
| --------- | ----------------------- |
| `default` | Classic terminal colors |
| `monokai` | Vibrant dark theme      |
| `dracula` | Purple and pink accents |
| `github`  | Clean and professional  |
| `nord`    | Arctic blue palette     |

```bash
cli-present slides.md --theme dracula
```

---

## Border Styles

```
rounded  ╭──────╮   single  ┌──────┐
         │      │           │      │
         ╰──────╯           └──────┘

double   ╔══════╗   bold    ┏━━━━━━┓
         ║      ║           ┃      ┃
         ╚══════╝           ┗━━━━━━┛
```

```bash
cli-present slides.md --border double
```

---

## Command Line Options

```bash
cli-present <file.md> [options]

  -s, --start <n>      Start at slide n
  -b, --border <style> Border style
  -t, --theme <name>   Color theme
  -h, --help           Show help
```

---

# Thank You!

> "If it runs in a terminal, it belongs here."

_Built with React, Ink, and Marked_

Press `q` to exit
