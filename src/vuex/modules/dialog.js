const state = {
  setStepData: {},
  stepDialogSate: false,
  outData: [],
  inputData: [],
  selectCheckedDataSet: {},
  parametData: {}, // 表单项
  currentFlowData: [],
  initParametData: {}, //dataset 选择项
  checkedOutData: [],
  initCheckedOutData: [], //初始化输出已选字段
  checkedinPUTData: [],
  initCheckedinputData: [], //初始化输入已选字段
  initInputData: [], //初始化输入备选字段
  initOutInputData: [], //初始化输出备选字段
  loadingStatus: false,
  formItemList: [],
  adList: [],
  adForm: {},
  splitEndpoint: []
};

const mutations = {
  SET_SPLIT_ENDPOINT: (state, data) => {
    state.splitEndpoint = data;
  },
  SET_STEP_SETTING: (state, data) => {
    state.setStepData = data;
  },
  SET_STEP_DIALOG: (state, data) => {
    state.stepDialogSate = data;
  },
  SET_STEP_OUT_DATA: (state, data) => {
    state.outData = data;
  },
  SET_STEP_INPUT_DATA: (state, data) => {
    state.inputData = data;
  },
  SET_SELECT_DATASET_ITEM: (state, data) => {
    state.selectCheckedDataSet = data;
  },
  SET_PARAMERTER_DATA: (state, data) => {
    state.parametData = data;
  },
  SET_CURRENT_FLOW_DATA: (state, data) => {
    state.currentFlowData = data;
  },
  INIT_FORM_DATA: (state, data) => {
    state.initParametData = data;
  },
  SET_OUT_CHECKED_DATA: (state, data) => {
    state.checkedOutData = data;
  },
  INIT_OUT_CHECKED_DATA: (state, data) => {
    state.initCheckedOutData = data;
  },
  SET_INPUT_CHECKED_DATA: (state, data) => {
    state.checkedinPUTData = data;
  },
  INIT_INPUT_CHECKED_DATA: (state, data) => {
    state.initCheckedinputData = data;
  },
  INIT_INPUT_DATA: (state, data) => {
    state.initInputData = data;
  },
  INIT_OUTPUT_DATA: (state, data) => {
    state.initOutInputData = data ? data : [];
  },
  MODIFY_LOADING_STATUS: (state, data) => {
    state.loadingStatus = data;
  },
  SET_FORM_ITEM_LIST: (state, data) => {
    state.formItemList = data;
  },
  SET_AD_LIST: (state, data) => {
    state.adList = data;
  },
  SET_AD_FORM: (state, data) => {
    state.adForm = data;
  }
};

const actions = {
  getStepConfiug({ commit }, data) {
    commit("SET_STEP_SETTING", data);
  },
  openDialog({ commit }, data) {
    commit("SET_STEP_DIALOG", data);
  },
  setOutData({ commit }, data) {
    commit("SET_STEP_OUT_DATA", data);
  },
  setInputData({ commit }, data) {
    commit("SET_STEP_INPUT_DATA", data);
  },
  setDataSetSelect({ commit }, data) {
    commit("SET_SELECT_DATASET_ITEM", data);
  },
  setParamertData({ commit }, data) {
    commit("SET_PARAMERTER_DATA", data);
  },
  setCurrentFlowData({ commit }, data) {
    commit("SET_CURRENT_FLOW_DATA", data);
  },
  initParametData({ commit }, data) {
    commit("INIT_FORM_DATA", data);
  },
  setOutCheckedData({ commit }, data) {
    commit("SET_OUT_CHECKED_DATA", data);
  },
  initOutCheckedData({ commit }, data) {
    commit("INIT_OUT_CHECKED_DATA", data);
  },
  setInputCheckedData({ commit }, data) {
    commit("SET_INPUT_CHECKED_DATA", data);
  },
  initInputCheckedData({ commit }, data) {
    commit("INIT_INPUT_CHECKED_DATA", data);
  },
  initInputData({ commit }, data) {
    commit("INIT_INPUT_DATA", data);
  },
  initOutInputData({ commit }, data) {
    commit("INIT_OUTPUT_DATA", data);
  },
  modifyLoadingStatus({ commit }, data) {
    commit("MODIFY_LOADING_STATUS", data);
  },
  setFormItemList({ commit }, data) {
    commit("SET_FORM_ITEM_LIST", data);
  },
  setAdList({ commit }, data) {
    commit("SET_AD_LIST", data);
  },
  setAdForm({ commit }, data) {
    commit("SET_AD_FORM", data);
  },
  getSplitEndpoint({ commit }, data) {
    commit("SET_SPLIT_ENDPOINT", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
