import React from 'react';
import Joi from 'joi-browser';
import Form from './commom/form';
import { getStock, saveStock } from '../services/stockService';
import { getSectors } from '../services/sectorService'; 
//import StockForm from './stockForm';

class StockForm extends  Form{
    state=  {
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number In Stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(0)
            .max(0)
            .label("Daily Rental Rate")
    };

    async populateSectors() {
        const {data : sectors} =   getSectors();
        this.setState({ sectors });
    }

    async populateStock() {
        try {
            const stockId = this.props.match.params.id;
            if (stockId === "new") return;

            const {data: stock} = await getStock(stockId);
            this.setState({ data: this.mapToViewModel(stock) })
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }
    async componentDidMount() {
        await this.populateSectors();
        await this.populateStock();
    }

    mapToViewModel(stock) {
        return{
            _id: stock._id,
            title: stock.title,
            genreId: stock.genre._id,
            numberInStock: stock.numberInStock,
            dailyRentalRate: stock.dailyRentalRate
        };
    }
  
    doSubmit = async () => {
        await saveStock(this.state.data);

        this.props.history.push("/stocks");
};

//destructure props+wrap the match property
render() {
    return (
      <div>
        <h1>stock Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

 
export default StockForm;