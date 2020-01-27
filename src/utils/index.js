//字体图标的变量（需跟iconFont字体包同步）
var nodeIconFont = {
	source: 'source',
	sqlsource: 'sqlsource',
	sink: 'sink',
	decision: 'decision',
	validate: 'validate',
	supplement: 'supplement',
	sql: 'sql',
	transform: 'transform',
	filter: 'filter',
	sample: 'sample',
	lookup: 'lookup',
	join: 'join',
	starjoin: 'starjoin',
	productjoin: 'productjoin',
	aggregate: 'aggregate',
	top: 'top',
	union: 'union',
	intersect: 'intersect',
	minus: 'minus',
	split: 'split',
	Correlation: 'Correlation',
	Summary: 'Summary',
	gradientboogradientbostedtrees_predict: 'gradientboogradientbostedtrees_predict',
	MultilayerPerceptronPredict: 'MultilayerPerceptronPredict',
	MultilayerPerceptronTrain: 'MultilayerPerceptronTrain',
	kmeans_predict: 'kmeans_predict',
	kmeans_train: 'kmeans_train'
	// aggregate: "aggregate"
};
//节点图标函数
export function nodeIcon(type) {
	if (type in nodeIconFont) {
		return 'iconTrue';
	} else {
		return false;
	}
}

export const messageDialog = (message, callback, self) => {
	self
		.$confirm(message, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
		.then(() => {
			self.$message({
				type: 'success',
				message: '删除成功!'
			});
			callback();
		})
		.catch(() => {
			self.$message({
				type: 'info',
				message: '已取消删除'
			});
		});
};

export const fullScreen = (selector) => {
	let el = document.getElementById(selector);
	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
		wscript;

	if (typeof rfs != 'undefined' && rfs) {
		rfs.call(el);
		return;
	}

	if (typeof window.ActiveXObject != 'undefined') {
		wscript = new ActiveXObject('WScript.Shell');
		if (wscript) {
			wscript.SendKeys('{F11}');
		}
	}
};

export const setUpWatchersUtils = (watchList, formList, unWatchlist, form, callback, self) => {
	for (let i in watchList) {
		let formItem = formList[i];
		let watchItem = watchList[i];
		let unWatch = self.$watch(watchItem, (newValue) => {
			let item = {};
			item[formItem] = newValue;
			callback(watchItem, newValue, { ...form, ...item });
		});

		unWatchlist.push(unWatch);
	}
};

export const setFormDataUtils = (
	val,
	filterFormItem,
	form,
	initParametData,
	filter,
	difference,
	setallformItemData,
	getFormItemData,
	initForm,
	unWatchlist,
	mapKeys,
	keys,
	forEach,
	callback,
	self
) => {
	//表单全部项
	let allformItemList = filterFormItem(val, form.format);
	//表单高级选项
	let adformItemList = filter(allformItemList, (item) => {
		return item.advanced;
	});
	//表单基本项
	let formItemList = difference(allformItemList, adformItemList);

	//let data = this.realtime.initParametData;

	let allformItemData = setallformItemData(initParametData);

	let adformItemData = getFormItemData(adformItemList, allformItemData);

	//初始化表单数据

	// console.log("//初始化表单数据");
	// console.log("form", form);
	// console.log("initParametData", initParametData);
	// console.log(
	//   "setallformItemData(initParametData)",
	//   setallformItemData(initParametData)
	// );
	initForm({
		...form,
		...setallformItemData(initParametData)
	});

	//add dynamic watched

	let formkeys = mapKeys(form, function(value, key) {
		return 'form.' + key;
	});

	//注销 watch
	// if (unWatchlist.length != 0) {
	//   console.log('if (unWatchlist.length != 0) {',unWatchlist);
	//   forEach(unWatchlist, unWatch => {
	//     unWatch();
	//   });
	//   unWatchlist = [];
	// }
	forEach(unWatchlist, (unWatch) => {
		unWatch();
	});
	unWatchlist = [];
	//this.setUpWatchers(keys(formkeys), keys(this.form));

	setUpWatchersUtils(
		keys(formkeys),
		keys(form),
		unWatchlist,
		form,
		(watchItem, newValue, formData) => {
			callback(watchItem, newValue, formData);
		},
		self
	);

	return {
		formItemList: formItemList,
		adformItemList: adformItemList,
		adformItemData: adformItemData
	};
};
