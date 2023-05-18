import axios from "axios";

const API_URL = "http://localhost:8080/accu/";

class AccuService {
  getAccu(coin, buyTimestamp, sellTimestamp, amount) {
    console.log("API Link is: ");
    console.log(API_URL + "check/" + coin + "/" + buyTimestamp + "/" + sellTimestamp + "/" + amount);
    return axios
      .get(
        API_URL +
          "check/" +
          coin +
          "/" +
          buyTimestamp +
          "/" +
          sellTimestamp +
          "/" +
          amount
      )
      .then((response) => {
        
        return {
            profitCoingecko: response.data.profitCoingecko,
            profitCoinlore: response.data.profitCoinlore,
            accuracy: response.data.accuracy,
        };
      });
  }
}

export default new AccuService();
