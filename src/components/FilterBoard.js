import React from 'react'
import InputRange from 'react-input-range';

export default function FilterBoard({
    filterByYear,
    filterByRate,
    year,
    rating,
}) {
    return (
        <div>

            <InputRange
                maxValue={2020}
                minValue={1980}
                value={year}
                onChange={(year) => filterByYear(year)} />

            <InputRange
                maxValue={10}
                minValue={0}
                value={rating}
                onChange={(rating) => filterByRate(rating)} />
        </div>
    )
}
