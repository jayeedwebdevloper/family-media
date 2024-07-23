import React from 'react';
import './FamilyTree.css';

interface FamilyTreeProps {
    data: any;
    rootId: string;
}

export default function TreeMake({ data, rootId }: FamilyTreeProps) {
    const root = data.find((member: any) => member._id === rootId);

    if (!root) return null;

    const renderChildren = (childrenIds: string[]) => {
        return (
            <div className="tree-children">
                {childrenIds.map((childId) => (
                    <div key={childId} className="tree-node">
                        <TreeMake data={data} rootId={childId} />
                    </div>
                ))}
            </div>
        );
    };

    const getSpouse = (spouseIds: string[]) => {
        return spouseIds.map(spouseId => {
            const spouse = data.find((member: any) => member._id === spouseId);
            return spouse ? (
                <div key={spouseId} className={`tree-person ${(spouse.sex === "male") ? "bg-blue-300" : (spouse.sex === "female") ? "bg-pink-300" : ""}`}>
                    {spouse.name}
                </div>
            ) : null;
        });
    };

    return (
        <div className="tree capitalize">
            <div className="tree-node">
                <div className="tree-content">
                    <div className="tree-couple">
                        <div className={`tree-person ${(root.sex === "male") ? "bg-blue-300" : (root.sex === "female") ? "bg-pink-300" : ""}`}>
                            {root.name}
                        </div>
                        {root.spouse.length > 0 && (
                            <>
                                <div className="heart">
                                    <img src="/icons/love.svg" alt="family" />
                                </div>
                                {getSpouse(root.spouse)}
                            </>
                        )}
                    </div>
                </div>
                {root.children.length > 0 && renderChildren(root.children)}
            </div>
        </div>
    );
}
