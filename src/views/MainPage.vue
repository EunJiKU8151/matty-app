<template>
  <div class="main-page page">
    <EzDay></EzDay>
    <EzStory></EzStory>
    <NewUser></NewUser>
    <CommunityBoard></CommunityBoard>
    <MeetingRoom></MeetingRoom>
    <MeetingSchedule></MeetingSchedule>
  </div>
</template>

<script>
import EzDay from '@/components/EzDay.vue';
import EzStory from '@/components/EzStory.vue';
import NewUser from '@/components/NewUser.vue';
import CommunityBoard from '@/components/CommunityBoard.vue';
import MeetingRoom from '@/components/MeetingRoom.vue';
import MeetingSchedule from '@/components/MeetingSchedule.vue';

export default {
  components: {
    EzDay,
    EzStory,
    NewUser,
    CommunityBoard,
    MeetingRoom,
    MeetingSchedule
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>