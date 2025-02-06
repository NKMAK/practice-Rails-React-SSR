class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
    add_index :posts, [:title,:created_at]
  end
end
