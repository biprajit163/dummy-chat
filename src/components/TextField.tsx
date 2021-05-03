import React, { FC } from 'react';


type Props = {
    name: string,
    features?: boolean,
    scores: Array<any>,
    someFunction?: (x: number) => void,
}

export const TextField: FC<Props> = ({name, features, scores, someFunction}) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
}

