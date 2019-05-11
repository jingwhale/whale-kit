const pageDataTemplate = (values) =>{
  var pageDataObj = [
    {
      flag:true,
      title:"基本信息",
      value:[
        {
          title:"页面Url",
          value:values.url
        },
        {
          title:"页面Title",
          value:values.title
        },
        {
          title:"页面Ico",
          value:values.ico
        },
        {
          title:"兼容性",
          value:values.compatibility
        }
      ]
    },
    {
      flag:true,
      title:"页面SEO",
      value:[
        {
          title:"SEO-Keywords",
          value:values.keywords
        },
        {
          title:"SEO-Description",
          value:values.description
        }
      ]
    },
    {
      title:"页面权限",
      value:values.permission,
      arrDataColumnType:true
    },
    {
      flag:true,
      title:"页面状态",
      value:[
        {
          title:"页面状态",
          value:values.state
        },
        {
          title:"页面状态描述",
          value:values.stateDescription
        },
      ]
    },
    {
      flag:true,
      title:"页面跳转",
      value:[
        {
          title:"页面的入口",
          value:values.linkin
        },
        {
          title:"页面的出口",
          value:values.linkout
        },
      ]
    },
    {
      title:"其他",
      value:values.other
    }
  ];
  return pageDataObj;
};

const getDataFormTemplate = (values) =>{
  var dataFormObj = {
    flag:true,
    title:values.title.value,
    value:[]
  };

  if(values.paramType.value!==""){
    dataFormObj.value.push(
      {
        title:"字段类型",
        value:values.paramType.value
      }
    )
  }

  if(values.paramRule.value!==""){
    dataFormObj.value.push(
      {
        title:"字段规则",
        value:values.paramRule.value
      }
    )
  }

  if(values.paramIsNeed.value!==""){
    dataFormObj.value.push(
      {
        title:"字段是否必填",
        value:values.paramIsNeed.value
      }
    )
  }

  if(values.paramDefault.value!==""){
    dataFormObj.value.push(
      {
        title:"默认值",
        value:values.paramDefault.value
      }
    )
  }

  if(values.paramPlaceholder.value!==""){
    dataFormObj.value.push(
      {
        title:"placeholder",
        value:values.paramPlaceholder.value
      }
    )
  }

  if(values.paramDoRule.value!==""){
    dataFormObj.value.push(
      {
        title:"校验规则与错误提示",
        value:values.paramDoRule.value
      }
    )
  }
  if(values.paramDefaultState.value!==""){
    dataFormObj.value.push(
      {
        title:"默认状态",
        value:values.paramDefaultState.value
      }
    )
  }
  if(values.paramCurrentState.value!==""){
    dataFormObj.value.push(
      {
        title:"当前状态",
        value:values.paramCurrentState.value
      }
    )
  }
  if(values.paramStateDes.value!==""){
    dataFormObj.value.push(
      {
        title:"各种状态描述",
        value:values.paramStateDes.value
      }
    )
  }
  if(values.eventDec.value!==""){
    dataFormObj.value.push(
      {
        title:"事件触发与触发效果",
        value:values.eventDec.value
      }
    )
  }

  if(values.other.value!==""){
    dataFormObj.value.push(
      {
        title:"其他",
        value:values.other.value
      }
    )
  }

  return dataFormObj;
};

const changeDataFormTemplate = (values) =>{
  var dataFormObj = {
    flag:true,
    title:values.title.value,
    value:[]
  };
  if(values.paramType.value!==""){
    dataFormObj.value.push(
      {
        title:"值类型",
        value:values.paramType.value
      }
    )
  }
  if(values.paramRule.value!==""){
    dataFormObj.value.push(
      {
        title:"显示规则",
        value:values.paramRule.value
      }
    )
  }
  if(values.valueList.value!==""){
    dataFormObj.value.push(
      {
        title:"选项值罗列",
        value:values.valueList.value
      }
    )
  }
  if(values.paramIsNeed.value!==""){
    dataFormObj.value.push(
      {
        title:"字段是否必选",
        value:values.paramIsNeed.value
      }
    )
  }
  if(values.paramDoRule.value!==""){
    dataFormObj.value.push(
      {
        title:"校验规则与错误提示",
        value:values.paramDoRule.value
      }
    )
  }
  if(values.paramDefaultState.value!==""){
    dataFormObj.value.push(
      {
        title:"默认状态",
        value:values.paramDefaultState.value
      }
    )
  }
  if(values.paramCurrentState.value!==""){
    dataFormObj.value.push(
      {
        title:"当前状态",
        value:values.paramCurrentState.value
      }
    )
  }
  if(values.paramStateDes.value!==""){
    dataFormObj.value.push(
      {
        title:"各种状态描述",
        value:values.paramStateDes.value
      }
    )
  }
  if(values.eventDec.value!==""){
    dataFormObj.value.push(
      {
        title:"事件触发与触发效果",
        value:values.eventDec.value
      }
    )
  }

  if(values.other.value!==""){
    dataFormObj.value.push(
      {
        title:"其他",
        value:values.other.value
      }
    )
  }

  return dataFormObj;
};

