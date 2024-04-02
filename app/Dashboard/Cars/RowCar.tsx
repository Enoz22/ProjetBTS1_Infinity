import React, { useState, useEffect } from "react";
import Image from 'next/image';

export default function RowCar(props: any) {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const imagePath = `/tmp/${props.car.id}.jpg`;
        setImageSrc(imagePath);
    }, [props.car.id]);

    return (
        <tr>
            <td>{props.car.id}</td>
            <td>{props.car.marque}</td>
            <td>{props.car.modele}</td>
            <td>{props.car.annee}</td>
            <td>{props.car.prixLocationParJour}</td>
            <td>{props.car.statutDisponibilite}</td>
            <td style={{ position: 'relative', width: '100px', height: '100px' }}>
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt={`Voiture ${props.car.marque} ${props.car.modele}`}
                        layout='fill'
                        objectFit='cover'
                    />
                )}
            </td>
        </tr>
    );
}
