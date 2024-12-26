import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { getOwnRecipes } from '../../api/recipesService';
import RecipeItem from './RecipeItem';
import sessionContext from '../../utils/createContext';

export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [session] = useContext(sessionContext);
    useEffect(() => {
        (async function () {
            const data = await getOwnRecipes(session._id);
            setRecipes(data);
        })()
    }, [])

    return (
        <section>
            <div>
                <h1>Your kitchen!</h1>
                <p>All of your recipes!</p>

                <div>
                    <ul className="recipe-ul">
                        {recipes.length > 0
                            ? <RecipeItem data={recipes} />
                            : <p>Create New <Link to="/create">recipe</Link></p>}
                    </ul>
                </div>
            </div>
        </section>

    )
}