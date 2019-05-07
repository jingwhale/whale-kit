import React from 'react';
import { Form, Input, Tooltip, Icon, Select, Button, AutoComplete, Radio, Divider} from 'antd';
import styles from './index.css';


const { TextArea } = Input;
const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        var url = values.prefixBefore+values.url+values.prefixAfter;
        values.url = url;
        console.log('Received values of form: ', values);
        that.props.handleEmail(values,"page");
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 13,
        },
      },
    };

    const prefixBefore = getFieldDecorator('prefixBefore', {
      initialValue: 'http://',
    })(
      <Select style={{ width: 90 }}>
        <Option value="http://">http://</Option>
        <Option value="https://">https://</Option>
      </Select>
    );

    const prefixAfter = getFieldDecorator('prefixAfter', {
      initialValue: '.com',
    })(
      <Select style={{ width: 75 }}>
        <Option value=".com">.com</Option>
        <Option value=".cn">.cn</Option>
        <Option value=".org">.org</Option>
      </Select>
    );

    return (
      <div>
        <div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Divider dashed>基本信息</Divider>
            <Form.Item
              label={(
                <span>
              页面Url&nbsp;
                  <Tooltip title="页面Url规则：https://theme-action.html。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('url', {
                rules: [{required: false, message: '请输入页面的Url!'}],
              })(
                <Input addonBefore={prefixBefore} addonAfter={prefixAfter} type="string" />
              )}
            </Form.Item>
            <Form.Item
              label="页面Title"
            >
              {getFieldDecorator('title', {
                rules: [{
                  required: false, message: '请输入页面的Title!',
                }],
              })(
                <Input type="string" />
              )}
            </Form.Item>
            <Form.Item
              label="页面Ico"
            >
              {getFieldDecorator('ico', {
                rules: [{
                  required: false, message: '请添加页面Ico!',
                }],
              })(
                <Input onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Divider dashed>页面SEO</Divider>
            <Form.Item
              label={(
                <span>
              页面SEO-Keywords&nbsp;
                  <Tooltip title="示例：鲸鱼,jingwhale,whalexplorer">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('keywords', {
                rules: [{ required: false, message: '请添加页面SEO-Keywords!', whitespace: true}],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label={(
                <span>
              页面SEO-Description&nbsp;
                  <Tooltip title="请填写页面描述，200字以内。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('description', {
                rules: [{ required: false, message: '请填写页面SEO-Description&!', whitespace: true }],
              })(
                <Input />
              )}
            </Form.Item>
            <Divider dashed>页面权限</Divider>
            <Form.Item
              label={(
                <span>
              页面权限&nbsp;
                  <Tooltip title="选择本页面的权限。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('permission', {
                rules: [
                  { required: false, message: '请选择页面访问的权限!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="请选择页面访问的权限">
                  <Option value="permission1">用户通用权限</Option>
                  <Option value="permission2">开发通用权限</Option>
                  <Option value="permission3">运营通用权限</Option>
                </Select>
              )}
            </Form.Item>
            <Divider dashed>页面状态</Divider>
            <Form.Item
              label="页面状态"
            >
              {getFieldDecorator('state', {
                rules: [{ required: false, message: '请选择当前页面的状态!' }],
              })(
                <Radio.Group>
                  <Radio value="正常访问">正常访问</Radio>
                  <Radio value="网络状态不佳">网络状态不佳</Radio>
                  <Radio value="无权限">无权限</Radio>
                  <Radio value="404">404</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item
              label="页面状态描述"
            >
              {getFieldDecorator('stateDescription', {
                rules: [{ required: false, message: '请添加页面状态描述!' }],
              })(
                <AutoComplete
                  onChange={this.handleWebsiteChange}
                  placeholder=""
                >
                  <TextArea autosize={{ minRows: 3, maxRows: 50 }} />
                </AutoComplete>
              )}
            </Form.Item>
            <Divider dashed>页面跳转</Divider>
            <Form.Item
              label="页面跳转-页面的入口"
            >
              {getFieldDecorator('linkin', {
                rules: [{ required: false, message: '请添加页面的入口!' }]
              })(
                <AutoComplete
                  onChange={this.handleWebsiteChange}
                  placeholder="页面跳转-页面的入口"
                >
                  <Input />
                </AutoComplete>
              )}
            </Form.Item>
            <Form.Item
              label="页面跳转-页面的出口"
            >
              {getFieldDecorator('linkout', {
                rules: [{ required: false, message: '请添加页面的出口!' }],
              })(
                <AutoComplete
                  onChange={this.handleWebsiteChange}
                  placeholder="页面跳转-页面的出口"
                >
                  <Input />
                </AutoComplete>
              )}
            </Form.Item>
            <Divider dashed>兼容性</Divider>
            <Form.Item
              label={(
                <span>
              兼容性&nbsp;
                  <Tooltip title="请选择页面的兼容性。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('compatibility', {
                rules: [
                  { required: false, message: '请选择页面的兼容性!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="请选择页面的兼容性">
                  <Option value="IE6+">IE6+</Option>
                  <Option value="IE8+">IE8+</Option>
                  <Option value="IOS12.1">IOS12.1</Option>
                </Select>
              )}
            </Form.Item>
            <Divider dashed>其他</Divider>
            <Form.Item
              label={(
                <span>
              其他&nbsp;
                  <Tooltip title="添加页面的其他说明。">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('other', {
                rules: [{ required: false, message: '添加页面的其他说明!' }],
              })(
                <AutoComplete
                  onChange={this.handleWebsiteChange}
                  placeholder="添加页面的其他说明。"
                >
                  <TextArea autosize={{ minRows: 8, maxRows: 100 }} />
                </AutoComplete>
              )}
            </Form.Item>
          </Form>
        </div>
        <div className={styles.button}>
          <Button type="primary" onClick={this.handleSubmit}>生成页面标注</Button>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default WrappedRegistrationForm;

