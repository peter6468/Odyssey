import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import StocksTable from './stocksTable';
import ListGroup from './commom/listGroup';
import Pagination from './commom/pagination';
//use {} because we are dealing w/named exports
//below is where movie stuf is coming from
import { getStocks, deleteStock } from '../services/stockService';
import { getSectors } from '../services/sectorService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import SearchBox from './searchBox';
import stockUtils from '../services/stockUtil';

class Stocks extends Component {
    state = { 
        stocks: [],
        sectors: [],
        currentPage: 1,
        pageSize: 22,
        searchQury: "",
        selectedSector: null,
        sortColumn: { path: 'title', order: 'asc'  }
     };

     async componentDidMount () {
         const {data} = await getSectors();
         const sectors =[{ _id: "", name: "All Sectors"}, ...data()]
    
         const { data: stocks} = await getStocks();
         this.setState({ stocks, sectors });
           

     }

     componentWillMount() {
         stockUtils.scrape().then(res =>{
             console.log(res);
             this.setState({stocks: res.data })
         })
        
     }

     handleDelete = async stock => {
         const originalStocks = this.state.stocks;
         const stocks = originalStocks.filter(m =>m._id !== stock._id)
         this.setState({ stocks });

         try {
         await delete(stock._id);
         }
         catch (ex) {
             if (ex.response && ex.response.status === 404)
                toast.error('This stock has already been deleted'); 

                this.setState({stocks: originalStocks});
         }
     };

     handleLike = stock => {
        //we dont want to change the state directly, we want to take a copy
        //+give the new state to the setsState mehtod of our component
            //cloning movie
        const stocks = [...this.state.stocks];
        //here we have an array of objects, so we dont want to modify one of 
        //those objs directly, we want to clone that obj so in this array we need
        //to find the index of that obj
        const index = stocks.indexOf(stock);
        //we goto stocks of index, ser this to a new obj+ here we use spread ooperator    
        //to clone this obj 
        stocks[index] = {...stocks[index]}
        //change stocks of index btoggle it, if its t it becomes f otherwise it becomes t
        stocks[index].liked =!stocks[index].liked
        //passing the stocks array
        this.setState({ stocks})
        //in the future this is where we are going to call the server to persist the changes
     }

     handlePageChange = page => {
         this.setState({ currentPage: page });
         //console.log(page);
     };

     handleSectorSelect = genre => {
         this.setState({ selectedGenre: genre, currentPage: 1 });
     };
     
     handleSearch = query => {
         this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
     };

     handleSort = sortColumn => {
        this.setState ({ sortColumn });
        };

    getPagedData =() => {
        const { 
            pageSize, 
            currentPage, 
            sortColumn,
            selectedGenre, 
            searchQuery,
            stocks: allStocks 
        } =this.state; 

                //if selected genre is truthy, apply a filter so we get all stocks+filter them
        //so m goes to m.genr_id should be = selectedGenre._id otherwise return allstocks
        // const filtered = selectedGenre && selectedGenre._id
        //     ? allstocks.filter(m => m.genre._id === selectedGenre._id) 
        //     : allstocks;
 
        let filtered = allStocks;
        if (searchQuery)
          filtered = allStocks.filter(m =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
          );
        else if (selectedGenre && selectedGenre._id)
          filtered = allStocks.filter(m => m.genre._id === selectedGenre._id);
    
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    
        const stocks = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: stocks };
    }

    render() { 
        //obj destructuring
        const { length:count } = this.state.stocks;
        

        if (count === 0) return <p>There are no stocks in the database.</p>;

        const { totalCount, data: stocks } = this.getPagedData();
        const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

            return (
            <div className="row">
                <div className="col-3">
                 <ListGroup 
                    items={this.state.sectors} 
                    selectedItem={this.state.selectedSector}
                    onItemSelect={this.handleSectorSelect}  
                    />
                </div>
                <div className="col">
                    <Link
                        to='/stocks/new'
                        className="btn btn-primary"
                        style={{ marginButtom: 20}}
                    >
                    New Stock
                    </Link>
                <p>Showing {totalCount} stocks in the database.</p>
                {/* //zen coding table.table.thead>tr>th*4*/}
                <SearchBox value={searchQuery} onChange={this.handlesearch} />
                <StocksTable 
                    stocks={stocks} 
                    sortColumn={sortColumn}
                    onLike={this.handleLike} 
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                   />
                <Pagination 
                    itemsCount={totalCount} 
                    pageSize={pageSize}
                    currentPage={currentPage} 
                    onPageChange={this.handlePageChange} />
                </div>       
                
            </div>
        );
    }
}

 
export default Stocks;

//**we used obj destructing method earlier, extracted length property to count
// so {this.state.stocks.length} can be simplified to count
//pages size will be used in multiple paces so its better to store it state

//every react component has a property called props wh/ are plain js obj, th inc all the attributes
//that we set in component

//state is data that is local or private to that component so other compnents cant 
//access that state, its completely internal to th/component
//props is read only we cannot change the input 2 this componet inside of the component

