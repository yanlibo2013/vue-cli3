<template>
<div class="jspluimbchart">
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="18">
                    <div class="grid-content">
                        <el-input placeholder="请输入内容" v-model="input1">
                            <template slot="prepend">流程名称</template>
                        </el-input>
                    </div>
                </el-col>

                <el-col :span="6" justify="space-around">
                    <div class="grid-content bg-purple-light">
                        <el-button size="small" @click="clearall">清空</el-button>
                        <el-button size="small" @click="reset">还原</el-button>
                        <el-button size="small" @click="saveFlow">保存</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-main class="jsplumbchart-main">
                <drop class="drop-workplace" @drop="handleDrop" id="workplace">
                    <jsplumbchart :data="jsplumbchartOption" @modifyJsplumbchartOption="modifyJsplumbchartOption" @modifyChart="modifyChart" @nodedblClick="nodedblClick" @handleDrop="handleDrop" ref="jsplumbchart"></jsplumbchart>
                </drop>
            </el-main>
            <el-aside width="250px">
                <vaside></vaside>
            </el-aside>
        </el-container>
    </el-container>

    <stepdialog :data="dialogOption" @modifyFlowData="modifyFlowData"></stepdialog>
</div>
</template>

<script>
import vaside from "@/components/aside/left/index";
import jsplumbchart from "@/components/jsplumbchart/index";

