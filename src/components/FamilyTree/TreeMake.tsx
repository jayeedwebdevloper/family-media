import React from 'react';
import './FamilyTree.css';

interface FamilyTreeProps {
    data: any;
    rootId: string;
}

export default function TreeMake({ data, rootId }: FamilyTreeProps) {
    const root = data.find((member: any) => member.id === rootId);

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

    return (
        <div className="tree">
            <div className="tree-node">
                <div className="tree-content">
                    <div className="tree-couple">
                        <div className="tree-person">{root.name}</div>
                        {
                            root?.spouse && <div className="heart">
                                <img src="/icons/love.svg" alt="family" />
                            </div>
                        }
                        {root.spouse && (
                            <div className="tree-person">
                                {data.find((member: any) => member.id === root.spouse)?.name}
                            </div>
                        )}
                    </div>
                </div>
                {root.children.length > 0 && renderChildren(root.children)}
            </div>
        </div>
    );
}
