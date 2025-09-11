import { DBConfig } from 'ngx-indexed-db';

const storeNameSleeperPlayers = 'sleeperPlayers';
const storeNameSchedule = 'schedule';
const storeNameLastUpdate = 'lastUpdate';

export const INDEXED_DB_CONFIG: DBConfig = {
  name: 'IndexedDBLeagues',
  version: 1,
  objectStoresMeta: [
    {
      store: storeNameSleeperPlayers,
      storeConfig: { keyPath: 'playerId', autoIncrement: false },
      storeSchema: [],
    },
    {
      store: storeNameSchedule,
      storeConfig: { keyPath: 'objectId', autoIncrement: false },
      storeSchema: [],
    },
    {
      store: storeNameLastUpdate,
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [],
    },
  ],
};

export const STORE_NAME_SLEEPER_PLAYERS = storeNameSleeperPlayers;
export const STORE_NAME_SCHEDULE = storeNameSchedule;
export const STORE_NAME_LAST_UPDATE = storeNameLastUpdate;
