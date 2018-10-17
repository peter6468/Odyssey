import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Table from './commom/table';
import Like from './commom/like';

class StocksTable extends Component {
    columns = [
        {
            path: 'name', 
            label: 'Nsme', 
            //content: stock => <Link to={`/stocks/${stock._id}`}>{stock.title}</Link>
         },
        {path: 'sector', label: 'Sector' },
        {path: 'price', label: 'Price' },
        {path: 'div'  , label: 'DivYield' },
        {path: 'dailyRentalRate'  , label: 'DistDate' },
        {path: 'dailyRentalRate'  , label: 'DecDate' },
        {path: 'dailyRentalRate'  , label: 'Forward' },
        {
            key : 'like', 
            content: stock => 
                //replace w/funct, instaed of setting to react element, takes parameter
                //stock + returns a react element
                <Like liked={stock.liked} onClick={() => this.props.onLike(stock)}/>
        },
        {
            key: 'delete', 
            content: stock =>(
                <button 
                    onClick={() => this.props.onDelete(stock)} 
                    className="btn btn-danger btn-sm"
                >
        Delete
        </button>   
            )
        }
    ];
    //what we're ref in jsx expr is essentiall a plain js obj, so just like we can
    //pass any obj to funct or use them as values of props, columnsns array add 
    // anew prop set a jsx expression

    render() { 
        const { stocks, onSort, sortColumn } = this.props; 

        return ( 
            <Table 
            columns={this.columns} 
            data={stocks} 
            sortColumn={sortColumn} 
            onSort={onSort} />
   
        );  
    }
 }

  
 export default StocksTable;

 //instaed of passing an element pass => that takes a movie
 // content: <Link to="/movies"></Link>, pass {}, inside template literal
 // so string is /movies and $ adds a argument: the movie_id
 //template literal used to dynamically insett values into a string