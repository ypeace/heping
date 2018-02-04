import React, { Component } from 'react';

import createG2 from 'g2-react';
import { Frame , Stat} from 'g2';

import { fetchLoginLiveness } from '../../services/statistic/ActiveUserInDay'

export default class RentInDay extends Component {

  state = {
    charts: [],
    table: null,
    search: {
      query: {
        date: {
          $gte: '5 days'.before('today'.beginning)
        },
        region: '1703152031003',
      }
    },
  };

  componentWillMount () {
    this.fetchData()
    console.log(Stat)
  }

  fetchData () {
    // const { search } = this.state;
    // (async _ => {
    //   const result = await fetchRent(search);
    //   this.renderChart(result);
    // })()
    (async _ => {
      // const result = await fetchLoginLiveness({});
      const result = [{
        "date": '2018-01-27T16:00:00.000',
        "_id": 1212121212,
        "orderNum": 3333,
        "depositNum": 212,
        "reservationNum": 190,
        "orderPercent": 0.3,
        "depositPercent": 0.04,
        "reservationPercent": 0.5,
        "totalCount": 903,
      }, {
        "date": '2018-01-28T16:00:00.000',
        "_id": 3232434535,
        "orderNum": 3434,
        "depositNum": 192,
        "reservationNum": 130,
        "orderPercent": 0.33,
        "depositPercent": 0.14,
        "reservationPercent": 0.85,
        "totalCount": 555,
      }, {
        "date": '2018-01-29T16:00:00.000',
        "_id": 1212121212,
        "orderNum": 2456,
        "depositNum": 212,
        "reservationNum": 190,
        "orderPercent": 0.3,
        "depositPercent": 0.04,
        "reservationPercent": 0.9,
        "totalCount": 787,
      }, {
        "date": '2018-01-30T16:00:00.000',
        "_id": 1212121212,
        "orderNum": 2456,
        "depositNum": 212,
        "reservationNum": 190,
        "orderPercent": 0.3,
        "depositPercent": 0.04,
        "reservationPercent": 0.5,
        "totalCount": 122,
      }, {
        "date": '2018-01-31T16:00:00.000',
        "_id": 3232434535,
        "orderNum": 2222,
        "depositNum": 192,
        "reservationNum": 388,
        "orderPercent": 0.77,
        "depositPercent": 0.56,
        "reservationPercent": 0.42,
        "totalCount": 300,
      },];
      this.renderChart(result);
    })()
  }


  renderChart (result) {
//当日活跃总人数
    const dataArr1 = [];
    const dataArr2 = [];

    result.forEach((item) => {
      dataArr1.push({
        date: new Date(item.date).format('MM/dd'),
        count: item.totalCount,
      });
      dataArr2.push({
        date: new Date(item.date).format('MM/dd'),
        count: item.reservationNum,
        percent:item.reservationPercent,
      });
    });
    const Chart1 = createG2(chart => {
      chart.col('date', {
        tickInterval: 1 * 24 * 60 * 60 * 1000,
        alias: '时间'
      });
      chart.axis('date', {
        title: null,
      });
      // chart.axis('count', {
      //   position:'right'
      // });
      chart.col('count', {
        alias: '当日活跃总人数',
      });
      chart.intervalDodge().position('date*count').color('count','lightness');
      chart.render();
    });

//预约账户数及比率
    const Chart2 = createG2(chart => {
      chart.col('date', {
        tickInterval: 1 * 24 * 60 * 60 * 1000,
        alias: '时间'
      });
      chart.axis('date', {
        title: null,
      });
      //第一个轴
      chart.col('count', {
        alias: '预约数量'
      });
      chart.axis('count', {
        title: {
          fill: '#5795B2',
          fontSize: 16
        },
        line: null,//轴本身的线
        tickLine: null,
        labels: {
          label: {
            fill: '#5795B2'
          }
        },
      });
      //第二个轴
      chart.col('percent',{
        alias: '当日预约比例',
      });
      chart.axis('percent', {
        title: {
          fill: '#CD6E55',
          fontSize: 16
        },
        line: null,
        tickLine: null,
        labels:{
          label:{
            fill:'#CD6E55'
          }
        }
      });
      chart.legend({
        position:"bottom",
      });
      chart.intervalDodge().position('date*count').color('#5795B2');
      chart.line().position('date*percent').size(4).color('#CD6E55');
      chart.point().position('date*percent').size(4).color('#CD6E55').shape('circle','borderRadius');
      chart.render();
    });


    const charts = [
      {
        chart: <Chart1
          data={dataArr1}
          forceFit
          plotCfg={{
            margin: [20, 100, 60, 90],
            // border:{
            //   fill:'#999',
            //   radius:20,
            // }//整个画布的背景
          }}
          width={800}
          height={400}
        />,
        title: '当日活跃总人数统计'
      },{
        chart: <Chart2
          data={dataArr2}
          forceFit
          plotCfg={{
            margin: [20, 100, 60, 90]
          }}
          width={800}
          height={400}
        />,
        title: '当日预约数量和预约比例统计'
      }];

    this.setState({
      charts,
    })
  }

  render () {
    const { charts, table } = this.state;
    return <div>
      <h4>活跃</h4>
      <br/>
      {
        charts.length > 0 ?
          <div style={{ zoom: '133.333%' }}>
            {charts.map((item, index) => {
              return <div key={index}>
                <h4>{item.title}</h4>
                {item.chart}
              </div>
            })}
          </div> : null
      }
      {table}
    </div>
  }
}

