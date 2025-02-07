class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: :uuid do |t|
      t.uuid :uuid, default: 'gen_random_uuid()', null: false
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.datetime :created_at, null: false
    end
    add_index :users, :email, unique: true
    add_index :users, :uuid, unique: true
  end
end
