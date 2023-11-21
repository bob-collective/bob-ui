import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  target: 'es2019',
  format: ['cjs', 'esm'],
  banner: { js: '"use client";' },
  entry: {
    index: 'src/index.ts',
    kintsugi: 'src/css/theme.kintsugi.css',
    interlay: 'src/css/theme.interlay.css',
    bob: 'src/css/theme.bob.css'
  },
  dts: {
    entry: {
      index: 'src/index.ts'
    }
  }
});
