<template>
    <div class="services-container">
      <h2 class="services-title">Our Services</h2>
      <div class="services-grid">
        <ServiceCard
          title="Build"
          description="Quickly validate your product idea with an MVP."
          icon="icon1.svg"
        />
        <ServiceCard
          title="Measure"
          description="Use metrics to validate your product's success."
          icon="icon2.svg"
        />
        <ServiceCard
          title="Learn"
          description="Continuously iterate based on user feedback."
          icon="icon3.svg"
        />
      </div>
    </div>
</template>

<script setup>
import ServiceCard from './ServiceCard.vue';
</script>

<style scoped>
.services-container {
  height: auto;
  margin: 0 auto;
  padding: 4rem 0;
}

.services-title {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
}

.services-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .services-grid {
    flex-direction: column;
    align-items: center;
  }
}
</style> 