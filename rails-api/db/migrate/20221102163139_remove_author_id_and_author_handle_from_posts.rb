class RemoveAuthorIdAndAuthorHandleFromPosts < ActiveRecord::Migration[7.0]
  def change
    remove_column :posts, :author_id
    remove_column :posts, :author_handle
  end
end
