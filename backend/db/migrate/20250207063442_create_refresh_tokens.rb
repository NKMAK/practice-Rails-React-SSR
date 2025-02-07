class CreateRefreshTokens < ActiveRecord::Migration[7.2]
  def change
    create_table :refresh_tokens do |t|
        t.uuid :user_id, null: false
        t.string :token, null: false
        t.datetime :expires_at, null: false
        t.timestamps
      end
      add_index :refresh_tokens, :user_id
      add_index :refresh_tokens, :token, unique: true
      add_foreign_key :refresh_tokens, :users
    end
  end
end