// import "@/components/jsplumbchart/dist/jsplumbchart.css";
// import * as jsplumbchart from "@/components/jsplumbchart/dist/jsplumbchart.umd.min.js";
import stepdialog from "@/components/dialog/index";
import {
    addFlow,
    getFlowItem,
    modifyFlow,
    getSteoConfigData
} from "@/api/flow";
export default {
    name: "jsplumb-chart",
    watch: {
        // flowData(val) {
        // }
    },
    props: {
        // data: {
        //   type: Object,
        //   default: false
        // }
    },
    components: {
        vaside,
        stepdialog,
        jsplumbchart
    },
    // components: { vaside, stepdialog },
    data: function () {
        return {
            jsplumbchartOption: {
                isPanZoom: false,
                steps: this.steps,
                links: this.links,
                container: "workplace",
                nodeType: "flowchartnode",
                jsPlumb: jsPlumb
            },
            nodeTab: [{
                    title: "输入",
                    name: "input",
                    icon: "fa fa-sign-in",
                    lable: "input"
                },
                {
                    title: "参数",
                    name: "parameter",
                    icon: "fa fa-gear",
                    lable: "parameter"
                },
                {
                    title: "输出",
                    name: "output",
                    icon: "fa fa-sign-out",
                    lable: "output"
                }
            ],
            dialogOption: {},
            input1: "",
            links: [],
            steps: [],
            jsPlumb: jsPlumb,
            matrix: "",
            operationType: "copy",
            input1Test: ""
        };
    },
    computed: {
        ...Vuex.mapState([""])
    },
    mounted() {
        if (this.$route.query.id) {
            getFlowItem({
                id: this.$route.query.id
            }).then(res => {
                let flowData = res.data[0];
                this.steps = flowData.steps;
                this.links = flowData.links;
                this.input1 = flowData.flowName;
                this.matrix = flowData.matrix;
                this.jsplumbchartOption = {
                    steps: this.steps,
                    links: this.links,
                    container: "workplace",
                    nodeType: "flowchartnode",
                    jsPlumb: this.jsPlumb,
                    matrix: flowData.matrix && JSON.parse(flowData.matrix)
                };

                //console.log("this.jsplumbchartOption",this.jsplumbchartOption);
            });
        }
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed: function () {},
    methods: {
        //...mapActions([""]),
        modifyJsplumbchartOption(val) {
            this.jsplumbchartOption = val;
        },
        handleDragover() {
            //console.log("handleDragover(){");
        },
        copyNode(node) {
            let uuid = jsPlumbUtil.uuid();
            return {
                ...node,
                id: this.isExitStepID(node.id) ? node.id + "_new" + uuid : node.id
            };
        },
        handleDrop(val) {
            console.log("handleDrop(val) {", val);
            let stepData = "";
            let containerRect = "";
            let container = this.$refs.jsplumbchart.jsplumbInstance.getContainer();
            // add step
            if (val.drawIcon) {
                stepData = this.getCurrentNode(
                    val,
                    this.jsplumbchartOption.isPanZoom ? container : ""
                );
                containerRect = container && container.getBoundingClientRect();
                this.operationType = "add";
            } else {
                // copy step
                stepData = this.copyNode(val);
            }
            this.steps.push(stepData);

            this.jsplumbchartOption = {
                ...this.jsplumbchartOption,
                steps: this.steps,
                links: this.links,
                operationType: this.operationType,
                containerRect: containerRect
            };
        },
        isExitStepID(val) {
            let result = false;
            _.forEach(this.steps, item => {
                if (item.id == val) {
                    result = true;
                }
            });

            return result;
        },
        getScale(instance) {
            let container = instance.getContainer();
            let scale1;
            if (instance.pan) {
                const {
                    scale
                } = instance.pan.getTransform();
                scale1 = scale;
            } else {
                const matrix = window.getComputedStyle(container).transform;
                scale1 = matrix.split(", ")[3] * 1;
            }
            instance.setZoom(scale1);
            return scale1;
        },
        getCurrentNode(data, container) {
            let uuid = jsPlumbUtil.uuid();
            let stepId = data.drawIcon.id + "_" + (this.steps.length + 1);
            let newstepid = this.isExitStepID(stepId) ?
                stepId + "_new" + uuid :
                stepId;
            let node = {
                id: this.isExitStepID(newstepid) ? newstepid + "_new" : newstepid,
                name: data.drawIcon.name,
                type: data.drawIcon.type,
                // x: left,
                // y: top,
                // x: event.offsetX,
                // y: event.offsetY,
                // x: event.pageX,
                // y: event.pageY,
                x: _.isElement(container) ? event.pageX : event.offsetX,
                y: _.isElement(container) ? event.pageY : event.offsetY,
                stepSettings: data.drawIcon.stepSettings
            };

            let outputConfigurations = {
                outputConfigurations: {
                    output: []
                }
            };

            let inputConfigurations = {
                inputConfigurations: {
                    input: []
                }
            };

            switch (data.drawIcon.type) {
                case "source":
                case "source_dummy":
                    return {
                        ...node,
                        ...outputConfigurations
                    };
                case "sink":
                    return {
                        ...node,
                        ...inputConfigurations
                    };
                default:
                    return {
                        ...node,
                        ...inputConfigurations,
                        ...outputConfigurations
                    };
            }
        },
        saveFlow() {
            // console.log("this.links", this.links);
            // console.log("this.steps", this.steps);
            // return;

            // console.log(this.$refs.jsplumbchart.jsplumbInstance.pan.getTransform());

            // const matrix = window.getComputedStyle(
            //   this.$refs.jsplumbchart.jsplumbInstance.getContainer()
            // ).transform;

            if (!this.input1) {
                this.$message({
                    showClose: true,
                    message: "流程名称不可以为空",
                    type: "error"
                });

                return;
            }

            let data = {};

            if (this.jsplumbchartOption.isPanZoom) {
                data = {
                    flowName: this.input1,
                    links: this.links,
                    steps: this.steps,
                    date: moment().format("YYYY-MM-DD HH:mm:ss"),
                    matrix: JSON.stringify(
                        this.$refs.jsplumbchart.jsplumbInstance.pan.getTransform()
                    )
                };
            } else {
                data = {
                    flowName: this.input1,
                    links: this.links,
                    steps: this.steps,
                    date: moment().format("YYYY-MM-DD HH:mm:ss")
                };
            }

            if (this.$route.query.id) {
                modifyFlow({
                    ...data,
                    id: this.$route.query.id
                }).then(res => {
                    this.$router.go(-1);
                });
            } else {
                addFlow(data).then(res => {
                    this.$router.go(-1);
                });
            }
        },
        modifyChart(val) {
            this.steps = val.stepData;
            this.links = val.links;

            this.jsplumbchartOption = {
                ...this.jsplumbchartOption,
                steps: val.stepData,
                links: val.links
            };
        },
        clearall() {
            this.steps = [];
            this.links = [];
            this.$refs.jsplumbchart.reset();
        },
        reset() {
            this.$refs.jsplumbchart.resume();
        },
        nodedblClick(val) {
            if (this.isOpenStepDialog(val)) {
                this.$message({
                    message: "请建立正确的连接！",
                    type: "error"
                });
                return;
            }
            // if (val.type == "source" || val.type == "sink") {
            //   getSteoConfigData(val.type).then(res => {});
            // }

            //nodeSetTab
            this.dialogOption = {
                dialogVisible: true,
                step: val,
                filterLinks: this.filterLinks(val),
                preSteps: this.getPreNodes(this.filterLinks(val)),
                pre: this.getPreNode(this.findLinks(val)),
                nodeSetTab: this.setNodeSetTab(
                    val,
                    this.getPreNode(this.findLinks(val))
                ),
                steps: this.steps,
                links: this.links
            };
        },
        isOpenStepDialog(val) {
            if (val.type == "source" || val.type == "source_dummy") {
                return false;
            }

            if (
                val.type == "join" &&
                (this.filterLinks(val).length == 0 || this.filterLinks(val).length == 1)
            ) {
                return true;
            }

            if (
                (val.type == "filter" ||
                    val.type == "sink" ||
                    val.type == "aggregate" ||
                    val.type == "transform" ||
                    // val.type == "join" ||
                    val.type == "lookup" ||
                    val.type == "split" ||
                    val.type == "sql") &&
                !this.filterLinks(val)[0]
            ) {
                return true;
            }
        },
        filterLinks(val) {
            return _.filter(this.links, function (item) {
                return item.target == val.id;
            });
        },
        setNodeSetTab(val, pre) {
            if (val.type == "sink") {
                return [{
                        ...this.nodeTab[0],
                        title: "输入 (" + pre.name + ")"
                    },
                    this.nodeTab[1]
                ];
            }
            if (val.type == "source" || val.type == "source_dummy") {
                return [this.nodeTab[1], this.nodeTab[2]];
            }
            if (
                val.type == "filter" ||
                val.type == "aggregate" ||
                val.type == "sql" ||
                val.type == "transform" ||
                val.type == "lookup" ||
                val.type == "split"
            ) {
                return [{
                        ...this.nodeTab[0],
                        title: "输入 (" + pre.name + ")"
                    },
                    this.nodeTab[1],
                    this.nodeTab[2]
                ];
            }

            if (val.type == "join") {
                // console.log("this.getLinks(val)", this.getLinks(val));
                let result = [];
                _.forEach(this.getLinks(val), element => {
                    result.push({
                        ...this.nodeTab[0],
                        title: element.targetInput + " (" + this.getPreNode(element).name + ")",
                        targetInput: element.targetInput
                    });
                });
                return [...result, this.nodeTab[1], this.nodeTab[2]];
            }
        },
        getPreNodes(links) {
            let result = [];
            _.forEach(links, p => {
                _.forEach(this.steps, s => {
                    if (p.source == s.id) {
                        result.push(s);
                    }
                });
            });
            return result;
        },

        getPreNode(val) {
            return _.find(this.steps, function (o) {
                if (!val) {
                    return "";
                }
                return o.id == val.source;
            });
        },
        findLinks(val) {
            return _.find(this.links, function (item) {
                return item.target == val.id;
            });
        },
        modifyFlowData(val) {
            this.steps = _.map(this.steps, item => {
                if (
                    item.type == val.step.type &&
                    val.step.type == "source" &&
                    item.id == val.step.id
                ) {
                    return {
                        ...item,
                        stepSettings: val.data.parametData,
                        outputConfigurations: val.data.checkedOutData
                    };
                }

                if (
                    item.type == val.step.type &&
                    (val.step.type != "source" || val.step.type != "sink") &&
                    item.id == val.step.id
                ) {
                    return {
                        ...item,
                        stepSettings: val.data.parametData,
                        outputConfigurations: val.data.checkedOutData,
                        inputConfigurations: val.data.checkedinPUTData
                    };
                }

                if (
                    item.type == val.step.type &&
                    val.step.type == "sink" &&
                    item.id == val.step.id
                ) {
                    return {
                        ...item,
                        stepSettings: val.data.parametData,
                        inputConfigurations: val.data.checkedinPUTData
                    };
                }
                return item;
            });
        }
    }
};
</script>

<style lang="scss">
.jspluimbchart {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;

    .el-aside {
        background-color: #d3dce6;
        color: #333;
        // text-align: center;
        line-height: 200px;
    }

    .el-container {
        height: 100%;
    }

    .el-main {
        background-image: url("../../../../../assets/editor/designBg.png");
        position: relative;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        height: 100%;
    }

    .el-col {
        border-radius: 4px;
        height: 100%;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        // background: #e5e9f2;
        display: flex;
        justify-content: start;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 25px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>
