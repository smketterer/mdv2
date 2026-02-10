# cli-present

A terminal-based presentation tool that displays Markdown files as slides. Built with React Ink.

## Installation

```bash
npm install
```

## Usage

```bash
npx tsx src/index.tsx <file.md> [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-s, --start <n>` | Start at slide number | 1 |
| `-b, --border <style>` | Border style | rounded |
| `-t, --theme <theme>` | Color theme | default |
| `-p, --padding <n>` | Padding between content and border | 1 |
| `--bullet <style>` | Bullet style for lists | disc |

### Examples

```bash
# Run the demo presentation
npm run demo

# Start at slide 3
npx tsx src/index.tsx slides.md --start 3

# Use monokai theme with bold borders
npx tsx src/index.tsx slides.md --theme monokai --border bold

# Use arrow bullets with extra padding
npx tsx src/index.tsx slides.md --bullet arrow --padding 2
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `→` `l` `n` `Space` `Enter` | Next slide |
| `←` `h` `p` `Backspace` | Previous slide |
| `g` | First slide |
| `G` | Last slide |
| `1-9` | Jump to slide |
| `q` `Escape` | Quit |

## Slide Format

Slides are written in Markdown, separated by horizontal rules (`---`):

```markdown
# Welcome

This is the first slide.

---

## Second Slide

- Bullet points
- **Bold** and *italic* text
- `inline code`

---

## Code Example

```javascript
function hello() {
  console.log('Hello, world!');
}
```

---

> "Blockquotes work too."

---

# The End
```

## Themes

Five color themes are available:

| Theme | Description |
|-------|-------------|
| `default` | Cyan borders, classic terminal colors |
| `monokai` | Green borders, vibrant syntax colors |
| `dracula` | Purple borders, pink and cyan accents |
| `github` | Blue borders, professional look |
| `nord` | Soft blue/cyan arctic palette |

## Border Styles

| Style | Characters |
|-------|------------|
| `single` | `┌─┐│└┘` |
| `double` | `╔═╗║╚╝` |
| `rounded` | `╭─╮│╰╯` |
| `bold` | `┏━┓┃┗┛` |

## Bullet Styles

| Style | Character |
|-------|-----------|
| `disc` | • |
| `circle` | ○ |
| `square` | ■ |
| `dash` | - |
| `arrow` | → |

## Supported Markdown

- Headings (`#` through `######`)
- Paragraphs
- **Bold** and *italic* text
- `Inline code`
- Code blocks with syntax highlighting
- Unordered and ordered lists
- Blockquotes
- Links
- Tables

## License

MIT
