<p align="center">
      <h1 align="center">Interlay UI</h1>
</p>
</br>

Interlay IU is library of accessible, reusable, and composable React components built
around a crypto business model

## Table of contents

- 🚀 [Features](#features)
- 📦 [Installation](#installation)
- 💻 [Usage](#usage)
- 📝 [Contributing](#contributing)
- ⚖️ [License](#license)

## Features

- Ease of Styling: style your component simply by passing props
- Flexible & composable: Interlay UI components are built on top of a React UI
  Primitive for endless composability.
- Accessible. Interlay UI components follow the WAI-ARIA guidelines specifications
  and have the right `aria-*` attributes by using `react-aria` as foundation.

## Installation

To use Interlay UI components, all you need to do is install the
`@interlay/ui` package and its peer dependencies:

```sh
# with Yarn
$ yarn add @interlay/ui styled-components

# with npm
$ npm i @interlay/ui styled-components

# with pnpm
$ pnpm add @interlay/ui styled-components

# with Bun
$ bun add @interlay/ui styled-components
```

## Usage

To start using the components, please follow these steps:

1. Wrap your application with the `InterlayUIProvider` provided by
   **@interlay/ui**.

```jsx
import { InterlayUIProvider } from '@interlay/ui';

// Do this at the root of your application
function App({ children }) {
  return <InterlayUIProvider>{children}</InterlayUIProvider>;
}
```

2. Now you can start using components like so!:

```jsx
import { CTA } from '@interlay/ui';

function Example() {
  return <CTA>I am using Interlay UI</CTA>;
}
```

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](https://github.com/intelray/ui/blob/main/CONTRIBUTING.MD) for ways to get started.

## License

[MIT](https://choosealicense.com/licenses/mit/)
