import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getLastThree } from '../api/recipesService';
import RecipeItem from './recipes/RecipeItem';

export default function HomeSection() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async function () {
            const data = await getLastThree();
            setRecipes(data);
        })()
    }, [])

    return (
        <section>
            <div>
                <h1>Nice to see you again!</h1>
                <p>Check the most recent <Link to="/recipes">recipes</Link></p>
                <div>
                    <ul className="recipe-ul">
                        <RecipeItem data={recipes} />
                    </ul>
                </div>
            </div>
        </section>

    )
}