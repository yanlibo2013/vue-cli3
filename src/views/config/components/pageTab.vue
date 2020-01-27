<template>
  <div class="tab-page2">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <span>向导文件配置</span>
        </div>
      </el-col>
    </el-row>
    <el-divider class="divider"></el-divider>
    <el-row>
      <el-col :span="12" style="padding-right:10px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList"
        >
          <el-button size="small" type="primary" icon="el-icon-upload">语料上传</el-button>
          <div slot="tip" class="el-upload__tip">文件不超过500kb</div>
        </el-upload>
      </el-col>
      <el-col :span="12" style="padding-left:10px">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="handleChange"
          :file-list="fileList"
        >
          <el-button size="small" type="primary" icon="el-icon-upload">人工修正上传</el-button>
          <div slot="tip" class="el-upload__tip">文件不超过500kb</div>
        </el-upload>
      </el-col>
    </el-row>

    <el-row style="margin-top:40px">
      <el-col :span="24">
        <div class="grid-content">
          <span>项目属性列表</span>
          <el-button type="primary" @click="handleCreate('add')">添加属性</el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <!-- <el-divider content-position="left">用户列表</el-divider> -->
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column label="提交时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="address" label="属性"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleCreate('edit')">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      style="    text-align: right"
    ></el-pagination>
    <addForm :data="{dialogFormVisible:addDialogFormVisible,formType:formType}" @reset="cancel"></addForm>
  </div>
</template>


<script>
import addForm from "./addFrom";
// import _ from "lodash";
export default {
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
    addForm
  },
  data: function() {
    return {
      addDialogFormVisible: false,
      formType: "add",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  computed: {
    //...mapState([""])
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
    //...mapActions([""]),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handleCreate(val) {
      this.addDialogFormVisible = true;
      this.formType = val;
    },
    cancel(val) {
      this.addDialogFormVisible = false;
      this.formType = val;
    }
  }
};
</script>

<style lang="scss">
.tab-page2 {
  padding: 10px;
  .grid-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
