import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { getFiltered } from '../../api/recipesService';
import RecipeItem from './RecipeItem';

export default function SearchRecipes() {
    const [recipes, setRecipes] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams()
    const [criteria, setCriteria] = useState(searchParams.get('name') || '');
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const data = await getFiltered(searchParams.get('name') || '');
            setRecipes(data);
        })()
    }, [searchParams])

    function onSubmit(e) {
        e.preventDefault()
        setSearchParams({ name: criteria })
        navigate(`?name=${encodeURIComponent(criteria)}`);

    }
    function onType(e) {
        setCriteria(e.target.value)
    }
    return (
        <section>
            <div>
                <h1>What to cook today?</h1>
                <p>Search by recipe name</p>
                <div>
                    <form onSubmit={onSubmit} className='searchForm'>
                        <input type="text" name='criteria' id='criteria' value={criteria} onChange={onType} />
                        <input className='btn search-btn' type="button" value="Search Recipes" onClick={onSubmit} />
                    </form>
                </div>
                <div>
                    <ul className="recipe-ul">
                        <RecipeItem data={recipes} />
                    </ul>
                </div>
            </div>
        </section>

    )
}