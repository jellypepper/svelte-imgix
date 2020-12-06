/// <reference types="svelte" />
import { SvelteComponentTyped } from 'svelte';

export interface ImgixProps {
  src?: string;

  alt?: string;

  /**
   * @default {}
   */
  imgixParams?: object;
}

export default class Imgix extends SvelteComponentTyped<ImgixProps, {}, {}> {}
