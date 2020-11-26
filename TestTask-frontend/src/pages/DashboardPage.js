import React from 'react';
import { Card,  CardHeader, Col, Row, } from 'reactstrap';
import { DataDashboard, doDashboardDataRes} from '../action/DashboardDataActions';
import { DataCourseDashboard, doDashboardCourseDataRes} from '../action/DashboardCourseDataActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import loaderImg from '../assets/img/loader-example.gif';
import Loader from 'react-loader-advanced';
import { Chart } from 'primereact/chart';
const chartData = {
  labels: [],
  datasets: [
      {
          data: [],
          backgroundColor: [
          ],
          hoverBackgroundColor: [
          ],
          

      }]
};

const courseData = {
  labels: [],
  datasets: [
      {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
      }]
};

class DashboardPage extends React.Component {
  constructor(props){
    console.log('cons', props)
    super(props);
    this.state ={      
      isLoader: false,
      chartDataList: [],
      collegeArrayData: {},
      courseListData: [],
      courseArrayData:{}
    }
    
    this.lightOptions = {
      legend: {
          labels: {            
            fontColor: '#495057',           
          }
      },
      'onClick' : function (evt, item) {
        console.log ('legend onClick', evt);
        console.log('legd item', item[0]._view.label);
        console.log(props)
        props.history.push('/state-college', {
          stateName: item[0]._view.label
        })
      }
    };

    
    this.lightCourseOptions = {
      legend: {
          labels: {
              fontColor: '#495057'
          }
      }
    };
  }

  
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    // window.scrollTo(0, 0);
    const data = {      
    };
    this.props.DataDashboard(data);
    this.props.DataCourseDashboard(data);
  }

  componentWillReceiveProps(nextProps){
    // console.log('nextD', nextProps)
    chartData.labels = [];
    chartData.datasets[0].data = [];
    chartData.datasets[0].backgroundColor = [];
    chartData.datasets[0].hoverBackgroundColor = [];

    courseData.labels = [];
    courseData.datasets[0].data = [];
    courseData.datasets[0].backgroundColor = [];
    courseData.datasets[0].hoverBackgroundColor =[];

    if(nextProps.doDashboardDataRes && nextProps.doDashboardDataRes.user){
      if(nextProps.doDashboardDataRes.user && nextProps.doDashboardDataRes.user.DashboardDataListRes){
        if(nextProps.doDashboardDataRes.user.DashboardDataListRes && nextProps.doDashboardDataRes.user.DashboardDataListRes.status === "success"){          
          this.setState({
            chartDataList: nextProps.doDashboardDataRes.user.DashboardDataListRes.data
          },()=>{
            
            for(let item of this.state.chartDataList){
              let rgb = []
              for(var i = 0; i < 3; i++)
              rgb.push(Math.floor(Math.random() * 255));
              chartData.labels.push(item._id)
              chartData.datasets[0].data.push(item.count)
              chartData.datasets[0].backgroundColor.push('rgb('+ rgb.join(',') +')')
              chartData.datasets[0].hoverBackgroundColor.push('rgba('+ rgb.join(',') +',.7)')
              this.setState({
                collegeArrayData : chartData
              },()=>{
                // console.log('arr', this.state.collegeArrayData)
              })
            }
          })          
        }
      }
    }

    if(nextProps.doDashboardCourseDataRes && nextProps.doDashboardCourseDataRes.user){
      if(nextProps.doDashboardCourseDataRes.user && nextProps.doDashboardCourseDataRes.user.DashboardCourseDataListRes){
        if(nextProps.doDashboardCourseDataRes.user.DashboardCourseDataListRes && nextProps.doDashboardCourseDataRes.user.DashboardCourseDataListRes.status === "success"){
          this.setState({
            courseListData: nextProps.doDashboardCourseDataRes.user.DashboardCourseDataListRes.data
          },()=>{
            for(let item of this.state.courseListData){
              let rgb = []
              for(var i = 0; i < 3; i++)
              rgb.push(Math.floor(Math.random() * 255));
              courseData.labels.push(item._id)
              courseData.datasets[0].data.push(item.count)
              courseData.datasets[0].backgroundColor.push('rgb('+ rgb.join(',') +')')
              courseData.datasets[0].hoverBackgroundColor.push('rgba('+ rgb.join(',') +',.7)')
              this.setState({
                courseArrayData: courseData
              })
            }            
          })
        }
      }
    }

    
  }

  

  render() {
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    

    

    return (
      <div className="cr-page px-3 pd_bottom"> 
        <Loader show={this.state.isLoader} message={spinner}>
          <div className="col-xs-12 col-sm-12 float-left ">
            <h5>Dashboard</h5>
          </div>  

          <Row>            
            <Col md="12" sm="12" xs="12">
              <Card className="bdr_box">
                <CardHeader>State Colleges</CardHeader>                
                  <Chart type="doughnut" data={this.state.collegeArrayData} options={this.lightOptions} />
              </Card>     
            </Col>
            
          </Row>
          <Row>
          <Col md="12" sm="12" xs="12">
              <Card className="bdr_box">
                <CardHeader>Courses</CardHeader>                
                  <Chart type="doughnut" cutoutPercentage data={this.state.courseArrayData} options={this.lightCourseOptions } />
              </Card>     
            </Col>
          </Row>
        </Loader>   
      </div>
    );
  }
}

DashboardPage.propTypes = {
  doDashboardDataRes: PropTypes.any, 
  doDashboardCourseDataRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  doDashboardDataRes: doDashboardDataRes,
  doDashboardCourseDataRes: doDashboardCourseDataRes  
});

function mapDispatchToProps(dispatch) {
  return {
    DataDashboard: (data) => dispatch(DataDashboard(data)),
    DataCourseDashboard: (data) => dispatch(DataCourseDashboard(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(DashboardPage);
