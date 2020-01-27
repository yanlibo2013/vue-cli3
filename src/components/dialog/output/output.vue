<template>
  <div>
    <div id="input" class="nodeTable block__list_tags">
      <div class="block__list block__list_words blockLeft">
        <div class="block__list-title">
          <span>备选字段</span>
          <el-input
            class="fieldsInput"
            v-model="searchAlternative"
            placeholder="请输入字段名称"
            prefix-icon="el-icon-search"
            @keyup.native="
              filtertTableData(
                searchAlternative,
                inputLeftData,
                getMapCheckedData(realtime.initOutInputData)
              )
            "
          ></el-input>
          <i
            @click="inputFieldsImport(inputLeftData)"
            title="导入表格内字段"
            class="ns_fields3 icon iconfont icon-ir-copy"
          ></i>
          <i
            @click="addInputLeft"
            title="新增已选字段"
            class="ns_fields1 el-icon-plus"
          ></i>
        </div>
        <div>
          <el-table
            tooltip-effect="dark"
            ref="multipleTableLeft"
            :data="
              inputLeftData.slice(
                (inputLeftCurrentPage - 1) * inputLeftPagesize,
                inputLeftCurrentPage * inputLeftPagesize
              )
            "
            @selection-change="handleSelectionChange"
            height="25vh"
            style="width: 100%;"
          >
            <el-table-column
              fixed
              :index="inputLeftIndexMethod"
              type="index"
              width="60"
            ></el-table-column>
            <el-table-column prop="name" label="字段名"></el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
          </el-table>
        </div>
        <el-pagination
          small
          @size-change="inputLeftHandleSizeChange"
          @current-change="inputLeftHandleCurrentChange"
          :current-page="inputLeftCurrentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="inputLeftPagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="inputLeftData && inputLeftData.length"
        ></el-pagination>
      </div>
      <div class="block__list block__list_words blockRight">
        <div class="block__list-title">
          <span>已选字段</span>
          <el-input
            v-model="searchright"
            @keyup.native="
              filtertTableDataRight(
                searchright,
                inputRightData,
                inputRighCloneData
              )
            "
            class="fieldsInput"
            placeholder="请输入字段名称"
            prefix-icon="el-icon-search"
          ></el-input>
          <span
            @click="removeOutSelAllField"
            class="removeAllFields"
            title="删除全部已选字段"
          >
            <i class="fa fa-trash-o"></i>
          </span>
          <!-- <span class="removeAllFields pr20" title="删除已选的非法字段">
            <i class="fa fa-strikethrough"></i>
          </span>-->
          <!-- <a class="getSchema" title="提取schema">
            <i class="fa fa-external-link"></i>
          </a>-->
        </div>
        <div>
          <ol id="input-2">
            <!-- <el-table ref="multipleTable" :data="inputRightData" height="25vh" style="width: 100%;"> -->
            <el-table
              ref="multipleTable"
              :data="
                inputRightData.slice(
                  (inputRightCurrentPage - 1) * inputRightPagesize,
                  inputRightCurrentPage * inputRightPagesize
                )
              "
              height="25vh"
              style="width: 100%;"
            >
              <el-table-column
                fixed
                :index="inputRightIndexMethod"
                type="index"
                width="60"
              ></el-table-column>
              <el-table-column prop="name" label="字段名">
                <template slot-scope="scope">
                  <span :class="scope.row.isillegality ? 'righttb' : ''"
                    >{{ scope.row.name }} {{ scope.row.isillegality }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column prop="alias" label="别名">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.alias"
                    placeholder="别名"
                    @keyup.native="outAlias(scope.row.alias, scope.$index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-col :span="3" class="removeFields">
                    <i
                      class="el-icon-close"
                      @click="
                        removeOutSelThisField(scope.row.name, scope.$index)
                      "
                    ></i>
                  </el-col>
                </template>
              </el-table-column>
            </el-table>
          </ol>
          <el-pagination
            small
            @size-change="inputRightHandleSizeChange"
            @current-change="inputRightHandleCurrentChange"
            :current-page="inputRightCurrentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="inputRightPagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="inputRightData.length"
          ></el-pagination>
        </div>
      </div>
      <p>提示：别名允许的字符包括字母,数字和下划线.</p>
      <p v-if="Missing.length != 0">缺失 {{ Missing.length }}个</p>
      <p v-if="Missing.length != 0" class="Missing">{{ Missing.toString() }}</p>
      <p v-if="illegality.length != 0">非法 {{ illegality.length }}个</p>
      <p v-if="illegality.length != 0" class="illegality">
        {{ illegality.toString() }}
      </p>
    </div>
  </div>
</template>
<script>
// import { mapGetters, mapActions, mapState } from "vuex";
// import _ from "lodash";
export default {
  watch: {
    "realtime.selectCheckedDataSet"(val) {
      //this.initOutInputData(val.fields);
      this.$store.dispatch("realtime/initOutInputData", val.fields);
    },
    "realtime.initOutInputData"(val) {
      this.inputLeftData = this.getMapCheckedDataLeft(
        _.map(val, item => {
          return {
            alias: "",
            description: item.description,
            column: item.alias || item.column,
            type: item.type
          };
        })
      );
    },
    "realtime.initCheckedOutData"(val) {
      if (val.length == 0) {
        this.inputRightData = [];
      }

      this.inputRightData = this.getMapCheckedDataright(val);

      this.setInputRighCloneData(this.inputRightData);
    },
    inputLeftData(val) {
      //this.setMissAndIllegality(val, this.inputRightData);
    },
    inputRightData(val, oldV) {
      this.$store.dispatch(
        "realtime/setOutCheckedData",
        _.map(val, item => {
          return {
            alias: item.alias,
            description: item.description,
            name: item.name,
            type: item.type
          };
        })
      );

      //this.setMissAndIllegality(this.inputLeftData, val);

      // if (this.illegality.length != 0) {
      //   this.inputRightData = this.setMapCheckedDataright(
      //     this.getMapCheckedDataright(this.realtime.initCheckedinputData),
      //     this.illegality
      //   );
      // }
    },

    data(val) {
      this.searchAlternative = "";
      this.searchright = "";
      this.inputRightData = this.mapCheckedData(
        this.realtime.initCheckedOutData
      );
    }
  },
  props: {
    data: {
      type: Object,
      default: false
    }
  },
  components: {},
  data: function() {
    return {
      inputLeftData: [],
      inputRightData: [],
      inputLeftCurrentPage: 1,
      inputLeftPagesize: 10,
      inputRightCurrentPage: 1,
      inputRightPagesize: 10,
      searchAlternative: "",
      selectColumn: [],
      multipleSelection: [],
      searchright: "",
      rightTableList: [],
      inputRighCloneData: [],
      illegality: [], //非法
      Missing: [] //缺失
    };
  },
  computed: {
    ...Vuex.mapState(["realtime"])
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    ...Vuex.mapActions(["setOutCheckedData", "initOutInputData"]),
    setMissAndIllegality(inputLeftData, inputRightData) {
      this.Missing = this.setMissing(inputLeftData, inputRightData);
      this.illegality = this.setIllegality(inputLeftData, inputRightData);
    },
    getMapCheckedDataright(val) {
      return _.map(val, item => {
        return {
          alias: item.alias,
          description: item.description,
          name: item.column,
          type: item.type
        };
      });
    },
    mpaData(val) {
      return _.map(val, item => {
        return item.column || item.name;
        // return item.column;
      });
    },
    setMapCheckedDataright(dataright, illegality) {
      let result = [];
      _.forEach(dataright, p => {
        _.forEach(illegality, s => {
          if (p.name == s) {
            result.push({ ...p, isillegality: true });
          } else {
            result.push({ ...p });
          }
        });
      });

      return result;
    },
    setIllegality(initInputData, initCheckedinputData) {
      return _.differenceWith(
        this.mpaData(initCheckedinputData),
        this.mpaData(initInputData),
        _.isEqual
      );
    },
    setMissing(initInputData, initCheckedinputData) {
      return _.differenceWith(
        this.mpaData(initInputData),
        this.mpaData(initCheckedinputData),
        _.isEqual
      );
    },
    setInputRighCloneData(val) {
      this.inputRighCloneData = _.cloneDeep(val);
    },
    getMapCheckedDataLeft(val) {
      return _.map(val, item => {
        return {
          alias: "",
          description: item.description,
          name: item.column,
          type: item.type
        };
      });
    },
    getMapCheckedData(val) {
      return _.map(val, item => {
        return {
          alias: item.alias,
          description: item.description,
          name: item.alias || item.column,
          type: item.type
        };
      });
    },
    mapCheckedData(val) {
      return _.map(val, item => {
        return {
          alias: item.alias,
          description: item.description,
          name: item.column,
          type: item.type
        };
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    inputLeftFocus() {},
    inputLeftKeydown() {},
    getInputRow(row) {
      return row.name;
    },
    inputLeftHandleSizeChange(val) {
      this.inputLeftPagesize = val;
    },
    inputLeftHandleCurrentChange(val) {
      this.inputLeftCurrentPage = val;
    },
    inputLeftIndexMethod(index) {
      return (
        this.inputLeftPagesize * (this.inputLeftCurrentPage - 1) + index + 1
      );
    },
    inputLefthandleSelectionChange(val) {
      this.selectColumn = val;
    },
    inputRightHandleSizeChange(val) {
      this.inputRightPagesize = val;
    },
    inputRightHandleCurrentChange(val) {
      this.inputRightCurrentPage = val;
    },
    inputRightIndexMethod(index) {
      return (
        this.inputRightPagesize * (this.inputRightCurrentPage - 1) + index + 1
      );
    },
    inputFieldsImport(val) {
      this.$confirm("确认导入全部数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "导入成功!"
          });
          this.inputRightData = val;
          this.setInputRighCloneData(val);
          document.querySelector(".v-modal").remove();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
          document.querySelector(".v-modal").remove();
        });
    },
    addInputLeft() {
      this.inputRightData = this.multipleSelection;
      this.setInputRighCloneData(this.multipleSelection);
    },
    removeOutSelAllField() {
      this.inputRightData = [];
      this.inputRighCloneData = [];
      this.$refs.multipleTableLeft.clearSelection();
      //clearSelection
    },
    removeOutSelThisField(name, index) {
      this.inputRightData = _.filter(this.inputRighCloneData, item => {
        return item.name != name;
      });
      this.setInputRighCloneData(this.inputRightData);
      this.searchright = "";
    },
    outAlias(val, index) {
      this.inputRightData.splice(index, 1, {
        ...this.inputRightData[index],
        alias: val
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          if (!this.inputLeftData) {
            return;
          }
          this.inputLeftData.forEach(subRow => {
            if (row.name == subRow.name) {
              this.$refs.multipleTableLeft.toggleRowSelection(subRow);
            }
          });
        });
      }
    },
    filtertTableData(val, table, data) {
      this.inputLeftData = _.filter(data, item => {
        if (!val) {
          return item;
        }
        return item.name.indexOf(val) >= 0;
      });
    },
    filtertTableDataRight(val, table, data) {
      this.inputRightData = _.filter(data, item => {
        if (!val) {
          return item;
        }
        return item.name.indexOf(val) >= 0;
      });
    }
  }
};
</script>
<style lang="scss" scoped="">
.block__list_tags:after {
  clear: both;
  content: "";
  display: block;
}
.nodeTable {
  .block__list {
    box-sizing: border-box;
    border: 1px solid #bce8f1;
  }

  .block__list-title {
    padding: 5px 10px 5px 10px;
    text-align: left;
    color: #31708f;
    background: #dae6ec;
  }
  .block__list_words {
    height: 35vh;
  }
  .block__list_words li {
    padding: 10px;
  }

  .block__list_words .sortable-ghost {
    opacity: 0.4;
    background-color: #f4e2c9;
  }
  .block__list_tags li {
    color: #fff;
    float: left;
    margin: 8px 20px 10px 0;
    padding: 5px 10px;
    min-width: 10px;
    background-color: #5f9edf;
    text-align: center;
  }
  .blockLeft {
    width: 39%;
    float: left;
  }

  .blockLeft li {
    cursor: pointer;
  }

  .blockRight {
    width: 60%;
    float: left;
    margin-left: 1%;
  }
  .ns_fields1,
  .ns_fields2 {
    float: right;
    font-size: 16px;
    height: 18px;
    line-height: 18px;
    margin: 7px 5px 0px 0px;
    font-weight: bold;
    cursor: pointer;
  }
  .ns_fields1:hover,
  .ns_fields2:hover,
  .ns_fields3:hover {
    color: #ff4e4e;
  }
  .removeAllFields {
    float: right;
    margin: 8px 10px 0px 0px;
  }
  .removeAllFields:hover {
    color: #ff4949;
    cursor: pointer;
  }

  .removeFields {
    cursor: pointer;
    color: #ff4949;
    font-weight: bold;
  }

  .Missing,
  .illegality,
  .righttb {
    color: red;
  }
}
</style>
