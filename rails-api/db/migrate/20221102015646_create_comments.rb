class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.integer :post_id
      t.integer :user_id
      t.string :user_handle
      t.text :body
      t.integer :comment_id

      t.timestamps
    end
  end
end