import React , {createRef} from 'react';
import OrganizationChart from '@dabeng/react-orgchart';


export default class OrgCharts extends React.Component{
    constructor(){
        super();
        this.ChartRef =createRef();
        this.state={
            ApiSuccess:false,
            ApiResp:null
        }
    }
        
    getHierarchy(e){
        console.log(this.ChartRef.toLocaleString());
        console.log("Get the Heirarchy and Make a Put Call to Update");
        console.log(this.state.ApiResp);
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Accept':'*/*'},
            body: JSON.stringify(this.state.ApiResp)
        };
        console.log(requestOptions);
        fetch('http://localhost:8000/updateMembers', requestOptions)
        .then(response => response.json())
        .then((result)=>{
            alert("Succesfully Update Heirarchy in Backend");
          },
      
          (error) =>{
              alert("Failed to update Heirarchy in Backend, Please Retry");
          });

    }

    componentDidMount(){
        fetch('http://localhost:8000/Members')
        .then(res => res.json())
        .then(
          (result)=>{
            this.setState({
                ApiSuccess:true,
                ApiResp:result
            });
          },
      
          (error) =>{
          }
        )
    }
    render(){
    if(this.state.ApiSuccess===true){
        console.log(this.state.ApiResp);
            return (
                <div>
                <OrganizationChart datasource={this.state.ApiResp} ref={this.ChartRef} draggable={true}/>
                <button onClick={(e)=>this.getHierarchy(e)}
                >Update Heirarchy</button>
                </div>
                );
        }
        else{
            return(<h1>Failed to fetch Data from API</h1>);
        }  
    }
    
}