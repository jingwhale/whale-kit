import React from 'react';
import { Form, Input, Tabs, Modal, Radio, Tooltip, Icon, Divider} from 'antd';
import styles from './index.css'
import changeDataFormTemp from './dataTemplate.js';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const ChangeDataFormUI = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        ...props.title,
        value: props.title.value,
      }),
      valueList: Form.createFormField({
        ...props.valueList,
        value: props.valueList.value,
      }),
      paramIsNeed: Form.createFormField({
        ...props.paramIsNeed,
        value: props.paramIsNeed.value,
      }),
      paramDoRule: Form.createFormField({
        ...props.paramDoRule,
        value: props.paramDoRule.value,
      }),
      paramDefaultState: Form.createFormField({
        ...props.paramDefaultState,
        value: props.paramDefaultState.value,
      }),
      paramCurrentState: Form.createFormField({
        ...props.paramCurrentState,
        value: props.paramCurrentState.value,
      }),
      paramStateDes: Form.createFormField({
        ...props.paramStateDes,
        value: props.paramStateDes.value,
      }),
      eventDec: Form.createFormField({
        ...props.eventDec,
        value: props.eventDec.value,
      }),
      other: Form.createFormField({
        ...props.other,
        value: props.other.value,
      })
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form {...formItemLayout}>
      <Form.Item
        label={(
          <span>
              标注的标题&nbsp;
            <Tooltip title="标注的标题。不宜过长。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('title', {
          rules: [{ required: true, message: '请添加标注的标题!', whitespace: true}],
        })(
          <Input />
        )}
      </Form.Item>
      <Divider dashed>值</Divider>
      <Form.Item
        label={(
          <span>
              选项值罗列&nbsp;
            <Tooltip title="选项值的罗列，如：normal,activity,disabled">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('valueList', {
          rules: [{ required: false, message: '请添加选项值罗列!', whitespace: true}],
        })(
          <Input placeholder="选项值的罗列，如：normal,activity,disabled" />
        )}
      </Form.Item>
      <Form.Item
        label="字段是否必选"
      >
        {getFieldDecorator('paramIsNeed', {
          rules: [{ required: false, message: '请选择标字段是否必选!' }],
        })(
          <Radio.Group>
            <Radio value={true}>是</Radio>
            <Radio value={false}>否</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Divider dashed>校验</Divider>
      <Form.Item
        label={(
          <span>
              校验规则与错误提示&nbsp;
            <Tooltip title="请填写标注组件的校验规则与错误提示。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('paramDoRule', {
          rules: [{ required: false, message: '请填写标注组件的校验规则与错误提示!' }],
        })(<TextArea placeholder="长度不超过100字,超过字数提示'长度不超过100字'" autosize={{ minRows: 3, maxRows: 100 }} />)}
      </Form.Item>
      <Divider dashed>状态</Divider>
      <Form.Item
        label="默认状态"
      >
        {getFieldDecorator('paramDefaultState', {
          rules: [{ required: false, message: '请填写标注组件的默认状态!' }],
        })(
          <TextArea placeholder="默认为选中normal状态项" autosize={{ minRows: 1, maxRows: 100 }} />
        )}
      </Form.Item>
      <Form.Item
        label="当前状态"
      >
        {getFieldDecorator('paramCurrentState', {
          rules: [{ required: false, message: '请填写标注组件的当前状态!' }],
        })(
          <TextArea placeholder="当前为normal状态项" autosize={{ minRows: 1, maxRows: 100 }} />
        )}
      </Form.Item>
      <Form.Item
        label={(
          <span>
              各种状态描述&nbsp;
            <Tooltip title="请填写标注组件的各种状态描述。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('paramStateDes', {
          rules: [{ required: false, message: '请填写标注组件的各种状态描述!' }],
        })(<TextArea placeholder="normal：正常态；activity: 激活态; disabled:不可操作" autosize={{ minRows: 4, maxRows: 100 }} />)}
      </Form.Item>
      <Divider dashed>事件触发与触发效果</Divider>
      <Form.Item
        label={(
          <span>
              事件触发与触发效果&nbsp;
            <Tooltip title="请填写标注组件的事件触发与触发效果!">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('eventDec', {
          rules: [{ required: false, message: '请填写标注组件的事件触发与触发效果!' }],
        })(<TextArea placeholder="点击搜索，展示下拉框" autosize={{ minRows: 4, maxRows: 100 }} />)}
      </Form.Item>
      <Divider dashed>其他</Divider>
      <Form.Item
        label={(
          <span>
              其他&nbsp;
            <Tooltip title="添加其他自定义标注。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('other', {
          rules: [{ required: false, message: '请添加其他自定义标注!' }],
        })(<TextArea placeholder="添加其他自定义标注。" autosize={{ minRows: 4, maxRows: 100 }} />)}
      </Form.Item>
    </Form>
  );
});

export { ChangeDataFormUI, changeDataFormTemp };


