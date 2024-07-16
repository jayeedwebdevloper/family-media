import React from 'react';

type PropsType = {
    profileCover: any
}

export default function Language(props: PropsType) {
    const { profileCover } = props;
    return (
        <div className='py-2 px-3'>
            <ul>
                {
                    profileCover.map((data: any, i: number) => (
                        data?.language.map((lang: any, i: number) => (
                            <li className='text-sm capitalize pb-3' key={i}>{lang}</li>
                        ))
                    ))
                }
            </ul>
        </div>
    )
}
