new Vue({
  el: '#q-app',
  data: function () {
    return {
      namesFilter: '',
      subjectsFilter: '',
      aliasesFilter: '',
      model: 'one',
      selected: [],
      loading: false,
      searchResultsData: [],
      searchResultsLoading: false,
      drawerOpen: false,
      drawerContent: null,
      showAddNameModal: false,
      selectedGroup: 'London Period',
      groupOptions: [
        'London Period',
        'Group #2',
        'Group #3'
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
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
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
      groupData: [
        {
          "id": 30,
          "project_id": "65",
          "name": "repudiandae provident",
          "type": "subject",
          "description": null
        },
        {
          "id": 31,
          "project_id": "66",
          "name": "inventore rerum",
          "type": "subject",
          "description": null
        },
        {
          "id": 32,
          "project_id": "67",
          "name": "non minus",
          "type": "subject",
          "description": null
        },
        {
          "id": 33,
          "project_id": "123-456-789",
          "name": "associated subjects",
          "type": "subject",
          "description": null
        },
        {
          "id": 34,
          "project_id": "123-456-789",
          "name": "associated subjects",
          "type": "subject",
          "description": null
        }
      ],
      nameData: [
        {
          id: 1,
          family_name: "Ardvark",
          given_name: "Andy",
          maiden_name: null,
          middle_name: null,
          suffix: null,
          keywords: null,
          date_of_birth: "1900-01-20",
          date_of_death: "1980-02-15",
          public_notes: null,
          staff_notes: null,
          bio_filename: null
        },
        {
          id: 2,
          family_name: "Bumblebee",
          given_name: "Betty",
          maiden_name: null,
          middle_name: null,
          suffix: null,
          keywords: null,
          date_of_birth: "1912-11-01",
          date_of_death: "1980-12-24",
          public_notes: null,
          staff_notes: null,
          bio_filename: null
        },
        {
          id: 3,
          family_name: "Camel",
          given_name: "Charles",
          maiden_name: null,
          middle_name: null,
          suffix: null,
          keywords: null,
          date_of_birth: "1902-07-17",
          date_of_death: "1955-04-03",
          public_notes: null,
          staff_notes: null,
          bio_filename: null
        },
        {
          id: 4,
          family_name: "Dingo",
          given_name: "Danny",
          maiden_name: null,
          middle_name: null,
          suffix: null,
          keywords: null,
          date_of_birth: "1910-10-20",
          date_of_death: "1982-04-14",
          public_notes: null,
          staff_notes: null,
          bio_filename: null
        },
        {
          id: 5,
          family_name: "Eagle",
          given_name: "Eddie",
          maiden_name: null,
          middle_name: null,
          suffix: null,
          keywords: null,
          date_of_birth: "1912-02-11",
          date_of_death: "1978-04-25",
          public_notes: null,
          staff_notes: null,
          bio_filename: null
        },
      ],
      subjectsData: [
        {
          "id": 60,
          "subject_name": "quia quasi",
          "display_name": "nisi a",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 61,
          "subject_name": "maxime animi",
          "display_name": "enim facere",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 62,
          "subject_name": "temporibus voluptas",
          "display_name": "odio blanditiis",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 63,
          "subject_name": "doloremque alias",
          "display_name": "voluptatem minus",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 64,
          "subject_name": "eligendi eos",
          "display_name": "velit aut",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 65,
          "subject_name": "aspernatur nesciunt",
          "display_name": "eaque aut",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 66,
          "subject_name": "ut odio",
          "display_name": "et voluptatem",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 67,
          "subject_name": "qui qui",
          "display_name": "consequatur eligendi",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 68,
          "subject_name": "rerum adipisci",
          "display_name": "eum illum",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        },
        {
          "id": 69,
          "subject_name": "enim ipsam",
          "display_name": "iste voluptas",
          "staff_notes": null,
          "keywords": null,
          "loc": null
        }
      ],
      aliasesData: [
        {
          "id": 291,
          "family_name": "Hackett",
          "given_name": "Zack",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "PhD",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Blanditiis qui animi et aspernatur nulla. Nisi aperiam dolores autem in et. Nostrum at omnis explicabo inventore in. Consequatur voluptatibus libero perspiciatis illo aliquam commodi et.",
          "staff_notes": "Ut amet quis alias non natus molestiae sequi. Cum et iure aperiam qui. Amet provident doloremque omnis officia dolorem consequatur quia."
        },
        {
          "id": 292,
          "family_name": "Doyle",
          "given_name": "Carole",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "DVM",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Et magnam distinctio assumenda corporis dolores. Nihil facilis libero voluptatum est.",
          "staff_notes": "Est molestiae et harum molestiae saepe delectus debitis. Quos dolorum et omnis maxime. Ipsam quisquam eos rerum ipsum dolorum rerum consectetur."
        },
        {
          "id": 293,
          "family_name": "Hudson",
          "given_name": "Adam",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "IV",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Soluta et nulla consequatur. Et itaque rem est.",
          "staff_notes": "Alias non est vel rerum aut est. Nam a et similique velit eos eos repellendus. Vitae placeat perspiciatis nihil non sapiente est quis praesentium. Cupiditate a repudiandae blanditiis eum autem."
        },
        {
          "id": 294,
          "family_name": "Willms",
          "given_name": "Cyril",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "I",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Itaque neque ducimus et et. Dolorum architecto autem vitae molestiae ab sit. Maiores vel aut magni voluptatem consectetur.",
          "staff_notes": "Corrupti saepe porro provident suscipit. Qui velit magnam mollitia ipsa qui. Non necessitatibus dolores saepe natus eveniet cumque. Vel eligendi sit eius nemo dignissimos et."
        },
        {
          "id": 295,
          "family_name": "Wisoky",
          "given_name": "Kristina",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "DDS",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Eius eos recusandae qui tempora. Sed consequatur harum dolor saepe. Vero corrupti sed est occaecati repellendus rerum.",
          "staff_notes": "Molestiae non aut sit quos nemo eligendi vitae modi. Vel unde occaecati velit excepturi dolores. Aliquid et necessitatibus vero enim dolorem. Nam et aut culpa reprehenderit."
        },
        {
          "id": 296,
          "family_name": "Reynolds",
          "given_name": "Edison",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "MD",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Repellat enim est dolorem officia doloribus iure aliquid. Sed omnis iste a et. Rerum ea occaecati et quaerat molestiae.",
          "staff_notes": "Aut mollitia quis maxime. Voluptas quo similique voluptas vero. Molestiae et blanditiis dicta beatae et. Ut eum unde et ut quo."
        },
        {
          "id": 297,
          "family_name": "Green",
          "given_name": "Kameron",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "Jr.",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Beatae voluptas eos officia dolorem omnis sed. Voluptatibus aut commodi sed est nisi. Excepturi animi suscipit rem qui iusto totam cupiditate.",
          "staff_notes": "Non maiores ut doloribus aut nam illum. Quo saepe sed fugit iusto rem. Facere et et ea quidem aut omnis commodi. Autem velit dolor explicabo consequatur aut velit."
        },
        {
          "id": 298,
          "family_name": "Farrell",
          "given_name": "Joshuah",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "IV",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Nostrum tempora distinctio ex id dignissimos perspiciatis molestiae sit. Praesentium ut recusandae similique. Inventore repellendus modi molestias optio nulla blanditiis nemo corrupti.",
          "staff_notes": "Omnis fugiat tempore eveniet perferendis ut. Cupiditate illo iure non rerum ut. Sint minus fuga consequuntur dolor sit. Consequatur maiores eligendi accusamus."
        },
        {
          "id": 299,
          "family_name": "Mayert",
          "given_name": "Rachelle",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "I",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Quidem eaque dolores qui ducimus. Rem officiis deleniti tempora quasi ea tenetur eligendi. Quaerat vero natus vitae amet est accusantium et. Fugiat cum fugiat expedita.",
          "staff_notes": "Odio consequatur est sit voluptates quas. Iure corrupti aut sit facilis totam ut ab aut. Ullam voluptatibus necessitatibus id earum ut. Adipisci iste maxime quibusdam consequuntur."
        },
        {
          "id": 300,
          "family_name": "Zemlak",
          "given_name": "Casandra",
          "middle_name": null,
          "maiden_name": null,
          "suffix": "V",
          "title": null,
          "role": null,
          "type": "role",
          "public_notes": "Eligendi ab earum odio. Rerum est hic voluptas fuga mollitia mollitia. Ad voluptatem libero molestias aperiam animi optio minus.",
          "staff_notes": "Omnis reiciendis eveniet facilis quam quae non. Ea doloribus et consectetur aliquam ullam culpa."
        }
      ]
    }
  },
  methods: {
    viewGroup () {
      this.drawerContent = 'group'
      this.loading = true
      this.drawerOpen = true

      setTimeout(() => { 
        this.loading = false
      }, 1500)
    },
    subjects () {
      this.drawerContent = 'subjects'
      this.loading = true
      this.drawerOpen = true

      setTimeout(() => { 
        this.loading = false
      }, 1500)
    },
    aliases () {
      this.drawerContent = 'aliases'
      this.loading = true
      this.drawerOpen = true

      setTimeout(() => { 
        this.loading = false
      }, 1500)
    },
    names () {
      this.drawerContent = 'names'
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
    saveName () {
      this.loading = true
      setTimeout(() => { 
        this.loading = false
        this.showAddNameModal = false
        this.$q.notify({
          message: 'Name created successfully',
          color: 'green'
        }, this)
      }, 2000)

    },
    editSubject () {

    },
    editAlias () {

    }
  }
})