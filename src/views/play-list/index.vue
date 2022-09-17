<template>
  <div class="">
    <TagBar
      :catgoryList="tagCatgoryList"
      :hotTagList="hotTags"
      @changeTag="handleChangeTagActive"
    />
  </div>
</template>

<script setup>
import { getHotTag, getTagCatgoryList } from "@/api/playlist";
import { onMounted, ref } from "vue";
import TagBar from "@/components/base/tag-bar/index.vue";

const hotTags = ref([]);
const tagCatgoryList = ref([]);

const queryHotTags = async () => {
  try {
    const { tags } = await getHotTag();
    hotTags.value = tags;
  } catch (error) {
    console.log("err", error);
  }
};

const queryTagCatgoryList = async () => {
  try {
    const { categories, sub } = await getTagCatgoryList();

    const list = Object.entries(categories).map((item) => {
      const [key, name] = item;
      return {
        key,
        name,
        list: sub.filter((it) => it.category === +key),
      };
    });

    tagCatgoryList.value = list;
  } catch (error) {}
};

onMounted(() => {
  queryHotTags();
  queryTagCatgoryList();
});

const handleChangeTagActive = (type, data) => {
  if (type === "hotTag") {
    hotTags.value = data;
  } else {
    tagCatgoryList.value = data;
  }
};
</script>

<style></style>
