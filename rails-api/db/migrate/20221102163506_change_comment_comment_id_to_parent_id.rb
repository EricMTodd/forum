class ChangeCommentCommentIdToParentId < ActiveRecord::Migration[7.0]
  def change
    rename_column :comments, :comment_id, :parent_id
  end
end
