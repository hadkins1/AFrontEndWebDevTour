/**
 * 搜索框
 */

'use strict';

var React = require('react-native');
var Util = require('../uitls/Util.js');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
} = React;


module.exports = React.createClass({
  render() {
    return (
      <View style={styles.flex_1}>
      {/*这里我们使用了 {...this.props} 这样可以把调用方传给搜索框的属性都传给 Input*/}
        <TextInput style={[styles.flex_1, styles.input]} {...this.props}>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  flex_1: {
    flex: 1,
  },
  input: {
    borderWidth: Util.onePixel,
    height: 40,
    borderColor: '#DDDDDD',
    paddingLeft: 5,
  }
});
