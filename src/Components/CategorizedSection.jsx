import React from 'react'
import ProductCard from './ProductCard';

const CategorizedSection = (props) => {
    return (
        <React.Fragment>
            <div className='categoryHeading'>{props.sectionName}</div>
            <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {props.sectionData.map((curElem) => {
                    return curElem.category === props.sectionName ? (<ProductCard key={curElem.id} singleProd={curElem} />) : null;
                })}
            </div>
        </React.Fragment>
    )
}

export default CategorizedSection