/* eslint-disable react/prop-types */

const Comment = ({ comment }) => {
    console.log(comment);

    const content = comment.status === 'approved'
        ? comment.content
        : comment.status === 'pending'
            ? "Comment is in moderation"
            : "Comment is rejected"

    return <li className={` border-b border-slate-300 last:border-b-0 py-1 ${comment.status === 'rejected' ? 'text-red-500' : 'text-slate-600'}`}>
        {
            content
        }
    </li>
}

const CommentList = ({ comments }) => {

    if (comments.length <= 0)
        return <h3 className='text-center text-red-300 font-semibold text-sm '>No comments yet</h3>

    return (
        <ul className="pl-4 ">
            {
                comments.map(comment => <Comment key={comment.id} comment={comment} />)
            }
        </ul>
    )
}

export default CommentList