new Vue({
  el: '#q-app',
  data: function () {
    return {
      baseURL: 'http://primarysourcecoop.org/mhs-api/v1/',
      namesFilter: '',
      subjectsFilter: '',
      aliasesFilter: '',
      model: 'one',
      selectedNames: [],
      loading: false,
      loadingNames: false,
      loadingGroups: false,
      loadingAliases: false,
      loadingSubjects: false,
      searchResultsData: [],
      searchResultsLoading: false,
      drawerOpen: false,
      drawerContent: null,
      showNameModal: false,
      modeNameModal: null,
      showSubjectModal: false,
      modeSubjectModal: null,
      showAliasModal: false,
      modeAliasModal: null,
      selectedGroup: null,
      aliasTypeOptions: [
        'spelling',
        'role'
      ],
      name: {
        family_name: null,
        given_name: null,
        maiden_name: null,
        middle_name: null,
        suffix: null,
        keywords: null,
        date_of_birth: null,
        date_of_death: null,
        public_notes: null,
        staff_notes: null,
        bio_filename: null
      },
      subject: {
        subject_name: null,
        display_name: null,
        keywords: null,
        staff_notes: null
      },
      alias: {
        family_name: null,
        given_name: null,
        maiden_name: null,
        middle_name: null,
        suffix: null,
        title: null,
        role: null,
        type: 'role',
        public_notes: null,
        staff_notes: null
      },
      columns: [
        { 
          name: 'name', 
          label: 'NAME', 
          field: row => row.given_name + ' ' + row.family_name,
          format: val => `${val}`,
          sortable: true 
        },
        { name: 'birth', label: 'BIRTH', field: 'date_of_birth', sortable: true },
        { name: 'death', label: 'DEATH', field: 'date_of_death', sortable: true }
      ],
      nameColumns: [
        { 
          name: 'name', 
          label: 'NAME', 
          field: row => row.given_name + ' ' + row.family_name,
          format: val => `${val}`,
          sortable: true 
        },
        { name: 'birth', label: 'BIRTH', field: 'date_of_birth', sortable: true },
        { name: 'death', label: 'DEATH', field: 'date_of_death', sortable: true },
        { name: 'actions', label: '', field: '', align: 'center' }
      ],
      subjectColumns: [
        { 
          name: 'subject_name', 
          label: 'SUBJECT NAME', 
          field: 'subject_name',
          align: 'left',
          sortable: true 
        },
        { 
          name: 'display_name', 
          label: 'DISPLAY NAME', 
          field: 'display_name',
          align: 'left',
          sortable: true 
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      aliasColumns: [
        { 
          name: 'family_name', 
          label: 'FAMILY NAME', 
          field: 'family_name',
          align: 'left',
          sortable: true 
        },
        { 
          name: 'given_name', 
          label: 'GIVEN NAME', 
          field: 'given_name',
          align: 'left',
          sortable: true 
        },
        { 
          name: 'middle_name', 
          label: 'MIDDLE NAME', 
          field: 'middle_name',
          align: 'left',
          sortable: true 
        },
        { name: 'title', label: 'TITLE', field: 'title', sortable: true, align: 'left' },
        { name: 'type', label: 'TYPE', field: 'type', sortable: true, align: 'left' },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],      
      groupData: [],
      nameData: [],
      subjectData: [],
      aliasData: []
    }
  },
  // computed: {
  //   groupOptions () {
  //     return this.groupData.map(function (group) {
  //       return {
  //         label: group.name,
  //         value: group.id
  //       }
  //     })
  //   }
  // },
  methods: {
    viewGroup () {
      this.drawerContent = 'group'
      this.loading = true
      this.drawerOpen = true

      setTimeout(() => { 
        this.loading = false
      }, 1500)
    },
    search () {
      this.drawerContent = 'search'
      this.loading = true
      this.searchResultsData = []
      this.searchResultsLoading = true
      this.drawerOpen = true
      setTimeout(() => { 
        this.loading = false
        this.searchResultsLoading = false
        this.searchResultsData = this.nameData
      }, 1500)
    },
    async saveName () {
      this.$refs.nameForm.validate().then(async success => {
        if (success) {
          this.loading = true
          try {
            if (this.modeNameModal === 'Add') {
              const response = await axios.post(this.baseURL + 'names', this.name)
            }else{
              const response = await axios.patch(this.baseURL + 'names/' + this.name.id, this.name)
            }
            await this.getNames()
            
            this.$q.notify({
              message: (this.modeNameModal === 'Add') ? 'Name created successfully' : `${this.name.given_name} ${this.name.family_name} updated successfully`,
              color: 'green'
            }, this)

            this.loading = false
            this.showNameModal = false
          } catch (error) {
            this.loading = false
            if (error.response.status === 422) {
              for (const [key, value] of Object.entries(error.response.data)) {
                this.$q.notify({
                  message: value,
                  color: 'red'
                }, this)
              }
            }
          }
        }
      })
    },
    editName (name = null) {
      this.modeNameModal = (name) ? 'Edit' : 'Add'
      this.showNameModal = true
      this.name = {...name}
    },
    async deleteName (name)
    {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete ${name.given_name} ${name.family_name}?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          this.loading = true
          await axios.delete(this.baseURL + 'names/' + name.id)
          await this.getNames()
          this.loading = false
        } catch (error) {
          this.loading = false
          this.$q.notify({
            message: 'Sorry, something went wrong.',
            color: 'red'
          }, this)
        }
      })
    },    
    async saveSubject () {
      this.$refs.subjectForm.validate().then(async success => {
        if (success) {
          this.loading = true
          try {
            if (this.modeSubjectModal === 'Add') {
              const response = await axios.post(this.baseURL + 'subjects', this.subject)
            }else{
              const response = await axios.patch(this.baseURL + 'subjects/' + this.subject.id, this.subject)
            }
            await this.getSubjects()
            
            this.$q.notify({
              message: (this.modeSubjectModal === 'Add') ? 'Subject created successfully' : `${this.subject.given_name} ${this.subject.family_name} updated successfully`,
              color: 'green'
            }, this)

            this.loading = false
            this.showSubjectModal = false
          } catch (error) {
            this.loading = false
            if (error.response.status === 422) {
              for (const [key, value] of Object.entries(error.response.data)) {
                this.$q.notify({
                  message: value,
                  color: 'red'
                }, this)
              }
            }
          }
        }
      })
    },
    async deleteSubject (subject)
    {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete ${subject.display_name}?`,
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          this.loading = true
          await axios.delete(this.baseURL + 'subjects/' + subject.id)
          await this.getSubjects()
          this.loading = false
        } catch (error) {
          this.loading = false
          this.$q.notify({
            message: 'Sorry, something went wrong.',
            color: 'red'
          }, this)
        }
      })
    },
    editSubject (subject = null) {
      this.modeSubjectModal = (subject) ? 'Edit' : 'Add'
      this.showSubjectModal = true
      this.subject = {...subject}
    },
    editAlias (alias = null) {
      this.modeAliasModal = (alias) ? 'Edit' : 'Add'
      this.showAliasModal = true
      this.alias = (alias) ? {...alias} : this.alias
    },
    async saveAlias () {
      this.$refs.aliasForm.validate().then(async success => {
      })
    },
    async addNamesToGroup() {
      console.log(this.selectedGroup)
      console.log(this.groupOptions)
      this.loading = true

      this.selectedNames.forEach(name => {
        try {
          // const response = await axios.patch(this.baseURL + 'lists/' + this.subject.id, this.subject)
        } catch (error) {
          
        }
      });

      // try {
      //   if (this.modeSubjectModal === 'Add') {
      //     const response = await axios.post(this.baseURL + 'subjects', this.subject)
      //   }else{
      //     const response = await axios.patch(this.baseURL + 'subjects/' + this.subject.id, this.subject)
      //   }
      //   await this.getSubjects()
        
      //   this.$q.notify({
      //     message: (this.modeSubjectModal === 'Add') ? 'Subject created successfully' : `${this.subject.given_name} ${this.subject.family_name} updated successfully`,
      //     color: 'green'
      //   }, this)

      //   this.loading = false
      //   this.showSubjectModal = false
      // } catch (error) {
      //   this.loading = false
      //   if (error.response.status === 422) {
      //     for (const [key, value] of Object.entries(error.response.data)) {
      //       this.$q.notify({
      //         message: value,
      //         color: 'red'
      //       }, this)
      //     }
      //   }
      // }      
    },
    openDrawer (type) {
      this.drawerContent = type
      this.drawerOpen = true
    },
    async getNames() {
      this.loadingNames = true
      try {
        const response = await axios.get(this.baseURL + 'names');
        this.nameData = response.data.data
      } catch (error) {
        console.error(error)
      }
      this.loadingNames = false
    },
    async getSubjects() {
      try {
        const response = await axios.get(this.baseURL + 'subjects');
        this.subjectData = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    async getGroups() {
      this.loadingGroups = true
      try {
        const response = await axios.get(this.baseURL + 'lists');
        this.groupData = response.data.data
        console.log(this.groupData)
      } catch (error) {
        console.error(error)
      }
      this.loadingGroups = false
    },
    async getAliases() {
      this.loadingAliases = true
      try {
        const response = await axios.get(this.baseURL + 'aliases');
        this.aliasData = response.data.data
      } catch (error) {
        console.error(error)
      }
      this.loadingAliases = false
    }
  },
  created () {
    this.getNames()
    this.getGroups()
    this.getAliases()
    this.getSubjects()
  }
})