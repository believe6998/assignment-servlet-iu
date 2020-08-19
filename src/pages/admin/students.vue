<template>
  <q-page class="q-pa-sm">
    <q-table
      title="Stations"
      :data="students"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="Name"
      :grid="mode==='grid'"
      :filter="filter"
      @request="onRequest"
      :loading="isLoading"
      :rows-per-page-options="[0]"
      :pagination.sync="pagination"
      hide-bottom
    >
      <template v-slot:top-right="props">
        <q-input
          dense
          debounce="300"
          v-model="filter.name"
          placeholder="Name">
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="mode = mode === 'grid' ? 'list' : 'grid';
          separator = mode === 'grid' ? 'none' : 'horizontal'"
          v-if="!props.inFullscreen"
        >
          <q-tooltip
            :disable="$q.platform.is.mobile"
            v-close-popup
          >{{mode==='grid' ? 'List' : 'Grid'}}
          </q-tooltip>
        </q-btn>

        <q-btn
          class="q-mx-none"
          color="green"
          label="Add"
          @click="showData"
        />
      </template>
      <template v-slot:body-cell-index="props">
        <q-td :props="props">
          {{ index(props.row.id) }}
        </q-td>
      </template>
      <template v-slot:body-cell-dob="props">
        <q-td :props="props">
          {{ props.row.dob | filterDate }}
        </q-td>
      </template>
      <template v-slot:body-cell-gender="props">
        <q-td :props="props" v-if="props.row.gender === 1">
          Male
        </q-td>
        <q-td :props="props" v-else>
          Female
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn dense color="primary" icon="edit" @click="showData(props.row.id)"/>
            <q-btn dense color="red" icon="delete" @click="confirm(props.row.id)"/>
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Student Details</div>
        </q-card-section>

        <q-form @submit="onSubmit" class="q-gutter-md q-pa-md">
            <q-input
              outlined
              v-model="currentStudent.name"
              label="Name"
            />

            <q-select
              outlined
              v-model="currentStudent.gender"
              :options="options"
              label="Gender"
              emit-value
              map-options
            />

            <q-input
              outlined
              v-model="currentStudent.email"
              label="Email"
            />

            <q-input
              outlined
              v-model="currentStudent.phone"
              label="Phone"
            />

            <q-input
              outlined
              v-model="currentStudent.country"
              label="Country"
            />

            <q-input outlined v-model="currentStudent.dob" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="currentStudent.dob" @input="() => $refs.qDateProxy.hide()" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Submit" type="submit" />
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import '../../utils/filter'

  export default {
    data() {
      return {
        mode: "list",
        pagination: {
          page: 1,
          rowsPerPage: 0
        },
        currentStudent: {},
        dialog: false,
        form: {
          name: "",
          pricePercent: ""
        },
        options:[
          {
            label: 'Female',
            value: 0
          },
          {
            label: 'Male',
            value: 1
          }
        ],
        columns: [
          {
            name: "index",
            align: "left",
            label: "Index",
            field: "index"
          },
          {
            name: "name",
            align: "left",
            label: "Name",
            field: "name"
          },
          {
            name: "rollNumber",
            align: "left",
            label: "Roll Number",
            field: "rollNumber"
          },
          {
            name: "dob",
            align: "left",
            label: "Dob",
            field: "dob"
          },
          {
            name: "gender",
            align: "left",
            label: "Gender",
            field: "gender"
          },
          {
            name: "email",
            align: "left",
            label: "Email",
            field: "email"
          },
          {
            name: "phone",
            align: "left",
            label: "Phone",
            field: "phone"
          },
          {
            name: "country",
            align: "left",
            label: "Country",
            field: "country"
          },
          {
            name: "action",
            align: "left",
            label: "Action",
            field: "action"
          }
        ],
        optionsNotification: {
          color: "green-4",
          textColor: "white",
          icon: "cloud_done"
        }
      };
    },
    computed: {
      ...mapState('student', ['students','isLoading','filter','student']),
    },
    created() {
      this.onRequest()
    },
    methods: {
      ...mapActions({
        loadStudents: 'student/loadStudents',
        loadStudent: 'student/loadStudent',
        saveStudent: 'student/saveStudent',
        deleteStudent: 'student/deleteStudent'
      }),
      index: function (id) {
        return this.students.findIndex(x => x.id === id) + 1;
      },
      onRequest() {
        this.loadStudents({
          filter: this.filter
        })
        this.pagination.rowsNumber = this.students.length
      },
      async onSubmit() {
        await this.saveStudent(this.currentStudent)
        if(this.currentStudent.id){
          this.$q.notify({
            ...this.optionsNotification,
            message: "Update successful"
          });
        }else {
          this.$q.notify({
            ...this.optionsNotification,
            message: "Add successful"
          });
        }
        this.dialog = false
        this.onRequest()
      },
      async showData(studentId) {
        this.currentStudent = {}
        if (studentId){
          await this.loadStudent(studentId)
          this.currentStudent = this.student
        }
        this.dialog = true;
      },
      confirm(studentId) {
          this.$q
            .dialog({
              title: "Confirm",
              message: "Are you sure?",
              cancel: true,
              persistent: true
            })
            .onOk(async () => {
              await this.deleteStudent(studentId);
              this.$q.notify({
                ...this.optionsNotification,
                message: "Delete successful"
              });
              this.onRequest()
            });
      }
    }
  };
</script>
