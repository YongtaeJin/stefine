<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="{ ...attrs, ...$attrs }"
        :class="childClass"
        @click="$emit('click')"
      >
        <slot></slot>
      </v-btn>
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "TooltipBtn",
  props: {
    label: {
      type: String,
      required: true,
    },
    childClass: [String, Object],
  },
};
</script>

<style>
</style>