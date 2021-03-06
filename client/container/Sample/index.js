import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import root from 'window-or-global';
import { setHeader, fetchHeaders } from './actions';
import Header from '../../component/Header';
import Form from '../../component/Form';
import BlackBox from '../../component/BlackBox';
import styles from './style.scss';

class Sample extends Component {
  constructor() {
    super();
    this.state = {
      preview: null,
    };
    this.handlePreview = this.handlePreview.bind(this);
    this.handleSetHeader = this.handleSetHeader.bind(this);
  }

  componentWillMount() {
    if (!this.props.smallHeader.length)
      this.props.dispatch(fetchHeaders())
  }

  handlePreview(e) {
    this.setState({ preview: e.target.value })
  }

  handleSetHeader(e) {
    e.preventDefault();
    const text = this.refs.form.refs.textInput;
    this.props.dispatch(setHeader({data: text.value}));
    text.value = '';
  }

  render() {
    if (Math.max(root.innerWidth) > 1025) {
      return (
        <div class={styles.bg}>
          <Helmet>
            <meta name="description" content="Universal ReactJS Starter Sample app" />
            <title>Sample App</title>
          </Helmet>
          <Header header={this.state.preview} smallHeader={this.props.smallHeader} latestHeader={this.props.header} />
          <BlackBox>
            <Form
              ref="form"
              handlePreview={this.handlePreview}
              handleSetHeader={this.handleSetHeader} />
          </BlackBox>
          <div class={styles.wording}>
            <p>
              View on the page source.. and you will see, everything being rendered on the server..<br/>
              <i>* the page needs to be refreshed *</i>
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <p>null</p>
      );
    }
  }
}

export default connect((store) => {
  return {
    header: store.sampleState.header,
    smallHeader: store.sampleState.smallHeader,
  };
})(Sample);
