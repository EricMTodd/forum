class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :handle
      t.string :email
      t.string :password_digest
      t.string :persistence_token

      t.timestamps
    end
  end
end
