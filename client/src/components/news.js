
import React, { Component } from 'react';
import axios from 'axios';
import articleUtils from '../services/articleUtil';


class News extends Component {
    constructor(props){
        super(props);
        this.state = {
            articles: []
        }
    }
 
    componentWillMount() {
        articleUtils.scrape().then(res =>{
            console.log(res.data);
            this.setState({articles: res.data })
        })
       
    }
    getAll = (e) => {
        axios.get('/getAll').then(articles => {
            console.log(articles, "these are articles");
            // this.setState({articles: articles});
        });
    }
    render() { 
        return (  
            <div className ="wrapper">

                 <div className="jumbotron"  >
                    <div className="center col-sm-12" id="top-bar">
                    <h1 className="text-center"><strong>MIDDLE EAST NEWS</strong></h1>
                    <h2 className="text-center">
                        <div className="clock text-center"> 
                        <span id="theTime"></span>
                        <h5>Saudi Arabia</h5>
                    </div>
                    </h2>
                    </div>
                </div>




                
              
                {
                   this.state.articles ? this.state.articles.map((e, index)=>{
                        return( <div key={index}> {e.title}, <br/>
                            {e.link}</div>) 
                    
                    })

                    :
                    "Begin "
                }


            </div>
        );
    }
}
 
export default News;