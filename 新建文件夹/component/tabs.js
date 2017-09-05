import { Tabs, WhiteSpace } from 'antd-mobile';
import React, { Component } from 'react';
import CarouselLoop from './carousel';

const TabPane = Tabs.TabPane;
const arr = [
    '新闻',
    '娱乐',
    '体育',
    '社会',
    '财经',
    '军事',
    '时尚',
    '游戏'
];
console.log(TabPane);

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}
//滑动导航的btn以及滑块对应的列表
const makeTabPane = key => (
  <TabPane tab={key} key={key}>
    <div style={{ 
            
            alignItems: 'center', 
            justifyContent: 'center',
            height: '10rem', 
            backgroundColor: '#fff' }}
    >
      {/* <div style={{width:'100%',height:300,background:'red'}}>
      {`content of option${key}`}
      </div> */}
      <CarouselLoop />
    </div>
  </TabPane>
);

//生成多个btn的函数
const makeMultiTabPane = (count) => {
  const result = [];
  for (let i = 0; i < count.length; i++) {
    result.push(makeTabPane(count[i]));
  }
  return result;
};



class NewsTab extends Component{
    render(){
        /*
            defaultActiveKey设置默认为哪个页面
        */
        return (
            <div>
                <Tabs 
                    defaultActiveKey="新闻" 
                    onChange={callback} 
                    pageSize={5} 
                    onTabClick={handleTabClick}
                >
                {makeMultiTabPane(arr)}
                </Tabs>
                <WhiteSpace />
            </div>
        )
    }
} 
export default NewsTab;