<!--
  Imgix Component
  Responsive, lazily-loaded images with Svelte and Imgix
-->
<script lang="ts">
  import { stringify } from 'query-string';
  import { onMount } from 'svelte';

  const INCREMENT_PERCENTAGE = 8;
  const MAX_SIZE = 8192;

  export let src: string;
  export let alt: Optional<string>;
  export let imgixParams: Optional<any> = {};

  let img: HTMLImageElement;
  let intersected = false;

  const baseSrc = trimSrc(src);
  const placeholder = `${baseSrc}?blur=500&px=8&auto=format`;
  const resolutions: number[] = [];

  $: configuredSrc = Object.keys(imgixParams).length
    ? `${baseSrc}?${stringify(imgixParams)}`
    : src;
  $: srcset = generateSrcset(src, imgixParams);

  function trimSrc(src: string) {
    return src.split(/[?#]/)[0];
  }

  function generateSrcset(src: string, imgixParams: any) {
    const sets = [];

    for (var i = 0; i < resolutions.length; i++) {
      const params = {
        ...imgixParams,
        w: resolutions[i],
        ...(imgixParams.h
          ? { h: Math.round(resolutions[i] * (imgixParams.h / imgixParams.w)) }
          : {})
      };

      sets.push(`${trimSrc(src)}?${stringify(params)} ${resolutions[i]}w`);
    }

    return sets.join(', ');
  }

  let prev = 100;
  while (prev <= MAX_SIZE) {
    resolutions.push(2 * Math.round(prev / 2));
    prev *= 1 + (INCREMENT_PERCENTAGE / 100) * 2;
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersected = true;
          observer.unobserve(img);
        }
      });
    });

    img && observer.observe(img);

    return () => {
      img && observer.unobserve(img);
    };
  });
</script>

<img
  bind:this={img}
  src={intersected ? configuredSrc : placeholder}
  {alt}
  {srcset}
  {...$$props}
/>
