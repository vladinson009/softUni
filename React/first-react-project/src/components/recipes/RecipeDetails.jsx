import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRecipeById, getRecipeById, likeRecipe, getLikes } from "../../api/recipesService";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../../utils/parseToken";
export default function RecipeDetails() {
    const session = checkSession();
    const navigate = useNavigate();
    const params = useParams();
    const recipeId = params.recipeId;
    const [recipe, setRecipe] = useState({
        _ownerId: '',
        name: '',
        img: '',
        ingredients: [],
        steps: [],
    });
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const isOwner = recipe._ownerId == session._id
    useEffect(() => {
        (async function () {
            try {
                const [data, likeData] = await Promise.all([
                    getRecipeById(recipeId),
                    getLikes(recipeId)
                ])
                if (likeData.some((el) => el._ownerId == session._id)) {
                    setIsLiked(true);
                }
                setLikes(likeData.length)
                setRecipe(Object.assign({}, data));

            } catch (error) {
                console.log(error.message);

            }

        })()
    }, [])
    function onEdit() {
        navigate('/recipe/edit/' + recipeId, {
            state: recipe
        })
    }
    async function onDelete() {
        const isDelete = confirm(`Are you sure you want to delete ${recipe.name} ?`)
        if (isDelete) {
            await deleteRecipeById(recipeId)
            navigate('/my-recipes')
        } else {
            return
        }
    }
    async function onLike() {
        await likeRecipe(recipeId)
        setLikes((like) => like + 1)
        setIsLiked(true)
    };
    return (
        <>
            <section>
                <div className="container">
                    <div>
                        <h1 className="details-h1">{recipe.name}</h1>
                        <div className="details-div">
                            <h2 className="details-p">Ingredients</h2>
                            <ul className="details-ul" >
                                {recipe.ingredients.map(el => {
                                    return <li key={el} className="details-li">{el}</li>
                                })}
                            </ul>
                        </div>

                        <div className="details-div2">
                            <h2 className="details-p">Steps</h2>
                            <ul className="details-ul" >
                                {recipe.steps.map(el => {
                                    return <li key={el} className="details-li steps-li">{el}</li>
                                })}
                            </ul>
                        </div>
                        <div className="details-div3">
                            {isOwner ? <> <a onClick={onEdit} className="details-a" style={{ backgroundColor: '#4169E1' }}>Edit</a>
                                <a onClick={onDelete} className="details-a" style={{ backgroundColor: '#9B1C31' }}>Delete</a></>
                                : isLiked
                                    ? null
                                    : <a onClick={onLike} className="details-a" style={{ backgroundColor: '#136207' }} > Like</a>
                            }

                            <p>Likes: {likes}</p>
                        </div>

                    </div>
                    <img className="details-img" src={recipe.img} alt="" />
                </div>
            </section>
        </>
    )
}