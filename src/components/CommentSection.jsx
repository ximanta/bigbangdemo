import React,
{
  useState
}
from 'react';
import { useTickets } from '../context/TicketContext';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';
import {
  MessageSquare,
  Send
}
from 'lucide-react';

export const CommentSection = ({ ticketId,
  comments }) => {
  const [newCommentContent,
    setNewCommentContent]
  = useState('');
  const [commentType,
    setCommentType]
  = useState('public'); // 'public' or 'internal'
  const { addComment,
    loading } = useTickets();
  const { isAgent,
    isAdmin } = useAuth();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newCommentContent.trim()) {
      await addComment(ticketId, newCommentContent, commentType);
      setNewCommentContent('');
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      <div className="comment-list">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`comment-item ${comment.type === 'internal' ? 'comment-item-internal' : ''}`}
            >
              <div className="comment-header">
                <strong>{comment.authorName}</strong>
                <span>
                  {comment.type === 'internal' && (
                    <span style={{
                      marginRight: '10px',
                      color: '#f39c12',
                      fontWeight: 'bold'
                    }}>
                      INTERNAL
                    </span>
                  )}
                  {formatDate(comment.timestamp)}
                </span>
              </div>
              <p className="comment-content">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={handleAddComment}
        className="add-comment-form"
      >
        <div className="form-group">
          <label htmlFor="newComment">Add a Comment</label>
          <textarea
            id="newComment"
            className="textarea-field"
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Type your comment here..."
            required
            disabled={loading}
          ></textarea>
        </div>
        {(isAgent || isAdmin) && (
          <div className="form-group">
            <label>Comment Type:</label>
            <select
              className="select-field"
              value={commentType}
              onChange={(e) => setCommentType(e.target.value)}
              disabled={loading}
            >
              <option value="public">Public</option>
              <option value="internal">Internal</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="button button-primary"
          disabled={loading || !newCommentContent.trim()}
        >
          <Send size={18} />
          Add Comment
        </button>
      </form>
    </div>
  );
};
