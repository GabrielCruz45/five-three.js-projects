import * as THREE from "three";

const objectCount = 500;
function getMeshProps() {
    const array = [];
    for (let i = 0; i < objectCount; i += 1) {
        array.push(
            {
                position: {
                    x: Math.random() * 10000 - 5000,
                    y: Math.random() * 6000 - 3000,
                    z: Math.random() * 8000 - 4000,
                },
                rotation: {
                    x: Math.random() * 2  * Math.PI,
                    y: Math.random() * 2  * Math.PI,
                    z: Math.random() * 2  * Math.PI,
                },
                scale: Math.random() * 200 + 100
            }
        );
    };

    return array;
};