import fs from 'fs';
import path from 'path';

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function timestamp() {
  const d = new Date();
  const Y = d.getFullYear();
  const M = pad(d.getMonth() + 1);
  const D = pad(d.getDate());
  const h = pad(d.getHours());
  const m = pad(d.getMinutes());
  const s = pad(d.getSeconds());
  return `${Y}${M}${D}${h}${m}${s}`;
}

async function main() {
  const args = process.argv.slice(2);
  if (!args[0]) {
    console.error('Use: npm run migration:create -- <migration-name>');
    process.exit(1);
  }

  const rawName = args.join('-');
  const name = rawName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
  const ts = timestamp();
  const migrationsDir = path.resolve(process.cwd(), 'src/infra/database/migrations');

  if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
  }

  const fileName = `${ts}-${name}.ts`;
  const filePath = path.join(migrationsDir, fileName);

  if (fs.existsSync(filePath)) {
    console.error('Migration already exists:', filePath);
    process.exit(1);
  }

  const template = `import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('REPLACE_TABLE_NAME', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
  await queryInterface.dropTable('REPLACE_TABLE_NAME');
}
`;

  fs.writeFileSync(filePath, template, { encoding: 'utf8' });
  console.log('Migration criada em:', filePath);
  console.log('\nDica: substitua REPLACE_TABLE_NAME pelo nome da tabela, e ajuste colunas no arquivo gerado.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
