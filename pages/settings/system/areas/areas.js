/* eslint-disable */
import areaFormSchema from '~/data/forms/system/addArea'
export default {
    name: 'AreaPage',
    async fetch() {
        try {
            const { data: areas } = await this.$axios.$get('setting-module-api/area', {
                params: this.queryUrlParams()
            })
            this.areas = areas.data
            this.totalCount = areas.meta.total
        } catch (e) {
            this.$toast.error('Error fetching areas')
        }
    },
    data() {
        return {
            selected: '',
            addAreaFormValues: {},
            updateAreaFormValues: {
                city: null,
                area_ar: '',
                area_en: ''
            },
            areaFormSchema,
            areaToDelete: null,
            cities: [],
            areas: [],
            filtering: {
                currentPage: 1,
                perPage: 100,
                searchTerm: null
            },
            totalCount: 0,
            pageOptions: [100, 50, 25, 10],
            fields: [
                {
                    key: 'name.en',
                    label: 'Area Name (EN)',
                    sortable: true
                },
                {
                    key: 'name.ar',
                    label: 'Area Name (AR)',
                    sortable: true
                },
                {
                    key: 'id',
                    label: 'ID',
                    sortable: true
                },
                {
                    key: 'city.name.en',
                    label: 'City',
                    sortable: true
                },
                {
                    key: 'actions',
                    label: 'Actions'
                }
            ]
        }
    },
    computed: {
        addAreaFormOptions() {
            if (!this.cities.length) return []
            return this.cities.map(({ id, name }) => ({
                value: id,
                label: name.en
            }))
        }
    },
    watch: {
        areas: 'setBreadcrumb',
        filtering: {
            handler: 'getZahranData',
            deep: true
        }
    },
    activated() {
        this.$fetch()
        this.setBreadcrumb()
    },
    deactivated() {
        this.$destroy()
    },
    mounted() {
        this.$root.$on('bv::modal::show', () => {
            this.fetchCities()
        })
    },
    methods: {
        getZahranData() {
            setTimeout(() => {
                this.$fetch()
            }, 1000)
        },
        queryUrlParams() {
            const params = {}
            params.page = this.filtering.currentPage
            params.per_page = this.filtering.perPage
            if (this.filtering.searchTerm) params.keyword = this.filtering.searchTerm
            return params
        },
        setBreadcrumb() {
            this.$store.dispatch('breadcrumb/update', {
                title: `Areas list (${this.areas.length})`,
                parent: { title: 'System settings' }
            })
        },
        showUpdateModal(area) {
            this.updateAreaFormValues.id = area.id
            this.updateAreaFormValues.area_ar = area.name.ar
            this.updateAreaFormValues.area_en = area.name.en
            this.updateAreaFormValues.city =  {
                value: area.city.id,
                label: area?.city?.name?.en
              }
            this.$refs.updateAreaModal.show()
        },
        showDeleteModal(area) {
            this.areaToDelete = area.id
            this.$refs.deleteAreaModal.show()
        },
        fetchCities() {
            if (this.cities.length) return
            this.$axios
                .$get('setting-module-api/city')
                .then(({ data }) => {
                    for (const city of data.data) {
                        this.cities.push(city)
                    }
                })
                .catch(() => {
                    this.$toast.error('Error while fetching cities')
                })
        },
        addArea() {
            const data = {
                city_id: this.addAreaFormValues.city.value,
                name: {
                    ar: this.addAreaFormValues.area_ar,
                    en: this.addAreaFormValues.area_en
                }
            }

            this.$toast.show('Creating the area...')
            this.$axios
                .$post('setting-module-api/area', data)
                .then(() => {
                    this.$toast.success('Successfully created')
                    this.$fetch()
                    this.addAreaFormValues = {}
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message)
                })

            this.$refs.createAreaModal.hide()
        },
        updateArea() {
            const data = {
                city_id: this.updateAreaFormValues.city.value,
                name: {
                    ar: this.updateAreaFormValues.area_ar,
                    en: this.updateAreaFormValues.area_en
                }
            }

            this.$toast.show('Updating the area...')
            this.$axios
                .$put(`setting-module-api/area/${this.updateAreaFormValues.id}`, data)
                .then((res) => {
                    this.$toast.success('Successfully updated')
                    this.$fetch()
                    this.updateAreaFormValues = {}
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message)
                })

            this.$refs.updateAreaModal.hide()
        },
        deleteArea() {
            this.$toast.show('Deleting the area...')

            this.$axios
                .$delete(`setting-module-api/area/${this.areaToDelete}`)
                .then(() => {
                    this.$toast.success('Successfully Deleted')
                    this.$fetch()
                })
                .catch(() => {
                    this.$toast.error('Error while deleting')
                })

            this.areaToDelete = null
            this.$refs.deleteAreaModal.hide()
        },
        hasPermission(route) {
            const userPermission = this.$store.getters['permission/permissions']
            return userPermission.includes(route)
        }
    }
}
