export function getMaxAltitude(data) {

    const altitudes = data.map((altitude) => {
        return altitude.y;
    });

    return Math.max.apply(null, altitudes);
}