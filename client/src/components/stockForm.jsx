import React from 'react';
import Joi from 'joi-browser';
import Form from './commom/form';
import { getStock, saveStock } from '../services/fakeStockService';
import { getGenres } from '../services/fakeGenreService'; 
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

    componentDidMount() {
        const genres =getGenres();
        this.setState({ genres });

        const stockId = this.props.match.params.id;
        if (stockId === "new") return;

        const stock = getStock(stockId);
        if (!stock) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(stock) });
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
  
    doSubmit = () => {
    saveStock(this.state.data);

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