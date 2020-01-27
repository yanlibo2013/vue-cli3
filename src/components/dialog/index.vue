<template>
  <div class="step-dialog">
    <el-dialog
      title="设置"
      :visible.sync="data.dialogVisible"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      v-dialog-drag
      @opened="showDailog"
      class="designDialog"
    >
      <el-form
        class="elForm"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :label-position="labelPosition"
      >
        <el-form-item label="节点名称" prop="newName">
          <el-tooltip class="priorityMes" placement="top" effect="dark">
            <div slot="content">["节点显示名称，最长100"]</div>
            <i class="el-icon-info"></i>
          </el-tooltip>
          <el-input v-model="ruleForm.newName" name="newName"></el-input>
        </el-form-item>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, key) in data.nodeSetTab"
            :key="key"
            :name="key.toString()"
            :label="item.lable"
          >
            <div slot="label">
              <i :class="item.icon"></i>
              {{ item.title }}
            </div>
            <component
              :is="setTabTemplate(item.name)"
              :data="{
                tab: item,
                step: data.step,
                targetInput: data.nodeSetTab[parseInt(activeName)].targetInput
              }"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            ></component>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="setCurrentStep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSteoConfigData } from "@/api/flow";
import input from "./input/input";
import parameter from "./stepsetting/index";
import output from "./output/output";
export default {
  watch: {
    data(val) {
      this.ruleForm = {
        newName: val.step.name
      };
    },
    "realtime.loadingStatus"(val) {
      this.loading = val;
    },
    "realtime.selectCheckedDataSet"(val) {
      if (this.data.step.type == "source") {
        this.getDatasettype(val);
      }
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
      activeName: "0",
      loading: false,
      labelPosition: "left", //表单域标签的位置
      ruleForm: {
        //定义表单验证字段
        newName: "" //节点名称
      },
      rules: {
        //节点表单验证
        newName: [
          //新名称验证
          {
            required: true,
            message: "节点名称不能为空",
            trigger: "blur"
          },
          {
            min: 1,
            max: 100,
            message: "节点显示名称，最长100",
            trigger: "blur"
          }
        ]
      },
      splitEndpoint: []
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
    ...Vuex.mapActions([
      "getStepConfiug",
      "openDialog",
      "setDataSetSelect",
      "setParamertData",
      "realtime.initParametData",
      "initOutCheckedData",
      "initInputCheckedData",
      "initInputData",
      "initOutInputData",
      "modifyLoadingStatus",
      "setFormItemList",
      "setAdList",
      "getSplitEndpoint"
    ]),
    modifyLodadingStatus() {
      this.loading = false;
    },
    getCheckedOutData(val) {
      if (val == "split") {
        let outputData = {};
        _.forEach(this.realtime.splitEndpoint, val => {
          outputData[val] = this.mapCheckedData(this.realtime.checkedOutData);
        });
        return outputData;
      } else {
        return {
          output: this.mapCheckedData(this.realtime.checkedOutData)
        };
      }
    },
    setCurrentStep() {
      this.closeDialog();

      this.$emit("modifyFlowData", {
        step: this.data.step,
        data: {
          parametData: this.realtime.parametData,
          checkedOutData: this.getCheckedOutData(this.data.step.type),
          // checkedOutData: this.mapCheckedData(this.realtime.checkedOutData),
          checkedinPUTData: this.realtime.checkedinPUTData
        }
      });
    },
    mapCheckedData(val) {
      return _.map(val, item => {
        return {
          alias: item.alias,
          description: item.description,
          column: item.name,
          type: item.type
        };
      });
    },
    closeDialog() {
      this.activeName = "0";
      this.data.dialogVisible = false;
      this.$store.dispatch("realtime/setDataSetSelect", {});
      this.$store.dispatch("realtime/initParametData", {});
      this.$store.dispatch("realtime/initOutCheckedData", []);
      this.$store.dispatch("realtime/initInputCheckedData", []);
      this.$store.dispatch("realtime/initInputData", []);
      this.$store.dispatch("realtime/modifyLoadingStatus", false);
      this.$store.dispatch("realtime/setAdList", []);
      this.$store.dispatch("realtime/getStepConfiug", []);
    },
    setTabTemplate(val) {
      switch (val) {
        case "input":
          return input;
          break;
        case "parameter":
          return parameter;
          break;
        case "output":
          return output;
          break;
        default:
          "";
      }
    },
    getinputConfigurations(step, checkedinPUTData) {
      if (step.type == "source_dummy") {
        return undefined;
      }

      if (
        (step.type == "join" &&
          checkedinPUTData.left &&
          !checkedinPUTData.right) ||
        (checkedinPUTData.right && !checkedinPUTData.left)
      ) {
        return step.inputConfigurations;
      }

      return checkedinPUTData;
    },
    handleClick(tab, event) {
      //输出 tab
      if (this.data.step.type == "source" || this.data.step.type == "sink") {
        return;
      }
      if (tab.label == "output") {
        // this.modifyLoadingStatus(true);
        // this.getOutPutData(
        //   {
        //     ...this.data.step,
        //     stepSettings: this.realtime.parametData,
        //     inputConfigurations: this.getinputConfigurations(
        //       this.data.step,
        //       this.realtime.checkedinPUTData
        //     )
        //   },
        //   () => {
        //     this.modifyLoadingStatus(false);
        //   }
        // );
        return;
      }

      if (this.data.step.type == "join" && tab.label == "input") {
        let typeTab = this.data.nodeSetTab[parseInt(this.activeName)]
          .targetInput;
        this.initInputTab(this.data.step, typeTab, typeTab);
      }

      this.modifyLoadingStatus(false);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          data.dialogVisible = false;
          done();
        })
        .catch(_ => {});
    },
    initInputForm(val, targetInput) {
      let leftlink = _.find(this.data.links, item => {
        if (val.type == "join") {
          return item.target == val.id && item.targetInput == targetInput;
        }
        return item.target == val.id;
      });
      let data = _.find(this.data.steps, item => {
        return item.id == leftlink.source;
      }).outputConfigurations;

      // this.initInputData(
      //   this.data.pre.type == "split"
      //     ? data[leftlink.sourceOutput]
      //     : data.output
      // ); //left table

      let initInputData =
        this.data.pre.type == "split"
          ? data[leftlink.sourceOutput]
          : data.output;
      //{"alias":"id_test","description":"","column":"id","type":"string"}

      this.$store.dispatch(
        "realtime/initInputData",
        _.map(initInputData, item => {
          return {
            alias: "",
            description: "",
            column: item.alias || item.column,
            type: item.type
          };
        })
      );

      //left table
    },
    //
    initOutTab(step) {
      // this.initOutCheckedData(this.getInitOutCheckedData(step));
      this.$store.dispatch(
        "realtime/initOutCheckedData",
        this.getInitOutCheckedData(step)
      );
    },
    getInitOutCheckedData(step) {
      if (step.type == "split") {
        return _.map(
          this.getSplitOutputData(step.outputConfigurations).valueList,
          val => {
            return {
              ...val,
              column: val.column
            };
          }
        );
      } else {
        return step.outputConfigurations.output;
      }
    },
    initInputTab(step, targetInput, input) {
      //left table
      this.initInputForm(step, targetInput);

      //rigth table
      // this.initInputCheckedData(
      //   step.inputConfigurations ? step.inputConfigurations[input] : []
      // );

      this.$store.dispatch(
        "realtime/initInputCheckedData",
        step.inputConfigurations ? step.inputConfigurations[input] : []
      );
    },
    initInputItem() {
      //paramete tab
      //this.initParametData(this.data.step.stepSettings);

      this.$store.dispatch(
        "realtime/initParametData",
        this.data.step.stepSettings
      );

      if (
        this.data.step.type == "source" ||
        this.data.step.type == "source_dummy"
      ) {
        //this.initOutTab(this.data.step);
        //no input tab
        //out tab
        //left table
        //select dateset init left table
        //right table
        // get from currrent step
        // this.initOutCheckedData(
        //   this.data.step.outputConfigurations
        //     ? this.data.step.outputConfigurations.output
        //     : []
        // );

        this.$store.dispatch(
          "realtime/initOutCheckedData",
          this.data.step.outputConfigurations
            ? this.data.step.outputConfigurations.output
            : []
        );

        return;
      }

      if (
        this.data.step.type == "filter" ||
        this.data.step.type == "aggregate" ||
        this.data.step.type == "transform" ||
        this.data.step.type == "sql" ||
        this.data.step.type == "lookup" ||
        this.data.step.type == "split"
      ) {
        //input tab
        // this.initInputTab(this.data.step);
        this.initInputTab(
          this.data.step,
          this.data.nodeSetTab[0].targetInput,
          "input"
        );
        //out tab
        this.initOutTab(this.data.step);
      }

      if (this.data.step.type == "join") {
        //input tab
        // this.initInputTab(this.data.step);
        this.initInputTab(
          this.data.step,
          this.data.nodeSetTab[parseInt(this.activeName)].targetInput,
          this.data.nodeSetTab[parseInt(this.activeName)].targetInput
        );
        //out tab
        this.initOutTab(this.data.step);
      }

      if (this.data.step.type == "sink") {
        this.initInputTab(
          this.data.step,
          this.data.nodeSetTab[0].targetInput,
          "input"
        );
      }

      // if (this.data.step.type == "sink") {
      //   this.initInputTab(this.data.step);
      // }
    },
    showDailog() {
      this.activeName = "0";
      let stepType = this.data.step.type;
      let type = this.data.step.stepSettings.type;

      // if (val == "sink" && !type) {
      //   type = "HDFS";
      // }

      //console.log(" showDailog() {", val);

      if (stepType == "source" || stepType == "sink") {
        getSteoConfigData(stepType).then(
          data => {
            // if (val == "lookup") {
            //   return;
            // }
            // if (val == "join") {
            //   this.getStepConfiug({
            //     allformItemList: data,
            //     joinCondition: this.getJoinConditionData(
            //       this.data.filterLinks,
            //       this.data.preSteps
            //     )
            //   });
            // } else {
            //   this.getStepConfiug(data);
            // }

            //this.getStepConfiug(data);

            this.$store.dispatch("realtime/getStepConfiug", data.data);
          },
          err => {}
        );
      }

      // stepsettings(
      //   val == "sink" || val == "source" ? val + "_" + type : val
      // ).then(
      //   data => {
      //     if (val == "lookup") {
      //       return;
      //     }
      //     if (val == "join") {
      //       this.getStepConfiug({
      //         allformItemList: data,
      //         joinCondition: this.getJoinConditionData(
      //           this.data.filterLinks,
      //           this.data.preSteps
      //         )
      //       });
      //     } else {
      //       this.getStepConfiug(data);
      //     }
      //   },
      //   err => {
      //     // this.$message({
      //     //   message: err.response.message,
      //     //   type: "error",
      //     //   duration: 1500
      //     // });
      //   }
      // );

      // init input table left
      this.initInputItem();

      if (this.data.step.type == "split") {
        let output = this.getSplitOutputData(
          this.data.step.outputConfigurations
        );
        let valueList = output.valueList;
        let keyList = output.keyList;

        this.getSplitEndpoint(keyList);
      }
    },
    getJoinConditionData(filterLinks, preSteps) {
      let result = {};
      _.forEach(filterLinks, link => {
        _.forEach(preSteps, step => {
          if (link.source == step.id && link.targetInput == "right") {
            result = {
              ...result,
              right: _.map(step.outputConfigurations.output, val => {
                return val.column;
              })
            };
          }
          if (link.source == step.id && link.targetInput == "left") {
            result = {
              ...result,
              left: _.map(step.outputConfigurations.output, val => {
                return val.column;
              })
            };
          }
        });
      });
      return result;
    },
    getSplitOutputData(data) {
      let valueList = [];
      let keyList = [];
      _.forEach(data, (value, key) => {
        valueList = [...valueList, ...value];
        keyList = [...keyList, key];
      });

      return {
        valueList: _.map(
          _.uniq(
            _.map(valueList, val => {
              return JSON.stringify(val);
            })
          ),
          val => {
            return JSON.parse(val);
          }
        ),
        keyList: keyList
      };
    },
    getOutPutData(val, fn) {
      outputStep(val).then(
        data => {
          if (data.status == 200) {
            if (this.data.step.type == "split") {
              let output = this.getSplitOutputData(data.data);
              let valueList = output.valueList;
              let keyList = output.keyList;

              this.getSplitEndpoint(keyList);

              // this.initOutInputData(
              //   _.map(valueList, val => {
              //     // return {
              //     //   ...val,
              //     //   name: val.column
              //     // };
              //     return {
              //       ...val,
              //       column: val.column
              //     };
              //   })
              // );
              this.$store.dispatch(
                "realtime/initOutInputData",
                data.data.output
              );
            } else {
              this.$store.dispatch(
                "realtime/initOutInputData",
                data.data.output
              );
            }
            fn();
          } else {
            this.$message.error(data.message);
          }
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
    getFormData(storageConfigurations, stepsettingsData) {
      _.forEach(stepsettingsData, function(value, key) {
        _.forEach(storageConfigurations, function(svalue, skey) {
          if (value.name == skey && svalue) {
            value.defaultValue = svalue;
          }
        });
      });

      return stepsettingsData;
    },
    getDatasettype(dataset) {
      if (typeof dataset.storage == "undefined") {
        return false;
      }
      let type = this.data.step.type;
      stepsettings(
        type == "sink" || type == "source" ? type + "_" + dataset.storage : type
      ).then(
        data => {
          //this.getStepConfiug(data);

          this.getStepConfiug(
            this.getFormData(dataset.storageConfigurations, data)
          );
        },
        err => {
          // this.$message({
          //   message: err.response.message,
          //   type: "error",
          //   duration: 1500
          // });
        }
      );
      // this.initForm();
    }
  }
};
</script>

<style lang="scss">
.step-dialog {
  .elForm {
    margin: 0px 0px 10px 0px;
  }
  .priorityMes {
    position: absolute;
    top: 13px;
    color: #333;
    left: -20px;
  }
}
</style>
