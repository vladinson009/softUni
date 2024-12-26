import { Link } from 'react-router-dom';

export default function RecipeItem({ data }) {

    return data.map((el) => {
        return <li key={el._id} className="recipe-li">
            <p className="recipe-p">{el.name}</p>
            <Link className="recipe-a" to={`/recipe/${el._id}`}><img className="recipe-img" src={el.img} /></Link>
        </li>
    })
}