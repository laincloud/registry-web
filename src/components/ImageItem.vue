<template>
  <li>
    {{ image.name }}:{{ image.tag }}
  </li>
</template>

<script>
export default {
    props: {
        image: {
            type: Object,
            required: true
        }
    }
};
</script>
