import { ComponentCustomProperties } from 'vue';
import { RootState } from '@/store/interfaces';

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  export interface ComponentCustomProperties {
    $store: Store<RootState>
  }
}
