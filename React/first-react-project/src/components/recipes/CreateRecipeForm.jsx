import { useState, useCallback, useEffect } from "react"
import { createRecipe } from "../../api/recipesService"

export default function CreateRecipeForm() {
    const [value, setValue] = useState({ name: '', img: '', ingredients: '', steps: '' })
    const [btnStatus, setBtnStatus] = useState(true)
    const [error, setError] = useState(null);
    useEffect(() => {
        setBtnStatus(() => Object.values(value).some(el => el == ''))
    }, [value])

    const handleChange = useCallback((e) => {
        setValue((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    }, []);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        const steps = value.steps.split('\n').filter(el => el != '').map((el) => el.trim());
        const data = {
            name: value.name.trim(),
            img: value.img.trim(),
            ingredients: value.ingredients.split('\n').filter(el => el != ''),
            steps
        }
        try {


            await createRecipe(data)
        } catch (error) {
            setError(error.message);
        }
    }, [value])

    const ingredientsPlaceholder = ['2 spoons of sugar', '100ml of milk', '2 eggs', '...'].join('\n')
    const stepsPlaceholder = ['Defrost the meat', 'boil the egg', '...'].join('\n')
    return (
        <section>
            <form className="recipe-form form" method="POST">
                {error ? <div className="error">{error}</div> : null}
                <h2>Create new recipe</h2>
                <div>
                    <label htmlFor="name">Recipe name</label>
                    <input id="name" name="name" type="text" placeholder="Spaghetti.." value={value?.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="img">Image Link</label>
                    <input id="img" name="img" type="text" placeholder="https://..." value={value?.img} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea id="ingredients" name="ingredients" type="text" placeholder={ingredientsPlaceholder} value={value?.ingredients} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="steps">Steps</label>
                    <textarea id="steps" name="steps" type="text" placeholder={stepsPlaceholder} value={value?.steps} onChange={handleChange} />
                </div>
                <input className="btn" type="submit" value='Add recipe' disabled={btnStatus} onClick={onSubmit} />
            </form>
        </section>
    )
}