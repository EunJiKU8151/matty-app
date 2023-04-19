<template>
  <div class="main-page page">
    <EzDayItem></EzDayItem>
    <EzStoryItem></EzStoryItem>
    <NewUserItem></NewUserItem>
    <CommunityBoardItem></CommunityBoardItem>
    <MeetingRoomItem></MeetingRoomItem>
    <MeetingScheduleItem></MeetingScheduleItem>
  </div>
</template>

<script>
import EzDayItem from '@/components/main/EzDayItem.vue';
import EzStoryItem from '@/components/main/EzStoryItem.vue';
import NewUserItem from '@/components/main/NewUserItem.vue';
import CommunityBoardItem from '@/components/main/CommunityBoardItem.vue';
import MeetingRoomItem from '@/components/main/MeetingRoomItem.vue';
import MeetingScheduleItem from '@/components/main/MeetingScheduleItem.vue';

export default {
  components: {
    EzDayItem,
    EzStoryItem,
    NewUserItem,
    CommunityBoardItem,
    MeetingRoomItem,
    MeetingScheduleItem
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>