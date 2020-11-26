import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {DataStateCollege, doStateCollegeDataRes} from '../action/StateCollegeDataActions';
import loaderImg from '../assets/img/loader-example.gif';
import Loader from 'react-loader-advanced';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BackButtonImg from '../assets/img/logo/icon-left-01.svg';


class StateCollege extends React.PureComponent  {
  constructor(props) {
    super(props);
    this.state = {
      stateCollegeListData : [],
      isLoader: false,
      stateName : this.props.location.state.stateName
    }
  }

  
  serialNo(data, index) {
    return (
      <div>{index.rowIndex + 1}</div>
    )
  }

 

  componentDidMount() {
    console.log(this.props.location.state.stateName)
    const data = {
      state: this.props.location.state.stateName
    };
    this.setState({
      isLoader: true,          
    });
    // console.log(data)
    this.props.DataStateCollege(data);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.doStateCollegeDataRes && nextProps.doStateCollegeDataRes.user){
      if(nextProps.doStateCollegeDataRes.user && nextProps.doStateCollegeDataRes.user.StateCollegeDataListRes){        
        if(nextProps.doStateCollegeDataRes.user.StateCollegeDataListRes && nextProps.doStateCollegeDataRes.user.StateCollegeDataListRes.status === "success"){          
          if(nextProps.doStateCollegeDataRes.user.StateCollegeDataListRes.data){
            this.setState({
              isLoader: false,
              stateCollegeListData : nextProps.doStateCollegeDataRes.user.StateCollegeDataListRes.data,              
            })
          }
        }
      }
    }
  }

  

  handleBack = () => {
		this.props.history.goBack();
	}


  render(){
    const header =  (
      <React.Fragment>
				<div className="row custom-width">
					<div className="col-md-4 col-xs-12 col-sm-12">
						<div className="form-group has-search">
							<span className="fa fa-search form-control-feedback search-icon"></span>
							<InputText type="search" onInput={e => this.setState({ globalFilter: e.target.value })} className="form-control" size="40" placeholder="Search College" />
						</div>
					</div>
          <div className="col-md-8 col-xs-12 col-sm-12 float-right p-1">
          </div>
				</div>
			</React.Fragment>
    );
    const spinner = <span><img src={loaderImg} alt="" /></span>;
    return (  
      <React.Fragment>
        <div className="col-xs-12 col-sm-12 float-left ">
          <span className="back_icon_text" onClick={this.handleBack} >
            <img src={BackButtonImg} alt="" className="back_icon" />
          </span>
    <h5 className="hding_title_pd">{this.state.stateName}</h5>
        </div>
        <div className="pd_bottom"> 
          <Loader show={this.state.isLoader} message={spinner}>          
            <div className="col-md-12 col-xs-12 col-sm-12 tableheight">       
              <DataTable value={this.state.stateCollegeListData} selectionMode="single" paginator rows={10} editable={false} resizableColumns columnResizeMode="expand" sortMode="multiple" header={header}
                globalFilter={this.state.globalFilter} emptyMessage="State College not found">
                  <Column className="tableCols" field="eventNumber" body={this.serialNo} header="S.No." style={{ width: 50 }} />
                  <Column className="tableCols" field="name" header="College Name" sortable />
                  <Column className="tableCols" field="universityName" header="University Name" sortable />
                  <Column className="tableCols" field="collegeType" header="College Type" sortable />
                  <Column className="tableCols" field="courses" header="Courses" sortable />
                  <Column className="tableCols" field="city" header="City" sortable />
                  <Column className="tableCols" field="totalStudents" header="Total Students" sortable />
                  <Column className="tableCols" field="yearFounded" header="Year Founded" sortable />
                  

                  {/* <Column header="Action" body={this.actionTemplate} style={{ width: 140 }}/> */}
              </DataTable>
            </div>
          </Loader>
        </div>

      </React.Fragment>  
      
    );
  }  
};

StateCollege.propTypes = {
  doStateCollegeDataRes: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  doStateCollegeDataRes: doStateCollegeDataRes,
});

function mapDispatchToProps(dispatch) {
  return {
    DataStateCollege: (data) => dispatch(DataStateCollege(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(StateCollege);
