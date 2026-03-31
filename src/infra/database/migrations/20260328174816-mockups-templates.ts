import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('mockups-templates', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frame_x: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frame_y: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frame_width: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frame_height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('mockups-templates');
}
