import React from 'react';
import { Form, Input, Tabs, Modal, Radio, Tooltip, Icon, Divider} from 'antd';
import styles from './index.css'
import showDataFormTemp from './dataTemplate.js';

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

const ShowDataFormUI = Form.create({
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
      paramRule: Form.createFormField({
        ...props.paramRule,
        value: props.paramRule.value,
      }),
      paramType: Form.createFormField({
        ...props.paramType,
        value: props.paramType.value,
      }),
      paramDefault: Form.createFormField({
        ...props.paramDefault,
        value: props.paramDefault.value,
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
        label="字段类型"
      >
        {getFieldDecorator('paramType', {
          rules: [{ required: false, message: '请选择标注组件的字段类型!' }],
        })(
          <Radio.Group>
            <Radio value="string">string</Radio>
            <Radio value="number">number</Radio>
            <Radio value="telephone">telephone</Radio>
            <Radio value="url">url</Radio>
            <Radio value="date">date</Radio>
            <Radio value="">不设置此项</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        label={(
          <span>
              显示规则&nbsp;
            <Tooltip title="请填写标注组件的字段显示规则。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('paramRule', {
          rules: [{ required: false, message: '请填写标注组件的字段显示规则!' }],
        })(<TextArea placeholder="长度不超过100字；min:1,max:100" autosize={{ minRows: 3, maxRows: 100 }} />)}
      </Form.Item>
      <Form.Item
        label={(
          <span>
              为空时显示（默认值）&nbsp;
            <Tooltip title="请添加字段为空时显示的值">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('paramDefault', {
          rules: [{ required: false, message: '请添加字段为空时显示的值!', whitespace: true}],
        })(
          <Input placeholder="字段为空时显示'---'" />
        )}
      </Form.Item>
      <Divider dashed>状态</Divider>
      <Form.Item
        label="默认状态"
      >
        {getFieldDecorator('paramDefaultState', {
          rules: [{ required: false, message: '请选择标注组件的默认状态!' }],
        })(
          <Radio.Group>
            <Radio value="normal">normal</Radio>
            <Radio value="activity">activity</Radio>
            <Radio value="disabled">disabled</Radio>
            <Radio value="focus">focus</Radio>
            <Radio value="blur">blur</Radio>
            <Radio value="">不设置此项</Radio>
          </Radio.Group>
        )}
      </Form.Item>
      <Form.Item
        label="当前状态"
      >
        {getFieldDecorator('paramCurrentState', {
          rules: [{ required: false, message: '请选择标注组件的当前状态!' }],
        })(
          <Radio.Group>
            <Radio value="normal">normal</Radio>
            <Radio value="activity">activity</Radio>
            <Radio value="disabled">disabled</Radio>
            <Radio value="focus">focus</Radio>
            <Radio value="blur">blur</Radio>
            <Radio value="">不设置此项</Radio>
          </Radio.Group>
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
            <Tooltip title="请填写标注组件的事件触发与触发效果。">
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
            <Tooltip title="请添加其他自定义标注。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
        )}
      >
        {getFieldDecorator('other', {
          rules: [{ required: false, message: '请添加其他自定义标注!' }],
        })(<TextArea placeholder="请添加其他自定义标注。" autosize={{ minRows: 4, maxRows: 100 }} />)}
      </Form.Item>
    </Form>
  );
});

export { ShowDataFormUI, showDataFormTemp };


