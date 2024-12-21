
<template>
  <div class="status-main">
    <div class="status-notification">
      <span>Latest Prices</span>
    </div>
    <div class="status-clock">Clock</div>
    <div class="status-network">Network</div>
  </div>
</template>

<style lang="scss" scoped>
.status-main {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.status-notification {
  flex-grow: 1;
  padding-left: 10px;
  align-content: center;
}

.status-clock {
  padding-right: 10px;
  height: 100%;
  align-content: center;
}

.status-network {
  padding-right: 10px;
  height: 100%;
  align-content: center;
}
</style>
