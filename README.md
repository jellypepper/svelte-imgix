# Svelte Imgix

Responsive, lazily-loaded images with Svelte and Imgix

### Features

- Lazy loading with automatic LQIP placeholders
- Generate responsive image `srcsets` automatically

### Basic Usage

```sh
npm i svelte-imgix
```

```svelte
<script>
  import Imgix from 'svelte-imgix';
</script>

<Imgix
  src="https://assets.imgix.com/image.jpg"
/>
```

`svelte-imgix` is written in Typescript, and requires Svelte preprocessing (which includes typescript support) to be enabled in your bundler.

Install `svelte-preprocess`

```sh
npm i svelte-preprocess
```

And include it in the svelte config in your `rollup.config.js` or `webpack.config.js`

```js
import autoPreprocess from 'svelte-preprocess';

svelte({
  preprocess: autoPreprocess()
});
```

See the [svelte-preprocess docs](https://github.com/sveltejs/svelte-preprocess) for more.

### Adding Sizes

Svelte-Imgix automatically generates a responsive `srcset` for a huge range of viewport sizes. By adding a `sizes` attribute to your image you can instruct the browser to use the appropriate source based on media queries.

See the [MDN article on responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) for a thorough walkthrough.

### Setting Imgix Parameters

You can either provide a full Imgix URL (with query parameters) to `svelte-imgix`, or define parameters to override anything set on the src with the `imgixParams` prop. All valid [Imgix properties](https://docs.imgix.com/apis/rendering) are avaiable.

```svelte
<Imgix
  src="https://assets.imgix.com/image.jpg"
  imgixParams={{
    auto: 'format',
    fit: 'facearea'
  }}
/>
```

### Properties

| Property      | Description                                                                           |
| ------------- | ------------------------------------------------------------------------------------- |
| `src`         | Imgix source of the image                                                             |
| `alt`         | Alt text for the image                                                                |
| `ImgixParams` | Object of Imgix parameters to set on the image, overrides any defaults given in `src` |
