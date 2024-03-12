<template>
  <div class="container-fluid">
    <div>
      <div class="row">
        <DashboardFilter />
        <FirstSection />
        <SellOutSection />
        <SecondSection />
        <!-- <ThirdSection /> -->
        <BranchProductSection />
        <FourthSection />
        <!-- <FifthSection /> -->
        <SixthSection />
      </div>
    </div>
  </div>
</template>
<script>
import FirstSection from '@/components/dashobard/FirstSection'
import SecondSection from '@/components/dashobard/SecondSection'
// import ThirdSection from '@/components/dashobard/ThirdSection'
import FourthSection from '@/components/dashobard/FourthSection'
// import FifthSection from '@/components/dashobard/FifthSection'
import SixthSection from '@/components/dashobard/SixthSection'
import SellOutSection from '@/components/dashobard/SellOutSection'
import BranchProductSection from '@/components/dashobard/BranchProductSection'
import DashboardFilter from '~/components/dashobard/Filter'

export default {
  components: {
    DashboardFilter,
    FirstSection,
    SecondSection,
    // ThirdSection,
    FourthSection,
    // FifthSection,
    SixthSection,
    SellOutSection,
    BranchProductSection
  },
  data() {
    return {}
  },
  activated() {
    this.$store.dispatch('breadcrumb/update', { title: 'Dashboard' })
  },
  deactivated() {
    this.$destroy()
  }
}
</script>
