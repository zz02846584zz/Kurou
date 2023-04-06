import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('kurou', 'bryan', 'monokuro8669', {
  host: '192.168.64.3',
  dialect: 'mysql'
});

export {
  sequelize
};
