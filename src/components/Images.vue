<template>
  <div>
    <ul>
      <image-item v-for="image in images"
                  :key="image.id"
                  :image="image">
      </image-item>
    </ul>
  </div>
</template>

<script>
import ImageItem from './ImageItem.vue';

export default {
    components: {
        ImageItem
    },
    data () {
        return {
            images: [
                {
                    id: 1,
                    name: "hello",
                    tag: "latest"
                },
                {
                    id: 2,
                    name: "world",
                    tag: "latest"
                }
            ]
        }
    }
}
</script>
