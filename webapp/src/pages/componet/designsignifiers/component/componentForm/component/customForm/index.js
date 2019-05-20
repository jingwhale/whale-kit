import React from 'react';
import { Form, Input, Icon, Button, Tooltip, Divider, Tag } from 'antd';
import styles from './index.css'
import customFormTemp from './dataTemplate.js';

const { TextArea } = Input;

let id = 0;

class DynamicFieldSet extends React.Component {
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    this.forceUpdate();
  };

  doChange = (e) =>{

  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? '标注的内容' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`contents[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: "请填写标注内容！",
          }],
        })(
          <TextArea placeholder="请填写标注内容" style={{ width: '96%', marginRight:8}} autosize={{ minRows: 1, maxRows: 100 }} />
        )}
        {keys.length > 1 ? (
          <Icon
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form {...formItemLayout}>
        <div className={styles.card}>
          <Tag>自定义标注</Tag>
        </div>
        <Form.Item
          label={(
            <span>
              标注的标题&nbsp;
              <Tooltip title="请添加标注的标题">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('title', {
            initialValue:"自定义",
            rules: [{required: true, message: '请添加标注的标题!', whitespace: true}],
          })(
            <Input />
          )}
        </Form.Item>
        <Divider dashed>标注的内容</Divider>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加标注内容
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const formOption = {
  name: 'dynamic_form_item',
  onFieldsChange(props, changedFields) {
    if(changedFields.contents){
      var { getFieldValue } = props.form;
      var contentsData = getFieldValue('contents');
      changedFields = {contents:contentsData};
    }
    props.onChange(changedFields);
  },
  onValuesChange(_, values) {
    console.log(values);
  }
};

const CustomFormUI = Form.create(formOption)(DynamicFieldSet);

export { CustomFormUI, customFormTemp };


