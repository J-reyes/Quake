const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-07-01&minlatitude=32&maxlatitude=36&minlongitude=-119&maxlongitude=-115";

/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for
*/
// parent component
class EarthQuakeDashboard extends React.Component {
  state = {
    quakes: [],
    loading: true,
  }
 
  componentDidMount = () => {
    axios.get(url)
    .then(res => {
    
    this.setState({quakes: res.data.features, loading: false});
    })
  };

  render() {
    // console.log( this.state.quakes.id);
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
         <ToggleMapView quakes={this.state.quakes} loading={this.state.loading} id={this.state.quakes.id}/>
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
    
    if(this.state.mapOpen) {
      return (
       <MapView id={this.props.id}/>
      );
    } if (this.state.mapOpen == false) {
      return (
        <EarthQuakeList quakes={this.props.quakes} loading={this.props.loading} onFormOpen={this.handleFormOpen}/>
      );
    }
  }
}



class EarthQuakeList extends React.Component {
 
  render() {
    // console.log(this.props.quakes);
    // console.log(this.state.quakes)
    const {loading} = this.props;

    if (loading){
      return (
        <div className="ui active inverted dimmer" style={{paddingTop: 100}}>
         <div className="ui large text loader">Loading</div>
        </div>
      )}
    else {
      return (
       <div className='ui centered'>
        {
          this.props.quakes.map((quake, index) => {
            let time = quake.properties.time
            return (
              <div className='ui content raised link card' key={quake.id} style={{marginTop: 10}}>
                <p>Mag: {quake.properties.mag}</p>
                <p>Time: {new Date(time).toLocaleDateString() + ' ' + new Date(time).toLocaleTimeString()}</p>
                <div className='content'>
                  <div className='meta'>
                    <span className='category left'>Center of Attention</span>
                  </div>
                  <div className='center aligned description'>
                    {quake.properties.place}
                  </div>
                  <div  className="extra content center aligned segment" style={{ paddingTop: 10}}>
                    <a href={quake.properties.url}><span>More Information</span></a>
                  </div>
                </div>
                <span onClick={this.props.onFormOpen}>
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
}

class MapView extends React.Component {

  render() {
      return (
        <div className='ui content raised link card ' style={{marginTop: 10}}>
          <div className='content'>
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

ReactDOM.render(
  <EarthQuakeDashboard />,
  document.getElementById('content')
);
