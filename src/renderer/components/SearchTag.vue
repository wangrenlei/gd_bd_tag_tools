<template>
  <section>
    <!-- 列表 -->
    <template>
      <el-form :inline="true" :model="form" ref="form" >
        <el-row type="flex" style="padding:0 0 20px 0; " :gutter='10'>
          <el-form-item>
            <el-col>
              <el-checkbox-group v-model="form.sourceType">
                <el-checkbox label="高德地图"></el-checkbox>
                <el-checkbox label="百度地图"></el-checkbox>
                <el-checkbox label="美团" disabled></el-checkbox>
                <el-checkbox label="大众点评" disabled></el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col>
              <el-select
                v-model="form.city"
                filterable
                allow-create
                default-first-option
                placeholder="请选择目标城市">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col>
              <div>
                <el-input v-model="form.keyword" placeholder="请输入查询关键字" name="keyword" auto-complete="on" clearable style="width: 220px;"></el-input>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col>
              <div class='block'>
                <el-date-picker v-model="form.interval" type="datetimerange" align="left" unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                                value-format="timestamp" @change="handleIntervalChange" style="width: 355px;">
                </el-date-picker>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :offset='0'>
              <el-button type="primary" v-on:click="onSubmit" style="width:120px;">查询</el-button>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>

      <el-row :gutter="20">
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align:center;">高德地图</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align:center;">百度地图</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align:center;">美团</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple" style="text-align:center;">大众点评</div></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table
              row-key="id"
              v-loading="gdLoading"
              :data="gdTableData"
              border
              style="width: 1155px">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <span>{{ props.row}}</span>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型"
                align="center"
                width="160">
              </el-table-column>
              <el-table-column
                prop="tag"
                label="标签"
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table
              row-key="uid"
              v-loading="bdLoading"
              :data="bdTableData"
              border
              style="width: 1155px">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <span>{{ props.row}}</span>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="detail_info.type"
                label="类型"
                align="center"
                width="160">
              </el-table-column>
              <el-table-column
                prop="detail_info.tag"
                label="标签"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table
              row-key="id"
              v-loading="loading"
              :data="tableData"
              border
              style="width: 1155px">
              <el-table-column
                prop="name"
                label="名称"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="taskType"
                label="类型"
                align="center"
                width="160">
              </el-table-column>
              <el-table-column
                prop="createdAt"
                label="标签"
                align="center"
              >
              </el-table-column>
            </el-table>

          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-table
              row-key="id"
              v-loading="loading"
              :data="tableData"
              border
              style="width: 1155px">
              <el-table-column
                prop="name"
                label="名称"
                align="center"
                width="110">
              </el-table-column>
              <el-table-column
                prop="taskType"
                label="类型"
                align="center"
                width="160">
              </el-table-column>
              <el-table-column
                prop="createdAt"
                label="标签"
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </template>
  </section>
</template>

<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>

