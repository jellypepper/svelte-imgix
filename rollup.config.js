import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

export default {
  input: 'Imgix.svelte',
  output: [
    { file: pkg.module, format: 'es' },
    { file: pkg.main, format: 'umd', name: 'Imgix' }
  ],
  plugins: [
    resolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonJS(),
    svelte(),
    typescript()
  ]
};