const showDataFormTemplate = (values) =>{
  var dataFormObj = {
    flag:true,
    title:values.title.value,
    value:[]
  };

  if(values.paramType.value!==""){
    dataFormObj.value.push(
      {
        title:"字段类型",
        value:values.paramType.value
      }
    )
  }

  if(values.paramRule.value!==""){
    dataFormObj.value.push(
      {
        title:"字段显示规则",
        value:values.paramRule.value
      }
    )
  }
  if(values.paramDefault.value!==""){
    dataFormObj.value.push(
      {
        title:"字段为空时显示（默认值）",
        value:values.paramDefault.value
      }
    )
  }
  if(values.paramDefaultState.value!==""){
    dataFormObj.value.push(
      {
        title:"默认状态",
        value:values.paramDefaultState.value
      }
    )
  }
  if(values.paramCurrentState.value!==""){
    dataFormObj.value.push(
      {
        title:"当前状态",
        value:values.paramCurrentState.value
      }
    )
  }
  if(values.paramStateDes.value!==""){
    dataFormObj.value.push(
      {
        title:"各种状态描述",
        value:values.paramStateDes.value
      }
    )
  }
  if(values.eventDec.value!==""){
    dataFormObj.value.push(
      {
        title:"事件触发与触发效果",
        value:values.eventDec.value
      }
    )
  }

  if(values.other.value!==""){
    dataFormObj.value.push(
      {
        title:"其他",
        value:values.other.value
      }
    )
  }

  return dataFormObj;
};

const functionDataFormTemplate = (values) =>{
  var dataFormObj = {
    flag:true,
    title:values.title.value,
    value:[]
  };

  if(values.valueList.value!==""){
    dataFormObj.value.push(
      {
        title:"按钮显示值",
        value:values.valueList.value
      }
    )
  }

  if(values.isDoRule.value!==""){
    dataFormObj.value.push(
      {
        title:"是否校验其他数据",
        value:values.isDoRule.value
      }
    )
  }
  if(values.paramDoRule.value!==""){
    dataFormObj.value.push(
      {
        title:"校验规则与错误提示",
        value:values.paramDoRule.value
      }
    )
  }
  if(values.paramDefaultState.value!==""){
    dataFormObj.value.push(
      {
        title:"默认状态",
        value:values.paramDefaultState.value
      }
    )
  }
  if(values.paramCurrentState.value!==""){
    dataFormObj.value.push(
      {
        title:"当前状态",
        value:values.paramCurrentState.value
      }
    )
  }
  if(values.paramStateDes.value!==""){
    dataFormObj.value.push(
      {
        title:"各种状态描述",
        value:values.paramStateDes.value
      }
    )
  }
  if(values.eventDec.value!==""){
    dataFormObj.value.push(
      {
        title:"事件触发与触发效果",
        value:values.eventDec.value
      }
    )
  }

  if(values.other.value!==""){
    dataFormObj.value.push(
      {
        title:"其他",
        value:values.other.value
      }
    )
  }

  return dataFormObj;
};

const customDataTemplate = (values) =>{
  var contentsData = [];
  if(values.contents){
    if(values.keys){
      values.keys.value.forEach((value,index)=>{
        var initContents = JSON.parse(JSON.stringify(values.contents));
        contentsData.push(initContents.splice(value,1)[0]);
      });
    }
  }
  var pageDataObj = {
    arrDataColumnType:true,
    title: values.title.value,
    value: contentsData
  };
  return pageDataObj;
};

export {
  pageDataTemplate,
  getDataFormTemplate,
  changeDataFormTemplate,
  showDataFormTemplate,
  functionDataFormTemplate,
  customDataTemplate
}
