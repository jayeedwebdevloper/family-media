'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface Comment {
    profile: string;
    userName: string;
    comment: string;
}

interface CommentsProps {
    data: { comments: Comment[] }; // Type for data prop
}

const CommentsList: React.FC<CommentsProps> = ({ data }) => {
    const [showMore, setShowMore] = useState(false);
    const commentsToShow = showMore ? data.comments : data.comments.slice(0, 1); // Show one by default

    const handleShowMore = () => setShowMore(true);

    return (
        <div>
            {commentsToShow.map((comnt, i) => (
                <div key={i} className='flex flex-col sm:flex-row justify-between my-3 gap-2 sm:gap-0 p-2'>
                    <div className="w-8">
                        <img className='rounded-full' src={comnt.profile} alt="family" />
                    </div>
                    <div className="xl:w-11/12 md:w-[330px] sm:w-[480px] w-full rounded bg-stone-200 py-1">
                        <Link className='px-4 text-sm text-blue-600 font-semibold capitalize' href={`/user/${comnt.userName}`}>{comnt.userName}</Link>
                        <p className='px-4 text-xs text-slate-400'>Commented: aug-12-2022</p>
                        <p className='px-4 text-xs pb-2'>{comnt.comment}</p>
                    </div>
                </div>
            ))}
            {data.comments.length > 1 && !showMore && (
                <button className="text-blue-600 font-semibold text-sm pb-2" onClick={handleShowMore}>
                    Show All Comments ({data.comments.length})
                </button>
            )}
        </div>
    );
};

export default CommentsList;
