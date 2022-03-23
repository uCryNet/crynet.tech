<template>
  <span>
    <slot/>
  </span>
</template>

<script>
import {
  provide,
  reactive,
  readonly,
  toRefs,
} from 'vue';

// We use symbols as a unique identifiers.
export const UserSettingsStateSymbol = Symbol('User settings provider state identifier');
export const UserSettingsUpdateSymbol = Symbol('User settings update provider identifier');

export default {
  setup() {
    const state = reactive({
      language: 'en',
      theme: 'light',
    });
    // Using `toRefs()` makes it possible to use
    // spreading in the consuming component.
    // Making the return value `readonly()` prevents
    // users from mutating global state.
    provide(UserSettingsStateSymbol, toRefs(readonly(state)));

    const update = (property, value) => {
      state[property] = value;
    };
    provide(UserSettingsUpdateSymbol, update);
  },
  render() {
    // Our provider component is a renderless component
    // it does not render any markup of its own.
    return this.$slots.default();
  },
};
</script>

<style>
</style>
