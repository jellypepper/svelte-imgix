<!--
  Imgix Component
  Responsive, lazily-loaded images with Svelte and Imgix
-->
<script>
  import { stringify } from 'query-string';
  import { onMount } from 'svelte';
  import { generateSrcset, trimSrc } from './lib/utils';

  export let src: string;
  export let alt: Optional<string> = undefined;
  export let imgixParams: Optional<any> = {};

  let imgElement: HTMLImageElement;
  let observer: IntersectionObserver;
  let intersected = false;

  const baseSrc = trimSrc(src);
  const placeholder = `${baseSrc}?blur=200&px=16&auto=format`;

  $: configuredSrc = Object.keys(imgixParams.length)
    ? `${baseSrc}?${stringify(imgixParams)}`
    : src;
  $: srcset = generateSrcset(src, imgixParams);

  const observerCallback: IntersectionObserverCallback = (
    entries,
    observer
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intersected = true;
        observer.unobserve(imgElement);
      }
    });
  };

  onMount(() => {
    observer = new IntersectionObserver(observerCallback);
    observer.observe(imgElement);

    return () => {
      observer.unobserve(imgElement);
    };
  });
</script>

<img
  bind:this={imgElement}
  src={intersected ? configuredSrc : placeholder}
  {alt}
  {srcset}
  {...$$props}
/>
