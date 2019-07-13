const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-07-01&minlatitude=32&maxlatitude=36&minlongitude=-119&maxlongitude=-115";

/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
// parent component
class EarthQuakeDashboard extends React.Component {
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <ToggleMapView />
        </div>
      </div>
    );
  }
}

class ToggleMapView extends React.Component {
  state = {
    mapOpen: false,
  };

  handleFormOpen = () => {
    console.log("clicked");
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  closeForm = () => {
    console.log("clicked")
    this.setState({ mapOpen: false})
  }

  openForm = () => {
    this.setState({ mapOpen: true})
  }

  render() {
    
    if(this.state.mapOpen == true) {
      return (
        <MapView onFormClose={this.handleFormClose}/>
        
      );
    } if (this.state.mapOpen == false) {
      return (
        <EarthQuakeList onFormOpen={this.handleFormOpen}/>
      );
    }
  }
}



class EarthQuakeList extends React.Component {
  state = {
    quakes: [],
    loading: true,
  }
 
  componentDidMount = () => {
    this.setState({loading: true})
    axios.get(url)
    .then(res => {
    
    this.setState({quakes: res.data.features, loading: false});
    // let quakes = res.data.features
    // // let i = 0;
    // for(var key in quakes) {
    //   if(quakes.hasOwnProperty(key)) {
      
    //     // quakes.map((item, key) => {

    //     //   console.log(key + item);
    //     // })
    //   //  console.log(quakes[key].id + quakes[key].properties.place + quakes[key].properties.mag)
    //     let place = quakes[key].properties.place;
    //     let mag = quakes[key].properties.mag;
    //     let id = quakes[key].id
    //     // this.earthquakes.push({
    //     //   id: id,
    //     //   place: place
    //     // });
    //  }
    //   // console.log(res.data.features);
    //   // console.log(quakes.features[0].id);
    //   // console.log(quakes.features[0].properties.mag);
    //   // console.log(quakes.features[0].properties.place);
    //   } 
    })
  };

  render() {
    // console.log(this.state.earthquakes);
    // console.log(this.state.quakes)
    const {loading} = this.state;

    if (loading){
      return (
        <div className="ui active inverted dimmer" style={{paddingTop: 100}}>
         <div className="ui large text loader">Loading</div>
        </div>
      )}
    return (
      <div className='ui centered'>
       {
         this.state.quakes.map((item, index) => {
          //  console.log("item: " + item.id + " place: "+ item.properties.place +  " index : " + index + ' ' +item.properties.time );
           let location = item.properties.place;
           let timesecs = item.properties.time

           return (
             <div className='ui content raised link card ' key={item.id} style={{marginTop: 10}}>
              <p>Mag: {item.properties.mag}</p>
              <p>Time: {new Date(timesecs).toLocaleDateString() +  ' ' + new  Date(timesecs).toLocaleTimeString()}</p>
                <div className='content'>
                 <div className="meta">
                   <span className="category left" >Center of Attention</span>
                 </div>
                 <div className="center aligned description">
                   {location} 
                 </div>
                 <div className="extra content center aligned segment" style={{ paddingTop: 10}}> 
                  <a href={item.properties.url}><span >More Information</span></a>
                 </div>
               </div>
                <span
                 onClick={this.props.onFormOpen}
                >
                <button className='fluid ui basic red button'>Map View</button>
                </span>
             </div> 
            )
         })
       }
      </div>
    )
  }
}

class MapView extends React.Component {

  render() {
      return (
        <div className='ui content raised link card ' style={{marginTop: 10}}>
          
          <div className='content'>
            <div className="meta">

            </div>
            <div className="center aligned description">
             <p>Map feature coming soon..</p>
            </div>
            <div className="extra content center aligned segment" style={{ paddingTop: 10}}> 
              
            </div>
          </div>
          <button 
            className='ui basic red button'
            onClick={this.props.onFormClose}
          >
          Close Map View
          </button>
       </div> 
      );
  }
}

// child component of TimerDashBoard
// just a wrapper component
// contains 'TimerForm' component
class ToggleableTimerForm extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon'>
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

// child component of TimerDashBoard
// contains child compoent 'EditableTimer'
class EditableTimerList extends React.Component {
  render() {
    return (
      <div id='timers'>
        <EditableTimer
          title='Learn React'
          project='Web Domination'
          elapsed='8986300'
          runningSince={null}
          editFormOpen={false}
        />
        <EditableTimer
          title='Learn extreme ironing'
          project='World Domination'
          elapsed='3890985'
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    );
  }
}

// child component of 'EditableTimerList'
// contains component 'TimerForm' and 'Timer'
class EditableTimer extends React.Component {
  render() {
    if (this.props.editFormOpen) {
      return (
        <TimerForm
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  }
}

// child component of Editabletimer
class Timer extends React.Component {
  render() {
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    );
  }
}

//child of 'Editabletime'
class TimerForm extends React.Component {
  render() {
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' defaultValue={this.props.project} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>
                {submitText}
              </button>
              <button className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <EarthQuakeDashboard />,
  document.getElementById('content')
);
