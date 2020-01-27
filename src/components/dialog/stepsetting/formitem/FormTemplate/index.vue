<template>
  <div class="sink-step">
    <!-- <h1>{{data.type}}</h1> -->
    <el-form ref="form" :model="form" label-width="150px">
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
import { mapGetters, mapActions, mapState } from "vuex";
import { querySchema } from "@/api";
import { isEmpty } from "lodash";
import adItem from "./common/index";
export default {
  watch: {
    "realtime.setStepData"(val) {
      this.setFormData(val);
    },
    form(val) {
      this.$store.dispatch("realtime/setParamertData", val);
    },
    "form.dataType"(val) {
      this.$store.dispatch("realtime/setParamertData", {
        ...this.form,
        dataType: val
      });
    },
    "form.maxOutOfOrderness"(val) {
      this.$store.dispatch("realtime/setParamertData", {
        ...this.form,
        maxOutOfOrderness: val
      });
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
      allformItemData: []
    };
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {
    this.$nextTick(() => {
      // this.modifyLoadingStatus(false);
    });
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
    initForm(val) {
      this.form = {
        dataType: val.dataType,
        maxOutOfOrderness: val.maxOutOfOrderness
      };
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
    setFormData(val) {
      this.$nextTick(() => {
        this.allformItemList = this.filterFormItem(val, this.form.format);
        // this.allformItemList = val;
        this.adformItemList = _.filter(this.allformItemList, item => {
          return item.advanced;
        });
        this.formItemList = _.difference(
          this.allformItemList,
          this.adformItemList
        );

        let data = this.realtime.initParametData;

        this.allformItemData = {
          dataType: data.dataType
            ? data.dataType
            : this.getValueByName(this.allformItemList, "dataType"),
          maxOutOfOrderness: data.maxOutOfOrderness
            ? data.maxOutOfOrderness
            : this.getValueByName(this.allformItemList, "maxOutOfOrderness")
        };

        this.formItemData = this.getFormItemData(
          this.formItemList,
          this.allformItemData
        );

        this.adformItemData = this.getFormItemData(
          this.adformItemList,
          this.allformItemData
        );
        this.initForm({
          ...this.formItemData,
          //高级选项
          ...this.adformItemData
        });
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
