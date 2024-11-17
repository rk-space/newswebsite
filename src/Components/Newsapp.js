import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState("india");
    const [newsData, setNewsData] = useState(null);
    const API_KEY = "9c3ed8ee95884dec979460a60f96675b";

    const getData = async () => {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
            const jsonData = await response.json();
            console.log(jsonData.articles);

            // Ensure articles exist and is an array
            if (jsonData.articles && Array.isArray(jsonData.articles)) {
                let dt = jsonData.articles.slice(0, 10);
                setNewsData(dt);
            } else {
                console.error("No articles found");
                setNewsData([]); // Set to an empty array if no articles
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setNewsData([]); // Set to an empty array on fetch error
        }
    };

    // Fetch news whenever `search` term changes
    useEffect(() => {
        getData();
    }, [search]);

    const handleInput = (e) => {
        setSearch(e.target.value); // Update search state on input change
    };

    const userInput = (event) => {
        setSearch(event.target.value); // Update search based on button clicks
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul style={{ display: "flex", gap: "11px" }}>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>All News</a>
                    <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a>
                </ul>
                <div className='searchBar'>
                    <input type='text' placeholder='Search News' value={search} onChange={handleInput} />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className='head'>Stay Updated with TrendyNews</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value="sports">Sports</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertainment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>

            <div>
                {newsData ? <Card data={newsData} /> : null}
            </div>
        </div>
    );
};

export default Newsapp;
