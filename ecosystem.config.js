module.exports = {
  apps: [
    {
      name: 'steamji-strapi',
      script: './server/node_modules/@strapi/strapi/bin/strapi.js',
      args: 'start',
      cwd: './server',
      env: {
        NODE_ENV: 'development',
        DATABASE_URL: 'postgresql://steamji:123456@localhost:5432/steamji',
        HOST: '0.0.0.0',
        PORT: 1337,
        APP_KEYS: 'lTahCdcUq673TAWuEUmSDg==,mrYERiIN1tke52OuTGwABw==,LHLUCukIjTTTklQHFenc8A==,+T2Do1KBXSJAEfriM8Jq7w==',
        API_TOKEN_SALT: 'HCs5h8Epnnw29pUS2beR8w==',
        ADMIN_JWT_SECRET: 'wvu78kkflDrvVVbVRkPsRA==',
        JWT_SECRET: '+nDy3CECL7r1hddigflwXw==',
        WX_APPID: 'wx0b9252309639224d',
        WX_SECRET: 'dacc7d42c5782199c7064e9b815c6e74',
        AES_KEY: 'steamji_aes_key_2024_secure_256bit',
        CORPID: 'tobemodified',
        CORPSECRET: 'tobemodified',
        TOUSER: 'tobemodified',
        AGENTID: 'tobemodified'
      },
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      error_file: './logs/strapi-error.log',
      out_file: './logs/strapi-out.log',
      log_file: './logs/strapi-combined.log',
      time: true
    }
  ]
};