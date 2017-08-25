import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'react';

class Index extends Component{
  static childContextTypes = {//约束一下类型
    tcolor:PropTypes.string
  }
  constructor() {
    super()
    this.state = {
      tcolor:'green'
    }
  }
  getChildContext() {//设置context
    return {
      tcolor:this.state.tcolor
    }
  }
  render() {
    return(
      <div>
         <Header />
         <Foot />
      </div>
    )
  }
}
class Header extends Component{
  render() {
    return(
      <div>
          <h1>我戴了一顶帽子</h1>
          <CatColor />
      </div>
    )
  }
}
class CatColor extends Component{
  static contextTypes={//在下面的子组件中使用必须声明相关的限定条件
    tcolor:PropTypes.string
  }
  render() {
    return(
      <div style={{color:this.context.tcolor}}>帽子的颜色</div>
    )
  }
}

class Foot extends Component{
  static contextTypes = {
    tcolor:PropTypes.string
  }
  render() {
    return(
      <div>
        <h1 style={{background:this.context.tcolor}}>我穿了个鞋子</h1>
        <Footer />
      </div>
    )
  }
}
class Footer extends Component{
  render() {
    return(
      <h2>高跟鞋</h2>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('title')
)
