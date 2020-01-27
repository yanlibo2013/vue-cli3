<template>
  <div class="sink-step">
    <!-- <h1>{{data.type}}</h1> -->
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item
        :label="'dataset'"
        :rules="[{ required: true, message: '', trigger: 'blur' }]"
      >
        <el-tooltip
          lass="item"
          effect="dark"
          content="1.数据集名称,从资源目录选择或编辑创建 2.格式为字符串：字符/数字/下划线/-/的组合"
          placement="top"
        >
          <i class="parIcon el-icon-warning"></i>
        </el-tooltip>
        <el-input
          placeholder="请选择内容"
          v-model="form.datasetName"
          :model="form.datasetName"
          :disabled="true"
          name="dataset"
        >
          <el-button
            slot="append"
            icon="icon iconfont icon-ir-search"
            @click="selectDataset"
            name="dataSetInq"
          ></el-button>
        </el-input>
        <p class="sign" v-if="!form.datasetName">选择内容不能为空</p>
      </el-form-item>
      <el-form-item
        label="type"
        :rules="[{ required: true, message: '', trigger: 'change' }]"
      >
        <el-tooltip lass="item" effect="dark" content="type" placement="top">
          <i class="parIcon el-icon-warning"></i>
        </el-tooltip>
        <el-input v-model="form.type" disabled placeholder="请选择"></el-input>
        <!-- <el-select v-model="form.type" placeholder="请选择">
          <el-option v-for="(item,index) in typeData" :key="index" :label="item" :value="item"></el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item
        :prop="item.name"
        :label="item.name"
        v-for="(item, index) in formItemList"
        :key="index"
        :rules="{
          required: item.required,
          message: '',
          trigger: 'blur'
        }"
        v-if="item.isshow"
      >
        <el-tooltip
          lass="item"
          effect="dark"
          :content="item.name"
          placement="top"
        >
          <i class="parIcon el-icon-warning"></i>
        </el-tooltip>
        <el-input
          v-if="(item.type == 'String' || item.type == 'char') && !item.values"
          v-model="form[item.name]"
        ></el-input>
        <el-select
          v-if="item.type == 'String' && item.values"
          v-model="form[item.name]"
          placeholder="请选择"
        >
          <el-option
            v-for="(subitem, subindex) in item.values ? item.values : ''"
            :key="subindex"
            :label="subitem"
            :value="subitem"
          ></el-option>
        </el-select>
        <el-switch
          v-if="item.type == 'boolean'"
          v-model="form[item.name]"
        ></el-switch>
      </el-form-item>
    </el-form>
    <adItem
      :data="{ adformItemList: adformItemList, adformItemData: adformItemData }"
    ></adItem>
  </div>
</template>

