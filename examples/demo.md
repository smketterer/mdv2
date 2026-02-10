# CLI-Present

A terminal-based presentation tool built with React Ink

---

## Text Formatting

Regular text with **bold**, *italic*, and ***bold italic*** styles.

You can also use ~~strikethrough~~ for deleted text.

Inline `code` looks like this.

---

## Links

Check out these resources:

- [React](https://react.dev) - UI framework
- [Ink](https://github.com/vadimdemedes/ink) - React for CLIs
- [Marked](https://marked.js.org) - Markdown parser

---

## Lists

### Unordered
- First item
- Second item with **bold**
- Third item with `code`

### Ordered
1. Step one
2. Step two
3. Step three

### Nested
- Parent item
  - Child item
  - Another child
- Back to parent

---

## Code Blocks

JavaScript:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('World'));
```

Python:

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

---

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Headings | Done | h1-h6 supported |
| Lists | Done | Ordered & unordered |
| Code | Done | Syntax highlighting |
| Tables | Done | Basic support |

---

## Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

> "Simplicity is the ultimate sophistication."
> — Leonardo da Vinci

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `→` `l` `n` `Space` `Enter` | Next slide |
| `←` `h` `p` `Backspace` | Previous slide |
| `g` | First slide |
| `G` | Last slide |
| `1-9` | Jump to slide |
| `q` `Escape` | Quit |

---

## Themes

Available color themes:

| Theme | Style |
|-------|-------|
| `default` | Classic terminal colors |
| `monokai` | Vibrant dark theme |
| `dracula` | Purple and pink accents |
| `github` | Clean and professional |
| `nord` | Arctic blue palette |

```bash
cli-present slides.md --theme monokai
```

---

## Border Styles

| Style | Look |
|-------|------|
| `rounded` | Smooth corners (default) |
| `single` | Basic box drawing |
| `double` | Double-line borders |
| `bold` | Thick borders |

```bash
cli-present slides.md --border double
```

---

## Command Line Options

```bash
cli-present <file.md> [options]

Options:
  -s, --start <n>      Start at slide n
  -b, --border <style> Border style
  -t, --theme <theme>  Color theme
  -h, --help           Show help
```

---

# Thank You!

Press `q` to exit

*Built with React, Ink, and Marked*
