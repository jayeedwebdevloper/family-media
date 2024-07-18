'use client'
import React from 'react';
import './FamilyTree.css'
import TreeMake from './TreeMake';

type FamilyMember = {
    id: any,
    name: any,
    spouse: any,
    children: any
}

const Tree = () => {
    const familyData: FamilyMember[] = [
        {
            id: '1',
            name: 'Grandfather',
            spouse: '2',
            children: ['3', '4'],
        },
        {
            id: '2',
            name: 'Grandmother',
            spouse: '1',
            children: ['3', '4'],
        },
        {
            id: '3',
            name: 'Father',
            spouse: '5',
            children: ['6'],
        },
        {
            id: '4',
            name: 'Aunt',
            spouse: '7',
            children: ['8'],
        },
        {
            id: '5',
            name: 'Mother',
            spouse: '3',
            children: ['6'],
        },
        {
            id: '6',
            name: 'Me',
            children: [],
            spouse: '9'
        },
        {
            id: '7',
            name: 'Uncle',
            spouse: '4',
            children: ['8'],
        },
        {
            id: '8',
            name: 'Cousin',
            children: [],
            spouse: undefined
        },
        {
            id: '9',
            name: 'Wife',
            children: [],
            spouse: '6'
        },
    ];

    return (
        <div className="container mx-auto px-3 md:px-6 relative">
            <TreeMake data={familyData} rootId="1" />
        </div>
    );
};

export default Tree;
