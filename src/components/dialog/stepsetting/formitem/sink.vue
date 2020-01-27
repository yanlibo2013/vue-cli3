<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item
        :prop="item.name"
        :label="item.name"
        v-for="(item, index) in formItemList"
        :key="index"
        :rules="{
          required: true,
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

        <el-select
          v-if="item.name == 'type'"
          v-model="form.type"
          placeholder="请选择"
          @change="getFormItemByType(form.type)"
        >
          <el-option
            v-for="(item, index) in typeData"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>

        <el-input
          v-if="
            (item.type == 'String' ||
              item.type == 'long' ||
              item.type == 'char') &&
              !item.values
          "
          v-model="form[item.name]"
        ></el-input>
        <el-select
          v-if="item.type == 'String' && item.values && item.name != 'type'"
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
import { getSteoConfigData } from "@/api/flow";
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
    "realtime.setStepData"(val) {
      this.setFormData(val);
    },
    "realtime.initParametData"(val) {
      this.initForm(val);
      //this.getFormItemByType(this.form.type);
    },
    form(val) {
      //this.setParamertData(val);

      this.$store.dispatch("realtime/setParamertData", val);
    }
  },
  computed: {
    ...Vuex.mapState(["realtime"])
  },
  props: {
    data: {
      type: Object,
      default: false
    }
  },
  components: { adItem },
  data: function() {
    return {
      form: {
        // type: "hdfs"
      },
      formatData: ["csv", "parquet"],
      typeData: ["HDFS", "kafka"], //kafka
      formItemList: [],
      adformItemList: [],
      allformItemList: [],
      formItemData: [],
      adformItemData: {},
      allformItemData: [],
      unWatchlist: []
    };
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
    ...Vuex.mapActions([
      "openDialog",
      "setParamertData",
      "modifyLoadingStatus",
      "getStepConfiug"
    ]),
    initForm(val) {
      this.form = { ...val, ...this.form };
    },

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
          ...this.form,
          ...this.setallformItemData(data)
        });

        //针对 form format item,动态控制显示与format数据
        this.formItemList = this.filterFormItem(
          this.formItemList,
          this.form.format
        );

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
            // this.setParamertData(formData);
            this.$store.dispatch("realtime/setParamertData", formData);
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
        (val.name == "nullValue" && format == "csv") ||
        (val.name == "jsonSchema" && format == "csv")
      ) {
        return true;
      }

      if (
        (val.name == "separator" && format != "csv") ||
        (val.name == "escapeChar" && format != "csv") ||
        (val.name == "quoteChar" && format != "csv") ||
        (val.name == "nullValue" && format != "csv") ||
        (val.name == "jsonSchema" && format != "csv")
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
    getFormItemByType(val) {
      //this.initParametData({});
      this.formItemList = [];
      stepsettings("sink_" + val).then(
        data => {
          this.getStepConfiug(data);
        },
        err => {
          // this.$message({
          //   message: err.response.message,
          //   type: "error",
          //   duration: 1500
          // });
        }
      );
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

<style lang="scss"></style>
