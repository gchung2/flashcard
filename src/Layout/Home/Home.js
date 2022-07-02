
import React from "react"
import {Link} from "react-router-dom";
import List from "./List"

export default function Home() {

    return (
        <div>
          <div>
            <Link to="/decks/new" className="btn btn-secondary">
              <span className="oi oi-plus pr-2" />
              Create Deck
            </Link>
          </div>
          <br />
          <List />
        </div>
      );
    }