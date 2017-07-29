/**
 * 音乐列表
 */
 'use strict';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ListView,
} from 'react-native';

import Util from '../../utils/Util.js';
import Service from '../../utils/Service.js';
import MusicItem from './MusicItem.js';
import SearchBar from '../../components/Search.js'
import DBWebView from '../../components/DBWebView.js';


export default class MusicList extends Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: dataSource.cloneWithRows([]),
      keywords: '我要你',
      showList: false,
    };
  }

  componentDidMount() {
    this._loadData();
  }

  render() {
    return (
      <View style={styles.container}>
        {/*搜索工具条*/}
        <View style={[styles.searchBar, styles.flexRow]}>
          {/*输入框*/}
          <View style={styles.flex_1}>
            <SearchBar
               value={this.state.keywords}
               placeholder='请输入歌曲/歌手的名称'
               clearButtonMode='while-editing'
                onChangeText={this._textDidChange.bind(this)}/>
          </View>
          {/*搜索按钮*/}
          <TouchableOpacity style={styles.searchButton} onPress={this._didSelectSearchButton.bind(this)}>
            <Text style={styles.fontFFF}>搜索</Text>
          </TouchableOpacity>
        </View>
        {/*列表*/}
        {
          this.state.showList ?
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            />
          :
          Util.loading
        }
      </View>
    );
  }

  /*事件回调*/
  _renderRow(rowData) {
    return (
      <MusicItem
        musicData={rowData}
        viewDetail={this._pushMusicDetailPage.bind(this, rowData)}
        />
    );
  }

  _textDidChange(text) {
    this.setState({
      keywords: text,
    });
  }

  _didSelectSearchButton() {
    if (this.state.keywords.length == 0) {
      alert('搜索词不能为空！');
      return;
    }
    this._loadData();
  }

  _pushMusicDetailPage(rowData) {
    var musicDetailRoute = {
      component: DBWebView,
      title: rowData.title,
      passProps: {
        url: rowData.mobile_link,
      }
    };

    this.props.navigator.push(musicDetailRoute);
  }

  /* 自定义方法 */

  // 请求接口数据
  _loadData() {

    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    var that = this;
    var baseURL = Service.musicSearch + '?count=10&q=' + this.state.keywords;

    // 显示 loading
    this.setState({
      showList: false,
    });

    Util.get(baseURL,
      function(data) {
        if (!data.musics || !data.musics.length) {
           alert('音乐服务出错');
           retun;
        }
        var musics = data.musics;
        that.setState({
          dataSource: dataSource.cloneWithRows(musics),
          showList: true,
        });
      },
      function(error) {
        alert(error);
      }
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },

  flexRow: {
    flexDirection: 'row',
  },

  flex_1: {
    flex: 1,
  },

  searchBar: {
    padding: 10,
    height: 60,
    borderBottomWidth: Util.onePixel,
    borderColor: '#ccc',
  },

  searchButton: {
    width: 70,
    backgroundColor: '#0091FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fontFFF: {
    color: '#fff',
  },
});
