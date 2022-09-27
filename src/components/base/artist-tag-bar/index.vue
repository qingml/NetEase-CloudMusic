<template>
  <div class="artist-tag-bar__container">
    <div class="artist-tag-bar-area">
      <span
        v-for="(item, index) in artistAreaData"
        :key="index"
        @click="() => handleChangeArea(item, index)"
        :class="[item.activity ? 'active' : '']"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="artist-tag-bar-type">
      <span
        v-for="(item, index) in artistTypeData"
        :key="index"
        @click="() => handleChangeType(item, index)"
        :class="[item.activity ? 'active' : '']"
      >
        {{ item.name }}
      </span>
    </div>
    <div class="artist-tag-bar-initial">
      <span
        v-for="(item, index) in artistInitialData"
        :key="key"
        @click="() => handleChangeInitial(item, index)"
        :class="[item.activity ? 'active' : '']"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, toRefs } from "vue";

const props = defineProps({
  artistAreaData: {
    type: Array,
    default: () => [],
  },
  artistTypeData: {
    type: Array,
    default: () => [],
  },
  artistInitialData: {
    type: Array,
    default: () => [],
  },
});

const { artistAreaData, artistTypeData, artistInitialData } = toRefs(props);

const emit = defineEmits(["changeData"]);

const handleChangeArea = (areaItem, areaindex) => {
  handelChangeTagStatus(areaindex, "area", areaItem.area, artistAreaData);
};
const handleChangeType = (typeItem, typeindex) => {
  handelChangeTagStatus(typeindex, "type", typeItem.type, artistTypeData);
};
const handleChangeInitial = (initialItem, initialindex) => {
  handelChangeTagStatus(
    initialindex,
    "initial",
    initialItem.initial,
    artistInitialData
  );
};

const handelChangeTagStatus = (dataIndex, type, val, data) => {
  emit(
    "changeData",
    type,
    val,
    data.value.map((it, index) => ({
      ...it,
      activity: index === dataIndex,
    }))
  );
};
</script>

<style lang="less" scoped>
.artist-tag-bar {
  &__container {
    width: 100%;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
  }

  &-area,
  &-type,
  &-initial {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    span {
      height: 28px;
      width: 56px;
      font-size: 13px;
      text-align: center;
      border-radius: 14px;
      cursor: pointer;
      // background-color: red;
      margin-right: 6px;
      vertical-align: center;
      line-height: 29px;

      &.active {
        background-color: red;
        color: #fff;
        font-weight: 700;
      }
    }
  }

  &-initial {
    :not(:first-child) {
      width: 28px;
      height: 28px;
      margin-right: 12px;
      text-align: center;
      border-radius: 50%;
    }
  }
}
</style>