<script>
  export default {
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date().getTime()
              const start = new Date().getTime() - 3600 * 1000 * 24 * 7
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date().getTime()
              const start = new Date().getTime() - 3600 * 1000 * 24 * 30
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date().getTime()
              const start = new Date().getTime() - 3600 * 1000 * 24 * 90
              picker.$emit('pick', [start, end])
            }
          }]
        },
        nowSource: '',
        nowTid: '',
        nowLogUrl: '',
        sourceList: [],
        totalCount: 0,
        pagesize: 8,
        currentPage: 1,
        baseUrl: 'http://localhost:7777',
        gdTableData: [],
        bdTableData: [],
        gdLoading: false,
        bdLoading: false,
        gdKey: '6d74bed326223ea1011bd5a15015059d',
        gdMapUrl: 'https://restapi.amap.com/v3/place/text',
        bdKey: '985c3opdNnpYWWIGjXkjqCFHT3K3xuxh',
        bdMapUrl: 'http://api.map.baidu.com/place/v2/search',
        form: {
          city: '',
          sourceType: [],
          keyword: '',
          interval: [undefined, undefined]
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        sourceDialog: false,
        imgDialog: false,
        options: [{
          value: '北京',
          label: '北京'
        }, {
          value: '天津',
          label: '天津'
        }, {
          value: '上海',
          label: '上海'
        }, {
          value: '深圳',
          label: '深圳'
        }, {
          value: '成都',
          label: '成都'
        }, {
          value: '重庆',
          label: '重庆'
        }, {
          value: '广州',
          label: '广州'
        }, {
          value: '内蒙古',
          label: '内蒙古'
        }, {
          value: '乌鲁木齐',
          label: '乌鲁木齐'
        }, {
          value: '银川',
          label: '银川'
        }, {
          value: '南宁',
          label: '南宁'
        }, {
          value: '哈尔滨',
          label: '哈尔滨'
        }, {
          value: '长春',
          label: '长春'
        }, {
          value: '沈阳',
          label: '沈阳'
        }, {
          value: '石家庄',
          label: '石家庄'
        }, {
          value: '郑州',
          label: '郑州'
        }, {
          value: '武汉',
          label: '武汉'
        }, {
          value: '长沙',
          label: '长沙'
        }, {
          value: '太原',
          label: '太原'
        }, {
          value: '济南',
          label: '济南'
        }, {
          value: '西安',
          label: '西安'
        }, {
          value: '南京',
          label: '南京'
        }, {
          value: '杭州',
          label: '杭州'
        }, {
          value: '合肥',
          label: '合肥'
        }, {
          value: '南昌',
          label: '南昌'
        }]
      }
    },

    methods: {
      onSubmit: function () {
        let city = this.form.city
        let sourceType = this.form.sourceType
        let keyword = this.form.keyword
        let interval = this.form.interval
        // let pageSize = this.pagesize
        // let currentPage = 1
        // let start = Math.round((interval[0] || 0) / 1000)
        // let end = Math.round((interval[1] || 0) / 1000)

        if (sourceType.indexOf('高德地图') !== -1) {
          this.onGdSearch(city, keyword, interval)
        }
        if (sourceType.indexOf('百度地图') !== -1) {
          this.onBdSearch(city, keyword, interval)
        }
        if (sourceType.indexOf('百度地图') !== -1 && sourceType.indexOf('高德地图') !== -1) {
          // 默认全选
          this.onGdSearch(city, keyword, interval)
          this.onBdSearch(city, keyword, interval)
        }
      },

      // 高德地图搜索
      onGdSearch: function (city, keyword, interval) {
        // let pageSize = this.pagesize
        // let currentPage = 1
        this.gdLoading = true

        this.$http.get(this.gdMapUrl + `?key=${this.gdKey}&keywords=${keyword}&types=&city=${city}&children=1&offset=20&page=1&extensions=all`)
          .then(res => {
            let status = res.body['status']
            if (status === '1') {
              this.gdTableData = res.body['pois']
              // this.totalCount = res.body['pois'].length
            } else {
              this.$message({
                showClose: true,
                message: `高德地图API返回异常状态码:${status}`,
                type: 'error'
              })
            }
            this.gdLoading = false
          })
          .catch(err => {
            console.log(err.body)
          })
          .finally(() => {
            this.gdLoading = false
            this.msg = '访问异常'
          })
      },

      // 百度地图搜索
      onBdSearch: function (city, keyword, interval) {
        // let pageSize = this.pagesize
        // let currentPage = 1
        this.bdLoading = true

        this.$http.jsonp(this.bdMapUrl + `?query=${keyword}&tag=&region=${city}&output=json&ak=${this.bdKey}&page_size=20&page_num=0&scope=2`)
          .then(res => {
            let status = res.body['status']
            if (status === 0) {
              this.bdTableData = res.body['results']
              // this.totalCount = res.body['pois'].length
            } else {
              this.$message({
                showClose: true,
                message: `百度地图API返回异常状态码:${status}`,
                type: 'error'
              })
            }
            this.bdLoading = false
          })
          .catch(err => {
            console.log(err.body)
          })
          .finally(() => {
            this.bdLoading = false
            this.msg = '访问异常'
          })
      },

      query: function (page, pageSize, tid, taskType, deviceId, interval) {
        this.loading = true
        if (!page) {
          page = 1
        }

        let start = Math.round((interval[0] || 0) / 1000)
        let end = Math.round((interval[1] || 0) / 1000)
        this.$http.get(this.baseUrl + `/task/fetchSnapList?pageSize=${pageSize}&page=${page}&tid=${tid}&taskType=${taskType}&deviceId=${deviceId}&start=${start}&end=${end}`)
          .then(res => {
            this.tableData = res.body['rows']
            this.totalCount = res.body['total']
            this.deviceList = res.body['deviceList']
            this.taskTypeList = res.body['appList']
            this.loading = false
          })
          .catch(err => {
            console.log(err.body)
          })
          .finally(() => {
            this.loading = false
            this.msg = '访问异常'
          })
      },
      // handleCurrentChange: function (val) {
      //   this.currentPage = val
      //   this.query(this.currentPage, this.pagesize, this.form.tid, this.form.taskType, this.form.deviceId, this.form.interval)
      // },
      handleIntervalChange: function (val) {
        this.form.interval = val
        // this.query(1, this.pagesize, this.form.tid, this.form.taskType, this.form.deviceId, this.form.interval)
      },
      handleSizeChange: function (val) {
        console.log(`${val}  条  / 页`)
        this.query(1, this.pagesize, this.form.tid, this.form.taskType, this.form.deviceId, this.form.interval)
      }

      // handleSourceDialog: function (tid) {
      //   this.loading = true
      //
      //   this.$http.get(this.baseUrl + `/task/getSource?tid=${tid}`)
      //     .then(res => {
      //       this.nowSource = res.body['source']
      //       this.loading = false
      //       this.sourceDialog = true
      //     })
      //     .catch(err => {
      //       console.log(err.body)
      //     })
      //     .finally(() => {
      //       this.loading = false
      //       this.msg = '访问异常'
      //     })
      //
      // },
    }

    // mounted () {
    //   this.query(1, this.pagesize, this.form.tid, this.form.taskType, this.form.deviceId, this.form.interval)
    // }
  }
</script>
