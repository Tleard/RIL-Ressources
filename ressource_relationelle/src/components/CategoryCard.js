// This component is a card containing the name of a Category.
import React from 'react'
import './CategoryCard.css'

function CategoryCard({ name, id}) {
    //console.log(name);
    return (
        <div className="category-card">
            <p>{name}</p>
        </div>
    )
}

export default CategoryCard
