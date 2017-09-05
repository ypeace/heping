import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { Component } from 'react';
class CarouselLoop extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: ['', '', ''],
            initialHeight: 200,
        }
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
          });
        }, 100);
      }
    render(){
        const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};

        return (
            <div>
               {/* <Carousel
                    className="my-carousel"
                    autoplay={false}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.data.map(ii => (
                        <a 
                            href="http://www.baidu.com" 
                            key={ii} 
                            style={hProp}
                        >
                        <img
                            src={`https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png`}
                            alt="icon"
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({
                                    initialHeight: null,
                                });
                            }}
                        />
                        </a>))
                    }
                </Carousel>  */}
            </div>
        )
    }
} 
export default CarouselLoop;