<script>
// import { mapGetters, mapActions, mapState } from "vuex";
// import { querySchema } from "@/api";
import {
  isEmpty,
  forEach,
  map,
  mapKeys,
  keys,
  cloneDeep,
  isEqual,
  filter,
  difference
} from "lodash";
import adItem from "./common/index";
import { setUpWatchersUtils, setFormDataUtils } from "@/utils/index";
export default {
  watch: {
    // dialog opened init form item
    "realtime.setStepData"(val) {
      // this.formItemList = this.filterFormItem(val, this.form.format);
      this.setFormData(val);
    },
    // select dataset init form data
    "realtime.initParametData"(val) {
      //初始化表单项及数据
      this.initForm(val);

      if (isEmpty(val)) {
        this.formItemList = [];
      }
    },
    //step type source

    //选择 dataset 时初始化表单 dataset id ,name
    "realtime.selectCheckedDataSet"(val) {
      this.initForm({
        datasetName: val.datasetName,
        schemaId: val.schemaId,
        type: val.storage
      });
    },
    form(val) {
      this.$store.dispatch("realtime/setParamertData", val);
    }
  },

  computed: {
    ...Vuex.mapState(["realtime"])
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    adItem
  },
  data: function() {
    return {
      form: {},
      formatData: ["csv", "parquet"],
      dialogDataSetVisible: false,
      typeData: ["HDFS", "KAFKA"],
      formItemList: [],
      adformItemList: [],
      allformItemList: [],
      formItemData: [],
      adformItemData: {},
      allformItemData: [],
      unWatchlis: []
    };
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {
    this.$nextTick(() => {});
  },
  beforeDestroy() {},
  destroyed() {},
  methods: {
    ...Vuex.mapActions([
      "openDialog",
      "setParamertData",
      "initOutInputData",
      "modifyLoadingStatus"
    ]),
    setUpWatchers(watchList, formList) {
      for (let i in watchList) {
        let formItem = formList[i];
        let watchItem = watchList[i];
        this.$watch(watchItem, newValue => {
          let item = {};
          item[formItem] = newValue;
          //this.setParamertData({ ...this.form, ...item });
          this.$store.dispatch("realtime/setParamertData", val.fields);
          if (watchItem == "form.format") {
            this.formItemList = this.filterFormItem(
              this.formItemList,
              newValue
            );
          }
        });
      }
    },
    getFormItemData(formItem, data) {
      let result = {};
      _.forEach(formItem, item => {
        _.forEach(data, (subitem, key) => {
          if (key == item.name) {
            result[key] = subitem;
          }
        });
      });

      return result;
    },
    //初始化 source step 参数项
    //并且 根据schemaId 获取输出备选字段
    initForm(val) {
      this.form = val;

      // if (val.schemaId) {
      //   querySchema(val.schemaId).then(
      //     data => {
      //       this.initOutInputData(
      //         _.map(data.fields, item => {
      //           return {
      //             alias: item.alias,
      //             description: item.description,
      //             column: item.name,
      //             type: item.type
      //           };
      //         })
      //       );
      //     },
      //     err => {
      //       this.$message({
      //         message: err.response.message,
      //         type: "error",
      //         duration: 1500
      //       });
      //     }
      //   );
      // }
    },
    selectDataset() {
      //this.dialogDataSetVisible = true;
      this.openDialog(true);
    },
    cancelDatasetDialog() {
      //关闭dialog
      this.dialogDataSetVisible = false;
      //调用子组件的方法清空子组件的值
      //this.$refs.dataSourceInquire.clearSelectionRow();
      // console.log(document.querySelectorAll("v-modal"));
      // document.querySelectorAll(".v-modal").remove();
      // this.openDialog(true)
    },
    submitDataSet() {},
    selectChange() {},
    // setFormData(val) {
    //   this.$nextTick(() => {
    //     //表单全部项
    //     this.allformItemList = this.filterFormItem(val, this.form.format);
    //     //表单高级选项
    //     this.adformItemList = filter(this.allformItemList, item => {
    //       return item.advanced;
    //     });
    //     //表单基本项
    //     this.formItemList = difference(
    //       this.allformItemList,
    //       this.adformItemList
    //     );

    //     let data = this.realtime.initParametData;

    //     this.allformItemData = this.setallformItemData(data);

    //     this.adformItemData = this.getFormItemData(
    //       this.adformItemList,
    //       this.allformItemData
    //     );

    //     //初始化表单数据
    //     this.initForm({
    //       ...this.form,
    //       ...this.setallformItemData(data)
    //     });

    //     //add dynamic watched

    //     let formkeys = mapKeys(this.form, function(value, key) {
    //       return "form." + key;
    //     });
    //     this.setUpWatchers(keys(formkeys), keys(this.form));
    //   });
    // },
    setFormData(val) {
      this.$nextTick(() => {
        //表单全部项
        this.allformItemList = this.filterFormItem(val, this.form.format);
        //表单高级选项
        this.adformItemList = filter(this.allformItemList, item => {
          return item.advanced;
        });
        //表单基本项
        this.formItemList = difference(
          this.allformItemList,
          this.adformItemList
        );

        let data = this.realtime.initParametData;

        this.allformItemData = this.setallformItemData(data);

        this.adformItemData = this.getFormItemData(
          this.adformItemList,
          this.allformItemData
        );

        //初始化表单数据
        this.initForm({
          ...this.setallformItemData(data),
          ...this.form
        });

        //add dynamic watched

        let formkeys = mapKeys(this.form, function(value, key) {
          return "form." + key;
        });

        //注销 watch
        forEach(this.unWatchlist, unWatch => {
          unWatch();
        });
        this.unWatchlist = [];

        setUpWatchersUtils(
          keys(formkeys),
          keys(this.form),
          this.unWatchlist,
          this.form,
          (watchItem, newValue, formData) => {
            this.$store.dispatch("realtime/setParamertData", val.fields);
            //this.setParamertData(formData);
            if (watchItem == "form.format") {
              this.formItemList = this.filterFormItem(
                this.formItemList,
                newValue
              );
            }
          },
          this
        );
      });
    },
    filterFormItem(val, format) {
      return _.map(val, item => {
        return {
          ...item,
          isshow: this.isshow(item, format)
        };
      });
    },

    isshow(val, format) {
      if (
        (val.name == "separator" && format == "csv") ||
        (val.name == "escapeChar" && format == "csv") ||
        (val.name == "quoteChar" && format == "csv") ||
        (val.name == "nullValue" && format == "csv")
      ) {
        return true;
      }

      if (
        (val.name == "separator" && format != "csv") ||
        (val.name == "escapeChar" && format != "csv") ||
        (val.name == "quoteChar" && format != "csv") ||
        (val.name == "nullValue" && format != "csv") ||
        (val.name == "jsonSchema" && format != "json")
      ) {
        return false;
      }
      return true;
    },
    getValueByName(data, val) {
      let result = "";
      _.forEach(data, (value, key) => {
        if (value.name == val) {
          result = value.defaultValue;
        }
      });

      return result;
    },
    setallformItemData(initParametData) {
      let allformItemData = {};
      let formkeys = map(this.allformItemList, val => {
        return val.name;
      });
      forEach(formkeys, val => {
        if (val == "processOnce") {
          allformItemData[val] =
            initParametData[val] == "" ? false : initParametData[val];
        } else {
          allformItemData[val] = initParametData[val]
            ? initParametData[val]
            : this.getValueByName(this.allformItemList, val);
        }
      });

      return allformItemData;
    }
  }
};
</script>

<style lang="scss">
.sink-step {
  .sign {
    margin: 0px;
    color: red;
    padding: 0px;
    font-size: 8px;
  }
}
</style>
