import { useEffect, useState } from 'react';

import { getRecipes } from '../../api/recipesService';
import RecipeItem from './RecipeItem';

export default function RecipesSection() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async function () {
            const data = await getRecipes();
            setRecipes(data);
        })()
    }, [])

    return (
        <section>
            <div>
                <h1>Here is all you need!</h1>
                <p>Are you hungry already?</p>
                <div>
                    <ul className="recipe-ul">
                        <RecipeItem data={recipes} />
                    </ul>
                </div>
            </div>
        </section>

    )
}