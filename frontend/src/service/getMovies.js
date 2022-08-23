import React from 'react';

import axios from "./backendUrl";

const getMovies = async() => {
    const { data } = await axios.get("/movies");
    return data
}

export default getMovies