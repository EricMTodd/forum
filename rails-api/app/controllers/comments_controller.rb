class CommentsController < ApplicationController

  def create
    comment = Comment.create(comment_params)

    if comment.save!
      render json: {
        message: 'Comment created.',
        comment: comment,
        successful: true
      }
    else
      render json: {
        message: 'Failed to create comment!',
        comment: {},
        successful: false
      }
    end
  end

  def update
    comment = Comment.find_by(id: params[:id])

    if comment.update(comment_params)
      render json: {
        message: 'Comment updated.',
        successful: true
      }
    else
      render json: {
        message: 'Failed to update comment!',
        successful: false
      }
    end
  end

  def destroy
    comment = Comment.find_by(id: params[:id])

    if comment.destroy!
      render json: {
        message: 'Comment destroyed',
        successful: true
      }
    else
      render json: {
        message: 'Failed to destroy comment!',
        successful: false
      }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :user_handle, :post_id, :parent_id, :body)
  end

end